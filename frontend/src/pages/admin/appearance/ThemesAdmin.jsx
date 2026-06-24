import React, { useState } from 'react';
import { Check, Plus, Pencil, Trash2, Sparkles, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useDesign, ThemedRoot } from '@/design/DesignProvider';
import { FONT_OPTIONS, uid } from '@/design/designStore';

const BLANK = () => ({
  id: uid('th'),
  name: 'Untitled theme',
  isDark: true,
  colors: { bg: '#0b0b0d', surface: '#161618', text: '#fafafa', muted: '#a1a1aa', accent: '#10b981', accentText: '#062e22', border: '#27272a' },
  fonts: { heading: "'Fraunces', serif", body: "'Inter', sans-serif" },
});

const COLOR_FIELDS = [
  { key: 'bg', label: 'Background' },
  { key: 'surface', label: 'Surface' },
  { key: 'text', label: 'Text' },
  { key: 'muted', label: 'Muted' },
  { key: 'accent', label: 'Accent' },
  { key: 'accentText', label: 'Accent text' },
  { key: 'border', label: 'Border' },
];

function ThemeSwatch({ theme, large = false }) {
  return (
    <div className="flex items-center gap-1">
      {Object.values(theme.colors).slice(0, 5).map((c, i) => (
        <span key={i} style={{ background: c }} className={`${large ? 'size-7' : 'size-4'} rounded-full ring-1 ring-zinc-800`} />
      ))}
    </div>
  );
}

function ThemeEditor({ open, onOpenChange, initial, onSave }) {
  const [draft, setDraft] = useState(initial || BLANK());
  React.useEffect(() => { if (open) setDraft(initial || BLANK()); }, [open, initial]);
  const setColor = (k, v) => setDraft(d => ({ ...d, colors: { ...d.colors, [k]: v } }));
  const setFont = (k, v) => setDraft(d => ({ ...d, fonts: { ...d.fonts, [k]: v } }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-zinc-100 flex items-center gap-2"><Palette className="size-4 text-emerald-400" /> {initial ? 'Edit theme' : 'New theme'}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div><div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Name</div><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="bg-zinc-950/60 border-zinc-800" /></div>
            <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60">
              <span className="text-sm text-zinc-200">Dark theme</span>
              <Switch checked={draft.isDark} onCheckedChange={(v) => setDraft({ ...draft, isDark: v })} className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Colors</div>
              <div className="space-y-2">
                {COLOR_FIELDS.map(f => (
                  <div key={f.key} className="flex items-center gap-3 border border-zinc-800 rounded-md px-3 py-2 bg-zinc-950/60">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="color" value={draft.colors[f.key]} onChange={(e) => setColor(f.key, e.target.value)} className="size-7 rounded-md ring-1 ring-zinc-700 bg-transparent border-0 cursor-pointer" />
                    </label>
                    <div className="flex-1 text-sm text-zinc-200">{f.label}</div>
                    <Input value={draft.colors[f.key]} onChange={(e) => setColor(f.key, e.target.value)} className="w-28 h-8 bg-zinc-900 border-zinc-800 mono text-xs" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Fonts</div>
              <div className="space-y-2">
                {[{ key: 'heading', label: 'Heading' }, { key: 'body', label: 'Body' }].map(({ key, label }) => (
                  <div key={key} className="grid grid-cols-3 items-center gap-3">
                    <div className="text-sm text-zinc-300">{label}</div>
                    <div className="col-span-2">
                      <Select value={draft.fonts[key]} onValueChange={(v) => setFont(key, v)}>
                        <SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 max-h-72">
                          {FONT_OPTIONS.map(f => <SelectItem key={f.family} value={f.family} style={{ fontFamily: f.family }}>{f.name} <span className="text-zinc-500 ml-2 text-xs">{f.category}</span></SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">Live preview</div>
            <ThemedRoot themeOverride={draft}>
              <div className="rounded-xl overflow-hidden border border-zinc-800">
                <div className="bg-zinc-950 px-5 py-7">
                  <div className="text-xs uppercase tracking-widest text-emerald-400">Issue — Preview</div>
                  <div className="serif text-2xl font-semibold leading-tight mt-2 text-zinc-100">A theme that earns the reader’s attention</div>
                  <p className="text-sm text-zinc-400 mt-2">Restraint, contrast, and rhythm — wired into every page automatically.</p>
                  <div className="flex gap-2 mt-4">
                    <button className="bg-emerald-500 text-zinc-950 px-3.5 py-2 rounded-md text-sm font-medium">Primary</button>
                    <button className="border border-zinc-800 text-zinc-200 px-3.5 py-2 rounded-md text-sm">Secondary</button>
                  </div>
                  <div className="mt-4 rounded-lg border border-zinc-900 bg-zinc-900/60 p-4">
                    <div className="text-xs text-zinc-500">Card surface</div>
                    <div className="text-sm text-zinc-200 mt-1">Inline body copy at body font size.</div>
                  </div>
                </div>
              </div>
            </ThemedRoot>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-zinc-800 bg-zinc-900">Cancel</Button>
          <Button onClick={() => { onSave(draft); onOpenChange(false); }} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950">{initial ? 'Save changes' : 'Create theme'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ThemesAdmin() {
  const { themes, activeThemeId, setActiveTheme, upsertTheme, deleteTheme } = useDesign();
  const { toast } = useToast();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const activate = (id) => { setActiveTheme(id); toast({ title: 'Theme applied', description: themes.find(t => t.id === id)?.name }); };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Themes</h2>
          <p className="text-sm text-zinc-400 mt-0.5">Color tokens + fonts. The active theme applies to every public page.</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium">
          <Plus className="size-4 mr-1.5" /> New theme
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map(t => {
          const isActive = t.id === activeThemeId;
          return (
            <Card key={t.id} className={`bg-zinc-900/60 ${isActive ? 'border-emerald-400/40 ring-1 ring-emerald-400/20' : 'border-zinc-800'} hover:border-zinc-700 transition-colors overflow-hidden`}>
              <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${t.colors.bg} 0%, ${t.colors.surface} 100%)` }}>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <div className="serif text-lg font-semibold" style={{ color: t.colors.text, fontFamily: t.fonts.heading }}>{t.name}</div>
                    <div className="text-[11px]" style={{ color: t.colors.muted, fontFamily: t.fonts.body }}>Headline preview</div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] rounded" style={{ background: t.colors.accent, color: t.colors.accentText }}>Accent</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-100 font-medium truncate">{t.name}</span>
                      {isActive && <Badge variant="outline" className="border-emerald-400/30 text-emerald-300 bg-emerald-400/5 text-[10px]"><Check className="size-3 mr-0.5" /> Active</Badge>}
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">{t.isDark ? 'dark' : 'light'}</Badge>
                    </div>
                    <ThemeSwatch theme={t} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {!isActive && <Button size="sm" onClick={() => activate(t.id)} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950"><Check className="size-3.5 mr-1" /> Activate</Button>}
                  <Button size="sm" variant="outline" onClick={() => { setEditing(t); setOpen(true); }} className="border-zinc-800 bg-zinc-950"><Pencil className="size-3.5 mr-1" /> Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => upsertTheme({ ...t, id: uid('th'), name: t.name + ' Copy' })} className="border-zinc-800 bg-zinc-950"><Sparkles className="size-3.5 mr-1" /> Duplicate</Button>
                  {!isActive && themes.length > 1 && (
                    <Button size="sm" variant="outline" onClick={() => deleteTheme(t.id)} className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 ml-auto"><Trash2 className="size-3.5" /></Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ThemeEditor open={open} onOpenChange={setOpen} initial={editing} onSave={(t) => { upsertTheme(t); toast({ title: editing ? 'Theme updated' : 'Theme created', description: t.name }); }} />
    </div>
  );
}
