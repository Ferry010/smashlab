const cards = [
  { emoji: '🎾', title: 'RACKETS & GEAR', desc: 'Onafhankelijke reviews, vergelijkingen en koopgidsen. Van beginner tot gevorderd.', soon: 'reviews, vergelijkingen, affiliate deals', featured: true },
  { emoji: '👟', title: 'SCHOENEN', desc: 'Binnenbaan, buitenbaan of all-court. De juiste schoen maakt het verschil.', soon: 'koopgidsen, top 10 lijsten' },
  { emoji: '🧠', title: 'TECHNIEK', desc: 'Smash, lob, bandeja, vibora. Leer elke slag met stap-voor-stap uitleg.', soon: 'video tutorials, slag-analyse' },
  { emoji: '🏋️', title: 'TRAINING', desc: 'Drills, fitnessprogramma\'s en coaching voor spelers die willen groeien.', soon: 'trainingsschema\'s, coaching tips' },
  { emoji: '👕', title: 'KLEDING', desc: 'Sportieve padel outfits van de beste merken. Head, Babolat, NOX, Adidas.', soon: 'stijlgidsen, seizoensoverzicht' },
  { emoji: '📍', title: 'BANEN GIDS', desc: 'De beste padelbanen van Nederland, gereviewed door echte spelers.', soon: 'club reviews, kaartweergave' },
];

export default function Categories() {
  return (
    <section id="categories" className="bg-bg-2 py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <p className="section-bar font-body text-xs font-semibold uppercase tracking-widest text-lime">ONTDEK</p>
        <h2 className="font-display text-4xl text-foreground lg:text-5xl">ALLES VOOR JOUW SPEL</h2>
        <p className="mt-3 max-w-lg font-body text-[15px] text-muted">
          Van je eerste racket tot gevorderde techniek. Smashlab dekt het hele speelveld.
        </p>

        <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`group rounded-lg border border-border bg-bg-3 p-7 transition-all duration-150 ease-out hover:-translate-y-[3px] hover:border-lime/30 hover:shadow-[4px_8px_24px_0_rgba(200,255,0,0.04)] ${c.featured ? 'sm:col-span-2' : ''}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg text-xl" style={{ background: 'rgba(200,255,0,0.1)' }}>
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
