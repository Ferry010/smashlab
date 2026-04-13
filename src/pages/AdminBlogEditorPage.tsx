import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogEditorComponent from '@/components/admin/BlogEditor';
import SeoFields from '@/components/admin/SeoFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Send, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const defaultPost = {
  title: '',
  slug: '',
  seo_title: '',
  meta_description: '',
  excerpt: '',
  content: '',
  category: '',
  reading_time: '',
  author: 'Smashlab Redactie',
  status: 'draft' as string,
  focus_keyword: '',
  secondary_keywords: '',
  og_title: '',
  og_description: '',
  canonical: '',
  level_tags: '',
  image_url: '',
};

export default function AdminBlogEditorPage() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [post, setPost] = useState(defaultPost);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isNew && id) {
      supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            setPost({
              title: data.title || '',
              slug: data.slug || '',
              seo_title: data.seo_title || '',
              meta_description: data.meta_description || '',
              excerpt: data.excerpt || '',
              content: data.content || '',
              category: data.category || '',
              reading_time: data.reading_time || '',
              author: data.author || 'Smashlab Redactie',
              status: data.status || 'draft',
              focus_keyword: data.focus_keyword || '',
              secondary_keywords: (data.secondary_keywords || []).join(', '),
              og_title: data.og_title || '',
              og_description: data.og_description || '',
              canonical: data.canonical || '',
              level_tags: (data.level_tags || []).join(', '),
              image_url: data.image_url || '',
            });
          }
        });
    }
  }, [id, isNew]);

  const updateField = (field: string, value: string) => {
    setPost((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && isNew) {
        updated.slug = slugify(value);
        if (!prev.seo_title) updated.seo_title = value;
      }
      return updated;
    });
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return post.image_url || null;
    const ext = imageFile.name.split('.').pop();
    const path = `${post.slug || 'temp'}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('blog-images').upload(path, imageFile);
    if (error) {
      toast({ title: 'Upload mislukt', description: error.message, variant: 'destructive' });
      return post.image_url || null;
    }
    const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const save = async (publish = false) => {
    if (!post.title || !post.slug) {
      toast({ title: 'Titel en slug zijn verplicht', variant: 'destructive' });
      return;
    }
    setSaving(true);

    const imageUrl = await uploadImage();
    const status = publish ? 'published' : post.status;

    const payload = {
      title: post.title,
      slug: post.slug,
      seo_title: post.seo_title || null,
      meta_description: post.meta_description || null,
      excerpt: post.excerpt || null,
      content: post.content || null,
      category: post.category || null,
      reading_time: post.reading_time || null,
      author: post.author || 'Smashlab Redactie',
      status,
      published_at: status === 'published' ? (post.status === 'published' ? undefined : new Date().toISOString()) : null,
      focus_keyword: post.focus_keyword || null,
      secondary_keywords: post.secondary_keywords ? post.secondary_keywords.split(',').map((s) => s.trim()).filter(Boolean) : null,
      og_title: post.og_title || null,
      og_description: post.og_description || null,
      canonical: post.canonical || null,
      level_tags: post.level_tags ? post.level_tags.split(',').map((s) => s.trim()).filter(Boolean) : null,
      image_url: imageUrl,
      author_id: user?.id || null,
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from('blog_posts').insert(payload));
    } else {
      ({ error } = await supabase.from('blog_posts').update(payload).eq('id', id));
    }

    setSaving(false);
    if (error) {
      toast({ title: 'Opslaan mislukt', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: publish ? 'Gepubliceerd!' : 'Opgeslagen' });
      navigate('/admin/blogs');
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-foreground">
          {isNew ? 'NIEUW ARTIKEL' : 'ARTIKEL BEWERKEN'}
        </h1>
        <div className="flex items-center gap-2">
          {post.slug && (
            <a href={`/blogs/${post.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted hover:text-foreground transition-colors">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <Button onClick={() => save(false)} disabled={saving} variant="outline" className="gap-2 border-border text-foreground">
            <Save className="h-4 w-4" /> Opslaan
          </Button>
          <Button onClick={() => save(true)} disabled={saving} className="gap-2 rounded-full bg-lime text-primary-foreground hover:bg-lime-dim">
            <Send className="h-4 w-4" /> Publiceren
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="mt-6">
        <TabsList className="bg-bg-2 border border-border">
          <TabsTrigger value="content" className="font-body data-[state=active]:bg-bg-4 data-[state=active]:text-foreground">Content</TabsTrigger>
          <TabsTrigger value="seo" className="font-body data-[state=active]:bg-bg-4 data-[state=active]:text-foreground">SEO</TabsTrigger>
          <TabsTrigger value="media" className="font-body data-[state=active]:bg-bg-4 data-[state=active]:text-foreground">Media</TabsTrigger>
          <TabsTrigger value="settings" className="font-body data-[state=active]:bg-bg-4 data-[state=active]:text-foreground">Instellingen</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6 space-y-5">
          <div>
            <Label className="font-body text-foreground">Titel</Label>
            <Input value={post.title} onChange={(e) => updateField('title', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground font-body text-lg" placeholder="Artikel titel" />
          </div>
          <div>
            <Label className="font-body text-foreground">Excerpt</Label>
            <Textarea value={post.excerpt} onChange={(e) => updateField('excerpt', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" rows={2} placeholder="Korte samenvatting" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="font-body text-foreground">Categorie</Label>
              <Input value={post.category} onChange={(e) => updateField('category', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="Beginners" />
            </div>
            <div>
              <Label className="font-body text-foreground">Leestijd</Label>
              <Input value={post.reading_time} onChange={(e) => updateField('reading_time', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="7 min" />
            </div>
            <div>
              <Label className="font-body text-foreground">Level Tags</Label>
              <Input value={post.level_tags} onChange={(e) => updateField('level_tags', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="beginner, gevorderd" />
            </div>
          </div>
          <div>
            <Label className="font-body text-foreground">Content</Label>
            <div className="mt-1">
              <BlogEditorComponent content={post.content} onChange={(html) => updateField('content', html)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <SeoFields
            values={{
              slug: post.slug,
              seo_title: post.seo_title,
              meta_description: post.meta_description,
              focus_keyword: post.focus_keyword,
              secondary_keywords: post.secondary_keywords,
              og_title: post.og_title,
              og_description: post.og_description,
              canonical: post.canonical,
            }}
            onChange={updateField}
          />
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div>
            <Label className="font-body text-foreground">Header afbeelding</Label>
            {post.image_url && (
              <div className="mt-2 mb-4">
                <img src={post.image_url} alt="Header" className="max-h-48 rounded-xl" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="mt-1 font-body text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-lime/20 file:px-4 file:py-2 file:font-body file:text-sm file:font-medium file:text-lime"
            />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-5">
          <div>
            <Label className="font-body text-foreground">Auteur</Label>
            <Input value={post.author} onChange={(e) => updateField('author', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" />
          </div>
          <div>
            <Label className="font-body text-foreground">Status</Label>
            <p className="mt-1 font-body text-sm text-muted">
              Huidige status: <span className={post.status === 'published' ? 'text-lime' : 'text-muted'}>{post.status === 'published' ? 'Gepubliceerd' : 'Concept'}</span>
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
