import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Zap, Github, Twitter, Linkedin, Rss, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_FOOTER = {
  variant: 'columns', // columns | minimal | newsletter
  showLogo: true,
  logoText: 'Pulse Journal',
  tagline: 'A weekly journal on calm, considered work.',
  copyright: '© 2025 Pulse Journal — Powered by Pulse CMS',
  showSocial: true,
  socials: [
    { id: 's1', icon: 'Twitter', href: 'https://twitter.com' },
    { id: 's2', icon: 'Github', href: 'https://github.com' },
    { id: 's3', icon: 'Linkedin', href: 'https://linkedin.com' },
    { id: 's4', icon: 'Rss', href: '/rss' },
  ],
  columns: [
    { id: 'c1', title: 'Product', links: [{ id: 'l1', label: 'Features', href: '#' }, { id: 'l2', label: 'Pricing', href: '#' }, { id: 'l3', label: 'Changelog', href: '#' }] },
    { id: 'c2', title: 'Company', links: [{ id: 'l4', label: 'About', href: '#' }, { id: 'l5', label: 'Careers', href: '#' }, { id: 'l6', label: 'Press', href: '#' }] },
    { id: 'c3', title: 'Legal', links: [{ id: 'l7', label: 'Privacy', href: '#' }, { id: 'l8', label: 'Terms', href: '#' }] },
  ],
};

const SOCIAL_ICONS = { Twitter, Github, Linkedin, Rss };

function FooterPreview({ data }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
      <div className="px-5 py-7">
        {data.variant === 'minimal' ? (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2"><div className="size-6 rounded bg-emerald-400/10 ring-1 ring-emerald-400/30 grid place-items-center"><Zap className="size-3 text-emerald-400" /></div><span className="text-zinc-300 text-sm">{data.logoText}</span></div>
            <div className="text-xs text-zinc-500">{data.copyright}</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {data.showLogo && (
                <div>
                  <div className="flex items-center gap-2"><div className="size-7 rounded-md bg-emerald-400/10 ring-1 ring-emerald-400/30 grid place-items-center"><Zap className="size-3.5 text-emerald-400" /></div><span className="serif text-base font-semibold text-zinc-100">{data.logoText}</span></div>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{data.tagline}</p>
                  {data.showSocial && (
                    <div className="mt-3 flex items-center gap-1.5">
                      {data.socials.map(s => { const I = SOCIAL_ICONS[s.icon] || Github; return <a key={s.id} className="size-7 rounded-md border border-zinc-800 hover:border-zinc-700 grid place-items-center text-zinc-400 hover:text-zinc-100"><I className="size-3.5" /></a>; })}
                    </div>
                  )}
                </div>
              )}
              {data.columns.map(c => (
                <div key={c.id}>
                  <div className="text-xs uppercase tracking-wider text-zinc-300 font-medium">{c.title}</div>
                  <div className="mt-2 space-y-1.5">
                    {c.links.map(l => <a key={l.id} className="block text-xs text-zinc-500 hover:text-zinc-100">{l.label}</a>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between text-xs text-zinc-500">
              <span>{data.copyright}</span>
              <span className="text-zinc-600">Built with Pulse CMS</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function FooterManager() {
  const [data, setData] = useState(DEFAULT_FOOTER);
  const { toast } = useToast();
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const editCol = (cid, patch) => setData(d => ({ ...d, columns: d.columns.map(c => c.id === cid ? { ...c, ...patch } : c) }));
  const removeCol = (cid) => setData(d => ({ ...d, columns: d.columns.filter(c => c.id !== cid) }));
  const addCol = () => setData(d => ({ ...d, columns: [...d.columns, { id: 'c' + Date.now(), title: 'New column', links: [] }] }));
  const addLink = (cid) => editCol(cid, { links: [...data.columns.find(c => c.id === cid).links, { id: 'l' + Date.now(), label: 'New link', href: '#' }] });
  const editLink = (cid, lid, patch) => editCol(cid, { links: data.columns.find(c => c.id === cid).links.map(l => l.id === lid ? { ...l, ...patch } : l) });
  const removeLink = (cid, lid) => editCol(cid, { links: data.columns.find(c => c.id === cid).links.filter(l => l.id !== lid) });

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Footer</h2>
          <p className="text-sm text-zinc-400 mt-0.5">Columns of links, copyright, social and a tagline.</p>
        </div>
        <Button onClick={() => toast({ title: 'Footer saved' })} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950"><Eye className="size-4 mr-1.5" /> Save & publish</Button>
      </div>

      <Card className="bg-zinc-900/60 border-zinc-800">
        <CardHeader><CardTitle className="text-base font-medium">Live preview</CardTitle></CardHeader>
        <CardContent><FooterPreview data={data} /></CardContent>
      </Card>

      <Card className="bg-zinc-900/60 border-zinc-800">
        <CardHeader><CardTitle className="text-base font-medium">Settings</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Variant</div>
            <div className="flex gap-2">{[{ k: 'columns', l: 'Columns' }, { k: 'minimal', l: 'Minimal' }, { k: 'newsletter', l: 'Newsletter' }].map(v => (
              <button key={v.k} onClick={() => update('variant', v.k)} className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${data.variant === v.k ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'}`}>{v.l}</button>
            ))}</div>
          </div>
          <div><div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Logo text</div><Input value={data.logoText} onChange={e => update('logoText', e.target.value)} className="bg-zinc-950/60 border-zinc-800" /></div>
          <div className="md:col-span-2"><div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Tagline</div><Textarea rows={2} value={data.tagline} onChange={e => update('tagline', e.target.value)} className="bg-zinc-950/60 border-zinc-800 resize-none" /></div>
          <div className="md:col-span-2"><div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Copyright</div><Input value={data.copyright} onChange={e => update('copyright', e.target.value)} className="bg-zinc-950/60 border-zinc-800" /></div>
          <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Show logo column</span><Switch checked={data.showLogo} onCheckedChange={(v) => update('showLogo', v)} className="data-[state=checked]:bg-emerald-500" /></div>
          <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Show social icons</span><Switch checked={data.showSocial} onCheckedChange={(v) => update('showSocial', v)} className="data-[state=checked]:bg-emerald-500" /></div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/60 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">Columns</CardTitle>
          <Button size="sm" variant="outline" onClick={addCol} className="border-zinc-800 bg-zinc-950"><Plus className="size-3.5 mr-1" /> Add column</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.columns.map(c => (
            <div key={c.id} className="border border-zinc-800 rounded-md bg-zinc-950/60">
              <div className="flex items-center gap-2 p-2.5 border-b border-zinc-800">
                <GripVertical className="size-4 text-zinc-600" />
                <Input value={c.title} onChange={(e) => editCol(c.id, { title: e.target.value })} className="bg-zinc-900 border-zinc-800 h-8 flex-1 font-medium" />
                <Button size="sm" variant="outline" onClick={() => addLink(c.id)} className="border-zinc-800 bg-zinc-900"><Plus className="size-3.5 mr-1" /> Link</Button>
                <button onClick={() => removeCol(c.id)} className="size-7 rounded hover:bg-red-500/10 text-red-400 grid place-items-center"><Trash2 className="size-3.5" /></button>
              </div>
              <div className="p-2.5 space-y-1.5">
                {c.links.map(l => (
                  <div key={l.id} className="flex items-center gap-2">
                    <Input value={l.label} onChange={(e) => editLink(c.id, l.id, { label: e.target.value })} className="bg-zinc-900 border-zinc-800 h-8 w-32" />
                    <Input value={l.href} onChange={(e) => editLink(c.id, l.id, { href: e.target.value })} className="bg-zinc-900 border-zinc-800 h-8 flex-1 mono text-xs" />
                    <button onClick={() => removeLink(c.id, l.id)} className="size-7 rounded hover:bg-red-500/10 text-red-400 grid place-items-center"><Trash2 className="size-3.5" /></button>
                  </div>
                ))}
                {c.links.length === 0 && <div className="text-xs text-zinc-500 px-1">No links yet.</div>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
