import { ArrowRight } from "lucide-react";
import type { Racket } from "@/lib/racketTest";

interface Props {
  racket: Racket;
}

const RacketCard = ({ racket }: Props) => (
  <article className="flex flex-col rounded-2xl border border-border-2 bg-bg-2 p-6 transition-colors hover:border-lime/40">
    <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-bg-3">
      <img
        src={racket.image}
        alt={`${racket.brand} ${racket.name}`}
        loading="lazy"
        className="h-full w-full object-contain p-4"
      />
    </div>
    <div className="font-body text-xs uppercase tracking-widest text-muted">
      {racket.brand}
    </div>
    <h3 className="mt-1 font-display text-3xl uppercase leading-tight text-foreground">
      {racket.name}
    </h3>
    <p className="mt-3 font-body text-sm leading-relaxed text-muted">
      {racket.description}
    </p>

    <div className="mt-5 flex flex-wrap gap-2">
      <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-body text-xs uppercase tracking-wide text-lime">
        {racket.weight}
      </span>
      <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-body text-xs uppercase tracking-wide text-lime">
        Balans {racket.balance}
      </span>
      <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-body text-xs uppercase tracking-wide text-lime">
        {racket.vorm}
      </span>
    </div>

    <div className="mt-6 flex items-baseline gap-2">
      <span className="font-body text-sm text-muted">Vanaf</span>
      <span className="font-display text-3xl text-foreground">{racket.price}</span>
    </div>

    <a
      href={racket.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime px-6 py-4 font-display text-lg uppercase tracking-wide text-bg-3 transition-transform hover:scale-[1.02]"
    >
      Bekijk deal <ArrowRight className="h-5 w-5" />
    </a>
  </article>
);

export default RacketCard;
