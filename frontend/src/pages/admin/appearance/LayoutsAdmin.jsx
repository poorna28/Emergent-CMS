import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Columns, Maximize2, AlignVerticalSpaceAround } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useDesign } from '@/design/DesignProvider';
import { uid, WIDTHS, SPACINGS } from '@/design/designStore';
import { LayoutDiagram } from './TemplatesAdmin';

const BLANK = () => ({ id: uid('l'), name: 'New layout', width: 'medium', columns: 1, spacing: 'comfortable' });

function Picker({ label, value, options, onChange }) {
  return (
    <div>
      <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">{label}</div>
      <div className="flex gap-1.5 flex-wrap">
        {options.map(o => (
          <button key={o.key} onClick={() => onChange(o.key)} className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${value === o.key ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'}`}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}

function LayoutEditor({ open, onOpenChange, initial, onSave }) {
  const [draft, setDraft] = useState(initial || BLANK());
  React.useEffect(() => { if (open) setDraft(initial || BLANK()); }, [open, initial]);

  const widthOpts = Object.entries(WIDTHS).map(([k, v]) => ({ key: k, label: v.label }));
  const spaceOpts = Object.entries(SPACINGS).map(([k, v]) => ({ key: k, label: v.label }));
  const colOpts = [{ key: 1, label: '1 column' }, { key: 2, label: '2 columns' }, { key: 3, label: '3 columns' }, { key: 4, label: '4 columns' }];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl">
        <DialogHeader><DialogTitle className="text-zinc-100">{initial ? 'Edit layout' : 'New layout'}</DialogTitle></DialogHeader>
        <div className="space-y-5">
          <div><div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Name</div><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="bg-zinc-950/60 border-zinc-800" /></div>
          <Picker label="Width" value={draft.width} options={widthOpts} onChange={(v) => setDraft({ ...draft, width: v })} />
          <Picker label="Columns" value={draft.columns} options={colOpts} onChange={(v) => setDraft({ ...draft, columns: v })} />
          <Picker label="Spacing" value={draft.spacing} options={spaceOpts} onChange={(v) => setDraft({ ...draft, spacing: v })} />
          <div>
            <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Preview</div>
            <LayoutDiagram layout={draft} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-zinc-800 bg-zinc-900">Cancel</Button>
          <Button onClick={() => { onSave(draft); onOpenChange(false); }} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950">{initial ? 'Save' : 'Create layout'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function LayoutsAdmin() {
  const { layouts, templates, upsertLayout, deleteLayout } = useDesign();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Layouts</h2>
          <p className="text-sm text-zinc-400 mt-0.5">Set width, columns and spacing — then assign to one or more templates.</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"><Plus className="size-4 mr-1.5" /> New layout</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {layouts.map(l => {
          const usedBy = templates.filter(t => t.layoutId === l.id);
          return (
            <Card key={l.id} className="bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-zinc-100 font-medium">{l.name}</div>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">{usedBy.length} template{usedBy.length === 1 ? '' : 's'}</Badge>
                </div>
                <div className="mt-3"><LayoutDiagram layout={l} /></div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                  <div className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-2 flex items-center gap-1.5"><Maximize2 className="size-3 text-emerald-400" /><span className="text-zinc-300">{WIDTHS[l.width].label}</span></div>
                  <div className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-2 flex items-center gap-1.5"><Columns className="size-3 text-emerald-400" /><span className="text-zinc-300">{l.columns} col</span></div>
                  <div className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-2 flex items-center gap-1.5"><AlignVerticalSpaceAround className="size-3 text-emerald-400" /><span className="text-zinc-300">{SPACINGS[l.spacing].label}</span></div>
                </div>
                {usedBy.length > 0 && (
                  <div className="mt-3 flex items-center gap-1 flex-wrap">
                    {usedBy.map(t => <Badge key={t.id} variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">{t.name}</Badge>)}
                  </div>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditing(l); setOpen(true); }} className="border-zinc-800 bg-zinc-950"><Pencil className="size-3.5 mr-1" /> Edit</Button>
                  {usedBy.length === 0 && layouts.length > 1 && (
                    <Button size="sm" variant="outline" onClick={() => deleteLayout(l.id)} className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 ml-auto"><Trash2 className="size-3.5" /></Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <LayoutEditor open={open} onOpenChange={setOpen} initial={editing} onSave={(l) => { upsertLayout(l); toast({ title: editing ? 'Layout updated' : 'Layout created', description: l.name }); }} />
    </div>
  );
}
