
# SMASHLAB.NL — Homepage Build Plan

## Overview
Een complete, single-page homepage voor Smashlab.nl — het Nederlandse padel platform. Dark mode, electric lime accents, Bebas Neue + DM Sans typografie. Volledig responsive, geanimeerd, en productie-klaar.

## Design System Setup
- Custom CSS properties voor alle kleuren (off-black #111210, lime #C8FF00, warm wit #F0F2EC, etc.)
- Google Fonts: Bebas Neue (display) + DM Sans (body)
- Dark mode only, geen light mode toggle
- Grain/noise texture overlay via CSS

## Secties (in bouwvolgorde)

### 1. Sticky Navbar
- Glassmorphism effect (blur + transparantie), lime logo (SMASH lime / LAB wit)
- Nav links: Vrije Banen, Blogs, Gear & Tips, Mijn Niveau, Nieuws
- Nieuwsbrief CTA pill knop rechts
- Mobile: hamburger met fullscreen overlay

### 2. Hero (100vh)
- Staggered fade-up animatie (eyebrow → H1 → subtitel → CTAs → stats)
- "DOMEER DE BAAN." headline (wit + lime), stats rij (876K, 3.600+, #1)
- CSS-getekende padelbaan decoratie rechts + radial lime glow
- Twee CTA knoppen (primair lime, secundair outline)

### 3. Marquee Strip
- Continue horizontale scroll (35s loop), lime diamant separators
- Bebas Neue tekst met padel-gerelateerde termen

### 4. Vrije Banen Tool
- Twee-kolom kaart met "BINNENKORT BESCHIKBAAR" badge (pulse animatie)
- Disabled zoekbalk + SVG padelbaan illustratie
- Feature checklist met lime vinkjes

### 5. Categories Hub
- 6 kaarten in responsive grid (3/2/1 kolommen)
- Eerste kaart spans 2 kolommen (featured)
- Hover: lime border glow + translateY(-3px)
- Emoji iconen, "Binnenkort" labels

### 6. Blogs & Tips
- Featured grote kaart + 2 kleinere gestapeld
- Placeholder gradient afbeeldingen (geen externe URLs)
- Category pills, leestijd, "Lees artikel →" links
- Info balk onderaan over kennisbank in ontwikkeling

### 7. Niveau Strip
- 3-kolom grid: Beginner / Gevorderd / Competitief
- Grote nummers (01, 02, 03), tag pills per niveau

### 8. Nieuwsbrief CTA
- Lime top border accent, twee-kolom layout
- "BLIJF VOOROP." headline + email input met submit feedback

### 9. Footer
- 4-kolom grid met links, copyright balk onderaan

## Technisch
- IntersectionObserver scroll reveal voor alle secties
- SEO meta tags + JSON-LD structured data in index.html
- Responsive breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- Max-width 1240px gecentreerd
- Alle teksten in het Nederlands zoals gespecificeerd
