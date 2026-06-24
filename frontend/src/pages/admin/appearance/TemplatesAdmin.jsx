import React, { useState } from 'react';
import { Check, Plus, Pencil, Trash2, LayoutTemplate, Code2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useDesign } from '@/design/DesignProvider';
import { uid, WIDTHS, SPACINGS } from '@/design/designStore';

function LayoutDiagram({ layout, accent = '#10b981' }) {
  const cols = Array.from({ length: layout.columns });
  const widthFlex = { narrow: 'mx-10', medium: 'mx-6', wide: 'mx-3', full: 'mx-0' }[layout.width];
  const pad = { compact: 'gap-1.5 py-2', comfortable: 'gap-2 py-3', spacious: 'gap-3 py-4' }[layout.spacing];
  return (
    <div className={`rounded-md bg-zinc-950 border border-zinc-800 h-28 flex flex-col justify-center ${widthFlex}`}>
      <div className={`flex-1 ${pad} flex flex-col`}>
        <div className="h-2 rounded-full bg-zinc-800" style={{ width: '50%' }} />
        <div className={`flex-1 grid gap-1.5`} style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
          {cols.map((_, i) => (
            <div key={i} className="rounded bg-zinc-900 border border-zinc-800" style={{ borderTop: `2px solid ${accent}` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const BLANK = (layoutId) => ({
  id: uid('t'),
  name: 'New template',
  layoutId: layoutId,
  description: 'Describe how this template should be used.',
  customCSS: '',
});

function TemplateEditor({ open, onOpenChange, initial, layouts, onSave }) {
  const [draft, setDraft] = useState(initial || BLANK(layouts[0]?.id));
  React.useEffect(() => { if (open) setDraft(initial || BLANK(layouts[0]?.id)); }, [open, initial, layouts]);
  const layout = layouts.find(l => l.id === draft.layoutId) || layouts[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-zinc-100 flex items-center gap-2"><LayoutTemplate className="size-4 text-emerald-400" /> {initial ? 'Edit template' : 'New template'}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div><div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Name</div><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="bg-zinc-950/60 border-zinc-800" /></div>
            <div><div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Description</div><Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} className="bg-zinc-950/60 border-zinc-800 resize-none" /></div>
            <div>
              <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Layout</div>
              <Select value={draft.layoutId} onValueChange={(v) => setDraft({ ...draft, layoutId: v })}>
                <SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {layouts.map(l => <SelectItem key={l.id} value={l.id}>{l.name} <span className="text-zinc-500 ml-2 text-xs">— {WIDTHS[l.width].label} · {l.columns} col · {SPACINGS[l.spacing].label}</span></SelectItem>)}
                </SelectContent>
              </Select>
              {layout && <div className="mt-3"><LayoutDiagram layout={layout} /></div>}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-xs text-zinc-400 uppercase tracking-wider">Custom CSS</div>
                <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]"><Code2 className="size-3 mr-1" /> scoped to .themed-site</Badge>
              </div>
              <Textarea value={draft.customCSS} onChange={(e) => setDraft({ ...draft, customCSS: e.target.value })} rows={9} placeholder="/* Example */\n.themed-site h1 { letter-spacing: -0.025em; }" className="bg-zinc-950/60 border-zinc-800 mono text-xs resize-none" />
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Preview</div>
            <div className="rounded-xl border border-zinc-800 overflow-hidden">
              <div className="bg-zinc-950 p-4">
                <LayoutDiagram layout={layout} />
                <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">{WIDTHS[layout?.width].label}</Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">{layout?.columns} column</Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">{SPACINGS[layout?.spacing].label}</Badge>
                </div>
              </div>
              {draft.customCSS && (
                <div className="border-t border-zinc-800 bg-zinc-950 p-4">
                  <div className="text-[10px] text-zinc-500 mono mb-1">CUSTOM CSS</div>
                  <pre className="mono text-[11px] text-zinc-300 overflow-x-auto whitespace-pre-wrap">{draft.customCSS}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-zinc-800 bg-zinc-900">Cancel</Button>
          <Button onClick={() => { onSave(draft); onOpenChange(false); }} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950">{initial ? 'Save changes' : 'Create template'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function TemplatesAdmin() {
  const { templates, layouts, activeTemplateId, setActiveTemplate, upsertTemplate, deleteTemplate } = useDesign();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const activate = (id) => { setActiveTemplate(id); toast({ title: 'Template applied', description: templates.find(t => t.id === id)?.name }); };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Templates</h2>
          <p className="text-sm text-zinc-400 mt-0.5">A template = a layout + custom CSS. Active template wraps every public page.</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"><Plus className="size-4 mr-1.5" /> New template</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(t => {
          const layout = layouts.find(l => l.id === t.layoutId) || layouts[0];
          const isActive = t.id === activeTemplateId;
          return (
            <Card key={t.id} className={`bg-zinc-900/60 ${isActive ? 'border-emerald-400/40 ring-1 ring-emerald-400/20' : 'border-zinc-800'} hover:border-zinc-700 transition-colors`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="size-9 rounded-md bg-emerald-400/10 ring-1 ring-emerald-400/20 grid place-items-center shrink-0"><LayoutTemplate className="size-4 text-emerald-400" /></div>
                    <div className="min-w-0">
                      <div className="text-zinc-100 font-medium truncate">{t.name}</div>
                      <div className="text-[11px] text-zinc-500 truncate">{layout?.name}</div>
                    </div>
                  </div>
                  {isActive && <Badge variant="outline" className="border-emerald-400/30 text-emerald-300 bg-emerald-400/5 text-[10px]"><Check className="size-3 mr-0.5" /> Active</Badge>}
                </div>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed line-clamp-2">{t.description}</p>
                <div className="mt-4"><LayoutDiagram layout={layout} /></div>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">{WIDTHS[layout?.width].label}</Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">{layout?.columns} col</Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">{SPACINGS[layout?.spacing].label}</Badge>
                  {t.customCSS && <Badge variant="outline" className="border-emerald-400/30 text-emerald-300 bg-emerald-400/5 text-[10px]">Custom CSS</Badge>}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {!isActive && <Button size="sm" onClick={() => activate(t.id)} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950"><Check className="size-3.5 mr-1" /> Activate</Button>}
                  <Button size="sm" variant="outline" onClick={() => { setEditing(t); setOpen(true); }} className="border-zinc-800 bg-zinc-950"><Pencil className="size-3.5 mr-1" /> Edit</Button>
                  {!isActive && templates.length > 1 && <Button size="sm" variant="outline" onClick={() => deleteTemplate(t.id)} className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 ml-auto"><Trash2 className="size-3.5" /></Button>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <TemplateEditor open={open} onOpenChange={setOpen} initial={editing} layouts={layouts} onSave={(t) => { upsertTemplate(t); toast({ title: editing ? 'Template updated' : 'Template created', description: t.name }); }} />
    </div>
  );
}

export { LayoutDiagram };
