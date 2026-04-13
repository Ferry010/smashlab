import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  status: string;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, slug, title, status, category, published_at, created_at')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const toggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    await supabase
      .from('blog_posts')
      .update({
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : null,
      })
      .eq('id', post.id);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    if (!confirm('Weet je zeker dat je dit artikel wilt verwijderen?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">BLOGS</h1>
          <p className="mt-1 font-body text-sm text-muted">{posts.length} artikelen</p>
        </div>
        <Link to="/admin/blogs/nieuw">
          <Button className="gap-2 rounded-full bg-lime text-primary-foreground hover:bg-lime-dim">
            <Plus className="h-4 w-4" /> Nieuw artikel
          </Button>
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl glass-card">
        {loading ? (
          <p className="p-8 text-center font-body text-sm text-muted">Laden...</p>
        ) : posts.length === 0 ? (
          <p className="p-8 text-center font-body text-sm text-muted">Nog geen artikelen</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left font-body font-semibold text-foreground">Titel</th>
                <th className="hidden px-5 py-3 text-left font-body font-semibold text-foreground sm:table-cell">Categorie</th>
                <th className="px-5 py-3 text-left font-body font-semibold text-foreground">Status</th>
                <th className="px-5 py-3 text-right font-body font-semibold text-foreground">Acties</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border/50 last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-body font-medium text-foreground line-clamp-1">{post.title}</p>
                    <p className="font-body text-xs text-muted">/blogs/{post.slug}</p>
                  </td>
                  <td className="hidden px-5 py-3 sm:table-cell">
                    <span className="font-body text-xs text-muted">{post.category || '-'}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold uppercase ${
                      post.status === 'published'
                        ? 'bg-lime/20 text-lime'
                        : 'bg-muted/20 text-muted'
                    }`}>
                      {post.status === 'published' ? 'Live' : 'Concept'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toggleStatus(post)} className="rounded-lg p-2 text-muted hover:text-foreground transition-colors" title={post.status === 'published' ? 'Naar concept' : 'Publiceren'}>
                        {post.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <Link to={`/admin/blogs/${post.id}/bewerken`} className="rounded-lg p-2 text-muted hover:text-foreground transition-colors">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button onClick={() => deletePost(post.id)} className="rounded-lg p-2 text-muted hover:text-red transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
