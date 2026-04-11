export default function Hero() {
  return (
    <section className="grain-overlay relative flex min-h-screen items-center overflow-hidden bg-background">
      {/* Radial lime glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" style={{ background: 'radial-gradient(ellipse at 80% 40%, rgba(200,255,0,0.07) 0%, transparent 70%)' }} />

      {/* Decorative court lines */}
      <div className="pointer-events-none absolute right-[5%] top-1/2 hidden -translate-y-1/2 lg:block" style={{ width: 340, height: 460 }}>
        {/* Outer rectangle */}
        <div className="absolute inset-0 rounded border border-lime/[0.06]" />
        {/* Center horizontal */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-lime/[0.06]" />
        {/* Center vertical */}
        <div className="absolute bottom-0 left-1/2 top-0 w-px bg-lime/[0.06]" />
        {/* Diagonal shapes */}
        <div className="absolute right-[10%] top-[15%] h-40 w-28 rotate-12 rounded border border-lime/[0.08]" />
        <div className="absolute bottom-[15%] left-[10%] h-36 w-24 -rotate-6 rounded border border-lime/[0.04]" />
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
            Jouw alles-in-één platform voor padel in Nederland — van vrije banen en gear reviews tot trainingstips die je spel écht naar een hoger niveau tillen.
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
