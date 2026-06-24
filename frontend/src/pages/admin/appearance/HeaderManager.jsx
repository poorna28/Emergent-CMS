import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Zap, Search, Menu as MenuIcon, ChevronDown, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_HEADER = {
  variant: 'classic', // classic | centered | minimal | split
  sticky: true,
  transparent: false,
  logoText: 'Pulse Journal',
  showSearch: true,
  ctaLabel: 'Subscribe',
  ctaEnabled: true,
  links: [
    { id: 'h1', label: 'Home', href: '/' },
    { id: 'h2', label: 'Latest', href: '/latest' },
    { id: 'h3', label: 'Topics', href: '/topics' },
    { id: 'h4', label: 'About', href: '/about' },
    { id: 'h5', label: 'Subscribe', href: '/subscribe' },
  ],
};

function HeaderPreview({ data }) {
  const align = data.variant === 'centered' ? 'justify-center' : 'justify-between';
  return (
    <div className={`rounded-lg border border-zinc-800 ${data.transparent ? 'bg-transparent' : 'bg-zinc-950'} overflow-hidden`}>
      <div className="px-5 h-14 flex items-center gap-6" >
        <div className={`flex items-center ${data.variant === 'split' ? '' : ''} gap-2 shrink-0`}>
          <div className="size-7 rounded-md bg-emerald-400/10 ring-1 ring-emerald-400/30 grid place-items-center"><Zap className="size-3.5 text-emerald-400" /></div>
          <span className="serif text-base font-semibold tracking-tight text-zinc-100">{data.logoText}</span>
        </div>
        {data.variant !== 'minimal' && (
          <nav className={`flex items-center gap-5 text-sm text-zinc-400 ${data.variant === 'centered' ? 'mx-auto' : ''}`}>
            {data.links.slice(0, 5).map(l => <a key={l.id} className="hover:text-zinc-100">{l.label}</a>)}
          </nav>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {data.showSearch && <button className="size-8 rounded-md hover:bg-zinc-900 grid place-items-center text-zinc-400"><Search className="size-4" /></button>}
          {data.ctaEnabled && <button className="bg-emerald-500 text-zinc-950 text-xs font-medium px-3 py-1.5 rounded-md">{data.ctaLabel}</button>}
        </div>
      </div>
    </div>
  );
}

export default function HeaderManager() {
  const [data, setData] = useState(DEFAULT_HEADER);
  const { toast } = useToast();

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const addLink = () => setData(d => ({ ...d, links: [...d.links, { id: 'h' + Date.now(), label: 'New link', href: '#' }] }));
  const removeLink = (id) => setData(d => ({ ...d, links: d.links.filter(l => l.id !== id) }));
  const editLink = (id, patch) => setData(d => ({ ...d, links: d.links.map(l => l.id === id ? { ...l, ...patch } : l) }));

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Header</h2>
          <p className="text-sm text-zinc-400 mt-0.5">Layout, logo, navigation and call-to-action shown across every public page.</p>
        </div>
        <Button onClick={() => toast({ title: 'Header saved', description: data.logoText })} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950"><Eye className="size-4 mr-1.5" /> Save & publish</Button>
      </div>

      <Card className="bg-zinc-900/60 border-zinc-800">
        <CardHeader><CardTitle className="text-base font-medium">Live preview</CardTitle></CardHeader>
        <CardContent><HeaderPreview data={data} /></CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader><CardTitle className="text-base font-medium">Style</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Variant</div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { k: 'classic', l: 'Classic' }, { k: 'centered', l: 'Centered' },
                  { k: 'minimal', l: 'Minimal' }, { k: 'split', l: 'Split' },
                ].map(v => (
                  <button key={v.k} onClick={() => update('variant', v.k)} className={`px-3 py-2 rounded-md border text-sm transition-colors ${data.variant === v.k ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'}`}>{v.l}</button>
                ))}
              </div>
            </div>
            <div><div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Logo text</div><Input value={data.logoText} onChange={e => update('logoText', e.target.value)} className="bg-zinc-950/60 border-zinc-800" /></div>
            <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Sticky header</span><Switch checked={data.sticky} onCheckedChange={(v) => update('sticky', v)} className="data-[state=checked]:bg-emerald-500" /></div>
            <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Transparent over hero</span><Switch checked={data.transparent} onCheckedChange={(v) => update('transparent', v)} className="data-[state=checked]:bg-emerald-500" /></div>
            <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Show search</span><Switch checked={data.showSearch} onCheckedChange={(v) => update('showSearch', v)} className="data-[state=checked]:bg-emerald-500" /></div>
            <div className="border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60">
              <div className="flex items-center justify-between mb-2"><span className="text-zinc-200">CTA button</span><Switch checked={data.ctaEnabled} onCheckedChange={(v) => update('ctaEnabled', v)} className="data-[state=checked]:bg-emerald-500" /></div>
              {data.ctaEnabled && <Input value={data.ctaLabel} onChange={e => update('ctaLabel', e.target.value)} placeholder="CTA label" className="bg-zinc-900 border-zinc-800 h-8" />}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Navigation</CardTitle>
            <Button size="sm" variant="outline" onClick={addLink} className="border-zinc-800 bg-zinc-950"><Plus className="size-3.5 mr-1" /> Add link</Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.links.map(l => (
              <div key={l.id} className="flex items-center gap-2 border border-zinc-800 rounded-md p-2 bg-zinc-950/60">
                <GripVertical className="size-4 text-zinc-600 shrink-0" />
                <Input value={l.label} onChange={(e) => editLink(l.id, { label: e.target.value })} className="bg-zinc-900 border-zinc-800 h-8 w-32" />
                <Input value={l.href} onChange={(e) => editLink(l.id, { href: e.target.value })} placeholder="/path" className="bg-zinc-900 border-zinc-800 h-8 flex-1 mono text-xs" />
                <button onClick={() => removeLink(l.id)} className="size-7 rounded hover:bg-red-500/10 text-red-400 grid place-items-center"><Trash2 className="size-3.5" /></button>
              </div>
            ))}
            {data.links.length === 0 && <div className="text-center py-6 text-sm text-zinc-500 border border-dashed border-zinc-800 rounded-md">No links yet — add one above.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
