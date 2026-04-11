const cols = [
  { title: 'Platform', links: ['Vrije Banen', 'Blogs & Tips', 'Gear Reviews', 'Mijn Niveau'] },
  { title: 'Onderwerpen', links: ['Rackets', 'Schoenen', 'Techniek', 'Training', 'Kleding'] },
  { title: 'Smashlab', links: ['Over ons', 'Adverteren', 'Affiliate disclaimer', 'Privacy'] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#" className="font-display text-2xl">
            <span className="text-lime">SMASH</span><span className="text-foreground">LAB</span>
          </a>
          <p className="mt-3 font-body text-[13px] leading-relaxed text-muted">
            Het ultieme padel platform van Nederland. Voor elk niveau, elke baan, elk doel.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-muted-2">{c.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="font-body text-sm text-muted transition-colors hover:text-foreground">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-2 px-5 py-5 sm:flex-row">
          <p className="font-body text-xs text-muted-2">© 2026 Smashlab.nl — Alle rechten voorbehouden</p>
          <a href="#" className="font-body text-xs text-muted-2 transition-colors hover:text-muted">Affiliate disclaimer</a>
        </div>
      </div>
    </footer>
  );
}
