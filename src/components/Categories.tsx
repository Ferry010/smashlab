const cards = [
  { emoji: '🎾', title: 'RACKETS & GEAR', desc: 'Onafhankelijke reviews en koopgidsen. Wij testen, jij kiest.', soon: 'reviews, vergelijkingen, affiliate deals', featured: true },
  { emoji: '👟', title: 'SCHOENEN', desc: 'Binnenbaan of buitenbaan - de juiste schoen maakt het verschil.', soon: 'koopgidsen, top 10 lijsten' },
  { emoji: '🧠', title: 'TECHNIEK', desc: 'Smash, lob, bandeja, vibora. Stap-voor-stap uitleg van coaches.', soon: 'video tutorials, slag-analyse' },
  { emoji: '🏋️', title: 'TRAINING', desc: 'Drills en programma\'s voor spelers die echt willen groeien.', soon: 'trainingsschema\'s, coaching tips' },
  { emoji: '👕', title: 'KLEDING', desc: 'Head, Babolat, NOX, Adidas. De beste padel outfits getest.', soon: 'stijlgidsen, seizoensoverzicht' },
  { emoji: '📍', title: 'BANEN GIDS', desc: 'De beste padelbanen van Nederland, per stad, per provincie.', soon: 'club reviews, kaartweergave' },
];

export default function Categories() {
  return (
    <section id="categories" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <p className="section-bar font-body text-xs font-semibold uppercase tracking-widest text-lime">ONTDEK</p>
        <h2 className="font-display text-4xl text-foreground lg:text-5xl">ALLES VOOR JOUW SPEL</h2>
        <p className="mt-3 max-w-lg font-body text-[15px] text-muted">
          Van je eerste racket tot winnende tactiek. Smashlab dekt het hele speelveld.
        </p>

        <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`group glass-card rounded-xl p-7 transition-all duration-150 ease-out hover:-translate-y-1 ${c.featured ? 'sm:col-span-2' : ''}`}
              style={{ ['--tw-translate-y' as string]: undefined }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(200,255,0,0.35)';
                el.style.background = 'rgba(255,255,255,0.08)';
                el.style.boxShadow = '0 20px 60px rgba(200,255,0,0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(255,255,255,0.1)';
                el.style.background = 'rgba(255,255,255,0.05)';
                el.style.boxShadow = 'none';
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[10px] text-xl" style={{ background: 'rgba(200,255,0,0.1)' }}>
                {c.emoji}
              </div>
              <h3 className="mt-4 font-display text-2xl text-foreground">{c.title}</h3>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-muted">{c.desc}</p>
              <p className="mt-4 font-body text-[11px] uppercase tracking-wider text-lime">Binnenkort: {c.soon}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
