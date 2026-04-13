import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getBlogBySlug } from '@/lib/blogData';
import { blogContentMap } from '@/pages/BlogArticleContent';
import BlogPostPage from './BlogPostPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogBySlug(slug) : undefined;
  const ContentComponent = slug ? blogContentMap[slug] : undefined;

  useEffect(() => {
    if (article) {
      document.title = article.seoTitle;
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', article.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [article]);

  if (!article || !ContentComponent) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-3">
      <Navbar />
      <BlogPostPage article={article}>
        <ContentComponent />
      </BlogPostPage>
      <Footer />
    </div>
  );
}
