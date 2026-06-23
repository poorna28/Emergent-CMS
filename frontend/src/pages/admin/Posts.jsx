import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MoreHorizontal, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { POSTS, CATEGORIES } from '@/mock/mock';

const statusStyles = {
  published: 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5',
  draft: 'border-zinc-700 text-zinc-400',
  scheduled: 'border-amber-400/30 text-amber-300 bg-amber-400/5',
};

export default function Posts() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [cat, setCat] = useState('all');
  const [posts, setPosts] = useState(POSTS);
  const [sel, setSel] = useState([]);

  const filtered = useMemo(() => posts.filter(p =>
    (status === 'all' || p.status === status) &&
    (cat === 'all' || p.category === cat) &&
    (q === '' || p.title.toLowerCase().includes(q.toLowerCase()))
  ), [posts, q, status, cat]);

  const toggleAll = () => setSel(sel.length === filtered.length ? [] : filtered.map(p => p.id));
  const toggle = (id) => setSel(sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  const trash = (id) => setPosts(posts.filter(p => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Content</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">All Posts</h1>
          <p className="text-sm text-zinc-400 mt-1">{filtered.length} of {posts.length} posts</p>
        </div>
        <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium">
          <Link to="/admin/posts/new"><Plus className="size-4 mr-1.5" /> Add new</Link>
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {['all','published','draft','scheduled'].map(s => (
          <button key={s} onClick={() => setStatus(s)} className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${status===s ? 'border-emerald-400/40 text-emerald-300 bg-emerald-400/5' : 'border-zinc-800 text-zinc-400 hover:text-zinc-200'}`}>
            {s[0].toUpperCase()+s.slice(1)} <span className="text-zinc-500">({s==='all' ? posts.length : posts.filter(p=>p.status===s).length})</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by title" className="pl-9 bg-zinc-900/60 border-zinc-800" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-[180px] bg-zinc-900/60 border-zinc-800"><Filter className="size-4 mr-1.5" /><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 w-10"><Checkbox checked={sel.length === filtered.length && filtered.length>0} onCheckedChange={toggleAll} /></th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Author</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Category</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-4 py-3"><Checkbox checked={sel.includes(p.id)} onCheckedChange={()=>toggle(p.id)} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="size-10 rounded-md object-cover shrink-0" alt="" />
                    <div className="min-w-0">
                      <Link to={`/admin/posts/${p.id}/edit`} className="text-zinc-100 hover:text-emerald-300 font-medium truncate block">{p.title}</Link>
                      <div className="text-xs text-zinc-500 truncate max-w-md">{p.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-400 hidden md:table-cell">{p.author}</td>
                <td className="px-4 py-3 hidden lg:table-cell"><Badge variant="outline" className="border-zinc-700 text-zinc-300">{p.category}</Badge></td>
                <td className="px-4 py-3 text-zinc-500 hidden lg:table-cell">{p.date}</td>
                <td className="px-4 py-3"><Badge variant="outline" className={statusStyles[p.status]}>{p.status}</Badge></td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="size-8 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 grid place-items-center"><MoreHorizontal className="size-4" /></button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem className="focus:bg-zinc-800" asChild><Link to={`/admin/posts/${p.id}/edit`}>Edit</Link></DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-zinc-800" asChild><Link to={`/site/${p.slug}`}>View</Link></DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-zinc-800">Duplicate</DropdownMenuItem>
                      <DropdownMenuItem onClick={()=>trash(p.id)} className="text-red-400 focus:bg-red-500/10 focus:text-red-300">Move to trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-zinc-500">No posts match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
