import React, { useState } from 'react';
import { FileCode2, Save, Plus, FolderOpen, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import MonacoLite from '@/components/admin/MonacoLite';

const INITIAL_FILES = [
  { id: 'f1', name: 'theme.css', language: 'css', content: `/* Pulse — theme overrides */\n:root { --site-accent: #10b981; }\n.themed-site .serif { font-feature-settings: "liga", "ss01"; }\n` },
  { id: 'f2', name: 'analytics.js', language: 'javascript', content: `// Analytics bootstrap\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-PULSE');\n` },
  { id: 'f3', name: 'header.html', language: 'html', content: `<!-- Custom HTML banner -->\n<div class="banner">\n  <strong>Pulse Issue 12</strong> — read the latest →\n</div>\n` },
  { id: 'f4', name: 'data.json', language: 'json', content: `{\n  "site": "Pulse Journal",\n  "contributors": 4,\n  "published": true\n}\n` },
];

const EXT_LANG = { css: 'CSS', javascript: 'JS', html: 'HTML', json: 'JSON' };

export default function CodeEditor() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [activeId, setActiveId] = useState(INITIAL_FILES[0].id);
  const { toast } = useToast();
  const active = files.find(f => f.id === activeId) || files[0];
  const update = (content) => setFiles(files.map(f => f.id === activeId ? { ...f, content } : f));
  const rename = (name) => setFiles(files.map(f => f.id === activeId ? { ...f, name } : f));
  const remove = (id) => {
    const next = files.filter(f => f.id !== id);
    setFiles(next);
    if (id === activeId && next[0]) setActiveId(next[0].id);
  };
  const addFile = () => {
    const id = 'f' + Date.now();
    const langs = [{ ext: '.css', l: 'css' }, { ext: '.js', l: 'javascript' }, { ext: '.html', l: 'html' }];
    const pick = langs[files.length % langs.length];
    const newFile = { id, name: 'untitled' + pick.ext, language: pick.l, content: '' };
    setFiles([...files, newFile]);
    setActiveId(id);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Developer</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Code editor</h1>
          <p className="text-sm text-zinc-400 mt-1">Monaco-powered editor for theme files, snippets and custom code.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-zinc-800 bg-zinc-900"><FolderOpen className="size-4 mr-1.5" /> Open</Button>
          <Button onClick={() => toast({ title: 'File saved', description: active?.name })} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950"><Save className="size-4 mr-1.5" /> Save</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        <Card className="bg-zinc-900/60 border-zinc-800 h-fit">
          <CardContent className="p-3">
            <div className="flex items-center justify-between px-2 py-1.5">
              <div className="text-xs uppercase tracking-wider text-zinc-400">Files</div>
              <button onClick={addFile} className="size-6 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 grid place-items-center"><Plus className="size-3.5" /></button>
            </div>
            <div className="space-y-0.5">
              {files.map(f => (
                <div key={f.id} onClick={() => setActiveId(f.id)} className={`group flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer ${activeId === f.id ? 'bg-emerald-400/10 text-emerald-300' : 'text-zinc-300 hover:bg-zinc-800'}`}>
                  <FileCode2 className="size-3.5 text-zinc-500 group-[.bg-emerald-400\/10]:text-emerald-400" />
                  <span className="truncate flex-1 mono text-xs">{f.name}</span>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-500 text-[9px] px-1">{EXT_LANG[f.language]}</Badge>
                  {files.length > 1 && <button onClick={(e) => { e.stopPropagation(); remove(f.id); }} className="size-5 rounded hover:bg-red-500/10 text-zinc-500 hover:text-red-400 grid place-items-center opacity-0 group-hover:opacity-100"><Trash2 className="size-3" /></button>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {active && (
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <Input value={active.name} onChange={(e) => rename(e.target.value)} className="bg-zinc-950 border-zinc-800 mono text-sm h-8 w-64" />
                <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">{active.language}</Badge>
              </div>
              <MonacoLite language={active.language} value={active.content} onChange={update} height={520} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
