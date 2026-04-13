import { Link } from 'react-router-dom';

const blogs = [
  {
    cat: 'Beginners',
    title: 'Padel beginnen in Nederland: de complete startersgids 2026',
    desc: 'Nog nooit gespeeld maar wel nieuwsgierig? Dit is de enige gids die je nodig hebt om te beginnen met padel in Nederland.',
    time: '9 min',
    featured: true,
    slug: 'padel-beginnen-nederland-complete-gids',
  },
  {
    cat: 'Techniek',
    title: 'Padelniveau uitgelegd: wat betekent jouw Playtomic score?',
    time: '7 min',
    slug: 'padel-niveau-uitgelegd-playtomic-schaal',
  },
  {
    cat: 'Rackets',
    title: 'Beste padelracket per niveau in 2026: van 1.0 tot 5.0',
    time: '8 min',
    slug: 'beste-padelracket-per-niveau-2026',
  },
];

function BlogCard({ blog, large }: { blog: typeof blogs[0]; large?: boolean }) {
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className={`group flex flex-col overflow-hidden rounded-xl glass-card transition-all duration-150 hover:-translate-y-[2px] ${large ? 'row-span-2' : ''}`}
      style={{ ['--hover-border' as string]: 'rgba(200,255,0,0.25)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,255,0,0.25)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
    >
      {/* Image placeholder with court-line pattern */}
      <div className={`court-lines relative ${large ? 'h-56 lg:h-72' : 'h-40'}`} style={{ background: large ? 'linear-gradient(135deg, #1B3A6B, #091830)' : 'linear-gradient(135deg, #0F2548, #091830)' }}>
        <span className="absolute left-4 top-4 rounded-full bg-lime px-2.5 py-0.5 font-body text-[11px] font-bold uppercase text-primary-foreground">{blog.cat}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-muted">{blog.time}</span>
        </div>
        <h3 className={`mt-3 font-body font-bold text-foreground ${large ? 'text-xl' : 'text-[15px]'} line-clamp-2`}>{blog.title}</h3>
        {blog.desc && <p className="mt-2 line-clamp-2 font-body text-[13px] text-muted">{blog.desc}</p>}
        <span className="mt-auto pt-4 font-body text-sm font-medium text-lime">Lees artikel &rarr;</span>
      </div>
    </Link>
  );
}

export default function Blogs() {
  return (
    <section id="blogs" className="bg-bg-3 py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-bar font-body text-xs font-semibold uppercase tracking-widest text-lime">KENNISBANK</p>
            <h2 className="font-display text-4xl text-foreground lg:text-5xl">LAATSTE BLOGS & TIPS</h2>
          </div>
          <a href="#" className="hidden font-body text-sm font-medium text-lime sm:inline">Alle artikelen &rarr;</a>
        </div>

        <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard blog={blogs[0]} large />
          <BlogCard blog={blogs[1]} />
          <BlogCard blog={blogs[2]} />
        </div>

        {/* Info bar */}
        <div className="reveal mt-6 flex flex-col items-center justify-between gap-4 rounded-xl glass-card px-6 py-4 sm:flex-row">
          <p className="font-body text-sm text-muted">📝 De volledige kennisbank is in ontwikkeling. Dagelijks nieuwe artikelen vanaf lancering.</p>
          <a href="#nieuwsbrief" className="shrink-0 font-body text-sm font-medium text-lime">Meld je aan &rarr;</a>
        </div>
      </div>
    </section>
  );
}
