import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (resetError) { setError(resetError.message); setLoading(false); return; }
    setSent(true);
    setLoading(false);
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
          {sent ? (
            <div className="text-center">
              <h1 className="font-display text-3xl text-foreground mb-2">CHECK JE INBOX</h1>
              <p className="text-muted font-body text-sm">We hebben een reset link gestuurd naar <strong className="text-foreground">{email}</strong>.</p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl text-foreground mb-2 text-center">WACHTWOORD VERGETEN</h1>
              <p className="text-muted font-body text-sm text-center mb-6">Vul je e-mailadres in en we sturen een reset link.</p>
              {error && (
                <div className="mb-4 p-3 rounded-lg text-sm font-body" style={{ background: 'rgba(255,107,107,0.15)', color: '#FF6B6B' }}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="jij@email.nl"
                  className="w-full px-4 py-2.5 rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                />
                <button type="submit" disabled={loading} className="w-full rounded-full py-3 font-body font-bold text-sm" style={{ background: '#C8FF00', color: '#091830' }}>
                  {loading ? 'Versturen...' : 'Verstuur reset link →'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-muted font-body mt-6">
          <Link to="/inloggen" style={{ color: '#C8FF00' }}>← Terug naar inloggen</Link>
        </p>
      </div>
    </div>
  );
}
