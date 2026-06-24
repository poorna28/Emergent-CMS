import React, { useState } from 'react';
import { Globe, Code2, Type, Save, Plus, Trash2, FileCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import MonacoLite from '@/components/admin/MonacoLite';

const SAMPLE_CSS = `/* Custom global CSS */
:root {
  --site-accent: #10b981;
}
body {
  font-feature-settings: "ss01";
}
.themed-site h1 { letter-spacing: -0.025em; }
`;

const SAMPLE_JS = `// Custom global JavaScript
// Runs once after the public site mounts.
(function () {
  console.log('Pulse Journal — ready');
})();
`;

const SAMPLE_HTML = `<!-- Injected before </head> -->
<meta name="theme-color" content="#0a0a0a" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
`;

export default function GlobalCustom() {
  const [css, setCss] = useState(SAMPLE_CSS);
  const [js, setJs] = useState(SAMPLE_JS);
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [vars, setVars] = useState([
    { id: 'v1', key: 'BRAND_NAME', value: 'Pulse Journal' },
    { id: 'v2', key: 'GA_ID', value: 'G-XXXXXXX' },
    { id: 'v3', key: 'SUPPORT_EMAIL', value: 'hello@pulse.journal' },
  ]);
  const { toast } = useToast();

  const addVar = () => setVars([...vars, { id: 'v' + Date.now(), key: 'NEW_KEY', value: '' }]);
  const editVar = (id, patch) => setVars(vars.map(v => v.id === id ? { ...v, ...patch } : v));
  const removeVar = (id) => setVars(vars.filter(v => v.id !== id));

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Global custom code</h2>
          <p className="text-sm text-zinc-400 mt-0.5">CSS, JavaScript and HTML head snippets injected into every public page. Plus reusable global variables.</p>
        </div>
        <Button onClick={() => toast({ title: 'Global code saved', description: 'Applied across the site' })} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950"><Save className="size-4 mr-1.5" /> Save changes</Button>
      </div>

      <Tabs defaultValue="css">
        <TabsList className="bg-zinc-900/60 border border-zinc-800">
          <TabsTrigger value="css" className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-300"><Type className="size-3.5 mr-1.5" /> CSS</TabsTrigger>
          <TabsTrigger value="js" className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-300"><Code2 className="size-3.5 mr-1.5" /> JavaScript</TabsTrigger>
          <TabsTrigger value="html" className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-300"><FileCode className="size-3.5 mr-1.5" /> Head HTML</TabsTrigger>
          <TabsTrigger value="vars" className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-300"><Globe className="size-3.5 mr-1.5" /> Variables</TabsTrigger>
        </TabsList>

        <TabsContent value="css" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base font-medium">Global CSS</CardTitle><Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">applied site-wide</Badge></CardHeader>
            <CardContent><MonacoLite language="css" value={css} onChange={setCss} height={400} /></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="js" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base font-medium">Global JavaScript</CardTitle><Badge variant="outline" className="border-amber-400/30 text-amber-300 bg-amber-400/5 text-[10px]">runs after mount</Badge></CardHeader>
            <CardContent><MonacoLite language="javascript" value={js} onChange={setJs} height={400} /></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="html" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base font-medium">HTML head snippet</CardTitle><Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">injected before &lt;/head&gt;</Badge></CardHeader>
            <CardContent><MonacoLite language="html" value={html} onChange={setHtml} height={300} /></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vars" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Global variables</CardTitle>
              <Button size="sm" variant="outline" onClick={addVar} className="border-zinc-800 bg-zinc-950"><Plus className="size-3.5 mr-1" /> New</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {vars.map(v => (
                <div key={v.id} className="flex items-center gap-2 border border-zinc-800 rounded-md p-2 bg-zinc-950/60">
                  <Input value={v.key} onChange={(e) => editVar(v.id, { key: e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_') })} className="bg-zinc-900 border-zinc-800 h-8 w-48 mono text-xs uppercase" />
                  <Input value={v.value} onChange={(e) => editVar(v.id, { value: e.target.value })} placeholder="value" className="bg-zinc-900 border-zinc-800 h-8 flex-1 mono text-xs" />
                  <button onClick={() => removeVar(v.id)} className="size-7 rounded hover:bg-red-500/10 text-red-400 grid place-items-center"><Trash2 className="size-3.5" /></button>
                </div>
              ))}
              <div className="text-xs text-zinc-500 pt-1">Use in posts and pages with <code className="mono bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">{'{{VAR_NAME}}'}</code></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
