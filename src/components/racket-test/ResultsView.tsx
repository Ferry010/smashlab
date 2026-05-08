import { useState } from "react";
import { ArrowRight, Copy, Check, MessageCircle, RotateCcw } from "lucide-react";
import RacketCard from "./RacketCard";
import { profileCopy, pickRackets, type Profile } from "@/lib/racketTest";
import { toast } from "@/hooks/use-toast";

interface Props {
  topProfiles: Profile[];
  onRestart: () => void;
}

const ResultsView = ({ topProfiles, onRestart }: Props) => {
  const [copied, setCopied] = useState(false);
  const primary = topProfiles[0];
  const copy = profileCopy[primary];
  const matches = pickRackets(topProfiles);

  const shareUrl = "https://smashlab.nl/racket-test";
  const shareText = `Ik heb mijn ideale padelracket gevonden via Smashlab! Doe de test ook: ${shareUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: "Link gekopieerd", description: "Deel jouw resultaat met je padelvriend." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-24 pt-10">
      <header className="text-center">
        <p className="font-display text-base uppercase tracking-[0.3em] text-lime">
          Jouw racket profiel:
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none text-foreground sm:text-7xl lg:text-8xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-muted sm:text-lg">
          {copy.description}
        </p>
      </header>

      <section className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {matches.map((r) => (
          <RacketCard key={r.id} racket={r} />
        ))}
      </section>

      <section className="mt-12 rounded-2xl border-2 border-lime/40 bg-lime/5 p-6 sm:p-8">
        <p className="font-display text-2xl uppercase leading-tight text-foreground sm:text-3xl">
          💡 Twijfel je nog?
        </p>
        <p className="mt-2 font-body text-base text-muted">
          Stuur ons je antwoorden en we geven persoonlijk advies. Helemaal gratis.
        </p>
        <a
          href="mailto:advies@smashlab.nl?subject=Persoonlijk%20racket%20advies"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-lime bg-transparent px-6 py-3 font-display text-base uppercase tracking-wide text-lime transition-colors hover:bg-lime hover:text-bg-3"
        >
          Vraag advies <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      <section className="mt-10 text-center">
        <p className="font-display text-xl uppercase tracking-wide text-foreground">
          Deel jouw resultaat met je padelvriend
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bg-2 px-6 py-3 font-body text-sm font-semibold text-foreground transition-colors hover:bg-bg-4 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp delen
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bg-2 px-6 py-3 font-body text-sm font-semibold text-foreground transition-colors hover:bg-bg-4 sm:w-auto"
          >
            {copied ? <Check className="h-4 w-4 text-lime" /> : <Copy className="h-4 w-4" />}
            Link kopiëren
          </button>
        </div>
      </section>

      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 font-body text-sm text-muted underline-offset-4 hover:text-lime hover:underline"
        >
          <RotateCcw className="h-4 w-4" /> Test opnieuw doen
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
