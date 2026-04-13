import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { loginSchema, type LoginFormData } from '@/lib/validators';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const email = watch('email', '');

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (signInError) {
      setError('E-mailadres of wachtwoord klopt niet.');
      setLoading(false);
      return;
    }
    navigate('/');
  };

  const handleMagicLink = async () => {
    if (!email) { setError('Vul je e-mailadres in.'); return; }
    const { error: mlError } = await supabase.auth.signInWithOtp({ email });
    if (mlError) { setError(mlError.message); return; }
    setMagicLinkSent(true);
  };

  const handleGoogleLogin = async () => {
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) setError('Google login mislukt.');
    if (result.redirected) return;
    navigate('/');
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen flex items-center justify-center court-lines" style={{ background: '#091830' }}>
        <div className="glass-card max-w-[440px] w-full mx-4 p-8 text-center" style={{ borderRadius: 16, borderTop: '3px solid #C8FF00' }}>
          <h1 className="font-display text-3xl text-foreground mb-2">CHECK JE INBOX</h1>
          <p className="text-muted font-body text-sm">We hebben een inloglink gestuurd naar <strong className="text-foreground">{email}</strong>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center court-lines py-12" style={{ background: '#091830' }}>
      <div className="max-w-[440px] w-full mx-4">
        <div className="text-center mb-6">
          <Link to="/" className="font-display text-[30px] leading-none tracking-wide">
            <span style={{ color: '#C8FF00' }}>SMASH</span>
            <span className="text-foreground">LAB</span>
          </Link>
          <p className="text-muted font-body text-sm mt-2">Log in op je account</p>
        </div>

        <div className="glass-card p-8" style={{ borderRadius: 16, borderTop: '3px solid #C8FF00' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm font-body" style={{ background: 'rgba(255,107,107,0.15)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.3)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-body text-muted mb-1.5">E-mailadres</label>
              <input {...register('email')} type="email" placeholder="jij@email.nl"
                className="w-full px-4 py-2.5 rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                onFocus={e => e.currentTarget.style.borderColor = '#C8FF00'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
              {errors.email && <p className="text-[12px] mt-1 font-body" style={{ color: '#FF6B6B' }}>{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-body text-muted">Wachtwoord</label>
                <Link to="/wachtwoord-vergeten" className="text-[12px] font-body" style={{ color: '#C8FF00' }}>Vergeten?</Link>
              </div>
              <div className="relative">
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Je wachtwoord"
                  className="w-full px-4 py-2.5 rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground outline-none pr-10"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#C8FF00'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-[12px] mt-1 font-body" style={{ color: '#FF6B6B' }}>{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-full py-3 font-body font-bold text-sm" style={{ background: '#C8FF00', color: '#091830' }}>
              {loading ? 'Inloggen...' : 'Inloggen →'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-[12px] text-muted font-body">of</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <button onClick={handleGoogleLogin} className="w-full glass-card rounded-full py-2.5 font-body text-sm text-foreground flex items-center justify-center gap-2 transition-colors hover:bg-white/10 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Doorgaan met Google
          </button>

          <button onClick={handleMagicLink} className="w-full text-center text-[13px] text-muted font-body transition-colors hover:text-foreground">
            Inloggen met magic link
          </button>
        </div>

        <p className="text-center text-sm text-muted font-body mt-6">
          Nog geen account?{' '}
          <Link to="/registreren" style={{ color: '#C8FF00' }}>Registreren →</Link>
        </p>
      </div>
    </div>
  );
}
