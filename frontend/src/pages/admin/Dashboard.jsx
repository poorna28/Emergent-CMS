import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, FileText, MessageSquare, Eye, Users as UsersIcon,
  TrendingUp, Plus, Image as ImageIcon, FileType2, Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { STATS, POSTS, ACTIVITY, COMMENTS } from '@/mock/mock';

const StatCard = ({ icon: Icon, label, value, delta, accent = 'emerald' }) => (
  <Card className="bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-colors">
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-zinc-500">{label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">{value}</div>
          {delta != null && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="size-3" /> {delta > 0 ? '+' : ''}{delta}% this month
            </div>
          )}
        </div>
        <div className={`size-10 rounded-lg bg-${accent}-400/10 ring-1 ring-${accent}-400/20 grid place-items-center`}>
          <Icon className={`size-5 text-${accent}-400`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const recent = POSTS.slice(0, 5);
  const pending = COMMENTS.filter(c => c.status === 'pending');
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Dashboard</div>
          <h1 className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight serif">Good morning, Mira.</h1>
          <p className="mt-1.5 text-zinc-400 text-sm max-w-xl">Here’s what’s happening on Pulse Journal today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200">
            <Sparkles className="size-4 mr-1.5 text-emerald-400" /> AI draft
          </Button>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium">
            <Link to="/admin/posts/new"><Plus className="size-4 mr-1.5" /> New post</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Views (30d)" value={STATS.views30d.toLocaleString()} delta={STATS.views30dDelta} />
        <StatCard icon={UsersIcon} label="Subscribers" value={STATS.subscribers.toLocaleString()} delta={STATS.subscribersDelta} />
        <StatCard icon={FileText} label="Posts" value={STATS.posts} />
        <StatCard icon={MessageSquare} label="Comments" value={STATS.comments} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-zinc-900/60 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Recent posts</CardTitle>
            <Link to="/admin/posts" className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1">
              View all <ArrowUpRight className="size-3" />
            </Link>
          </CardHeader>
          <CardContent className="divide-y divide-zinc-800/80">
            {recent.map((p) => (
              <Link key={p.id} to={`/admin/posts/${p.id}/edit`} className="flex items-center gap-4 py-3 hover:bg-zinc-800/30 rounded-md px-2 -mx-2 transition-colors">
                <img src={p.image} alt="" className="size-12 rounded-md object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-zinc-100 truncate">{p.title}</div>
                  <div className="mt-0.5 text-xs text-zinc-500 flex items-center gap-2">
                    <span>{p.author}</span><span>•</span><span>{p.category}</span><span>•</span><span>{p.date}</span>
                  </div>
                </div>
                <Badge variant="outline" className={
                  p.status === 'published' ? 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5' :
                  p.status === 'draft' ? 'border-zinc-700 text-zinc-400' :
                  'border-amber-400/30 text-amber-300 bg-amber-400/5'
                }>{p.status}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader><CardTitle className="text-base font-medium">Activity</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {ACTIVITY.map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className="mt-1.5 size-1.5 rounded-full bg-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm text-zinc-200">{a.text}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader><CardTitle className="text-base font-medium">Quick draft</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <input className="w-full bg-zinc-950/60 border border-zinc-800 rounded-md px-3 py-2 text-sm placeholder:text-zinc-500" placeholder="Title" />
            <textarea rows={4} className="w-full bg-zinc-950/60 border border-zinc-800 rounded-md px-3 py-2 text-sm placeholder:text-zinc-500 resize-none" placeholder="What’s on your mind?" />
            <div className="flex justify-end">
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950">Save draft</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Pending comments</CardTitle>
            <Link to="/admin/comments" className="text-xs text-emerald-400 hover:text-emerald-300">Moderate</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pending.length === 0 && <div className="text-sm text-zinc-500">All caught up.</div>}
            {pending.map((c) => (
              <div key={c.id} className="border border-zinc-800 rounded-md p-3">
                <div className="text-sm text-zinc-200">“{c.content}”</div>
                <div className="text-xs text-zinc-500 mt-1">{c.author} on “{c.post}”</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader><CardTitle className="text-base font-medium">At a glance</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              { i: FileText, l: `${STATS.posts} posts`, to: '/admin/posts' },
              { i: FileType2, l: `${STATS.pages} pages`, to: '/admin/pages' },
              { i: ImageIcon, l: `12 media files`, to: '/admin/media' },
              { i: UsersIcon, l: `${STATS.users} users`, to: '/admin/users' },
            ].map((row, i) => (
              <Link key={i} to={row.to} className="flex items-center gap-3 py-1.5 px-2 -mx-2 rounded-md hover:bg-zinc-800/40 text-zinc-300 transition-colors">
                <row.i className="size-4 text-emerald-400" /> {row.l}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
