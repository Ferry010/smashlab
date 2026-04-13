# Project Memory

## Core
Court-blue theme only. --background #1B3A6B, --bg-2 #0F2548, --bg-3 #091830. Lime accent #C8FF00 (sparingly). Bebas Neue + DM Sans. Nederlands copy.
Never use em dash (—) in any copy text.
CSS var --lime maps to lime green #C8FF00. --red #E3491C kept for minor accents.
Glass-card pattern: rgba(255,255,255,0.05) bg + blur(8px) + rgba(255,255,255,0.1) border.
Court-lines pattern: 80px grid, rgba(255,255,255,0.04) lines.
Auth system: email+password, Google OAuth, magic link. Profiles table linked to auth.users.
Badge system: 30+ badges, 5 rarity tiers, checkAndAwardBadge utility. Onboarding 4-step modal on first login.

## Memories
- [Auth flow](mem://features/auth) — Email+password, Google OAuth, magic link. Profiles auto-created via trigger. Login count tracked.
- [Badge system](mem://features/badges) — 30+ badges across 6 categories. RARITY: common/rare/epic/legendary. checkAndAwardBadge(userId, action, metadata).
