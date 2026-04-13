import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';

export default function UserDropdown() {
  const { profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (profile) {
      supabase
        .from('user_badges')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', profile.id)
        .eq('seen', false)
        .then(({ count }) => setUnseenCount(count || 0));
    }
  }, [profile]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!profile) return null;

  const initials = (profile.display_name || profile.username || '?').slice(0, 2).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body transition-all"
        style={{
          background: profile.avatar_url ? `url(${profile.avatar_url}) center/cover` : 'rgba(200,255,0,0.15)',
          color: profile.avatar_url ? 'transparent' : '#C8FF00',
          border: '2px solid transparent',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#C8FF00')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
      >
        {!profile.avatar_url && initials}
        {unseenCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full pulse-lime" style={{ background: '#C8FF00' }} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl p-2 z-50"
          style={{ background: 'rgba(9,24,48,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="px-3 py-2 mb-1">
            <p className="text-sm text-foreground font-body font-bold">{profile.display_name || profile.username}</p>
            <p className="text-[11px] text-muted font-body">@{profile.username}</p>
          </div>
          <div className="h-px mb-1" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {[
            { label: 'Mijn Profiel', path: '/profiel' },
            { label: 'Mijn Badges', path: '/profiel#badges' },
            ...(isAdmin ? [{ label: 'Admin Panel', path: '/admin/blogs' }] : []),
          ].map(item => (
            <button
              key={item.label}
              onClick={() => { navigate(item.path); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-body rounded-lg transition-colors hover:bg-white/5 ${
                item.label === 'Admin Panel' ? 'text-lime hover:text-lime-dim' : 'text-muted hover:text-foreground'
              }`}
            >
              {item.label}
              {item.label === 'Mijn Badges' && unseenCount > 0 && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: '#C8FF00', color: '#091830' }}>
                  {unseenCount}
                </span>
              )}
            </button>
          ))}

          <div className="h-px my-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <button
            onClick={() => { signOut(); setOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm text-muted font-body rounded-lg transition-colors hover:text-foreground hover:bg-white/5"
          >
            Uitloggen
          </button>
        </div>
      )}
    </div>
  );
}
