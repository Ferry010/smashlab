import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RARITY_COLORS, RARITY_LABELS } from '@/lib/badges';

export default function BadgeToast() {
  const { badgeNotifications, dismissBadgeNotification } = useAuth();
  const [visible, setVisible] = useState<string[]>([]);

  useEffect(() => {
    badgeNotifications.forEach((badge, i) => {
      if (!visible.includes(badge.slug)) {
        setTimeout(() => {
          setVisible(prev => [...prev, badge.slug]);
          // Auto-dismiss after 4s
          setTimeout(() => {
            dismissBadgeNotification(badge.slug);
            setVisible(prev => prev.filter(s => s !== badge.slug));
          }, 4000);
        }, i * 500);
      }
    });
  }, [badgeNotifications, dismissBadgeNotification, visible]);

  if (badgeNotifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3">
      {badgeNotifications.filter(b => visible.includes(b.slug)).map(badge => (
        <div
          key={badge.slug}
          className="w-[340px] p-4 rounded-xl animate-slide-in-right"
          style={{
            background: 'rgba(9,24,48,0.95)',
            backdropFilter: 'blur(20px)',
            borderLeft: `3px solid ${RARITY_COLORS[badge.rarity] || '#C8FF00'}`,
            border: '1px solid rgba(255,255,255,0.1)',
            borderLeftWidth: '3px',
            borderLeftColor: RARITY_COLORS[badge.rarity] || '#C8FF00',
          }}
        >
          <p className="text-[11px] uppercase tracking-wider font-bold mb-2" style={{ color: '#C8FF00' }}>
            ✦ Badge verdiend
          </p>
          <div className="flex items-start gap-3">
            <span className="text-[32px]">{badge.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-[15px] text-foreground font-body">{badge.name}</p>
              <p className="text-[12px] text-muted">{badge.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[13px] font-bold font-display" style={{ color: '#C8FF00' }}>
              +{badge.points} punten
            </span>
            <span
              className="text-[10px] uppercase tracking-wider font-bold"
              style={{ color: RARITY_COLORS[badge.rarity] }}
            >
              {RARITY_LABELS[badge.rarity]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
