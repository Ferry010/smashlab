import { Link, useLocation, Navigate } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Blogs', href: '/admin/blogs', icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { loading: authLoading } = useAuth();
  const location = useLocation();

  if (authLoading || adminLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-3">
        <p className="font-body text-muted">Laden...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-bg-3">
      {/* Sidebar */}
      <aside className="hidden w-56 flex-col border-r border-border bg-bg-2 lg:flex">
        <div className="p-5">
          <Link to="/" className="font-display text-xl">
            <span className="text-lime">SMASH</span>
            <span className="text-foreground">LAB</span>
          </Link>
          <p className="mt-1 font-body text-xs text-muted">Admin</p>
        </div>
        <nav className="flex-1 px-3">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2 font-body text-sm transition-colors ${
                  active ? 'bg-lime/10 text-lime' : 'text-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 font-body text-xs text-muted hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Terug naar site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-5 py-8">{children}</div>
      </main>
    </div>
  );
}
