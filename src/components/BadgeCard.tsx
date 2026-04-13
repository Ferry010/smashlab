import { RARITY_COLORS, RARITY_LABELS } from '@/lib/badges';

interface BadgeCardProps {
  icon: string;
  name: string;
  description: string;
  rarity: string;
  points: number;
  locked?: boolean;
  earnedAt?: string;
  howToEarn?: string;
}

export default function BadgeCard({
  icon, name, description, rarity, points, locked, earnedAt, howToEarn
}: BadgeCardProps) {
  return (
    <div className="group relative p-5 rounded-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: locked ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${locked ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)'}`,
      }}
    >
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10 bg-black/30">
          <span className="text-2xl">🔒</span>
        </div>
      )}

      <div className={locked ? 'opacity-50 grayscale' : ''}>
        <span className="text-[48px] block mb-3">{icon}</span>
        <p className="font-bold text-sm text-foreground font-body mb-1">{name}</p>
        <p className="text-[12px] text-muted mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
            style={{
              color: RARITY_COLORS[rarity],
              border: `1px solid ${RARITY_COLORS[rarity]}40`,
            }}
          >
            {RARITY_LABELS[rarity]}
          </span>
          <span className="text-lime font-display text-sm">{points}pt</span>
        </div>
        {earnedAt && (
          <p className="text-[11px] mt-2" style={{ color: 'rgba(244,246,240,0.28)' }}>
            Verdiend {new Date(earnedAt).toLocaleDateString('nl-NL')}
          </p>
        )}
      </div>

      {locked && howToEarn && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-[11px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
          style={{ background: 'rgba(9,24,48,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {howToEarn}
        </div>
      )}
    </div>
  );
}
