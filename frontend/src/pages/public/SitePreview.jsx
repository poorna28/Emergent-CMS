import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search, Pencil } from 'lucide-react';
import { loadSections } from '@/components/admin/sections/sectionTypes';
import SectionRenderer from '@/components/admin/sections/SectionRenderer';
import { SITE_INFO } from '@/mock/mock';

export default function SitePreview() {
  const [sections, setSections] = useState([]);
  useEffect(() => { setSections(loadSections()); }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-900 sticky top-0 bg-zinc-950/85 backdrop-blur-md z-30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/site" className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30 grid place-items-center"><Zap className="size-4 text-emerald-400" /></div>
            <span className="serif text-lg font-semibold tracking-tight">{SITE_INFO.title}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
            {['Home','Latest','Topics','About','Subscribe'].map(l => (<a key={l} href="#" className="hover:text-zinc-100 transition-colors">{l}</a>))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="size-9 rounded-md hover:bg-zinc-900 grid place-items-center text-zinc-400 hover:text-zinc-100"><Search className="size-4" /></button>
            <Link to="/admin/builder" className="text-xs px-3 py-1.5 rounded-md border border-emerald-400/30 text-emerald-300 bg-emerald-400/5 hover:bg-emerald-400/10 inline-flex items-center gap-1.5"><Pencil className="size-3.5" /> Edit in builder</Link>
          </div>
        </div>
      </header>

      <main>
        {sections.map(s => <SectionRenderer key={s.id} section={s} />)}
        {sections.length === 0 && (
          <div className="max-w-3xl mx-auto px-6 py-24 text-center text-zinc-500">
            <div className="serif text-2xl mb-2">Nothing here yet</div>
            <p>Open the page builder and drop a few sections to see them appear.</p>
            <Link to="/admin/builder" className="inline-flex items-center gap-1.5 mt-5 text-emerald-300 hover:text-emerald-200"><Pencil className="size-4" /> Open builder</Link>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-900 mt-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} {SITE_INFO.title} — Powered by Pulse CMS</div>
          <div className="flex gap-5"><a href="#" className="hover:text-zinc-200">About</a><a href="#" className="hover:text-zinc-200">Privacy</a><a href="#" className="hover:text-zinc-200">Contact</a></div>
        </div>
      </footer>
    </div>
  );
}
