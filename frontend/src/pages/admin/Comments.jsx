import React, { useState } from 'react';
import { Check, X, Reply, Trash2, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { COMMENTS } from '@/mock/mock';

const statusColor = {
  approved: 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5',
  pending: 'border-amber-400/30 text-amber-300 bg-amber-400/5',
  spam: 'border-red-400/30 text-red-300 bg-red-400/5',
  trash: 'border-zinc-700 text-zinc-500',
};

export default function Comments() {
  const [comments, setComments] = useState(COMMENTS);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const counts = {
    all: comments.length,
    approved: comments.filter(c=>c.status==='approved').length,
    pending: comments.filter(c=>c.status==='pending').length,
    spam: comments.filter(c=>c.status==='spam').length,
    trash: comments.filter(c=>c.status==='trash').length,
  };
  const filtered = comments.filter(c => filter==='all' || c.status===filter);

  const update = (id, status) => {
    setComments(comments.map(c => c.id===id ? {...c, status} : c));
    toast({ title: `Comment marked ${status}` });
  };
  const initials = (n) => n.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Engagement</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Comments</h1>
        <p className="text-sm text-zinc-400 mt-1">{counts.pending} pending moderation</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {['all','approved','pending','spam','trash'].map(s => (
          <button key={s} onClick={()=>setFilter(s)} className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${filter===s ? 'border-emerald-400/40 text-emerald-300 bg-emerald-400/5' : 'border-zinc-800 text-zinc-400 hover:text-zinc-200'}`}>
            {s[0].toUpperCase()+s.slice(1)} <span className="text-zinc-500">({counts[s]})</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 md:p-5 flex flex-col md:flex-row gap-4">
            <Avatar className="size-10 shrink-0"><AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs">{initials(c.author)}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-zinc-100 font-medium">{c.author}</span>
                <span className="text-zinc-500 text-xs">·</span>
                <span className="text-zinc-500 text-xs">{c.email}</span>
                <Badge variant="outline" className={`${statusColor[c.status]} ml-1`}>{c.status}</Badge>
              </div>
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{c.content}</p>
              <div className="text-xs text-zinc-500 mt-2">On <span className="text-zinc-300">“{c.post}”</span> — {c.date}</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {c.status !== 'approved' && <Button size="sm" onClick={()=>update(c.id,'approved')} variant="outline" className="h-8 border-emerald-400/30 text-emerald-300 bg-emerald-400/5 hover:bg-emerald-400/10 hover:text-emerald-200"><Check className="size-3.5 mr-1" /> Approve</Button>}
                {c.status === 'approved' && <Button size="sm" onClick={()=>update(c.id,'pending')} variant="outline" className="h-8 border-zinc-800 bg-zinc-900"><X className="size-3.5 mr-1" /> Unapprove</Button>}
                <Button size="sm" variant="outline" className="h-8 border-zinc-800 bg-zinc-900"><Reply className="size-3.5 mr-1" /> Reply</Button>
                <Button size="sm" onClick={()=>update(c.id,'spam')} variant="outline" className="h-8 border-zinc-800 bg-zinc-900"><Flame className="size-3.5 mr-1" /> Spam</Button>
                <Button size="sm" onClick={()=>update(c.id,'trash')} variant="outline" className="h-8 border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 hover:text-red-300"><Trash2 className="size-3.5 mr-1" /> Trash</Button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-zinc-500 py-12 border border-dashed border-zinc-800 rounded-xl">No comments in this view.</div>}
      </div>
    </div>
  );
}
