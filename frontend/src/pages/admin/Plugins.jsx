import React, { useState } from 'react';
import { Plug, Search, ToggleLeft, ToggleRight, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PLUGINS } from '@/mock/mock';

export default function Plugins() {
  const [plugins, setPlugins] = useState(PLUGINS);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const toggle = (id) => {
    setPlugins(plugins.map(p => p.id===id ? {...p, active: !p.active} : p));
    const p = plugins.find(x=>x.id===id);
    toast({ title: p.active ? `${p.name} deactivated` : `${p.name} activated` });
  };

  const filtered = plugins.filter(p =>
    (filter==='all' || (filter==='active' && p.active) || (filter==='inactive' && !p.active)) &&
    p.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Extend</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Plugins</h1>
          <p className="text-sm text-zinc-400 mt-1">{plugins.filter(p=>p.active).length} active · {plugins.length} installed</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"><Download className="size-4 mr-1.5" /> Add new</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex items-center gap-2">
          {[{k:'all',l:'All'},{k:'active',l:'Active'},{k:'inactive',l:'Inactive'}].map(t=>(
            <button key={t.k} onClick={()=>setFilter(t.k)} className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${filter===t.k ? 'border-emerald-400/40 text-emerald-300 bg-emerald-400/5' : 'border-zinc-800 text-zinc-400 hover:text-zinc-200'}`}>{t.l}</button>
          ))}
        </div>
        <div className="relative flex-1 max-w-md md:ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search plugins" className="pl-9 bg-zinc-900/60 border-zinc-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <Card key={p.id} className="bg-zinc-900/60 border-zinc-800">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="size-10 rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/20 grid place-items-center shrink-0"><Plug className="size-5 text-emerald-400" /></div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-zinc-100 font-medium">{p.name}</span>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">v{p.version}</Badge>
                      {p.active && <Badge variant="outline" className="border-emerald-400/30 text-emerald-300 bg-emerald-400/5 text-[10px]">active</Badge>}
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{p.desc}</p>
                    <div className="text-xs text-zinc-500 mt-2">By {p.author}</div>
                  </div>
                </div>
                <Switch checked={p.active} onCheckedChange={()=>toggle(p.id)} className="data-[state=checked]:bg-emerald-500" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-950">Settings</Button>
                <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-950">Update</Button>
                <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 hover:text-red-300 ml-auto"><Trash2 className="size-3.5 mr-1" /> Remove</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
