export default function Hero() {
  return (
    <section className="grain-overlay relative flex min-h-screen items-center overflow-hidden bg-background">
      {/* Radial blue glow */}
      {/* Radial blue glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" style={{ background: 'radial-gradient(ellipse at 80% 40%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
      {/* Subtle red/orange glow (court surround) */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full" style={{ background: 'radial-gradient(ellipse at 30% 100%, rgba(227,73,28,0.04) 0%, transparent 60%)' }} />

      {/* Padel court line art */}
      <div className="pointer-events-none absolute right-[3%] top-1/2 hidden -translate-y-1/2 lg:block" style={{ width: 380, height: 520 }}>
        <svg viewBox="0 0 380 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Outer court walls (glass) */}
          <rect x="20" y="20" width="340" height="480" rx="4" stroke="hsl(217 91% 60% / 0.08)" strokeWidth="1.5" />
          
          {/* Inner court playing area */}
          <rect x="50" y="60" width="280" height="400" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="1" />
          
          {/* Center net line */}
          <line x1="50" y1="260" x2="330" y2="260" stroke="hsl(217 91% 60% / 0.15)" strokeWidth="1.5" strokeDasharray="8 4" />
          
          {/* Service lines */}
          <line x1="50" y1="160" x2="330" y2="160" stroke="hsl(217 91% 60% / 0.07)" strokeWidth="1" />
          <line x1="50" y1="360" x2="330" y2="360" stroke="hsl(217 91% 60% / 0.07)" strokeWidth="1" />
          
          {/* Center service line (vertical) */}
          <line x1="190" y1="60" x2="190" y2="160" stroke="hsl(217 91% 60% / 0.07)" strokeWidth="1" />
          <line x1="190" y1="360" x2="190" y2="460" stroke="hsl(217 91% 60% / 0.07)" strokeWidth="1" />

          {/* Glass wall raster pattern - top */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <line key={`gt-${i}`} x1={62 + i * 40} y1="20" x2={62 + i * 40} y2="55" stroke="hsl(217 91% 60% / 0.04)" strokeWidth="0.5" />
          ))}
          {/* Glass wall raster pattern - bottom */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <line key={`gb-${i}`} x1={62 + i * 40} y1="465" x2={62 + i * 40} y2="500" stroke="hsl(217 91% 60% / 0.04)" strokeWidth="0.5" />
          ))}
          {/* Glass wall raster pattern - left */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
            <line key={`gl-${i}`} x1="20" y1={55 + i * 40} x2="46" y2={55 + i * 40} stroke="hsl(217 91% 60% / 0.04)" strokeWidth="0.5" />
          ))}
          {/* Glass wall raster pattern - right */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
            <line key={`gr-${i}`} x1="334" y1={55 + i * 40} x2="360" y2={55 + i * 40} stroke="hsl(217 91% 60% / 0.04)" strokeWidth="0.5" />
          ))}
          
          {/* Net posts */}
          <circle cx="46" cy="260" r="3" stroke="hsl(217 91% 60% / 0.12)" strokeWidth="1" />
          <circle cx="334" cy="260" r="3" stroke="hsl(217 91% 60% / 0.12)" strokeWidth="1" />

          {/* Corner glass panel accents */}
          <path d="M20 20 L20 80" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="2" />
          <path d="M20 20 L80 20" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="2" />
          <path d="M360 20 L360 80" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="2" />
          <path d="M360 20 L300 20" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="2" />
          <path d="M20 500 L20 440" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="2" />
          <path d="M20 500 L80 500" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="2" />
          <path d="M360 500 L360 440" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="2" />
          <path d="M360 500 L300 500" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-24 lg:py-0">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="stagger-fade mb-5 flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-lime" style={{ animationDelay: '0ms' }}>
            <span className="inline-block h-2 w-2 rounded-full bg-lime" />
            Het ultieme padel platform van Nederland
          </p>

          {/* H1 */}
          <h1 className="stagger-fade font-display leading-[0.92]" style={{ animationDelay: '100ms', fontSize: 'clamp(72px, 11vw, 120px)' }}>
            <span className="block text-foreground">OWN</span>
            <span className="block text-lime">THE COURT.</span>
          </h1>

          {/* Subtitle */}
          <p className="stagger-fade mt-6 max-w-[480px] font-body text-[17px] leading-relaxed text-muted" style={{ animationDelay: '200ms' }}>
            Jouw alles-in-een platform voor padel in Nederland. Van vrije banen en gear reviews tot trainingstips die je spel echt naar een hoger niveau tillen.
          </p>

          {/* CTAs */}
          <div className="stagger-fade mt-8 flex flex-wrap gap-4" style={{ animationDelay: '300ms' }}>
            <a href="#vrije-banen" className="rounded-full bg-lime px-7 py-3 font-body text-sm font-semibold text-primary-foreground transition-colors hover:bg-lime-dim">
              Vind een vrije baan →
            </a>
            <a href="#categories" className="rounded-full border border-foreground/30 px-7 py-3 font-body text-sm font-semibold text-foreground transition-colors hover:border-foreground">
              Ontdek alle content
            </a>
          </div>

          {/* Stats */}
          <div className="stagger-fade mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8" style={{ animationDelay: '400ms', maxWidth: 480 }}>
            {[
              ['876K', 'SPELERS IN NL'],
              ['3.600+', 'BANEN LANDELIJK'],
              ['#1', 'PADEL PLATFORM NL'],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="font-display text-3xl text-foreground lg:text-4xl">{val}</p>
                <p className="mt-1 font-body text-[10px] uppercase tracking-wider text-muted-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
