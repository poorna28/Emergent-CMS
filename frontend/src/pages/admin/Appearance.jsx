import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Check, Brush, Menu as MenuIcon, LayoutGrid, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { THEMES } from '@/mock/mock';

const tabs = [
  { to: '/admin/appearance', label: 'Themes', icon: LayoutGrid, key: undefined },
  { to: '/admin/appearance/customize', label: 'Customize', icon: Brush, key: 'customize' },
  { to: '/admin/appearance/menus', label: 'Menus', icon: MenuIcon, key: 'menus' },
  { to: '/admin/appearance/widgets', label: 'Widgets', icon: Palette, key: 'widgets' },
];

export default function Appearance() {
  const { tab } = useParams();
  const { toast } = useToast();
  const [themes, setThemes] = useState(THEMES);

  const activate = (id) => {
    setThemes(themes.map(t => ({...t, active: t.id === id})));
    toast({ title: 'Theme activated', description: themes.find(t=>t.id===id)?.name });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Design</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Appearance</h1>
      </div>

      <div className="flex items-center gap-1 border-b border-zinc-800 overflow-x-auto">
        {tabs.map(t => (
          <NavLink key={t.label} to={t.to} end className={({isActive}) => `relative px-4 py-2.5 text-sm font-medium inline-flex items-center gap-2 transition-colors ${isActive ? 'text-emerald-300' : 'text-zinc-400 hover:text-zinc-100'}`}>
            {({isActive}) => (<>
              <t.icon className="size-4" /> {t.label}
              {isActive && <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-emerald-400" />}
            </>)}
          </NavLink>
        ))}
      </div>

      {!tab && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {themes.map(t => (
            <Card key={t.id} className="bg-zinc-900/60 border-zinc-800 overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden bg-zinc-950 relative">
                <img src={t.image} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {t.active && <div className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-400 text-zinc-950 font-medium"><Check className="size-3" /> Active</div>}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-zinc-100 font-medium">{t.name}</div>
                    <p className="text-xs text-zinc-400 mt-1">{t.desc}</p>
                  </div>
                  {!t.active && <Button size="sm" onClick={()=>activate(t.id)} variant="outline" className="border-zinc-800 bg-zinc-900">Activate</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === 'customize' && (
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader><CardTitle className="text-base font-medium">Customize — Editorial</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div><label className="text-zinc-400">Site title</label><input defaultValue="Pulse Journal" className="mt-1 w-full bg-zinc-950/60 border border-zinc-800 rounded-md px-3 py-2" /></div>
              <div><label className="text-zinc-400">Tagline</label><input defaultValue="Editorial software, slow ideas…" className="mt-1 w-full bg-zinc-950/60 border border-zinc-800 rounded-md px-3 py-2" /></div>
              <div><label className="text-zinc-400">Accent color</label>
                <div className="mt-1 flex gap-2">{['#10b981','#22d3ee','#f59e0b','#ef4444','#a78bfa'].map(c=>(<button key={c} style={{background:c}} className="size-8 rounded-md ring-1 ring-zinc-700 hover:ring-zinc-500" />))}</div>
              </div>
              <div><label className="text-zinc-400">Typography</label>
                <select className="mt-1 w-full bg-zinc-950/60 border border-zinc-800 rounded-md px-3 py-2"><option>Fraunces + Inter</option><option>Playfair + Inter</option><option>Inter only</option></select>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <div className="px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500">Live preview</div>
              <div className="p-6 bg-zinc-950">
                <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">Pulse Journal</div>
                <div className="serif text-2xl font-semibold leading-tight text-zinc-100">Designing for calm: a CMS that gets out of the way</div>
                <p className="text-sm text-zinc-400 mt-2">How restraint, contrast and rhythm become the foundation…</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'menus' && (
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader><CardTitle className="text-base font-medium">Menus</CardTitle></CardHeader>
          <CardContent>
            <div className="text-xs text-zinc-500 mb-3">Primary Menu</div>
            <div className="space-y-2">
              {['Home','Posts','About','Contact','Subscribe'].map((m,i)=>(
                <div key={i} className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2 bg-zinc-950/60">
                  <span className="text-zinc-200">{m}</span>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">Custom link</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'widgets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {['Sidebar','Footer Column 1','Footer Column 2','Footer Column 3'].map((w,i)=>(
            <Card key={i} className="bg-zinc-900/60 border-zinc-800">
              <CardHeader><CardTitle className="text-base font-medium">{w}</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {['Search','Recent posts','Categories'].map((x,j)=>(
                  <div key={j} className="border border-zinc-800 rounded-md px-3 py-2 text-zinc-200 bg-zinc-950/60">{x}</div>
                ))}
                <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900 mt-2">+ Add widget</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
