import React, { useState } from 'react';
import {
  Heading1, Heading2, Heading3, Pilcrow, List, ListOrdered, Code2, Link as LinkIcon,
  Quote, Minus, Image as ImageIcon, MousePointer2, Square, Plus, Trash2, GripVertical,
  ChevronUp, ChevronDown, FileCode
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const BLOCK_TYPES = {
  h1: { name: 'Heading 1', icon: Heading1, tag: 'h1' },
  h2: { name: 'Heading 2', icon: Heading2, tag: 'h2' },
  h3: { name: 'Heading 3', icon: Heading3, tag: 'h3' },
  p: { name: 'Paragraph', icon: Pilcrow, tag: 'p' },
  ul: { name: 'Bullet list', icon: List, tag: 'ul' },
  ol: { name: 'Numbered list', icon: ListOrdered, tag: 'ol' },
  button: { name: 'Button', icon: MousePointer2, tag: 'button' },
  a: { name: 'Link', icon: LinkIcon, tag: 'a' },
  blockquote: { name: 'Quote', icon: Quote, tag: 'blockquote' },
  code: { name: 'Inline code', icon: Code2, tag: 'code' },
  pre: { name: 'Code block', icon: FileCode, tag: 'pre' },
  img: { name: 'Image', icon: ImageIcon, tag: 'img' },
  hr: { name: 'Divider', icon: Minus, tag: 'hr' },
  span: { name: 'Span', icon: Square, tag: 'span' },
  div: { name: 'Custom HTML', icon: FileCode, tag: 'div' },
};

export function makeBlock(type) {
  const id = 'b' + Date.now() + Math.random().toString(36).slice(2, 6);
  const defaults = {
    h1: { content: 'A bold headline' },
    h2: { content: 'Section heading' },
    h3: { content: 'Smaller heading' },
    p: { content: 'A paragraph of body copy. Edit me freely.' },
    ul: { items: ['First item', 'Second item', 'Third item'] },
    ol: { items: ['Step one', 'Step two', 'Step three'] },
    button: { content: 'Click me', href: '#' },
    a: { content: 'Read the docs', href: '#' },
    blockquote: { content: 'A memorable quote, attributed below.', author: 'Author' },
    code: { content: 'const ok = true;' },
    pre: { content: 'function greet(name) {\n  return `Hello, ${name}`;\n}' },
    img: { src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=900', alt: 'Image' },
    hr: {},
    span: { content: 'Inline text' },
    div: { html: '<div class="my-card">\n  <strong>Custom HTML</strong>\n  <p>Anything goes here.</p>\n</div>' },
  };
  return { id, type, className: '', ...(defaults[type] || {}) };
}

function BlockRow({ block, onChange, onDelete, onMove }) {
  const meta = BLOCK_TYPES[block.type];
  const Icon = meta?.icon || Square;
  const set = (patch) => onChange({ ...block, ...patch });

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950/60">
      <div className="flex items-center gap-2 px-2.5 py-2 border-b border-zinc-800/60">
        <GripVertical className="size-3.5 text-zinc-600 cursor-grab" />
        <Icon className="size-3.5 text-emerald-400" />
        <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] mono">{meta?.tag}</Badge>
        <span className="text-xs text-zinc-300">{meta?.name}</span>
        <div className="ml-auto flex items-center gap-0.5">
          <button onClick={() => onMove(-1)} className="size-6 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-100 grid place-items-center"><ChevronUp className="size-3.5" /></button>
          <button onClick={() => onMove(1)} className="size-6 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-100 grid place-items-center"><ChevronDown className="size-3.5" /></button>
          <button onClick={onDelete} className="size-6 rounded hover:bg-red-500/10 text-zinc-500 hover:text-red-400 grid place-items-center"><Trash2 className="size-3.5" /></button>
        </div>
      </div>
      <div className="p-2.5 space-y-2">
        {block.type === 'div' ? (
          <Textarea value={block.html || ''} onChange={(e) => set({ html: e.target.value })} rows={5} className="bg-zinc-900 border-zinc-800 mono text-xs resize-none" placeholder="<div>...</div>" />
        ) : block.type === 'ul' || block.type === 'ol' ? (
          <div className="space-y-1.5">
            {(block.items || []).map((it, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 mono w-5">{i + 1}.</span>
                <Input value={it} onChange={(e) => set({ items: block.items.map((x, j) => j === i ? e.target.value : x) })} className="bg-zinc-900 border-zinc-800 h-8 flex-1" />
                <button onClick={() => set({ items: block.items.filter((_, j) => j !== i) })} className="size-7 rounded hover:bg-red-500/10 text-zinc-500 hover:text-red-400 grid place-items-center"><Trash2 className="size-3" /></button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => set({ items: [...(block.items || []), 'New item'] })} className="border-zinc-800 bg-zinc-900 h-7 text-xs"><Plus className="size-3 mr-1" /> Item</Button>
          </div>
        ) : block.type === 'img' ? (
          <div className="space-y-1.5">
            <Input value={block.src || ''} onChange={(e) => set({ src: e.target.value })} placeholder="https://image.url" className="bg-zinc-900 border-zinc-800 h-8 mono text-xs" />
            <Input value={block.alt || ''} onChange={(e) => set({ alt: e.target.value })} placeholder="Alt text" className="bg-zinc-900 border-zinc-800 h-8" />
          </div>
        ) : block.type === 'a' || block.type === 'button' ? (
          <div className="space-y-1.5">
            <Input value={block.content || ''} onChange={(e) => set({ content: e.target.value })} placeholder="Label" className="bg-zinc-900 border-zinc-800 h-8" />
            <Input value={block.href || ''} onChange={(e) => set({ href: e.target.value })} placeholder="/path or https://..." className="bg-zinc-900 border-zinc-800 h-8 mono text-xs" />
          </div>
        ) : block.type === 'blockquote' ? (
          <div className="space-y-1.5">
            <Textarea value={block.content || ''} onChange={(e) => set({ content: e.target.value })} rows={3} className="bg-zinc-900 border-zinc-800 resize-none" />
            <Input value={block.author || ''} onChange={(e) => set({ author: e.target.value })} placeholder="Author" className="bg-zinc-900 border-zinc-800 h-8" />
          </div>
        ) : block.type === 'pre' ? (
          <Textarea value={block.content || ''} onChange={(e) => set({ content: e.target.value })} rows={6} className="bg-zinc-900 border-zinc-800 mono text-xs resize-none" />
        ) : block.type === 'hr' ? (
          <div className="text-xs text-zinc-500 italic">A horizontal divider — no content.</div>
        ) : (
          <Textarea value={block.content || ''} onChange={(e) => set({ content: e.target.value })} rows={2} className="bg-zinc-900 border-zinc-800 resize-none" />
        )}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">CSS class</span>
          <Input value={block.className || ''} onChange={(e) => set({ className: e.target.value })} placeholder="my-custom-class hover:underline" className="bg-zinc-900 border-zinc-800 h-7 flex-1 mono text-xs" />
        </div>
      </div>
    </div>
  );
}

export default function SectionBlocks({ blocks = [], onChange, parentClassName = '', onParentClassChange }) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const add = (type) => { onChange([...blocks, makeBlock(type)]); setPickerOpen(false); };
  const update = (id, next) => onChange(blocks.map(b => b.id === id ? next : b));
  const remove = (id) => onChange(blocks.filter(b => b.id !== id));
  const move = (id, dir) => {
    const idx = blocks.findIndex(b => b.id === id);
    const j = idx + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks]; const [it] = next.splice(idx, 1); next.splice(j, 0, it); onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-md border border-zinc-800 bg-zinc-950/60 p-3">
        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">Parent wrapper class</div>
        <Input value={parentClassName} onChange={(e) => onParentClassChange(e.target.value)} placeholder="section-block-wrapper extra-padding" className="bg-zinc-900 border-zinc-800 h-8 mono text-xs" />
        <div className="text-[10px] text-zinc-500 mt-1.5">Applied to the &lt;div&gt; that wraps all blocks below.</div>
      </div>

      <div className="space-y-2">
        {blocks.map(b => (
          <BlockRow key={b.id} block={b} onChange={(n) => update(b.id, n)} onDelete={() => remove(b.id)} onMove={(d) => move(b.id, d)} />
        ))}
        {blocks.length === 0 && <div className="text-xs text-zinc-500 text-center py-6 border border-dashed border-zinc-800 rounded-md">No inner blocks yet. Pick a tag below to add one.</div>}
      </div>

      <div className="rounded-md border border-zinc-800 bg-zinc-950/60 p-2.5">
        <button onClick={() => setPickerOpen(!pickerOpen)} className="w-full flex items-center justify-between text-sm text-zinc-200">
          <span className="flex items-center gap-1.5"><Plus className="size-3.5 text-emerald-400" /> Add inner block</span>
          <span className="text-[11px] text-zinc-500">{pickerOpen ? 'Close' : 'Pick a tag'}</span>
        </button>
        {pickerOpen && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 mt-3">
            {Object.entries(BLOCK_TYPES).map(([k, t]) => (
              <button key={k} onClick={() => add(k)} className="flex flex-col items-center gap-1.5 p-2 rounded-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 transition-colors">
                <t.icon className="size-4 text-emerald-400" />
                <span className="text-[11px] text-zinc-300">{t.name}</span>
                <span className="text-[10px] text-zinc-600 mono">&lt;{t.tag}&gt;</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
