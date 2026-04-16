import { Calendar, Target, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Boek een baan',
    description: 'Vind en reserveer direct een vrije padelbaan bij jou in de buurt.',
    icon: Calendar,
    href: '#vrije-banen',
    isExternal: false,
  },
  {
    title: 'Vind je ideale racket',
    description: 'Doe de test en ontdek welk racket perfect bij jouw speelstijl past.',
    icon: Target,
    href: '/racket-test',
    isExternal: false,
  },
  {
    title: 'Je volgende outfit',
    description: 'Shop de nieuwste padel kleding van topmerken.',
    icon: ShoppingBag,
    href: '/outfit',
    isExternal: false,
  },
];

function HeroCard({ title, description, icon: Icon, href }: typeof cards[number]) {
  const isAnchor = href.startsWith('#');
  const inner = (
    <div className="glass-card group flex flex-col gap-4 p-6 transition-all duration-300 hover:border-lime/30 hover:shadow-[0_0_24px_rgba(200,255,0,0.06)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-lime/10">
        <Icon className="h-5 w-5 text-lime" />
      </div>
      <div>
        <h3 className="font-display text-xl text-foreground">{title}</h3>
        <p className="mt-1 font-body text-sm leading-relaxed text-muted">{description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wider text-lime transition-transform group-hover:translate-x-1">
        Bekijk <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </div>
  );

  if (isAnchor) {
    return <a href={href}>{inner}</a>;
  }
  return <Link to={href}>{inner}</Link>;
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #091830 0%, #1B3A6B 60%, #0F2548 100%)' }}>
      <div className="court-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-24">
        <div className="max-w-3xl">
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
        </div>

        {/* Action cards */}
        <div className="stagger-fade mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ animationDelay: '340ms', maxWidth: 860 }}>
          {cards.map((card) => (
            <HeroCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
