import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { registerSchema, type RegisterFormData, getPasswordStrength } from '@/lib/validators';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');
  const username = watch('username', '');
  const strength = getPasswordStrength(password);

  const checkUsername = useCallback(async (value: string) => {
    if (!value || value.length < 3) { setUsernameAvailable(null); return; }
    setCheckingUsername(true);
    const { data } = await supabase.from('profiles').select('id').eq('username', value).maybeSingle();
    setUsernameAvailable(!data);
    setCheckingUsername(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => checkUsername(username), 500);
    return () => clearTimeout(timer);
  }, [username, checkUsername]);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError('');
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          username: data.username,
          display_name: data.displayName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Update city if provided
    if (data.city) {
      // City will be updated after profile is created via trigger
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError('Google login mislukt. Probeer opnieuw.');
    }
    if (result.redirected) return;
  };

  const strengthColors = ['#FF6B6B', '#FF9F43', '#F6D55C', '#C8FF00'];
  const strengthLabels = ['Zwak', 'Matig', 'Sterk', 'Zeer sterk'];

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center court-lines" style={{ background: '#091830' }}>
        <div className="glass-card max-w-[440px] w-full mx-4 p-8 text-center" style={{ borderRadius: 16, borderTop: '3px solid #C8FF00' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(200,255,0,0.15)' }}>
            <Check size={32} style={{ color: '#C8FF00' }} />
          </div>
          <h1 className="font-display text-3xl text-foreground mb-2">CHECK JE INBOX</h1>
          <p className="text-muted font-body text-sm">We hebben een verificatielink gestuurd. Klik erop om je account te activeren.</p>
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
          <p className="text-muted font-body text-sm mt-2">Maak je gratis account aan</p>
        </div>

        <div className="glass-card p-8" style={{ borderRadius: 16, borderTop: '3px solid #C8FF00' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm font-body" style={{ background: 'rgba(255,107,107,0.15)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.3)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-body text-muted mb-1.5">Volledige naam</label>
              <input {...register('displayName')} placeholder="Ferry Hoes"
                className="w-full px-4 py-2.5 rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                onFocus={e => e.currentTarget.style.borderColor = '#C8FF00'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
              {errors.displayName && <p className="text-[12px] mt-1 font-body" style={{ color: '#FF6B6B' }}>{errors.displayName.message}</p>}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-body text-muted mb-1.5">Username</label>
              <div className="relative">
                <input {...register('username')} placeholder="@jouwusername"
                  className="w-full px-4 py-2.5 rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground outline-none pr-10"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#C8FF00'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                {!checkingUsername && usernameAvailable !== null && username.length >= 3 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {usernameAvailable ? <Check size={16} style={{ color: '#C8FF00' }} /> : <X size={16} style={{ color: '#FF6B6B' }} />}
                  </span>
                )}
              </div>
              {errors.username && <p className="text-[12px] mt-1 font-body" style={{ color: '#FF6B6B' }}>{errors.username.message}</p>}
              {!errors.username && usernameAvailable === false && <p className="text-[12px] mt-1 font-body" style={{ color: '#FF6B6B' }}>Username is al bezet</p>}
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-sm font-body text-muted mb-1.5">Wachtwoord</label>
              <div className="relative">
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Minimaal 8 tekens"
                  className="w-full px-4 py-2.5 rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground outline-none pr-10"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#C8FF00'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className="flex gap-1 mt-2">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i < strength ? strengthColors[strength - 1] : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
              )}
              {password && <p className="text-[11px] mt-1 font-body" style={{ color: strengthColors[strength - 1] || '#FF6B6B' }}>{strengthLabels[strength - 1] || ''}</p>}
              {errors.password && <p className="text-[12px] mt-1 font-body" style={{ color: '#FF6B6B' }}>{errors.password.message}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-body text-muted mb-1.5">Stad <span style={{ color: 'rgba(244,246,240,0.28)' }}>(optioneel)</span></label>
              <input {...register('city')} placeholder="Rotterdam"
                className="w-full px-4 py-2.5 rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                onFocus={e => e.currentTarget.style.borderColor = '#C8FF00'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-full py-3 font-body font-bold text-sm transition-colors" style={{ background: '#C8FF00', color: '#091830' }}>
              {loading ? 'Account aanmaken...' : 'Account aanmaken →'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-[12px] text-muted font-body">of</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <button onClick={handleGoogleLogin} className="w-full glass-card rounded-full py-2.5 font-body text-sm text-foreground flex items-center justify-center gap-2 transition-colors hover:bg-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Doorgaan met Google
          </button>
        </div>

        <p className="text-center text-sm text-muted font-body mt-6">
          Al een account?{' '}
          <Link to="/inloggen" style={{ color: '#C8FF00' }}>Inloggen →</Link>
        </p>
      </div>
    </div>
  );
}
