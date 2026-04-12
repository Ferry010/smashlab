

# Color Scheme + Padel Line Art Visual Overhaul

## Color Scheme

Inspired by the uploaded court photos: deep navy/dark blue backgrounds, electric blue accents, with white/light text. Replacing the current lime-green scheme.

**New palette:**
- Background: deep navy `#0A1628` (was off-black `#111210`)
- bg-2: `#0E1D35`
- bg-3: `#132742`
- bg-4: `#1A3155`
- Foreground: warm white `#F0F2EC` (keep)
- Primary accent: electric blue `#3B82F6` (replacing lime `#C8FF00`)
- Accent dim: `#2563EB`
- Muted: `#6B7FA0`
- Muted-2: `#3D4F6F`
- Border: `#1E3A5F`
- Border-2: `#264A73`

## Padel Line Art Decorations

Replace the current abstract rectangle/diagonal CSS shapes with recognizable 2D line drawings of padel elements, rendered as inline SVG components:

1. **Hero section**: A perspective padel court with net, service lines, and glass walls as thin stroke SVGs (replacing the current decorative rectangles)
2. **Section dividers / accents**: Small line-art icons scattered as decorative elements:
   - Padel net (side view, clean lines)
   - Court lines (top-down view of half-court)
   - Glass panel with metal raster/cage pattern
   - Racket outline (optional, subtle)

## Files to Modify

1. **`src/index.css`** - Update all CSS custom properties to new blue palette
2. **`tailwind.config.ts`** - Rename `lime` to `accent` (or keep `lime` name but change values)
3. **`src/components/Hero.tsx`** - Replace decorative divs with padel court SVG line art, update radial glow color
4. **`src/components/Navbar.tsx`** - Colors auto-update via CSS vars
5. **`src/components/Marquee.tsx`** - Diamond separator color updates via vars
6. **`src/components/Categories.tsx`** - Card hover/accent colors via vars
7. **`src/components/VrijeBanen.tsx`** - Search UI accent colors via vars
8. **`src/components/Blogs.tsx`** - Badge/link colors via vars
9. **`src/components/Niveau.tsx`** - Number ghost color, tag styles via vars
10. **`src/components/Newsletter.tsx`** - Top border, button colors via vars
11. **`src/components/Footer.tsx`** - Logo accent via vars
12. **`mem://index.md`** - Update core memory with new color scheme

Most components use CSS variables (`text-lime`, `bg-lime`, `border-lime`) so the bulk of the change happens in `src/index.css`. The Hero SVG art is the main component-level change.

## SVG Line Art (Hero)

A clean, minimal padel court illustration:
- Top-down court layout with center line, service boxes
- Net as a dashed/hatched horizontal line
- Glass walls as rectangles with a subtle grid pattern (the raster)
- All rendered as `stroke` only, no fills, using the accent blue at low opacity

