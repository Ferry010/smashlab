const items = ['SMASHLAB', 'RACKET REVIEWS', 'VRIJE BANEN', 'PADEL TECHNIEK', 'GEAR TESTS', 'PREMIER PADEL', 'TRAININGSTIPS', 'BAAN GIDS', 'NEDERLAND'];

function MarqueeContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-6">
          <span className="font-display text-[15px] uppercase tracking-wider text-muted-2">{item}</span>
          <span className="text-lime">◆</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="flex h-[52px] items-center overflow-hidden border-b border-t border-border bg-bg-2">
      <div className="animate-marquee flex gap-6">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
