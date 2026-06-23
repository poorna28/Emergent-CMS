import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import {
  Trash2, GripVertical, Pencil, ChevronUp, ChevronDown, Eye, Save,
  Plus, X, Layers, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SECTION_TYPES, loadSections, saveSections, makeSection } from '@/components/admin/sections/sectionTypes';
import SectionRenderer from '@/components/admin/sections/SectionRenderer';
import { IMAGES } from '@/mock/mock';

const typeKeys = Object.keys(SECTION_TYPES);

function LibraryItem({ typeKey, onAdd }) {
  const t = SECTION_TYPES[typeKey];
  const Icon = Icons[t.icon] || Icons.Square;
  return (
    <button
      draggable
      onDragStart={(e) => { e.dataTransfer.setData('application/x-pulse-type', typeKey); e.dataTransfer.effectAllowed = 'copy'; }}
      onClick={() => onAdd(typeKey)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-left transition-colors cursor-grab active:cursor-grabbing"
    >
      <div className="size-8 rounded-md bg-emerald-400/10 ring-1 ring-emerald-400/20 grid place-items-center shrink-0"><Icon className="size-4 text-emerald-400" /></div>
      <div className="min-w-0">
        <div className="text-sm text-zinc-100 leading-none">{t.name}</div>
        <div className="text-[11px] text-zinc-500 mt-1 leading-none">{t.group}</div>
      </div>
      <Plus className="size-4 text-zinc-500 ml-auto" />
    </button>
  );
}

function PropertyField({ field, value, onChange }) {
  if (field.type === 'text') return <Input value={value || ''} onChange={(e) => onChange(e.target.value)} className="bg-zinc-950/60 border-zinc-800" />;
  if (field.type === 'textarea') return <Textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={4} className="bg-zinc-950/60 border-zinc-800 resize-none" />;
  if (field.type === 'switch') return <Switch checked={!!value} onCheckedChange={onChange} className="data-[state=checked]:bg-emerald-500" />;
  if (field.type === 'select') return (
    <Select value={String(value)} onValueChange={(v) => onChange(field.options[0] && typeof field.options[0] === 'number' ? Number(v) : v)}>
      <SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger>
      <SelectContent className="bg-zinc-900 border-zinc-800">{field.options.map(o => <SelectItem key={o} value={String(o)}>{String(o)}</SelectItem>)}</SelectContent>
    </Select>
  );
  if (field.type === 'image') return (
    <div className="space-y-2">
      {value && <div className="aspect-video rounded-md overflow-hidden border border-zinc-800"><img src={value} alt="" className="size-full object-cover" /></div>}
      <div className="grid grid-cols-6 gap-1.5">{IMAGES.map((u, i) => (
        <button key={i} onClick={() => onChange(u)} className={`aspect-square rounded overflow-hidden border ${u === value ? 'border-emerald-400' : 'border-zinc-800 hover:border-zinc-600'}`}><img src={u} alt="" className="size-full object-cover" /></button>
      ))}</div>
    </div>
  );
  if (field.type === 'imageList') return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">{(value || []).map((u, i) => (
        <div key={i} className="relative size-14 rounded overflow-hidden border border-zinc-800 group"><img src={u} className="size-full object-cover" alt="" /><button onClick={() => onChange(value.filter((_, j) => j !== i))} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 grid place-items-center text-red-300"><X className="size-4" /></button></div>
      ))}</div>
      <div className="text-[11px] text-zinc-500">Add from library</div>
      <div className="grid grid-cols-6 gap-1.5">{IMAGES.filter(u => !(value || []).includes(u)).map((u, i) => (
        <button key={i} onClick={() => onChange([...(value || []), u])} className="aspect-square rounded overflow-hidden border border-zinc-800 hover:border-emerald-400"><img src={u} alt="" className="size-full object-cover" /></button>
      ))}</div>
    </div>
  );
  if (field.type === 'items') return (
    <div className="space-y-3">
      {(value || []).map((it, i) => (
        <div key={i} className="rounded-md border border-zinc-800 bg-zinc-950/60 p-3 space-y-2 relative">
          <button onClick={() => onChange(value.filter((_, j) => j !== i))} className="absolute top-2 right-2 size-6 rounded hover:bg-zinc-800 text-zinc-500 grid place-items-center"><X className="size-3.5" /></button>
          {field.shape.map(s => (
            <div key={s.key}>
              <div className="text-[11px] text-zinc-500 mb-1">{s.label}</div>
              <Input value={it[s.key] || ''} onChange={(e) => onChange(value.map((x, j) => j === i ? { ...x, [s.key]: e.target.value } : x))} className="bg-zinc-900 border-zinc-800 h-8" />
            </div>
          ))}
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...(value || []), Object.fromEntries(field.shape.map(s => [s.key, '']))])} className="border-zinc-800 bg-zinc-900"><Plus className="size-3.5 mr-1" /> Add item</Button>
    </div>
  );
  return null;
}

export default function PageBuilder() {
  const [sections, setSections] = useState(() => loadSections());
  const [activeId, setActiveId] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const { toast } = useToast();

  useEffect(() => { saveSections(sections); }, [sections]);

  const active = useMemo(() => sections.find(s => s.id === activeId), [activeId, sections]);

  const updateContent = (id, key, val) => setSections(prev => prev.map(s => s.id === id ? { ...s, content: { ...s.content, [key]: val } } : s));
  const move = (idx, dir) => {
    const j = idx + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections]; const [it] = next.splice(idx, 1); next.splice(j, 0, it); setSections(next);
  };
  const removeAt = (id) => { setSections(sections.filter(s => s.id !== id)); if (activeId === id) setActiveId(null); };
  const addType = (type, atIdx = null) => {
    const s = makeSection(type);
    if (atIdx == null) setSections([...sections, s]);
    else { const next = [...sections]; next.splice(atIdx, 0, s); setSections(next); }
    toast({ title: `${SECTION_TYPES[type].name} added` });
  };

  const onDrop = (e, idx) => {
    e.preventDefault();
    setDragOverIdx(null);
    const type = e.dataTransfer.getData('application/x-pulse-type');
    const fromIdx = e.dataTransfer.getData('application/x-pulse-idx');
    if (type) {
      addType(type, idx);
    } else if (fromIdx !== '') {
      const from = Number(fromIdx);
      if (from === idx || from === idx - 1) return;
      const next = [...sections]; const [it] = next.splice(from, 1);
      const to = from < idx ? idx - 1 : idx;
      next.splice(to, 0, it); setSections(next);
    }
  };

  return (
    <div className="-mx-6 lg:-mx-10 -my-8 min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-[300px_1fr] bg-zinc-950">
      <aside className="border-r border-zinc-900 bg-zinc-950 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-5 border-b border-zinc-900">
          <div className="flex items-center gap-2 text-zinc-100"><Layers className="size-4 text-emerald-400" /> <span className="font-medium">Sections</span></div>
          <div className="text-xs text-zinc-500 mt-1">Drag or click to add</div>
        </div>
        <div className="p-3 space-y-1.5">
          {typeKeys.map(k => <LibraryItem key={k} typeKey={k} onAdd={(t) => addType(t)} />)}
        </div>
      </aside>

      <div className="flex flex-col min-w-0">
        <div className="h-14 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur sticky top-16 z-20 flex items-center px-5 gap-3">
          <Link to="/admin" className="size-9 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 grid place-items-center"><ArrowLeft className="size-4" /></Link>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Page builder</div>
            <div className="text-sm text-zinc-100 -mt-0.5">Home — {sections.length} sections</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" asChild className="border-zinc-800 bg-zinc-900"><Link to="/site/preview" target="_blank"><Eye className="size-4 mr-1.5" /> Preview</Link></Button>
            <Button onClick={() => toast({ title: 'Layout saved', description: `${sections.length} sections` })} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950"><Save className="size-4 mr-1.5" /> Save</Button>
          </div>
        </div>

        <div className="flex-1 overflow-x-hidden">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOverIdx(0); }}
            onDrop={(e) => onDrop(e, 0)}
            className={`h-3 mx-4 my-1 rounded transition-colors ${dragOverIdx === 0 ? 'bg-emerald-400/40' : 'bg-transparent'}`}
          />
          {sections.map((s, idx) => {
            const Icon = Icons[SECTION_TYPES[s.type].icon] || Icons.Square;
            return (
              <React.Fragment key={s.id}>
                <div
                  onClick={() => setActiveId(s.id)}
                  className={`group relative mx-4 mb-1 rounded-xl border ${activeId === s.id ? 'border-emerald-400/50 ring-1 ring-emerald-400/20' : 'border-zinc-900 hover:border-zinc-700'} bg-zinc-950 overflow-hidden cursor-pointer`}
                >
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                    <Badge variant="outline" className="border-zinc-800 bg-zinc-950/90 text-zinc-300 text-[10px]"><Icon className="size-3 mr-1 text-emerald-400" />{SECTION_TYPES[s.type].name}</Badge>
                  </div>
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button draggable onDragStart={(e) => { e.dataTransfer.setData('application/x-pulse-idx', String(idx)); e.dataTransfer.effectAllowed = 'move'; }} className="size-8 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-zinc-100 grid place-items-center cursor-grab active:cursor-grabbing" title="Drag to reorder"><GripVertical className="size-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); move(idx, -1); }} className="size-8 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-zinc-100 grid place-items-center" title="Move up"><ChevronUp className="size-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); move(idx, 1); }} className="size-8 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-zinc-100 grid place-items-center" title="Move down"><ChevronDown className="size-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); setActiveId(s.id); }} className="size-8 rounded-md bg-zinc-900/90 border border-zinc-800 text-emerald-300 hover:text-emerald-200 grid place-items-center" title="Edit"><Pencil className="size-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); removeAt(s.id); }} className="size-8 rounded-md bg-zinc-900/90 border border-red-500/30 text-red-400 hover:text-red-300 grid place-items-center" title="Delete"><Trash2 className="size-4" /></button>
                  </div>
                  <div className="pointer-events-none">
                    <SectionRenderer section={s} />
                  </div>
                </div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOverIdx(idx + 1); }}
                  onDragLeave={() => setDragOverIdx(null)}
                  onDrop={(e) => onDrop(e, idx + 1)}
                  className={`h-3 mx-4 my-1 rounded transition-colors ${dragOverIdx === idx + 1 ? 'bg-emerald-400/40' : 'bg-transparent'}`}
                />
              </React.Fragment>
            );
          })}

          {sections.length === 0 && (
            <div className="mx-4 my-6 border border-dashed border-zinc-800 rounded-xl p-16 text-center text-zinc-500">
              Drag a section from the left to start building.
            </div>
          )}

          <div className="mx-4 my-6 border border-dashed border-zinc-800 rounded-xl p-6 text-center text-zinc-500 text-sm">
            Drop more sections here — or use the library on the left
          </div>
        </div>
      </div>

      <Sheet open={!!active} onOpenChange={(o) => { if (!o) setActiveId(null); }}>
        <SheetContent className="bg-zinc-900 border-zinc-800 text-zinc-100 w-full sm:max-w-md overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-zinc-100">
                  <Pencil className="size-4 text-emerald-400" />
                  Edit {SECTION_TYPES[active.type].name}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                {SECTION_TYPES[active.type].fields.length === 0 && <div className="text-sm text-zinc-500">This section has no properties.</div>}
                {SECTION_TYPES[active.type].fields.map(f => (
                  <div key={f.key}>
                    <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">{f.label}</div>
                    <PropertyField field={f} value={active.content[f.key]} onChange={(v) => updateContent(active.id, f.key, v)} />
                  </div>
                ))}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
