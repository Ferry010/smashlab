import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Vrije Banen', href: '#vrije-banen' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Gear & Tips', href: '#categories' },
  { label: 'Mijn Niveau', href: '#niveau' },
  { label: 'Nieuws', href: '#' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border" style={{ background: 'rgba(17,18,16,0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3">
        {/* Logo */}
        <a href="#" className="font-display text-[28px] leading-none tracking-wide select-none">
          <span className="text-lime">SMASH</span>
          <span className="text-foreground">LAB</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 font-body text-sm text-muted lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-lime">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#nieuwsbrief" className="hidden rounded-full bg-lime px-5 py-2 font-body text-sm font-semibold text-primary-foreground transition-colors hover:bg-lime-dim lg:inline-block">
          Nieuwsbrief
        </a>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="text-foreground lg:hidden" aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-[57px] z-40 flex flex-col gap-6 bg-background p-8 lg:hidden">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl text-foreground transition-colors hover:text-lime">
              {l.label}
            </a>
          ))}
          <a href="#nieuwsbrief" onClick={() => setOpen(false)} className="mt-4 inline-block self-start rounded-full bg-lime px-6 py-3 font-body text-sm font-semibold text-primary-foreground">
            Nieuwsbrief
          </a>
        </div>
      )}
    </nav>
  );
}
