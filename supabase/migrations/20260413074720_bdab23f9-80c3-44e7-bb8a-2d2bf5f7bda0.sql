
-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  city text,
  level text NOT NULL DEFAULT 'beginner',
  matches_played integer NOT NULL DEFAULT 0,
  courts_visited integer NOT NULL DEFAULT 0,
  login_count integer NOT NULL DEFAULT 0,
  total_points integer NOT NULL DEFAULT 0,
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create badges table
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  category text NOT NULL,
  points integer NOT NULL DEFAULT 10,
  rarity text NOT NULL DEFAULT 'common',
  unlock_trigger text NOT NULL
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges are viewable by everyone" ON public.badges FOR SELECT USING (true);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_slug text NOT NULL REFERENCES public.badges(slug),
  earned_at timestamptz NOT NULL DEFAULT now(),
  seen boolean NOT NULL DEFAULT false,
  UNIQUE (user_id, badge_slug)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User badges are viewable by everyone" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "Users can insert their own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own badges" ON public.user_badges FOR UPDATE USING (auth.uid() = user_id);

-- Create activity_log table
CREATE TABLE public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action text NOT NULL,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity" ON public.activity_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own activity" ON public.activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Seed all badges
INSERT INTO public.badges (slug, name, description, icon, category, points, rarity, unlock_trigger) VALUES
  ('welcome', 'Welkom aan Boord', 'Je eerste stap op Smashlab.', '🎾', 'account', 10, 'common', 'account_created'),
  ('profile_complete', 'Klaar voor de Baan', 'Profiel volledig ingevuld incl. foto en stad.', '✅', 'account', 15, 'common', 'profile_completed'),
  ('first_login', 'Eerste Opslag', 'Je eerste keer inloggen.', '🚪', 'account', 5, 'common', 'login'),
  ('ten_logins', 'Vaste Gast', '10 keer ingelogd op Smashlab.', '🔁', 'account', 25, 'rare', 'login'),
  ('thirty_logins', 'Stamgast', '30 keer ingelogd. Smashlab is je thuis.', '🏠', 'account', 50, 'rare', 'login'),
  ('first_match', 'Eerste Wedstrijd', 'Je eerste wedstrijd ingevoerd.', '🎯', 'activiteit', 20, 'common', 'match_logged'),
  ('ten_matches', 'In de Groove', '10 wedstrijden gelogd.', '💪', 'activiteit', 40, 'rare', 'match_logged'),
  ('fifty_matches', 'Serieuze Speler', '50 wedstrijden gelogd. Je bent verslaafd.', '🔥', 'activiteit', 100, 'epic', 'match_logged'),
  ('hundred_matches', 'Padel Machine', '100 wedstrijden. Respect.', '⚡', 'activiteit', 250, 'legendary', 'match_logged'),
  ('first_booking', 'Baan Geboekt', 'Je eerste baan geboekt via Smashlab.', '📍', 'activiteit', 20, 'common', 'court_booked'),
  ('five_courts', 'Baanontdekker', '5 verschillende banen bezocht.', '🗺️', 'activiteit', 35, 'rare', 'court_booked'),
  ('twenty_courts', 'Padel Reiziger', '20 verschillende banen bezocht.', '✈️', 'activiteit', 80, 'epic', 'court_booked'),
  ('win_streak_3', 'Op Dreef', '3 wedstrijden op rij gewonnen.', '🎯', 'activiteit', 30, 'rare', 'match_logged'),
  ('win_streak_5', 'Niet Te Stoppen', '5 wedstrijden op rij gewonnen.', '🚀', 'activiteit', 75, 'epic', 'match_logged'),
  ('first_article', 'Kennishonger', 'Je eerste artikel gelezen op Smashlab.', '📖', 'kennis', 5, 'common', 'article_read'),
  ('ten_articles', 'Studioso', '10 artikelen gelezen.', '🧠', 'kennis', 20, 'common', 'article_read'),
  ('newsletter', 'In de Loop', 'Aangemeld voor de Smashlab nieuwsbrief.', '📬', 'kennis', 10, 'common', 'newsletter_signup'),
  ('daily_challenge', 'Dagelijkse Uitdaging', 'Eerste dagelijkse challenge voltooid.', '⚡', 'kennis', 15, 'common', 'challenge_completed'),
  ('challenge_streak_7', 'Weekkampioen', '7 dagen op rij een challenge voltooid.', '🏅', 'kennis', 60, 'rare', 'challenge_completed'),
  ('challenge_streak_30', 'Challenge Master', '30 dagen op rij. Legendarisch.', '👑', 'kennis', 200, 'legendary', 'challenge_completed'),
  ('first_gear_click', 'Gear Hunter', 'Je eerste gear artikel bekeken.', '🔍', 'gear', 5, 'common', 'gear_click'),
  ('first_clothing', 'Dressed to Smash', 'Je eerste kledingaankoop via Smashlab.', '👕', 'gear', 30, 'rare', 'affiliate_purchase'),
  ('first_racket', 'Bewapend', 'Je eerste racket gekocht via Smashlab.', '🎾', 'gear', 35, 'rare', 'affiliate_purchase'),
  ('gear_collector', 'Full Kit', 'Racket, schoenen en kleding via Smashlab.', '🎒', 'gear', 100, 'epic', 'affiliate_purchase'),
  ('first_share', 'Spread the Word', 'Eerste Smashlab content gedeeld op socials.', '📣', 'community', 15, 'common', 'social_share'),
  ('refer_friend', 'Recruiter', 'Een vriend uitgenodigd die zich registreert.', '🤝', 'community', 50, 'rare', 'referral_converted'),
  ('refer_five', 'Padel Evangelist', '5 vrienden gerekruteerd.', '🌟', 'community', 150, 'epic', 'referral_converted'),
  ('og_member', 'OG Smashlab', 'Lid geworden in het eerste jaar van Smashlab.', '🏆', 'community', 500, 'legendary', 'account_created'),
  ('rotterdam_2026', 'Premier Padel Rotterdam', 'Was aanwezig bij Premier Padel Rotterdam 2026.', '🏟️', 'seizoen', 75, 'epic', 'manual'),
  ('summer_player', 'Zomerkampioen', '10 matches gespeeld in juni/juli/augustus.', '☀️', 'seizoen', 40, 'rare', 'match_logged'),
  ('winter_warrior', 'Winterkrijger', '5 matches gespeeld in december/januari.', '❄️', 'seizoen', 30, 'rare', 'match_logged');
