import { useState } from 'react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="nieuwsbrief" className="relative bg-background court-lines" style={{ borderTop: '3px solid #C8FF00' }}>
      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-10 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <h2 className="font-display leading-none text-foreground" style={{ fontSize: 'clamp(44px, 6vw, 64px)' }}>
            BLIJF<br /><span className="text-lime">VOOROP.</span>
          </h2>
          <p className="mt-4 max-w-md font-body text-[15px] text-muted">
            Wekelijks: de beste reviews, techniek en baantips. Geen spam.
          </p>
        </div>
        <div className="flex items-center">
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); }}
            className="flex w-full overflow-hidden rounded-full focus-within:border-lime"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <input
              type="email"
              required
              placeholder="jouw@email.nl"
              className="flex-1 bg-transparent px-5 py-3.5 font-body text-sm text-foreground outline-none placeholder:text-muted-2"
            />
            <button type="submit" className="shrink-0 rounded-full bg-lime px-6 py-3.5 font-body text-sm font-bold text-primary-foreground transition-colors hover:bg-lime-dim">
              {submitted ? '✓ Aangemeld!' : 'Aanmelden'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
