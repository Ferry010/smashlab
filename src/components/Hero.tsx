import { Calendar, Target, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Boek een baan',
    description: 'Vind en reserveer direct een vrije padelbaan bij jou in de buurt.',
    icon: Calendar,
    href: '#vrije-banen',
  },
  {
    title: 'Vind je ideale racket',
    description: 'Doe de test en ontdek welk racket perfect bij jouw speelstijl past.',
    icon: Target,
    href: '/racket-test',
  },
  {
    title: 'Je volgende outfit',
    description: 'Shop de nieuwste padel kleding van topmerken.',
    icon: ShoppingBag,
    href: '/outfit',
  },
];

function HeroCard({ title, description, icon: Icon, href }: typeof cards[number]) {
  const isAnchor = href.startsWith('#');
  const inner = (
    <div className="glass-card group flex h-full flex-col justify-between gap-6 p-8 transition-all duration-300 hover:border-lime/30 hover:shadow-[0_0_24px_rgba(200,255,0,0.06)]">
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10">
          <Icon className="h-6 w-6 text-lime" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-foreground lg:text-3xl">{title}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted lg:text-base">{description}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wider text-lime transition-transform group-hover:translate-x-1">
        Bekijk <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </div>
  );

  if (isAnchor) return <a href={href} className="flex">{inner}</a>;
  return <Link to={href} className="flex">{inner}</Link>;
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #091830 0%, #1B3A6B 60%, #0F2548 100%)' }}>
      <div className="court-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-24">
        {/* Top row: heading left, nothing right */}
        <div className="stagger-fade mb-4" style={{ animationDelay: '0ms' }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-widest text-lime" style={{ background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.2)' }}>
            <span className="pulse-lime inline-block h-2 w-2 rounded-full bg-lime" />
            SMASHLAB.NL
          </p>
          <h1 className="font-display leading-[0.88]" style={{ fontSize: 'clamp(64px, 10vw, 110px)' }}>
            <span className="text-foreground">THIS. IS. </span>
            <span className="text-lime">PADEL.</span>
          </h1>
          <p className="mt-4 max-w-[440px] font-body text-[17px] leading-relaxed text-muted">
            Alles wat je nodig hebt als padelspeler. Op een plek.
          </p>
        </div>

        {/* Cards - full width, equal height */}
        <div className="stagger-fade mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ animationDelay: '200ms' }}>
          {cards.map((card) => (
            <HeroCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
