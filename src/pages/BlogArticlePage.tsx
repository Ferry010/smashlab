import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getBlogBySlug } from '@/lib/blogData';
import { blogContentMap } from '@/pages/BlogArticleContent';
import BlogPostPage from './BlogPostPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DOMPurify from 'dompurify';

interface DbBlogPost {
  title: string;
  slug: string;
  seo_title: string | null;
  meta_description: string | null;
  content: string | null;
  category: string | null;
  reading_time: string | null;
  author: string | null;
  published_at: string | null;
  level_tags: string[] | null;
  image_url: string | null;
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [dbPost, setDbPost] = useState<DbBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Static fallback
  const staticArticle = slug ? getBlogBySlug(slug) : undefined;
  const StaticContent = slug ? blogContentMap[slug] : undefined;

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    supabase
      .from('blog_posts')
      .select('title, slug, seo_title, meta_description, content, category, reading_time, author, published_at, level_tags, image_url')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
      .then(({ data }) => {
        if (data) setDbPost(data);
        else if (!staticArticle) setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    const title = dbPost?.seo_title || staticArticle?.seoTitle;
    const desc = dbPost?.meta_description || staticArticle?.metaDescription;
    if (title) document.title = title;
    if (desc) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', desc);
    }
    window.scrollTo(0, 0);
  }, [dbPost, staticArticle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-3 flex items-center justify-center">
        <p className="font-body text-muted">Laden...</p>
      </div>
    );
  }

  // DB post found
  if (dbPost) {
    const article = {
      slug: dbPost.slug,
      title: dbPost.title,
      category: dbPost.category || '',
      readingTime: dbPost.reading_time || '',
      author: dbPost.author || 'Smashlab Redactie',
      publishedAt: dbPost.published_at
        ? new Date(dbPost.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
        : '',
      levelTags: dbPost.level_tags || [],
      imageUrl: dbPost.image_url || undefined,
    };

    return (
      <div className="min-h-screen bg-bg-3">
        <Navbar />
        <BlogPostPage article={article} htmlContent={DOMPurify.sanitize(dbPost.content || '')} />
        <Footer />
      </div>
    );
  }

  // Static fallback
  if (staticArticle && StaticContent) {
    return (
      <div className="min-h-screen bg-bg-3">
        <Navbar />
        <BlogPostPage article={{
          slug: staticArticle.slug,
          title: staticArticle.title,
          category: staticArticle.category,
          readingTime: staticArticle.readingTime,
          author: staticArticle.author,
          publishedAt: staticArticle.publishedAt,
          levelTags: staticArticle.levelTags,
        }}>
          <StaticContent />
        </BlogPostPage>
        <Footer />
      </div>
    );
  }

  if (notFound) return <Navigate to="/" replace />;
  return <Navigate to="/" replace />;
}
