const levels = [
  { num: '01', name: 'BEGINNER', desc: 'Net begonnen of benieuwd? Start hier met de basis van padel.', tags: ['Regels', 'Eerste racket', 'Basis techniek', 'Baan vinden'] },
  { num: '02', name: 'GEVORDERD', desc: 'Je kent de basics en wilt naar het volgende level. Tactiek en gear upgrades.', tags: ['Tactiek', 'Vibora', 'Competitie', 'Racket upgrade'] },
  { num: '03', name: 'COMPETITIEF', desc: 'Je speelt competitie en wilt alles uit je spel halen.', tags: ['Coaching', 'Mentaal spel', 'Training', 'Pro gear'] },
];

export default function Niveau() {
  return (
    <section id="niveau" className="border-b border-t border-border bg-bg-2 py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <p className="section-bar font-body text-xs font-semibold uppercase tracking-widest text-lime">VOOR IEDEREEN</p>
        <div className="reveal mt-8 grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {levels.map((l) => (
            <div key={l.num} className="py-8 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <span className="font-display text-[52px] leading-none text-lime/[0.12]">{l.num}</span>
              <h3 className="mt-2 font-display text-[26px] text-foreground">{l.name}</h3>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-muted">{l.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {l.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border-2 px-3 py-1 font-body text-[11px] text-muted">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
