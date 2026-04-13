

# Accounts + Onboarding + Badge Systeem

## Summary
Build a complete user account system with authentication, a 4-step onboarding flow, and a gamification badge system -- all in the Smashlab court-blue/lime design language.

## 1. Database Migration

Create tables via migration:

**`profiles`** -- linked to `auth.users(id)` with `ON DELETE CASCADE`, trigger to auto-create on signup. Fields: `username` (unique), `display_name`, `avatar_url`, `city`, `level` (default 'beginner'), `matches_played`, `courts_visited`, `login_count`, `total_points`, `onboarding_completed` (boolean), `updated_at` trigger.

**`badges`** -- all badge definitions. Fields: `slug` (unique), `name`, `description`, `icon`, `category`, `points`, `rarity`, `unlock_trigger`.

**`user_badges`** -- join table: `user_id` references `profiles(id)`, `badge_slug` references `badges(slug)`, `earned_at`, `seen` (boolean).

**`activity_log`** -- `user_id` references `profiles(id)`, `action` (text), `metadata` (jsonb), `created_at`.

**RLS policies:**
- `profiles`: users can read all profiles (public), update only own
- `badges`: readable by everyone, no public insert/update/delete
- `user_badges`: readable by everyone, insert only own
- `activity_log`: users can read/insert only own

**Seed data:** Insert all 30+ badges from the spec into `badges` table.

**Storage bucket:** `avatars` (public) for profile photos.

## 2. Auth Configuration
- Enable email+password auth (no auto-confirm -- users must verify email)
- Configure Google OAuth via Lovable Cloud managed credentials
- Configure social auth tool for Google sign-in

## 3. New Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/registreren` | `RegisterPage.tsx` | Signup with username check, password strength |
| `/inloggen` | `LoginPage.tsx` | Email/password + Google + magic link |
| `/wachtwoord-vergeten` | `ForgotPasswordPage.tsx` | Password reset request |
| `/reset-password` | `ResetPasswordPage.tsx` | Set new password (from email link) |
| `/profiel` | `ProfilePage.tsx` | Own profile with badges + activity |
| `/speler/:username` | `ProfilePage.tsx` | Public profile view |

All auth pages: full viewport, `court-deep` background, court-line grid overlay, centered glasmorphism card (max-w 440px), lime accent bar top.

## 4. Auth Components

**`RegisterPage`:**
- Fields: display name, username (debounced 500ms uniqueness check via Supabase), email, password (show/hide toggle + 4-segment strength meter), city (optional)
- Google OAuth button (glasmorphism style)
- Zod validation, inline errors in red `#FF6B6B`
- On success: create profile via trigger, redirect to homepage (onboarding modal triggers on first login)

**`LoginPage`:**
- Email + password, "Vergeten?" link, Google OAuth, magic link option
- Loading spinner state, error banner
- On success: increment `login_count`, check if onboarding needed

**`ForgotPasswordPage` + `ResetPasswordPage`:**
- Single-field flows per spec

## 5. Auth Context

**`AuthProvider`** wrapping the app:
- `onAuthStateChange` listener (set up before `getSession`)
- Exposes `user`, `profile`, `loading`, `signOut`
- On each login: increment `login_count` in profiles, log `login` activity, check badge triggers

## 6. Onboarding Flow

**`OnboardingModal`** -- rendered when `profile.login_count === 1 && !profile.onboarding_completed`:
- Full viewport modal overlay, `z-index: 9999`, cannot dismiss by clicking outside
- 4-step progress indicator (lime dots + connecting line)

**Step 1 - Welkom:** Spring animation entrance, 3 feature pills, "Laten we beginnen" + skip option
**Step 2 - Eerste Badge:** Award "Welkom aan Boord" badge with scale bounce animation + lime glow. Show 4 locked badge previews with tooltips.
**Step 3 - Profiel Setup:** 3-card level selector (beginner/gevorderd/competitief), optional avatar upload to storage bucket. Save to profiles.
**Step 4 - Klaar:** Checkmark SVG stroke animation, 3 action cards linking to banen/blogs/badges, confetti burst.

On completion: set `onboarding_completed = true`.

## 7. Badge System

**`checkAndAwardBadge(userId, action, metadata)`** utility function:
- Maps actions to badge slugs per the trigger table
- Checks counts in `activity_log` / `profiles` fields
- Inserts into `user_badges` if not already earned
- Updates `total_points` on profiles
- Returns newly earned badges for notification

**Badge notification toast** (`BadgeToast`):
- Slides in from right, 4s visible
- Glasmorphism card with lime left-border, icon, name, description, points, rarity
- Stacked with 500ms delay for multiple simultaneous unlocks

## 8. Profile Page

**Header:** Avatar (96px, lime border), display name, @username, city + level pill, total points (Bebas Neue 52px lime)
**Stats row:** 4 columns (matches, courts, badges earned, streak)
**Badge grid:** 4 cols desktop / 3 mobile. Unlocked = full color. Locked = grayscale + 🔒 + hover tooltip. Progress bar + "next badge" hint.
**Activity timeline:** Recent badge unlocks + matches + bookings (private, own profile only)
**Edit button:** visible only on own profile

## 9. Navbar Update

- Check auth state
- **Not logged in:** show "Nieuwsbrief" pill (current)
- **Logged in:** replace with avatar (32px, lime border on hover). Click opens glasmorphism dropdown: profile link, badges link, settings, logout
- Unseen badge dot: pulsing lime 6px circle on avatar when `user_badges.seen = false` exists

## 10. Files to Create/Modify

**New files (~15):**
- `src/contexts/AuthContext.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/ForgotPasswordPage.tsx`
- `src/pages/ResetPasswordPage.tsx`
- `src/pages/ProfilePage.tsx`
- `src/components/OnboardingModal.tsx`
- `src/components/BadgeCard.tsx`
- `src/components/BadgeGrid.tsx`
- `src/components/BadgeToast.tsx`
- `src/components/UserDropdown.tsx`
- `src/lib/badges.ts` (checkAndAwardBadge + badge data constants)
- `src/lib/validators.ts` (zod schemas)

**Modified files:**
- `src/App.tsx` -- add AuthProvider wrapper + new routes
- `src/components/Navbar.tsx` -- auth-aware right side
- `.lovable/memory/index.md` -- update with auth/badge system info

**Database:** 1 migration (tables + triggers + seed badges + storage bucket + RLS)

## Build Order
1. Database migration (all tables + seed badges + RLS + storage)
2. Configure Google OAuth
3. Auth context provider
4. Register + Login + Forgot Password pages
5. Navbar auth state + user dropdown
6. Badge system logic (`checkAndAwardBadge`)
7. Onboarding modal (4 steps)
8. Badge notification toast
9. Profile page with badge grid
10. Wire up activity logging across existing components

