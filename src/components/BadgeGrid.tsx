import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import BadgeCard from './BadgeCard';

interface Badge {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  rarity: string;
}

interface UserBadge {
  badge_slug: string;
  earned_at: string;
}

interface BadgeGridProps {
  userId?: string;
  compact?: boolean;
}

export default function BadgeGrid({ userId, compact }: BadgeGridProps) {
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);

  useEffect(() => {
    supabase.from('badges').select('*').order('category').then(({ data }) => {
      if (data) setAllBadges(data as Badge[]);
    });

    if (userId) {
      supabase.from('user_badges').select('badge_slug, earned_at').eq('user_id', userId).then(({ data }) => {
        if (data) setUserBadges(data);
      });
    }
  }, [userId]);

  const earnedSlugs = new Set(userBadges.map(b => b.badge_slug));
  const earnedCount = userBadges.length;
  const totalCount = allBadges.length;
  const progress = totalCount > 0 ? (earnedCount / totalCount) * 100 : 0;

  const displayBadges = compact ? allBadges.slice(0, 8) : allBadges;

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted font-body">{earnedCount} van {totalCount} badges verdiend</span>
          <span className="text-sm text-lime font-body font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: '#C8FF00' }} />
        </div>
      </div>

      {/* Grid */}
      <div className={`grid gap-4 ${compact ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
        {displayBadges.map(badge => {
          const ub = userBadges.find(u => u.badge_slug === badge.slug);
          return (
            <BadgeCard
              key={badge.slug}
              icon={badge.icon}
              name={badge.name}
              description={badge.description}
              rarity={badge.rarity}
              points={badge.points}
              locked={!earnedSlugs.has(badge.slug)}
              earnedAt={ub?.earned_at}
              howToEarn={badge.description}
            />
          );
        })}
      </div>
    </div>
  );
}
