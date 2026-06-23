import React, { useState } from 'react';
import { Upload, Grid3x3, List as ListIcon, Search, X, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MEDIA } from '@/mock/mock';

export default function Media() {
  const [items, setItems] = useState(MEDIA);
  const [view, setView] = useState('grid');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = items.filter(m => m.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Library</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Media</h1>
          <p className="text-sm text-zinc-400 mt-1">{filtered.length} files</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"><Upload className="size-4 mr-1.5" /> Upload</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search media" className="pl-9 bg-zinc-900/60 border-zinc-800" />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-md border border-zinc-800 bg-zinc-900/60 w-fit">
          <button onClick={()=>setView('grid')} className={`size-8 rounded grid place-items-center ${view==='grid' ? 'bg-zinc-800 text-emerald-300' : 'text-zinc-500 hover:text-zinc-200'}`}><Grid3x3 className="size-4" /></button>
          <button onClick={()=>setView('list')} className={`size-8 rounded grid place-items-center ${view==='list' ? 'bg-zinc-800 text-emerald-300' : 'text-zinc-500 hover:text-zinc-200'}`}><ListIcon className="size-4" /></button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map(m => (
            <button key={m.id} onClick={()=>setSelected(m)} className="group relative aspect-square rounded-lg overflow-hidden border border-zinc-800 hover:border-emerald-400/40 transition-colors">
              <img src={m.url} alt={m.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 py-2 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-[11px] text-zinc-200 truncate">{m.name}</div>
                <div className="text-[10px] text-zinc-400">{m.size}</div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider">
              <tr><th className="px-4 py-3 text-left">File</th><th className="px-4 py-3 text-left hidden md:table-cell">Author</th><th className="px-4 py-3 text-left hidden lg:table-cell">Type</th><th className="px-4 py-3 text-left hidden lg:table-cell">Date</th><th className="px-4 py-3 text-left">Size</th></tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-zinc-800/30">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={m.url} className="size-10 rounded object-cover" alt="" /><span className="text-zinc-200">{m.name}</span></div></td>
                  <td className="px-4 py-3 text-zinc-400 hidden md:table-cell">{m.author}</td>
                  <td className="px-4 py-3 text-zinc-400 hidden lg:table-cell">{m.type}</td>
                  <td className="px-4 py-3 text-zinc-500 hidden lg:table-cell">{m.uploaded}</td>
                  <td className="px-4 py-3 text-zinc-400">{m.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={()=>setSelected(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-3xl">
          {selected && (
            <>
              <DialogHeader><DialogTitle className="text-zinc-100">{selected.name}</DialogTitle></DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 rounded-md overflow-hidden bg-zinc-950">
                  <img src={selected.url} alt="" className="w-full max-h-[420px] object-contain" />
                </div>
                <div className="space-y-3 text-sm">
                  <div><div className="text-xs text-zinc-500">Uploaded by</div><div className="text-zinc-200">{selected.author}</div></div>
                  <div><div className="text-xs text-zinc-500">Uploaded on</div><div className="text-zinc-200">{selected.uploaded}</div></div>
                  <div><div className="text-xs text-zinc-500">Type</div><div className="text-zinc-200">{selected.type}</div></div>
                  <div><div className="text-xs text-zinc-500">Size</div><div className="text-zinc-200">{selected.size}</div></div>
                  <div className="pt-2 flex gap-2">
                    <Button variant="outline" className="border-zinc-800 bg-zinc-950 flex-1"><Download className="size-4 mr-1.5" /> Download</Button>
                    <Button variant="outline" className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 hover:text-red-300 flex-1" onClick={()=>{setItems(items.filter(x=>x.id!==selected.id)); setSelected(null);}}><Trash2 className="size-4 mr-1.5" /> Delete</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
