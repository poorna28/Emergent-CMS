import React, { useState } from 'react';
import { Languages as LangIcon, Plus, Check, Trash2, Globe, FileText, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const SUPPORTED = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', rtl: true },
  { code: 'he', name: 'עברית', flag: '🇮🇱', rtl: true },
];

const INITIAL = [
  { code: 'en', name: 'English', flag: '🇬🇧', isDefault: true, published: true, progress: 100 },
  { code: 'es', name: 'Español', flag: '🇪🇸', isDefault: false, published: true, progress: 92 },
  { code: 'fr', name: 'Français', flag: '🇫🇷', isDefault: false, published: true, progress: 78 },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', isDefault: false, published: false, progress: 34 },
];

const INITIAL_KEYS = [
  { key: 'hero.title', en: 'Editorial software, slow ideas, and the craft of shipping.', es: 'Software editorial, ideas pausadas y el oficio de publicar.', fr: 'Logiciel éditorial, idées lentes et l’art de publier.', de: '' },
  { key: 'hero.subtitle', en: 'A weekly journal on calm, considered work.', es: 'Un diario semanal sobre trabajo calmado y reflexionado.', fr: 'Un journal hebdomadaire sur le travail calme et réfléchi.', de: '' },
  { key: 'cta.subscribe', en: 'Subscribe', es: 'Suscribirse', fr: 'S’abonner', de: 'Abonnieren' },
  { key: 'cta.read_latest', en: 'Read latest', es: 'Leer lo último', fr: 'Lire les derniers', de: 'Aktuelles lesen' },
  { key: 'nav.home', en: 'Home', es: 'Inicio', fr: 'Accueil', de: 'Startseite' },
  { key: 'nav.about', en: 'About', es: 'Acerca de', fr: 'À propos', de: 'Über' },
  { key: 'footer.copyright', en: '© 2025 Pulse Journal', es: '© 2025 Pulse Journal', fr: '© 2025 Pulse Journal', de: '' },
];

export default function Languages() {
  const [langs, setLangs] = useState(INITIAL);
  const [keys] = useState(INITIAL_KEYS);
  const [keyQ, setKeyQ] = useState('');
  const [open, setOpen] = useState(false);
  const [newLang, setNewLang] = useState('it');
  const { toast } = useToast();

  const filtered = keys.filter(k => k.key.toLowerCase().includes(keyQ.toLowerCase()));
  const setDefault = (code) => setLangs(langs.map(l => ({ ...l, isDefault: l.code === code })));
  const togglePublish = (code) => setLangs(langs.map(l => l.code === code ? { ...l, published: !l.published } : l));
  const remove = (code) => setLangs(langs.filter(l => l.code !== code));
  const add = () => {
    const found = SUPPORTED.find(s => s.code === newLang);
    if (!found || langs.some(l => l.code === newLang)) return;
    setLangs([...langs, { ...found, isDefault: false, published: false, progress: 0 }]);
    setOpen(false);
    toast({ title: 'Language added', description: found.name });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Internationalization</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Languages</h1>
          <p className="text-sm text-zinc-400 mt-1">{langs.length} languages · {langs.filter(l => l.published).length} published</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950"><Plus className="size-4 mr-1.5" /> Add language</Button></DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader><DialogTitle>Add a language</DialogTitle></DialogHeader>
            <Select value={newLang} onValueChange={setNewLang}>
              <SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 max-h-72">
                {SUPPORTED.filter(s => !langs.some(l => l.code === s.code)).map(s => <SelectItem key={s.code} value={s.code}><span className="mr-2">{s.flag}</span>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <DialogFooter><Button variant="outline" onClick={() => setOpen(false)} className="border-zinc-800 bg-zinc-900">Cancel</Button><Button onClick={add} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950">Add</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="langs">
        <TabsList className="bg-zinc-900/60 border border-zinc-800">
          <TabsTrigger value="langs" className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-300"><Globe className="size-3.5 mr-1.5" /> Languages</TabsTrigger>
          <TabsTrigger value="translations" className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-300"><FileText className="size-3.5 mr-1.5" /> Translation strings</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-300"><LangIcon className="size-3.5 mr-1.5" /> Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="langs" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {langs.map(l => (
              <Card key={l.code} className="bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2"><span className="text-2xl">{l.flag}</span><span className="text-zinc-100 font-medium">{l.name}</span></div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] mono">{l.code}</Badge>
                        {l.isDefault && <Badge variant="outline" className="border-emerald-400/30 text-emerald-300 bg-emerald-400/5 text-[10px]"><Check className="size-3 mr-0.5" /> Default</Badge>}
                        {l.rtl && <Badge variant="outline" className="border-amber-400/30 text-amber-300 bg-amber-400/5 text-[10px]">RTL</Badge>}
                      </div>
                    </div>
                    <Switch checked={l.published} onCheckedChange={() => togglePublish(l.code)} className="data-[state=checked]:bg-emerald-500" />
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs"><span className="text-zinc-400">Translation coverage</span><span className="mono text-zinc-300">{l.progress}%</span></div>
                    <Progress value={l.progress} className="h-1.5 bg-zinc-800 [&>div]:bg-emerald-400" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    {!l.isDefault && <Button size="sm" variant="outline" onClick={() => setDefault(l.code)} className="border-zinc-800 bg-zinc-950">Set default</Button>}
                    {!l.isDefault && <Button size="sm" variant="outline" onClick={() => remove(l.code)} className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 ml-auto"><Trash2 className="size-3.5" /></Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="translations" className="mt-4 space-y-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
            <Input value={keyQ} onChange={(e) => setKeyQ(e.target.value)} placeholder="Search keys" className="pl-9 bg-zinc-900/60 border-zinc-800" />
          </div>
          <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider">
                <tr><th className="px-4 py-3 text-left mono">Key</th>{langs.map(l => <th key={l.code} className="px-4 py-3 text-left"><span className="mr-1.5">{l.flag}</span>{l.code}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {filtered.map(row => (
                  <tr key={row.key} className="hover:bg-zinc-800/30">
                    <td className="px-4 py-3"><span className="mono text-xs text-emerald-300">{row.key}</span></td>
                    {langs.map(l => {
                      const val = row[l.code];
                      return (
                        <td key={l.code} className="px-4 py-3 max-w-xs">
                          {val ? (
                            <div className="flex items-start gap-1.5"><CheckCircle2 className="size-3 text-emerald-400 mt-0.5 shrink-0" /><span className="text-zinc-300 line-clamp-2">{val}</span></div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-amber-400"><AlertCircle className="size-3.5" /><span className="text-xs">Missing</span></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">i18n settings</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">URL strategy</span><Select defaultValue="prefix"><SelectTrigger className="w-48 h-8 bg-zinc-900 border-zinc-800"><SelectValue /></SelectTrigger><SelectContent className="bg-zinc-900 border-zinc-800"><SelectItem value="prefix">/es/path</SelectItem><SelectItem value="subdomain">es.site.com</SelectItem><SelectItem value="domain">example.es</SelectItem><SelectItem value="query">?lang=es</SelectItem></SelectContent></Select></div>
              <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Auto-detect visitor language</span><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></div>
              <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Show language switcher in header</span><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></div>
              <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Translate slugs automatically</span><Switch className="data-[state=checked]:bg-emerald-500" /></div>
              <div className="flex items-center justify-between border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-950/60"><span className="text-zinc-200">Fall back to default language</span><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
