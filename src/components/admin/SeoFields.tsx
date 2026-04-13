import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SeoFieldsProps {
  values: {
    slug: string;
    seo_title: string;
    meta_description: string;
    focus_keyword: string;
    secondary_keywords: string;
    og_title: string;
    og_description: string;
    canonical: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function SeoFields({ values, onChange }: SeoFieldsProps) {
  return (
    <div className="space-y-5">
      <div>
        <Label className="font-body text-foreground">Slug</Label>
        <Input value={values.slug} onChange={(e) => onChange('slug', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="mijn-artikel-slug" />
        <p className="mt-1 font-body text-xs text-muted">URL: /blogs/{values.slug || '...'}</p>
      </div>

      <div>
        <Label className="font-body text-foreground">SEO Titel</Label>
        <Input value={values.seo_title} onChange={(e) => onChange('seo_title', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="Pagina titel voor zoekmachines" />
        <p className="mt-1 font-body text-xs text-muted">{values.seo_title.length}/60 tekens</p>
      </div>

      <div>
        <Label className="font-body text-foreground">Meta Description</Label>
        <Textarea value={values.meta_description} onChange={(e) => onChange('meta_description', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" rows={3} placeholder="Beschrijving voor zoekmachines" />
        <p className="mt-1 font-body text-xs text-muted">{values.meta_description.length}/160 tekens</p>
      </div>

      <div>
        <Label className="font-body text-foreground">Focus Keyword</Label>
        <Input value={values.focus_keyword} onChange={(e) => onChange('focus_keyword', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="Primaire zoekterm" />
      </div>

      <div>
        <Label className="font-body text-foreground">Secundaire Keywords</Label>
        <Input value={values.secondary_keywords} onChange={(e) => onChange('secondary_keywords', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="keyword1, keyword2, keyword3" />
        <p className="mt-1 font-body text-xs text-muted">Komma-gescheiden</p>
      </div>

      <div>
        <Label className="font-body text-foreground">OG Titel</Label>
        <Input value={values.og_title} onChange={(e) => onChange('og_title', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="Social media titel" />
      </div>

      <div>
        <Label className="font-body text-foreground">OG Description</Label>
        <Textarea value={values.og_description} onChange={(e) => onChange('og_description', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" rows={2} placeholder="Social media beschrijving" />
      </div>

      <div>
        <Label className="font-body text-foreground">Canonical URL</Label>
        <Input value={values.canonical} onChange={(e) => onChange('canonical', e.target.value)} className="mt-1 bg-bg-2 border-border text-foreground" placeholder="https://smashlab.nl/blogs/..." />
      </div>
    </div>
  );
}
