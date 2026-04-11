const blogs = [
  {
    cat: 'Rackets',
    title: 'Beste padelracket voor beginners in 2026 — onze eerlijke top 5',
    desc: 'Net begonnen met padel en overweldigd door het aanbod? Wij testten 18 rackets en kozen de 5 beste voor startende spelers.',
    time: '8 min',
    featured: true,
  },
  {
    cat: 'Techniek',
    title: 'Hoe sla je een perfecte smash? Stap-voor-stap',
    time: '5 min',
  },
  {
    cat: 'Schoenen',
    title: 'Binnenbaan vs. buitenbaan schoenen — wat is het verschil?',
    time: '4 min',
  },
];

function BlogCard({ blog, large }: { blog: typeof blogs[0]; large?: boolean }) {
  return (
    <div className={`group flex flex-col overflow-hidden rounded-lg border border-border bg-bg-3 transition-all duration-150 hover:-translate-y-[2px] hover:border-lime/25 ${large ? 'row-span-2' : ''}`}>
      {/* Image placeholder */}
      <div className={`${large ? 'h-56 lg:h-72' : 'h-40'}`} style={{ background: large ? 'linear-gradient(135deg, hsl(var(--bg-4)), hsl(var(--bg-2)))' : 'linear-gradient(135deg, hsl(var(--bg-3)), hsl(var(--bg)))' }} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-lime px-2.5 py-0.5 font-body text-[11px] font-semibold uppercase text-primary-foreground">{blog.cat}</span>
          <span className="font-body text-xs text-muted">{blog.time}</span>
        </div>
        <h3 className={`mt-3 font-body font-bold text-foreground ${large ? 'text-xl' : 'text-[15px]'} line-clamp-2`}>{blog.title}</h3>
        {blog.desc && <p className="mt-2 line-clamp-2 font-body text-[13px] text-muted">{blog.desc}</p>}
        <a href="#" className="mt-auto pt-4 font-body text-sm font-medium text-lime">Lees artikel →</a>
      </div>
    </div>
  );
}

export default function Blogs() {
  return (
    <section id="blogs" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-bar font-body text-xs font-semibold uppercase tracking-widest text-lime">KENNISBANK</p>
            <h2 className="font-display text-4xl text-foreground lg:text-5xl">LAATSTE BLOGS & TIPS</h2>
          </div>
          <a href="#" className="hidden font-body text-sm font-medium text-lime sm:inline">Alle artikelen →</a>
        </div>

        <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard blog={blogs[0]} large />
          <BlogCard blog={blogs[1]} />
          <BlogCard blog={blogs[2]} />
        </div>

        {/* Info bar */}
        <div className="reveal mt-6 flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-bg-3 px-6 py-4 sm:flex-row">
          <p className="font-body text-sm text-muted">📝 De volledige kennisbank is in ontwikkeling. Dagelijks nieuwe artikelen vanaf lancering.</p>
          <a href="#nieuwsbrief" className="shrink-0 font-body text-sm font-medium text-lime">Meld je aan →</a>
        </div>
      </div>
    </section>
  );
}
