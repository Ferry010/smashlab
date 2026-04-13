import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { BlogArticle } from '@/lib/blogData';

interface BlogPostPageProps {
  article: BlogArticle;
  children: React.ReactNode;
}

export default function BlogPostPage({ article, children }: BlogPostPageProps) {
  return (
    <>
      {/* SEO head tags via document.title */}
      <div className="min-h-screen bg-bg-3">
        {/* Header */}
        <header className="court-lines relative bg-bg-2 pb-12 pt-24 lg:pb-16 lg:pt-32">
          <div className="mx-auto max-w-[820px] px-5">
            <Link to="/#blogs" className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted hover:text-lime transition-colors">
              <ArrowLeft className="h-4 w-4" /> Terug naar blogs
            </Link>
            <span className="mb-4 inline-block rounded-full bg-lime px-3 py-1 font-body text-[11px] font-bold uppercase text-primary-foreground">
              {article.category}
            </span>
            <h1 className="font-display text-4xl text-foreground lg:text-5xl xl:text-6xl leading-none">
              {article.title.toUpperCase()}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 font-body text-sm text-muted">
              <span>{article.author}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{article.publishedAt}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{article.readingTime} lezen</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.levelTags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-2.5 py-0.5 font-body text-[11px] text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-[720px] px-5 py-12 lg:py-16">
          <article className="blog-content font-body text-base leading-relaxed text-foreground/90">
            {children}
          </article>

          {/* Back */}
          <div className="mt-16 border-t border-border pt-8">
            <Link to="/#blogs" className="inline-flex items-center gap-2 font-body text-sm text-lime hover:underline">
              <ArrowLeft className="h-4 w-4" /> Alle artikelen
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
