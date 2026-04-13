import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { checkAndAwardBadge } from '@/lib/badges';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  city: string | null;
  level: string;
  matches_played: number;
  courts_visited: number;
  login_count: number;
  total_points: number;
  onboarding_completed: boolean;
  created_at: string;
}

interface BadgeNotification {
  slug: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  rarity: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  badgeNotifications: BadgeNotification[];
  dismissBadgeNotification: (slug: string) => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [badgeNotifications, setBadgeNotifications] = useState<BadgeNotification[]>([]);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setProfile(data as Profile);
    return data as Profile | null;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  const dismissBadgeNotification = useCallback((slug: string) => {
    setBadgeNotifications(prev => prev.filter(b => b.slug !== slug));
    // Mark as seen in DB
    if (user) {
      supabase
        .from('user_badges')
        .update({ seen: true })
        .eq('user_id', user.id)
        .eq('badge_slug', slug)
        .then();
    }
  }, [user]);

  const handleLogin = useCallback(async (userId: string) => {
    // Increment login count
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('login_count')
      .eq('id', userId)
      .single();

    if (currentProfile) {
      await supabase
        .from('profiles')
        .update({ login_count: currentProfile.login_count + 1 })
        .eq('id', userId);
    }

    // Check for login-related badges
    const earned = await checkAndAwardBadge(userId, 'login');
    if (earned.length > 0) {
      setBadgeNotifications(prev => [...prev, ...earned]);
    }

    // Refresh profile after updates
    await fetchProfile(userId);
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          // Use setTimeout to avoid Supabase deadlock
          if (event === 'SIGNED_IN') {
            setTimeout(() => handleLogin(session.user.id), 0);
          } else {
            setTimeout(() => fetchProfile(session.user.id), 0);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, handleLogin]);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      badgeNotifications,
      dismissBadgeNotification,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
