export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #091830 0%, #1B3A6B 60%, #0F2548 100%)' }}>
      {/* Court-line grid */}
      <div className="court-lines pointer-events-none absolute inset-0" />
      {/* Lime spotlight glow top-right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.06) 0%, transparent 60%)' }} />
      {/* White spotlight center-right */}
      <div className="pointer-events-none absolute right-[20%] top-[40%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />

      {/* Padel court SVG */}
      <div className="pointer-events-none absolute right-[3%] top-1/2 hidden -translate-y-1/2 lg:block" style={{ width: 420, height: 560 }}>
        <svg viewBox="0 0 420 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Outer court walls */}
          <rect x="20" y="20" width="380" height="520" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          {/* Inner playing area */}
          <rect x="50" y="60" width="320" height="440" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          {/* Center net */}
          <line x1="50" y1="280" x2="370" y2="280" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="8 4" />
          {/* Service lines */}
          <line x1="50" y1="170" x2="370" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="50" y1="390" x2="370" y2="390" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Center service lines */}
          <line x1="210" y1="60" x2="210" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="210" y1="390" x2="210" y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Glass wall rasters */}
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <line key={`gt-${i}`} x1={60+i*38} y1="20" x2={60+i*38} y2="55" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          ))}
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <line key={`gb-${i}`} x1={60+i*38} y1="505" x2={60+i*38} y2="540" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          ))}
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
            <line key={`gl-${i}`} x1="20" y1={55+i*40} x2="46" y2={55+i*40} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          ))}
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
            <line key={`gr-${i}`} x1="374" y1={55+i*40} x2="400" y2={55+i*40} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          ))}
          {/* Net posts */}
          <circle cx="46" cy="280" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="374" cy="280" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Corner accents */}
          <path d="M20 20 L20 80" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path d="M20 20 L80 20" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path d="M400 20 L400 80" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path d="M400 20 L340 20" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path d="M20 540 L20 480" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path d="M20 540 L80 540" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path d="M400 540 L400 480" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path d="M400 540 L340 540" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          {/* Players - lime team */}
          <circle cx="140" cy="200" r="6" fill="#C8FF00" opacity="0.9" />
          <circle cx="280" cy="200" r="6" fill="#C8FF00" opacity="0.9" />
          {/* Opponents - white outline */}
          <circle cx="140" cy="360" r="6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <circle cx="280" cy="360" r="6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          {/* Ball */}
          <circle cx="220" cy="240" r="3" fill="#C8FF00" opacity="0.8" />
        </svg>
        {/* Glow under court */}
        <div className="absolute bottom-0 left-1/2 h-20 w-3/4 -translate-x-1/2" style={{ background: 'radial-gradient(ellipse, rgba(200,255,0,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-24 lg:py-0">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="stagger-fade mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-widest text-lime" style={{ animationDelay: '0ms', background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.2)' }}>
            <span className="pulse-lime inline-block h-2 w-2 rounded-full bg-lime" />
            SMASHLAB.NL
          </p>

          {/* H1 */}
          <h1 className="stagger-fade font-display leading-[0.88]" style={{ animationDelay: '100ms', fontSize: 'clamp(80px, 12vw, 130px)' }}>
            <span className="block text-foreground">THIS.</span>
            <span className="block text-foreground">IS.</span>
            <span className="block text-lime">PADEL.</span>
          </h1>

          {/* Subtitle */}
          <p className="stagger-fade mt-6 max-w-[440px] font-body text-[18px] leading-relaxed text-muted" style={{ animationDelay: '220ms' }}>
            Alles wat je nodig hebt als padelspeler. Op een plek.
          </p>

          {/* CTAs */}
          <div className="stagger-fade mt-8 flex flex-wrap gap-4" style={{ animationDelay: '340ms' }}>
            <a href="#vrije-banen" className="rounded-full bg-lime px-7 py-3.5 font-body text-sm font-bold text-primary-foreground transition-colors hover:bg-lime-dim">
              Vind een vrije baan &rarr;
            </a>
            <a href="#categories" className="rounded-full px-7 py-3.5 font-body text-sm font-semibold text-foreground transition-colors hover:border-foreground" style={{ border: '1.5px solid rgba(255,255,255,0.2)' }}>
              Ontdek alles
            </a>
          </div>

          {/* Stats */}
          <div className="stagger-fade mt-14 flex gap-8" style={{ animationDelay: '460ms', maxWidth: 480 }}>
            {[
              ['876K', 'SPELERS IN NL'],
              ['3.600+', 'BANEN LANDELIJK'],
              ['#1', 'PADEL PLATFORM NL'],
            ].map(([val, label], i) => (
              <div key={label} className="flex gap-8">
                {i > 0 && <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.12)' }} />}
                <div>
                  <p className="font-display text-3xl text-foreground lg:text-4xl">{val}</p>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-wider text-muted-2">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
