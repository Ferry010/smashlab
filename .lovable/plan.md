

# Hero Redesign: Hub with 3 Action Cards

## What changes

### Hero (`src/components/Hero.tsx`)
- Remove the two CTA buttons ("Vind een vrije baan" and "Ontdek alles")
- Remove the stats bar (876K, 3.600+, #1) from the hero
- Keep: eyebrow label, "THIS. IS. PADEL." heading, subtitle
- Add 3 glass-card action cards below the subtitle in a responsive row (stacked on mobile, 3-col on desktop):
  1. **Boek een baan** - icon: calendar/court, short description, links to `#vrije-banen` for now (future: Playtomic affiliate)
  2. **Vind je ideale racket** - icon: racket/target, short description, links to `/racket-test` (placeholder page for now)
  3. **Je volgende outfit** - icon: shirt/shopping-bag, short description, links to `/outfit` (placeholder page for now)
- Cards use the existing `glass-card` style with lime accent on hover
- Remove the padel court SVG from the right side to make room for the centered layout (heading + cards centered, full-width)

### Vanity stats
- Move the stats strip (876K / 3.600+ / #1) into the **Marquee** component, integrated as additional marquee items or placed as a small bar just below/above the marquee

### New placeholder pages
- `src/pages/RacketTestPage.tsx` - simple placeholder with "Binnenkort beschikbaar" message
- `src/pages/OutfitPage.tsx` - simple placeholder with "Binnenkort beschikbaar" message
- Add routes in `App.tsx`

## Layout sketch

```text
┌─────────────────────────────────────────┐
│  [SMASHLAB.NL label]                    │
│                                         │
│  THIS.                                  │
│  IS.                                    │
│  PADEL.                                 │
│                                         │
│  Alles wat je nodig hebt als padel-     │
│  speler. Op een plek.                   │
│                                         │
│  ┌───────────┐ ┌───────────┐ ┌────────┐ │
│  │ Boek een  │ │ Vind je   │ │ Je vol-│ │
│  │ baan      │ │ ideale    │ │ gende  │ │
│  │           │ │ racket    │ │ outfit │ │
│  └───────────┘ └───────────┘ └────────┘ │
└─────────────────────────────────────────┘
  ◆ MARQUEE + vanity stats ◆
```

## Files to modify
- `src/components/Hero.tsx` - restructure layout, add 3 cards, remove CTAs + stats + court SVG
- `src/components/Marquee.tsx` - add vanity stats as marquee items
- `src/App.tsx` - add 2 new routes
- `src/pages/RacketTestPage.tsx` (new) - placeholder
- `src/pages/OutfitPage.tsx` (new) - placeholder

