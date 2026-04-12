

# SMASHLAB V3 — Complete Visual Overhaul

## What's changing

The entire color scheme reverts from navy+electric-blue to a **court-blue + lime-green** palette inspired by real padel courts. Every section gets updated styling, glass-morphism cards, court-line textures, and refined copy per the spec.

## Color palette swap

| Variable | Current | New |
|----------|---------|-----|
| `--background` | `#0A1628` (navy) | `#1B3A6B` (court-blue) |
| `--bg-2` / `--court-mid` | `#0E1D35` | `#0F2548` |
| `--bg-3` / `--court-deep` | `#132742` | `#091830` |
| `--bg-4` | `#1A3155` | `#1A3155` (keep) |
| `--lime` | `#3B82F6` (blue!) | `#C8FF00` (lime green) |
| `--lime-dim` | `#2563EB` | `#A8D800` |
| `--foreground` | `#F0F2EC` | `#F4F6F0` |
| `--glass` | n/a | `rgba(255,255,255,0.06)` |
| `--glass-border` | n/a | `rgba(255,255,255,0.12)` |
| `--line-white` | n/a | `rgba(255,255,255,0.15)` |

## Files to modify

### 1. `src/index.css`
- Replace all CSS custom properties with new court-blue palette
- Add court-line grid CSS pattern as reusable class (`.court-lines`)
- Add glass-card utility class
- Update `--primary-foreground` to `#091830` (dark text on lime buttons)

### 2. `tailwind.config.ts`
- Update color mappings to match new vars
- Keep `lime` name but now it maps to actual lime `#C8FF00`

### 3. `src/components/Hero.tsx`
- Background: gradient `linear-gradient(160deg, #091830, #1B3A6B 60%, #0F2548)`
- Court-line grid overlay
- Lime radial glow top-right instead of blue
- Update SVG court: add 2 lime player dots, 2 white opponent circles, 1 lime ball dot
- H1: `OWN.` / `THE.` / `COURT.` (each on own line, COURT in lime)
- Subheadline: "Alles wat je nodig hebt als padelspeler. Op één plek."
- Eyebrow: `SMASHLAB.NL` pill badge with pulsing lime dot
- Stats with vertical dividers instead of border-top

### 4. `src/components/Navbar.tsx`
- Background: `rgba(9,24,48,0.85)` + blur(20px)
- Border: `rgba(255,255,255,0.08)`
- Logo: SMASH in lime, LAB in white (already correct pattern)

### 5. `src/components/Marquee.tsx`
- Background: `--court-deep` (#091830)
- Diamonds in lime

### 6. `src/components/VrijeBanen.tsx`
- Section bg: `--court-mid` (#0F2548)
- Glass-style tool card with backdrop-filter
- Lime accent bar top
- Keep functional search logic intact

### 7. `src/components/Categories.tsx`
- Section bg: `--court-blue` (#1B3A6B)
- Glass cards with hover glow
- Featured card spans 2 cols with racket SVG outline
- Emoji icon blocks with lime bg at 0.1 opacity

### 8. `src/components/Blogs.tsx`
- Section bg: `--court-deep` (#091830)
- Glass-style blog cards
- Court-line pattern on image placeholders
- Lime pills and links

### 9. `src/components/Niveau.tsx`
- Section bg: `--court-mid` (#0F2548)
- Ghost numbers in `rgba(200,255,0,0.08)`

### 10. `src/components/Newsletter.tsx`
- Section bg: `--court-blue` (#1B3A6B)
- Border-top: lime 3px
- Court-line overlay

### 11. `src/components/Footer.tsx`
- Background: `--court-deep` (#091830)
- Footer copy update: "Het go-to padel platform van Nederland."

### 12. `index.html`
- SEO meta already mostly correct, minor keyword update

### 13. `.lovable/memory/index.md`
- Update core memory: lime is `#C8FF00` again, court-blue palette

## Key design patterns (reusable)

**Glass card:**
```css
background: rgba(255,255,255,0.05);
border: 1px solid rgba(255,255,255,0.1);
border-radius: 12px;
backdrop-filter: blur(8px);
```

**Court-line grid:**
```css
background-image: 
  linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
background-size: 80px 80px;
```

## What stays the same
- All functional logic (search, API calls, form submission)
- Component structure and routing
- Edge function and database schema
- Font families (Bebas Neue + DM Sans)
- Scroll reveal and animation patterns
- SEO structured data

