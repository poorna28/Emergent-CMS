import React, { useState } from 'react';
import { Plus, MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { PAGES_DATA } from '@/mock/mock';

export default function PagesAdmin() {
  const [pages, setPages] = useState(PAGES_DATA);
  const [q, setQ] = useState('');
  const filtered = pages.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Content</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Pages</h1>
          <p className="text-sm text-zinc-400 mt-1">{pages.length} pages</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"><Plus className="size-4 mr-1.5" /> Add new page</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
        <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search pages" className="pl-9 bg-zinc-900/60 border-zinc-800" />
      </div>

      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 w-10"><Checkbox /></th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Author</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Parent</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-4 py-3"><Checkbox /></td>
                <td className="px-4 py-3">
                  <div className="text-zinc-100 font-medium">{p.title}</div>
                  <div className="text-xs text-zinc-500">/{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-zinc-400 hidden md:table-cell">{p.author}</td>
                <td className="px-4 py-3 text-zinc-400 hidden lg:table-cell">{p.parent}</td>
                <td className="px-4 py-3 text-zinc-500 hidden lg:table-cell">{p.date}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={p.status === 'published' ? 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5' : 'border-zinc-700 text-zinc-400'}>{p.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="size-8 rounded-md hover:bg-zinc-800 text-zinc-400 grid place-items-center"><MoreHorizontal className="size-4" /></button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem className="focus:bg-zinc-800">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-zinc-800">Quick edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={()=>setPages(pages.filter(x=>x.id!==p.id))} className="text-red-400 focus:bg-red-500/10">Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
