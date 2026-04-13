import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import blogBeginnen from '@/assets/blog-beginnen.svg';
import blogNiveau from '@/assets/blog-niveau.svg';
import blogRacket from '@/assets/blog-racket.svg';

const staticImages: Record<string, string> = {
  'padel-beginnen-nederland-complete-gids': blogBeginnen,
  'padel-niveau-uitgelegd-playtomic-schaal': blogNiveau,
  'beste-padelracket-per-niveau-2026': blogRacket,
};

interface BlogCard {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  reading_time: string | null;
  image_url: string | null;
}

const staticBlogs: BlogCard[] = [
  { slug: 'padel-beginnen-nederland-complete-gids', title: 'Padel beginnen in Nederland: de complete startersgids 2026', excerpt: 'Nog nooit gespeeld maar wel nieuwsgierig? Dit is de enige gids die je nodig hebt om te beginnen met padel in Nederland.', category: 'Beginners', reading_time: '9 min', image_url: null },
  { slug: 'padel-niveau-uitgelegd-playtomic-schaal', title: 'Padelniveau uitgelegd: wat betekent jouw Playtomic score?', excerpt: null, category: 'Techniek', reading_time: '7 min', image_url: null },
  { slug: 'beste-padelracket-per-niveau-2026', title: 'Beste padelracket per niveau in 2026: van 1.0 tot 5.0', excerpt: null, category: 'Rackets', reading_time: '8 min', image_url: null },
];

function BlogCardComponent({ blog, large }: { blog: BlogCard; large?: boolean }) {
  const image = blog.image_url || staticImages[blog.slug];
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className={`group flex flex-col overflow-hidden rounded-xl glass-card transition-all duration-150 hover:-translate-y-[2px] ${large ? 'row-span-2' : ''}`}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,255,0,0.25)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
    >
      {image && (
        <div className={`relative overflow-hidden ${large ? 'h-56 lg:h-72' : 'h-40'}`}>
          <img src={image} alt={blog.title} className="h-full w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-lime px-2.5 py-0.5 font-body text-[11px] font-bold uppercase text-primary-foreground">{blog.category}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-muted">{blog.reading_time}</span>
        </div>
        <h3 className={`mt-3 font-body font-bold text-foreground ${large ? 'text-xl' : 'text-[15px]'} line-clamp-2`}>{blog.title}</h3>
        {blog.excerpt && <p className="mt-2 line-clamp-2 font-body text-[13px] text-muted">{blog.excerpt}</p>}
        <span className="mt-auto pt-4 font-body text-sm font-medium text-lime">Lees artikel &rarr;</span>
      </div>
    </Link>
  );
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogCard[]>(staticBlogs);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('slug, title, excerpt, category, reading_time, image_url')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data && data.length > 0) setBlogs(data);
      });
  }, []);

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
          {blogs[0] && <BlogCardComponent blog={blogs[0]} large />}
          {blogs[1] && <BlogCardComponent blog={blogs[1]} />}
          {blogs[2] && <BlogCardComponent blog={blogs[2]} />}
        </div>

        <div className="reveal mt-6 flex flex-col items-center justify-between gap-4 rounded-xl glass-card px-6 py-4 sm:flex-row">
          <p className="font-body text-sm text-muted">📝 De volledige kennisbank is in ontwikkeling. Dagelijks nieuwe artikelen vanaf lancering.</p>
          <a href="#nieuwsbrief" className="shrink-0 font-body text-sm font-medium text-lime">Meld je aan &rarr;</a>
        </div>
      </div>
    </section>
  );
}
