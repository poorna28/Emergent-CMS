import React from 'react';
import { Download, Upload, Database, Activity, Shield, FileJson } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const tools = [
  { icon: Download, title: 'Export', desc: 'Download a portable archive of posts, pages and media as JSON or XML.', cta: 'Start export' },
  { icon: Upload, title: 'Import', desc: 'Bring content in from WordPress, Ghost, Medium or a markdown folder.', cta: 'Choose source' },
  { icon: Database, title: 'Database optimizer', desc: 'Reclaim space and rebuild indexes for faster queries.', cta: 'Run optimize' },
  { icon: Shield, title: 'Site health', desc: 'Check security, SEO, accessibility and performance signals.', cta: 'Run check' },
  { icon: Activity, title: 'Activity log', desc: 'See every change made by editors, plugins and the system.', cta: 'View log' },
  { icon: FileJson, title: 'REST explorer', desc: 'Inspect and try endpoints exposed by your CMS API.', cta: 'Open explorer' },
];

export default function Tools() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Operations</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Tools</h1>
      </div>

      <Card className="bg-zinc-900/60 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">Site health</CardTitle>
          <Badge variant="outline" className="border-emerald-400/30 text-emerald-300 bg-emerald-400/5">Good</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { l: 'Security', v: 92 },
            { l: 'Performance', v: 86 },
            { l: 'SEO', v: 78 },
            { l: 'Accessibility', v: 88 },
          ].map((m, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-sm"><span className="text-zinc-300">{m.l}</span><span className="text-zinc-400 mono text-xs">{m.v}/100</span></div>
              <Progress value={m.v} className="h-1.5 bg-zinc-800 [&>div]:bg-emerald-400" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t, i) => (
          <Card key={i} className="bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardContent className="p-5">
              <div className="size-10 rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/20 grid place-items-center mb-3"><t.icon className="size-5 text-emerald-400" /></div>
              <div className="text-zinc-100 font-medium">{t.title}</div>
              <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{t.desc}</p>
              <Button variant="outline" size="sm" className="mt-3 border-zinc-800 bg-zinc-950 hover:bg-zinc-800">{t.cta}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
