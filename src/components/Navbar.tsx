import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import UserDropdown from './UserDropdown';

const navLinks = [
  { label: 'Vrije Banen', href: '#vrije-banen' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Gear & Tips', href: '#categories' },
  { label: 'Mijn Niveau', href: '#niveau' },
  { label: 'Nieuws', href: '#' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <nav className="sticky top-0 z-50" style={{ background: 'rgba(9,24,48,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3">
        <Link to="/" className="font-display text-[30px] leading-none tracking-wide select-none">
          <span className="text-lime">SMASH</span>
          <span className="text-foreground">LAB</span>
        </Link>

        <ul className="hidden items-center gap-7 font-body text-sm text-muted lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-foreground">{l.label}</a>
            </li>
          ))}
          {isAdmin && (
            <li>
              <Link to="/admin/blogs" className="transition-colors text-lime hover:text-lime-dim">Admin</Link>
            </li>
          )}
        </ul>

        <div className="hidden lg:block">
          {!loading && (
            user ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/inloggen" className="text-sm font-body text-muted transition-colors hover:text-foreground">
                  Inloggen
                </Link>
                <Link to="/registreren" className="rounded-full bg-lime px-5 py-2 font-body text-sm font-bold text-primary-foreground transition-colors hover:bg-lime-dim">
                  Registreren
                </Link>
              </div>
            )
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="text-foreground lg:hidden" aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[57px] z-40 flex flex-col gap-6 p-8 lg:hidden" style={{ background: '#091830' }}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl text-foreground transition-colors hover:text-lime">
              {l.label}
            </a>
          ))}
          {!loading && (
            user ? (
              <div className="mt-4 flex flex-col gap-3">
                <Link to="/profiel" onClick={() => setOpen(false)} className="font-display text-3xl text-lime">
                  Mijn Profiel
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                <Link to="/inloggen" onClick={() => setOpen(false)} className="font-display text-3xl text-foreground">
                  Inloggen
                </Link>
                <Link to="/registreren" onClick={() => setOpen(false)} className="mt-2 inline-block self-start rounded-full bg-lime px-6 py-3 font-body text-sm font-bold text-primary-foreground">
                  Registreren
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
}
