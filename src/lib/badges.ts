import { supabase } from '@/integrations/supabase/client';

export const RARITY_COLORS: Record<string, string> = {
  common: '#8A8C86',
  rare: '#4A9FD4',
  epic: '#9B59B6',
  legendary: '#C8FF00',
};

export const RARITY_LABELS: Record<string, string> = {
  common: 'COMMON',
  rare: 'RARE',
  epic: 'EPIC',
  legendary: 'LEGENDARY',
};

interface BadgeCheckResult {
  slug: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  rarity: string;
}

export async function checkAndAwardBadge(
  userId: string,
  action: string,
  metadata?: Record<string, unknown>
): Promise<BadgeCheckResult[]> {
  const earned: BadgeCheckResult[] = [];

  // Log the activity
  await supabase.from('activity_log').insert({
    user_id: userId,
    action,
    metadata: metadata as any,
  });

  // Get all badges for this trigger
  const { data: possibleBadges } = await supabase
    .from('badges')
    .select('*')
    .eq('unlock_trigger', action);

  if (!possibleBadges?.length) return earned;

  // Get user's existing badges
  const { data: existingBadges } = await supabase
    .from('user_badges')
    .select('badge_slug')
    .eq('user_id', userId);

  const existingSlugs = new Set(existingBadges?.map(b => b.badge_slug) || []);

  // Get user profile for counts
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (!profile) return earned;

  for (const badge of possibleBadges) {
    if (existingSlugs.has(badge.slug)) continue;

    let shouldAward = false;

    switch (badge.slug) {
      case 'welcome':
      case 'first_login':
      case 'first_match':
      case 'first_booking':
      case 'first_article':
      case 'newsletter':
      case 'daily_challenge':
      case 'first_gear_click':
      case 'first_share':
        shouldAward = true;
        break;
      case 'og_member':
        shouldAward = new Date(profile.created_at) < new Date('2027-01-01');
        break;
      case 'profile_complete':
        shouldAward = !!(profile.avatar_url && profile.city && profile.display_name);
        break;
      case 'ten_logins':
        shouldAward = profile.login_count >= 10;
        break;
      case 'thirty_logins':
        shouldAward = profile.login_count >= 30;
        break;
      case 'ten_matches':
        shouldAward = profile.matches_played >= 10;
        break;
      case 'fifty_matches':
        shouldAward = profile.matches_played >= 50;
        break;
      case 'hundred_matches':
        shouldAward = profile.matches_played >= 100;
        break;
      case 'five_courts':
        shouldAward = profile.courts_visited >= 5;
        break;
      case 'twenty_courts':
        shouldAward = profile.courts_visited >= 20;
        break;
      case 'ten_articles': {
        const { count } = await supabase
          .from('activity_log')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('action', 'article_read');
        shouldAward = (count || 0) >= 10;
        break;
      }
      case 'refer_friend':
      case 'refer_five': {
        const { count } = await supabase
          .from('activity_log')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('action', 'referral_converted');
        shouldAward = badge.slug === 'refer_friend' ? (count || 0) >= 1 : (count || 0) >= 5;
        break;
      }
      default:
        break;
    }

    if (shouldAward) {
      const { error } = await supabase.from('user_badges').insert({
        user_id: userId,
        badge_slug: badge.slug,
      });
      if (!error) {
        earned.push({
          slug: badge.slug,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          points: badge.points,
          rarity: badge.rarity,
        });

        // Update total points
        await supabase
          .from('profiles')
          .update({ total_points: profile.total_points + badge.points })
          .eq('id', userId);
      }
    }
  }

  return earned;
}
