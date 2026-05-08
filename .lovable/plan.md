# Vind Jouw Racket — Quiz + Resultatenpagina

Vervangt de huidige `RacketTestPage` placeholder. De Hero card "Vind je ideale racket" linkt al naar `/racket-test`.

## Brand & design notes
- Hergebruik bestaande design tokens — die matchen de spec al: navy `--background` (#1B3A6B-ish), donkerder card `--bg-2`, lime `--lime` (#C8FF00 i.p.v. #CCFF00 — visueel identiek, blijft consistent met de rest van de site), Bebas Neue uppercase headings, DM Sans body. Geen nieuwe kleuren toevoegen.
- Mobile-first, tap targets ≥ 60px, full-width CTAs op mobiel.
- Slide-left transitie tussen vragen via framer-motion `AnimatePresence`. Geselecteerde kaart: lime border + scale 1.02, dan auto-advance na 300ms.

## File structure

```text
src/pages/RacketTestPage.tsx          # quiz controller + results
src/components/racket-test/
  ProgressBar.tsx                     # "Vraag X van 8" + lime bar
  QuestionCard.tsx                    # vraag + opties grid
  OptionCard.tsx                      # tap target met emoji/label/sublabel
  ResultsView.tsx                     # profielheader + 4 racket cards + advies + share
  RacketCard.tsx                      # naam, brand, badges, prijs, BEKIJK DEAL CTA
src/lib/racketTest.ts                 # questions[], rackets[], scoring logic, profile copy
```

## Quiz data (`src/lib/racketTest.ts`)
- `questions`: array van 8 vragen, elk met `id`, `title`, `options[{id, emoji?, label, sublabel?, scores: Partial<Record<Profile,number>>}]`
- `Profile = "CONTROL" | "POWER" | "ALLROUND" | "BUDGET"`
- `rackets`: exact de 6 placeholder objecten uit de spec (incl. affiliateUrl placeholders)
- `profileCopy`: titel + 2-regel beschrijving per profiel

### Scoring
```ts
function scoreAnswers(answers: Record<string,string>): Profile[] {
  const totals = { CONTROL:0, POWER:0, ALLROUND:0, BUDGET:0 };
  for (const [qid, optId] of Object.entries(answers)) {
    const opt = questions.find(q=>q.id===qid)?.options.find(o=>o.id===optId);
    for (const [p,v] of Object.entries(opt?.scores ?? {})) totals[p] += v;
  }
  // Budget < €100 forceert BUDGET in top 2
  if (answers.budget === "lt100") totals.BUDGET += 999;
  return Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([p])=>p);
}
```
Top-2 profielen → toon racket cards waarvan `racket.profile` één van die profielen bevat, gelimiteerd tot 4 (gesorteerd op overlap).

## Quiz flow (`RacketTestPage.tsx`)
- State: `step` (0–7), `answers`, `done`
- Render `<Navbar />`, dan ofwel quiz of `<ResultsView />`
- Bij keuze: zet answer → wacht 300ms → `step+1` (of `done=true` bij laatste)
- Back-button (chevron-left) linksboven om naar vorige vraag te gaan
- Progressbar bovenaan: `"Vraag {step+1} van 8"` + lime bar `width: ((step+1)/8)*100%`

## Results page
1. **Header**: "JOUW RACKET PROFIEL:" (lime, klein), profielnaam huge Bebas Neue uppercase, 2-regel beschrijving onder
2. **Grid**: 2×2 op desktop (`md:grid-cols-2`), gestapeld op mobiel. RacketCard:
   - Brand label (muted, klein, uppercase)
   - Racket naam (Bebas Neue, 2xl, uppercase)
   - 2-regel beschrijving
   - Specs als 3 kleine lime/10 badges met lime tekst (gewicht, balans, vorm)
   - "Vanaf €189" prominent
   - Lime full-width CTA "BEKIJK DEAL →" → `affiliateUrl` (target=_blank, rel=noopener)
3. **Advies-box**: lime outlined card met copy + "VRAAG ADVIES →" knop (mailto:advies@smashlab.nl voor nu)
4. **Share-sectie**: "Deel jouw resultaat met je padelvriend →" + WhatsApp knop (`https://wa.me/?text=...`) + "Link kopiëren" (clipboard + toast)
5. "Opnieuw doen" tekstlink onderaan reset state

## Routing
Geen wijziging nodig — `/racket-test` route bestaat al in `App.tsx`.

## Out of scope
- Echte affiliate URLs (placeholders blijven staan)
- Opslaan resultaten in DB / e-mail capture
- Niveau- of stijlspecifieke filtering buiten scoring
