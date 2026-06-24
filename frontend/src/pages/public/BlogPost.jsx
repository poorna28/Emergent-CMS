import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, Share2, Heart, MessageSquare, Zap } from 'lucide-react';
import { POSTS, SITE_INFO } from '@/mock/mock';
import { ThemedRoot } from '@/design/DesignProvider';

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find(p => p.slug === slug) || POSTS[0];
  const related = POSTS.filter(p => p.id !== post.id && p.status === 'published').slice(0, 3);

  return (
    <ThemedRoot>
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-900 sticky top-0 bg-zinc-950/85 backdrop-blur-md z-30">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/site" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-zinc-100"><ArrowLeft className="size-4" /> Back to {SITE_INFO.title}</Link>
          <Link to="/site" className="flex items-center gap-2"><div className="size-7 rounded-md bg-emerald-400/10 ring-1 ring-emerald-400/30 grid place-items-center"><Zap className="size-3.5 text-emerald-400" /></div><span className="serif text-sm font-semibold tracking-tight">{SITE_INFO.title}</span></Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 pt-14 pb-20">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-400">{post.category}</div>
        <h1 className="mt-3 serif text-4xl md:text-5xl font-semibold leading-[1.08] tracking-tight">{post.title}</h1>
        <p className="mt-5 text-lg text-zinc-300 leading-relaxed">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between text-sm text-zinc-500 border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/30 grid place-items-center text-emerald-300 text-xs font-semibold">{post.author.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
            <div><div className="text-zinc-200">{post.author}</div><div className="text-xs text-zinc-500">{post.date} · {Math.ceil((post.content?.length || 0) / 800) + 3} min read</div></div>
          </div>
          <div className="flex items-center gap-1">
            {[Bookmark, Share2, Heart].map((Icon,i)=>(<button key={i} className="size-9 rounded-md hover:bg-zinc-900 grid place-items-center text-zinc-400 hover:text-zinc-100"><Icon className="size-4" /></button>))}
          </div>
        </div>

        <div className="mt-8 aspect-[16/9] rounded-xl overflow-hidden border border-zinc-900">
          <img src={post.image} alt="" className="size-full object-cover" />
        </div>

        <div className="prose-pulse mt-10 text-zinc-300">
          {(post.content || '').split('\n\n').map((para, i) => (
            <React.Fragment key={i}>
              {i === 1 && <blockquote>“Restraint is the highest form of confidence in a design.”</blockquote>}
              <p>{para}</p>
              {i === 0 && <h2>The shape of a calm system</h2>}
            </React.Fragment>
          ))}
          <p>If you want more pieces like this, subscribe below. We publish once a week, never more.</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-1.5">
          {post.tags.map(t => <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-zinc-800 text-zinc-400">#{t}</span>)}
        </div>

        <div className="mt-12 border-t border-zinc-900 pt-8">
          <div className="flex items-center gap-2 text-sm text-zinc-400"><MessageSquare className="size-4" /> 12 comments</div>
          <div className="mt-4 space-y-4">
            {['This shifted how I think about editor UX. Saving for our next sprint review.','The pull-quote idea is small but mighty. Trying it tomorrow.'].map((c,i)=>(
              <div key={i} className="border border-zinc-900 rounded-lg p-4">
                <div className="text-sm text-zinc-200">{c}</div>
                <div className="text-xs text-zinc-500 mt-2">Reader · just now</div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h3 className="serif text-2xl font-semibold mb-6">Keep reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map(p => (
            <Link key={p.id} to={`/site/${p.slug}`} className="group block">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-zinc-900 mb-3">
                <img src={p.image} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-emerald-400">{p.category}</div>
              <div className="serif text-lg font-semibold mt-1 group-hover:text-emerald-200 transition-colors">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
    </ThemedRoot>
  );
}
