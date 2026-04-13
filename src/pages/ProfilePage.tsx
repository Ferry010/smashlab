import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import BadgeGrid from '@/components/BadgeGrid';
import Footer from '@/components/Footer';

interface ProfileData {
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
  created_at: string;
}

interface ActivityItem {
  id: string;
  action: string;
  metadata: any;
  created_at: string;
}

export default function ProfilePage() {
  const { username } = useParams();
  const { user, profile: ownProfile } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [badgeCount, setBadgeCount] = useState(0);
  const [isOwn, setIsOwn] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (username) {
        const { data } = await supabase.from('profiles').select('*').eq('username', username).single();
        if (data) {
          setProfileData(data as ProfileData);
          setIsOwn(user?.id === data.id);
        }
      } else if (ownProfile) {
        setProfileData(ownProfile as ProfileData);
        setIsOwn(true);
      } else {
        navigate('/inloggen');
        return;
      }
    };
    loadProfile();
  }, [username, ownProfile, user, navigate]);

  useEffect(() => {
    if (!profileData) return;
    supabase.from('user_badges').select('id', { count: 'exact', head: true }).eq('user_id', profileData.id).then(({ count }) => setBadgeCount(count || 0));

    if (isOwn) {
      supabase.from('activity_log').select('*').eq('user_id', profileData.id).order('created_at', { ascending: false }).limit(20).then(({ data }) => {
        if (data) setActivity(data as ActivityItem[]);
      });
    }
  }, [profileData, isOwn]);

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#091830' }}>
        <p className="text-muted font-body">Laden...</p>
      </div>
    );
  }

  const initials = (profileData.display_name || profileData.username || '?').slice(0, 2).toUpperCase();
  const levelLabel = { beginner: 'Beginner', gevorderd: 'Gevorderd', competitief: 'Competitief' }[profileData.level] || profileData.level;

  const actionLabels: Record<string, string> = {
    login: '🚪 Ingelogd',
    account_created: '🎾 Account aangemaakt',
    match_logged: '🎯 Wedstrijd gelogd',
    court_booked: '📍 Baan geboekt',
    article_read: '📖 Artikel gelezen',
    newsletter_signup: '📬 Nieuwsbrief aangemeld',
    profile_completed: '✅ Profiel voltooid',
  };

  return (
    <div className="min-h-screen" style={{ background: '#091830' }}>
      <Navbar />

      {/* Header */}
      <section className="court-lines py-16">
        <div className="max-w-[1240px] mx-auto px-5">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold font-display shrink-0"
              style={{
                background: profileData.avatar_url ? `url(${profileData.avatar_url}) center/cover` : 'rgba(200,255,0,0.15)',
                color: profileData.avatar_url ? 'transparent' : '#C8FF00',
                border: '3px solid #C8FF00',
              }}
            >
              {!profileData.avatar_url && initials}
            </div>
            <div>
              <h1 className="font-display text-[36px] leading-none text-foreground">
                {profileData.display_name || profileData.username}
              </h1>
              <p className="text-muted font-body text-sm">@{profileData.username}</p>
              <div className="flex items-center gap-2 mt-1">
                {profileData.city && <span className="text-muted font-body text-sm">{profileData.city}</span>}
                {profileData.city && <span className="text-muted">·</span>}
                <span className="px-2 py-0.5 rounded-full text-[11px] font-body font-bold" style={{ background: 'rgba(200,255,0,0.1)', color: '#C8FF00' }}>
                  {levelLabel}
                </span>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="font-display text-[52px] leading-none" style={{ color: '#C8FF00' }}>{profileData.total_points}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted font-body">Punten</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { value: profileData.matches_played, label: 'Wedstrijden' },
              { value: profileData.courts_visited, label: 'Banen bezocht' },
              { value: badgeCount, label: 'Badges' },
              { value: profileData.login_count, label: 'Logins' },
            ].map(stat => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <p className="font-display text-3xl text-foreground">{stat.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badges */}
      <section id="badges" className="py-12" style={{ background: '#0F2548' }}>
        <div className="max-w-[1240px] mx-auto px-5">
          <div className="section-bar">
            <span className="text-[11px] uppercase tracking-wider font-bold font-body" style={{ color: '#C8FF00' }}>Badges</span>
          </div>
          <h2 className="font-display text-[36px] text-foreground mb-6">MIJN BADGES</h2>
          <BadgeGrid userId={profileData.id} />
        </div>
      </section>

      {/* Activity (own profile only) */}
      {isOwn && activity.length > 0 && (
        <section className="py-12" style={{ background: '#091830' }}>
          <div className="max-w-[1240px] mx-auto px-5">
            <div className="section-bar">
              <span className="text-[11px] uppercase tracking-wider font-bold font-body" style={{ color: '#C8FF00' }}>Activiteit</span>
            </div>
            <h2 className="font-display text-[36px] text-foreground mb-6">RECENTE ACTIVITEIT</h2>
            <div className="space-y-3">
              {activity.map(item => (
                <div key={item.id} className="glass-card px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-foreground font-body">
                    {actionLabels[item.action] || item.action}
                  </span>
                  <span className="text-[11px] text-muted font-body">
                    {new Date(item.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
