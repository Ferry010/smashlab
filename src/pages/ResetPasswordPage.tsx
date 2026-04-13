import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Handle the recovery token from URL hash
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      // Supabase will auto-handle the session from the hash
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError('Minimaal 8 tekens'); return; }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) { setError(updateError.message); setLoading(false); return; }
    setSuccess(true);
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center court-lines" style={{ background: '#091830' }}>
      <div className="max-w-[440px] w-full mx-4">
        <div className="text-center mb-6">
          <Link to="/" className="font-display text-[30px] leading-none tracking-wide">
            <span style={{ color: '#C8FF00' }}>SMASH</span>
            <span className="text-foreground">LAB</span>
          </Link>
        </div>

        <div className="glass-card p-8" style={{ borderRadius: 16, borderTop: '3px solid #C8FF00' }}>
          {success ? (
            <div className="text-center">
              <h1 className="font-display text-3xl text-foreground mb-2">WACHTWOORD GEWIJZIGD</h1>
              <p className="text-muted font-body text-sm">Je wordt doorgestuurd...</p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl text-foreground mb-2 text-center">NIEUW WACHTWOORD</h1>
              <p className="text-muted font-body text-sm text-center mb-6">Kies een nieuw wachtwoord voor je account.</p>
              {error && (
                <div className="mb-4 p-3 rounded-lg text-sm font-body" style={{ background: 'rgba(255,107,107,0.15)', color: '#FF6B6B' }}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Nieuw wachtwoord"
                    className="w-full px-4 py-2.5 rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground outline-none pr-10"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-full py-3 font-body font-bold text-sm" style={{ background: '#C8FF00', color: '#091830' }}>
                  {loading ? 'Opslaan...' : 'Wachtwoord opslaan →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
