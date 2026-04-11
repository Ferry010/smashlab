import { Search } from 'lucide-react';

export default function VrijeBanen() {
  return (
    <section id="vrije-banen" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <p className="section-bar font-body text-xs font-semibold uppercase tracking-widest text-lime">TOOL</p>
        <h2 className="font-display text-4xl text-foreground lg:text-5xl">VRIJE BANEN IN DE BUURT</h2>
        <p className="mt-3 max-w-lg font-body text-[15px] text-muted">
          Boek vandaag nog een court. Real-time beschikbaarheid bij clubs bij jou in de buurt.
        </p>

        <div className="reveal mt-10 overflow-hidden rounded-lg border border-border bg-bg-3">
          {/* Lime accent bar */}
          <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, hsl(var(--lime)), transparent)' }} />

          <div className="grid gap-10 p-7 lg:grid-cols-2 lg:p-10">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-lime">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                </span>
                Binnenkort beschikbaar
              </span>

              <h3 className="mt-6 font-display text-[44px] leading-none text-foreground">
                VIND EEN <span className="text-lime">VRIJE</span> BAAN
              </h3>
              <p className="mt-4 font-body text-[14px] leading-relaxed text-muted">
                Zoek op stad of postcode en zie direct welke clubs vandaag of morgen nog beschikbaar zijn. Koppeling met Playtomic en lokale clubs.
              </p>

              {/* Search bar (disabled) */}
              <div className="mt-6 flex overflow-hidden rounded-full border border-border bg-bg-4">
                <div className="flex flex-1 items-center gap-2 px-4">
                  <Search size={16} className="text-muted" />
                  <input disabled placeholder="Zoek op stad of postcode..." className="w-full bg-transparent py-3 font-body text-sm text-muted outline-none placeholder:text-muted-2" />
                </div>
                <button disabled className="rounded-full bg-lime/40 px-5 py-3 font-body text-sm font-semibold text-primary-foreground">
                  Zoek banen
                </button>
              </div>
              <p className="mt-3 font-body text-xs text-muted-2">⚙ Tool in ontwikkeling — meld je aan voor vroege toegang</p>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center justify-center">
              {/* SVG Court */}
              <svg viewBox="0 0 200 280" className="mb-6 w-full max-w-[200px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="198" height="278" rx="4" stroke="hsl(var(--lime))" strokeWidth="1" opacity="0.3" />
                <line x1="1" y1="140" x2="199" y2="140" stroke="hsl(var(--lime))" strokeWidth="1" opacity="0.2" />
                <line x1="100" y1="1" x2="100" y2="279" stroke="hsl(var(--lime))" strokeWidth="1" opacity="0.2" />
                <rect x="30" y="50" width="140" height="80" rx="2" stroke="hsl(var(--lime))" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />
                <rect x="30" y="150" width="140" height="80" rx="2" stroke="hsl(var(--lime))" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />
                {/* Players */}
                <circle cx="60" cy="90" r="6" fill="hsl(var(--lime))" opacity="0.7" />
                <circle cx="140" cy="90" r="6" fill="hsl(var(--lime))" opacity="0.7" />
                <circle cx="60" cy="190" r="6" stroke="hsl(var(--lime))" strokeWidth="1.5" opacity="0.5" />
                <circle cx="140" cy="190" r="6" stroke="hsl(var(--lime))" strokeWidth="1.5" opacity="0.5" />
                {/* Ball */}
                <circle cx="100" cy="140" r="3" fill="hsl(var(--lime))" opacity="0.9" />
              </svg>

              {/* Features */}
              <ul className="w-full space-y-3 font-body text-[13px] text-muted">
                {[
                  'Real-time beschikbaarheid van courts',
                  'Direct boeken via Playtomic koppeling',
                  'Binnen- en buitenbanen filteren',
                  'Reviews en beoordelingen per club',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-lime">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
