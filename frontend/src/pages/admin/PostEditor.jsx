import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Eye, Save, Settings2, Image as ImageIcon, Bold, Italic,
  Heading2, Heading3, List, Link as LinkIcon, Quote, Code2, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { POSTS, CATEGORIES, TAGS, IMAGES } from '@/mock/mock';

export default function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const existing = useMemo(() => POSTS.find(p => p.id === id), [id]);
  const [title, setTitle] = useState(existing?.title || '');
  const [content, setContent] = useState(existing?.content || '');
  const [excerpt, setExcerpt] = useState(existing?.excerpt || '');
  const [status, setStatus] = useState(existing?.status || 'draft');
  const [category, setCategory] = useState(existing?.category || CATEGORIES[0].name);
  const [tags, setTags] = useState(existing?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [image, setImage] = useState(existing?.image || IMAGES[0]);
  const [slug, setSlug] = useState(existing?.slug || '');

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };
  const removeTag = (t) => setTags(tags.filter(x => x !== t));

  const onSave = (newStatus) => {
    const final = newStatus || status;
    setStatus(final);
    toast({
      title: final === 'published' ? 'Post published' : final === 'draft' ? 'Draft saved' : 'Post scheduled',
      description: title || 'Untitled post',
    });
  };

  const tools = [
    { i: Bold, label: 'Bold' }, { i: Italic, label: 'Italic' },
    { i: Heading2, label: 'H2' }, { i: Heading3, label: 'H3' },
    { i: List, label: 'List' }, { i: Quote, label: 'Quote' },
    { i: LinkIcon, label: 'Link' }, { i: Code2, label: 'Code' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/admin/posts" className="size-9 rounded-md border border-zinc-800 hover:bg-zinc-800 grid place-items-center text-zinc-400 hover:text-zinc-100 transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">{existing ? 'Edit post' : 'New post'}</div>
            <h1 className="text-2xl font-semibold tracking-tight truncate serif">{title || 'Untitled'}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800"><Eye className="size-4 mr-1.5" /> Preview</Button>
          <Button variant="outline" onClick={()=>onSave('draft')} className="border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800"><Save className="size-4 mr-1.5" /> Save draft</Button>
          <Button onClick={()=>onSave('published')} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium">Publish</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardContent className="p-5 space-y-4">
              <Input
                value={title}
                onChange={(e)=>{ setTitle(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')); }}
                placeholder="Add title"
                className="text-2xl md:text-3xl serif font-semibold bg-transparent border-0 px-0 focus-visible:ring-0 placeholder:text-zinc-600 h-auto py-1"
              />
              <div className="text-xs text-zinc-500">Permalink: <span className="text-emerald-400">pulse.journal/{slug || 'your-slug'}</span></div>
              <Separator className="bg-zinc-800" />
              <div className="flex items-center gap-1 flex-wrap">
                {tools.map((t, i) => (
                  <button key={i} title={t.label} className="size-9 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 grid place-items-center transition-colors">
                    <t.i className="size-4" />
                  </button>
                ))}
                <div className="h-5 w-px bg-zinc-800 mx-1" />
                <button className="text-xs px-2.5 py-1.5 rounded-md text-emerald-300 bg-emerald-400/10 hover:bg-emerald-400/15 inline-flex items-center gap-1.5">
                  <Sparkles className="size-3.5" /> AI rewrite
                </button>
              </div>
              <Textarea
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                placeholder="Start writing…"
                className="min-h-[420px] bg-transparent border-0 px-0 resize-none focus-visible:ring-0 text-base leading-relaxed placeholder:text-zinc-600"
              />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Excerpt</CardTitle></CardHeader>
            <CardContent>
              <Textarea value={excerpt} onChange={(e)=>setExcerpt(e.target.value)} rows={3} placeholder="A short summary used in listings and SEO." className="bg-zinc-950/60 border-zinc-800 resize-none" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium flex items-center gap-2"><Settings2 className="size-4" /> Publish</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-zinc-400">Status</span>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-36 h-8 bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between"><span className="text-zinc-400">Visibility</span><span className="text-zinc-200">Public</span></div>
              <div className="flex items-center justify-between"><span className="text-zinc-400">Author</span><span className="text-zinc-200">Mira Chen</span></div>
              <div className="flex items-center justify-between"><span className="text-zinc-400">Publish</span><span className="text-zinc-200">Immediately</span></div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium flex items-center gap-2"><ImageIcon className="size-4" /> Featured image</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="aspect-video rounded-md overflow-hidden bg-zinc-950 border border-zinc-800">
                <img src={image} alt="" className="size-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {IMAGES.slice(0,8).map((u,i)=>(
                  <button key={i} onClick={()=>setImage(u)} className={`aspect-square rounded-md overflow-hidden border ${u===image ? 'border-emerald-400' : 'border-zinc-800 hover:border-zinc-600'}`}>
                    <img src={u} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Category</CardTitle></CardHeader>
            <CardContent>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {CATEGORIES.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Tags</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input value={tagInput} onChange={(e)=>setTagInput(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && (e.preventDefault(), addTag())} placeholder="Add a tag" className="bg-zinc-950/60 border-zinc-800" />
                <Button onClick={addTag} variant="outline" className="border-zinc-800 bg-zinc-900">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <button key={t} onClick={()=>removeTag(t)} className="text-xs px-2 py-1 rounded-full border border-zinc-700 text-zinc-300 hover:border-red-500/50 hover:text-red-300">
                    {t} ×
                  </button>
                ))}
              </div>
              <div className="pt-1">
                <div className="text-xs text-zinc-500 mb-1.5">Suggestions</div>
                <div className="flex flex-wrap gap-1.5">
                  {TAGS.filter(t=>!tags.includes(t)).slice(0,6).map(t => (
                    <button key={t} onClick={()=>setTags([...tags, t])} className="text-xs px-2 py-1 rounded-full bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700">+ {t}</button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
