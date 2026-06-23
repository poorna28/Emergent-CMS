import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Zap } from 'lucide-react';
import { POSTS, CATEGORIES, SITE_INFO } from '@/mock/mock';

export default function BlogHome() {
  const published = POSTS.filter(p => p.status === 'published');
  const featured = published[0];
  const rest = published.slice(1);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-900 sticky top-0 bg-zinc-950/85 backdrop-blur-md z-30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/site" className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30 grid place-items-center"><Zap className="size-4 text-emerald-400" /></div>
            <span className="serif text-lg font-semibold tracking-tight">{SITE_INFO.title}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
            {['Home','Latest','Topics','About','Subscribe'].map(l => (
              <a key={l} href="#" className="hover:text-zinc-100 transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="size-9 rounded-md hover:bg-zinc-900 grid place-items-center text-zinc-400 hover:text-zinc-100"><Search className="size-4" /></button>
            <Link to="/admin" className="text-xs px-3 py-1.5 rounded-md border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition-colors">Admin</Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-12 border-b border-zinc-900">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Issue — July 2025</div>
        <h1 className="mt-3 serif text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">{SITE_INFO.tagline}</h1>
        <p className="mt-4 text-zinc-400 max-w-2xl">A weekly journal on craft, calm software, and the editorial habits behind work that lasts.</p>
        <div className="mt-6 flex items-center gap-3">
          <input placeholder="you@studio.com" className="bg-zinc-900 border border-zinc-800 rounded-md px-3.5 py-2.5 text-sm w-72 placeholder:text-zinc-500" />
          <button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-medium px-4 py-2.5 rounded-md inline-flex items-center gap-1.5 transition-colors">Subscribe <ArrowRight className="size-4" /></button>
        </div>
      </section>

      {featured && (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-12 border-b border-zinc-900">
          <Link to={`/site/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-zinc-900">
              <img src={featured.image} alt="" className="size-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-emerald-400">{featured.category} · Featured</div>
              <h2 className="mt-2 serif text-3xl md:text-4xl font-semibold leading-tight group-hover:text-emerald-200 transition-colors">{featured.title}</h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-5 text-sm text-zinc-500">{featured.author} · {featured.date}</div>
            </div>
          </Link>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex items-end justify-between mb-8">
          <h3 className="serif text-2xl md:text-3xl font-semibold">Latest stories</h3>
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.slice(0,4).map(c => (
              <span key={c.id} className="text-xs px-2.5 py-1 rounded-full border border-zinc-800 text-zinc-400">{c.name}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map(p => (
            <Link key={p.id} to={`/site/${p.slug}`} className="group block">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-zinc-900 mb-4">
                <img src={p.image} alt="" className="size-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-emerald-400">{p.category}</div>
              <h4 className="mt-1.5 serif text-xl font-semibold leading-snug group-hover:text-emerald-200 transition-colors">{p.title}</h4>
              <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{p.excerpt}</p>
              <div className="mt-3 text-xs text-zinc-500">{p.author} · {p.date}</div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-900 mt-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} {SITE_INFO.title} — Powered by Pulse CMS</div>
          <div className="flex gap-5"><a href="#" className="hover:text-zinc-200">About</a><a href="#" className="hover:text-zinc-200">Privacy</a><a href="#" className="hover:text-zinc-200">Contact</a></div>
        </div>
      </footer>
    </div>
  );
}
