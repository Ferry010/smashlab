import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { checkAndAwardBadge } from '@/lib/badges';
import { RARITY_COLORS } from '@/lib/badges';

export default function OnboardingModal() {
  const { user, profile, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState('');
  const [welcomeBadge, setWelcomeBadge] = useState<any>(null);

  useEffect(() => {
    if (profile && profile.login_count <= 1 && !profile.onboarding_completed) {
      setShow(true);
    }
  }, [profile]);

  if (!show || !user) return null;

  const handleStart = async () => {
    // Award welcome badge
    const earned = await checkAndAwardBadge(user.id, 'account_created');
    const wb = earned.find(b => b.slug === 'welcome') || { icon: '🎾', name: 'Welkom aan Boord', description: 'Je eerste stap op Smashlab.', points: 10, rarity: 'common' };
    setWelcomeBadge(wb);
    setStep(2);
  };

  const handleSkip = async () => {
    await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', user.id);
    await refreshProfile();
    setShow(false);
  };

  const handleLevelSave = async () => {
    const updates: any = { onboarding_completed: true };
    if (level) updates.level = level;
    await supabase.from('profiles').update(updates).eq('id', user.id);

    // Check profile completion badge
    await checkAndAwardBadge(user.id, 'profile_completed');
    await refreshProfile();
  };

  const handleFinish = async () => {
    await handleLevelSave();
    setShow(false);
  };

  const progressDots = [1, 2, 3, 4];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(9,24,48,0.95)' }}>
      {/* Progress */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {progressDots.map((d, i) => (
          <div key={d} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full transition-all"
              style={{
                background: d < step ? '#F4F6F0' : d === step ? '#C8FF00' : 'transparent',
                border: d <= step ? 'none' : '1.5px solid rgba(244,246,240,0.28)',
              }}
            />
            {i < 3 && <div className="w-8 h-px ml-2" style={{ background: d < step ? '#F4F6F0' : 'rgba(244,246,240,0.12)' }} />}
          </div>
        ))}
      </div>

      <div className="glass-card max-w-lg w-full mx-4 p-8 text-center" style={{ borderRadius: 16 }}>
        {/* STEP 1: Welcome */}
        {step === 1 && (
          <div className="stagger-fade">
            <span className="text-[80px] block mb-4">🎾</span>
            <h1 className="font-display text-[52px] leading-none text-foreground mb-4">WELKOM BIJ SMASHLAB</h1>
            <p className="text-muted font-body text-base mb-6 max-w-sm mx-auto leading-relaxed">
              Het go-to padel platform van Nederland. Jouw profiel, jouw voortgang, jouw community.
            </p>
            <div className="flex justify-center gap-3 mb-8">
              {['🏆 Badge systeem', '📍 Vrije banen vinden', '📈 Voortgang bijhouden'].map(pill => (
                <span key={pill} className="glass-card px-3 py-1.5 text-[12px] font-body text-foreground">
                  {pill}
                </span>
              ))}
            </div>
            <button onClick={handleStart} className="w-full rounded-full bg-lime py-3.5 font-body font-bold text-sm mb-3" style={{ color: '#091830' }}>
              Laten we beginnen →
            </button>
            <button onClick={handleSkip} className="text-[12px] font-body" style={{ color: 'rgba(244,246,240,0.28)' }}>
              Overslaan, direct naar mijn profiel
            </button>
          </div>
        )}

        {/* STEP 2: First Badge */}
        {step === 2 && welcomeBadge && (
          <div className="stagger-fade">
            <p className="text-[11px] uppercase tracking-wider font-bold mb-6" style={{ color: '#C8FF00' }}>
              Je hebt zojuist verdiend
            </p>
            <div className="glass-card p-6 mb-6 inline-block" style={{
              borderColor: RARITY_COLORS[welcomeBadge.rarity],
              boxShadow: `0 0 40px ${RARITY_COLORS[welcomeBadge.rarity]}20`,
            }}>
              <span className="text-[64px] block mb-2" style={{ animation: 'badgeBounce 0.6s ease' }}>
                {welcomeBadge.icon}
              </span>
              <p className="font-bold text-lg text-foreground font-body">{welcomeBadge.name}</p>
              <p className="text-[12px] text-muted font-body mb-2">{welcomeBadge.description}</p>
              <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: RARITY_COLORS[welcomeBadge.rarity] }}>
                COMMON
              </span>
              <p className="text-lime font-display text-2xl mt-2">+{welcomeBadge.points}</p>
            </div>

            <h2 className="font-display text-[36px] text-foreground mb-2">HET BADGE SYSTEEM</h2>
            <p className="text-[14px] text-muted font-body mb-6 max-w-sm mx-auto leading-relaxed">
              Elke actie op Smashlab levert je punten en badges op. Hoe meer je doet, hoe verder je klimt.
            </p>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { icon: '?', name: 'Vaste Gast' },
                { icon: '?', name: 'In de Groove' },
                { icon: '?', name: 'Kennishonger' },
                { icon: '?', name: 'Gear Hunter' },
              ].map(b => (
                <div key={b.name} className="glass-card p-3 opacity-50">
                  <span className="text-2xl block mb-1 grayscale">❓</span>
                  <p className="text-[10px] text-muted font-body">{b.name}</p>
                </div>
              ))}
            </div>

            <button onClick={() => setStep(3)} className="w-full rounded-full bg-lime py-3.5 font-body font-bold text-sm" style={{ color: '#091830' }}>
              Gaaf! Wat nu? →
            </button>
          </div>
        )}

        {/* STEP 3: Profile Setup */}
        {step === 3 && (
          <div className="stagger-fade">
            <p className="text-[11px] uppercase tracking-wider font-bold mb-2" style={{ color: '#C8FF00' }}>
              Jouw Smashlab profiel
            </p>
            <h2 className="font-display text-[32px] text-foreground mb-2">HOE GOED BEN JE?</h2>
            <p className="text-[14px] text-muted font-body mb-6">Dit helpt ons de juiste content voor jou te tonen.</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { key: 'beginner', label: 'BEGINNER', desc: 'Ik speel minder dan een jaar. Nog aan het leren.' },
                { key: 'gevorderd', label: 'GEVORDERD', desc: 'Ik speel meer dan een jaar. Ik ken de basis.' },
                { key: 'competitief', label: 'COMPETITIEF', desc: 'Ik doe mee aan competities. Serieus speler.' },
              ].map(l => (
                <button
                  key={l.key}
                  onClick={() => setLevel(l.key)}
                  className="glass-card p-4 text-left transition-all"
                  style={{
                    borderColor: level === l.key ? '#C8FF00' : 'rgba(255,255,255,0.1)',
                    background: level === l.key ? 'rgba(200,255,0,0.08)' : 'rgba(255,255,255,0.05)',
                  }}
                >
                  <p className="font-display text-lg text-foreground mb-1">{l.label}</p>
                  <p className="text-[11px] text-muted font-body leading-snug">{l.desc}</p>
                </button>
              ))}
            </div>

            <button onClick={() => setStep(4)} className="w-full rounded-full bg-lime py-3.5 font-body font-bold text-sm mb-3" style={{ color: '#091830' }}>
              Opslaan en verder →
            </button>
            <button onClick={() => setStep(4)} className="text-[12px] font-body text-muted">
              Later instellen
            </button>
          </div>
        )}

        {/* STEP 4: Done */}
        {step === 4 && (
          <div className="stagger-fade">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ border: '3px solid #C8FF00' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-display text-[48px] leading-none text-foreground mb-2">JE BENT KLAAR.</h1>
            <p className="text-[14px] text-muted font-body mb-6">Jouw Smashlab account is actief. Hier is wat je als eerste kunt doen:</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: '🔍', title: 'VIND EEN BAAN', desc: 'Boek vandaag nog een vrije baan bij jou in de buurt.', link: '/#vrije-banen' },
                { icon: '📖', title: 'LEES BLOGS', desc: 'Techniek, gear en tips van echte coaches.', link: '/#blogs' },
                { icon: '🏆', title: 'BEKIJK BADGES', desc: 'Ontdek alle badges die je kunt verdienen.', link: '/profiel' },
              ].map(card => (
                <div key={card.title} className="glass-card p-4 text-left">
                  <span className="text-2xl block mb-2">{card.icon}</span>
                  <p className="font-display text-sm text-foreground mb-1">{card.title}</p>
                  <p className="text-[11px] text-muted font-body leading-snug">{card.desc}</p>
                </div>
              ))}
            </div>

            <button onClick={handleFinish} className="w-full rounded-full bg-lime py-3.5 font-body font-bold text-sm" style={{ color: '#091830' }}>
              Naar mijn profiel →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
