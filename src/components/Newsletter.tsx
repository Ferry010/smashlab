import { useState } from 'react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="nieuwsbrief" className="bg-bg-2" style={{ borderTop: '3px solid hsl(var(--red))' }}>
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <h2 className="font-display text-[52px] leading-none text-foreground">
            BLIJF<br /><span className="text-lime">VOOROP.</span>
          </h2>
          <p className="mt-4 max-w-md font-body text-[15px] text-muted">
            Wekelijks: de beste reviews, techniek en baantips. Geen spam.
          </p>
        </div>
        <div className="flex items-center">
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); }}
            className="flex w-full overflow-hidden rounded-full border border-border bg-bg-3 focus-within:border-lime"
          >
            <input
              type="email"
              required
              placeholder="jouw@email.nl"
              className="flex-1 bg-transparent px-5 py-3.5 font-body text-sm text-foreground outline-none placeholder:text-muted-2"
            />
            <button type="submit" className="shrink-0 rounded-full bg-lime px-6 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-colors hover:bg-lime-dim">
              {submitted ? '✓ Aangemeld!' : 'Aanmelden'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
