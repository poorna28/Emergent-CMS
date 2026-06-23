import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SITE_INFO } from '@/mock/mock';

const Field = ({ label, hint, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4 border-b border-zinc-800 last:border-0">
    <div className="md:col-span-1"><div className="text-sm text-zinc-200 font-medium">{label}</div>{hint && <div className="text-xs text-zinc-500 mt-1">{hint}</div>}</div>
    <div className="md:col-span-2">{children}</div>
  </div>
);

export default function Settings() {
  const [info, setInfo] = useState(SITE_INFO);
  const { toast } = useToast();
  const save = () => toast({ title: 'Settings saved', description: info.title });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Configuration</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Settings</h1>
        </div>
        <Button onClick={save} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"><Save className="size-4 mr-1.5" /> Save changes</Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="bg-zinc-900/60 border border-zinc-800">
          {['general','writing','reading','discussion','media','permalinks','privacy'].map(t => (
            <TabsTrigger key={t} value={t} className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-300 capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">General</CardTitle></CardHeader>
            <CardContent>
              <Field label="Site title"><Input value={info.title} onChange={e=>setInfo({...info, title:e.target.value})} className="bg-zinc-950/60 border-zinc-800" /></Field>
              <Field label="Tagline" hint="In a few words, what is this site about?"><Input value={info.tagline} onChange={e=>setInfo({...info, tagline:e.target.value})} className="bg-zinc-950/60 border-zinc-800" /></Field>
              <Field label="Site URL"><Input value={info.url} onChange={e=>setInfo({...info, url:e.target.value})} className="bg-zinc-950/60 border-zinc-800" /></Field>
              <Field label="Language">
                <Select value={info.language} onValueChange={v=>setInfo({...info, language:v})}>
                  <SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {['en-US','en-GB','es-ES','fr-FR','de-DE','ja-JP'].map(l=><SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Timezone"><Input value={info.timezone} onChange={e=>setInfo({...info, timezone:e.target.value})} className="bg-zinc-950/60 border-zinc-800" /></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="writing" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Writing</CardTitle></CardHeader>
            <CardContent>
              <Field label="Default post category">
                <Select defaultValue="Design"><SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger><SelectContent className="bg-zinc-900 border-zinc-800">{['Design','Technology','Business','Food','Travel'].map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
              </Field>
              <Field label="Default post format"><Select defaultValue="Standard"><SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger><SelectContent className="bg-zinc-900 border-zinc-800">{['Standard','Aside','Gallery','Quote','Video'].map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></Field>
              <Field label="Markdown editor" hint="Use markdown shortcuts inside the block editor."><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reading" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Reading</CardTitle></CardHeader>
            <CardContent>
              <Field label="Posts per page"><Input defaultValue="10" type="number" className="bg-zinc-950/60 border-zinc-800 w-32" /></Field>
              <Field label="Show full post or summary"><Select defaultValue="Summary"><SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger><SelectContent className="bg-zinc-900 border-zinc-800">{['Summary','Full text'].map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></Field>
              <Field label="Discourage search engines"><Switch className="data-[state=checked]:bg-emerald-500" /></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Discussion</CardTitle></CardHeader>
            <CardContent>
              <Field label="Allow comments"><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></Field>
              <Field label="Require moderation" hint="Hold all comments until approved."><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></Field>
              <Field label="Notify on new comment"><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></Field>
              <Field label="Disallowed keys" hint="One word per line. Comments matching will be marked spam."><Textarea rows={4} defaultValue={'spamword1\nspamword2'} className="bg-zinc-950/60 border-zinc-800 resize-none" /></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Media</CardTitle></CardHeader>
            <CardContent>
              <Field label="Thumbnail size" hint="Width × Height"><div className="flex gap-2"><Input defaultValue="150" className="bg-zinc-950/60 border-zinc-800 w-28" /><Input defaultValue="150" className="bg-zinc-950/60 border-zinc-800 w-28" /></div></Field>
              <Field label="Medium size"><div className="flex gap-2"><Input defaultValue="640" className="bg-zinc-950/60 border-zinc-800 w-28" /><Input defaultValue="640" className="bg-zinc-950/60 border-zinc-800 w-28" /></div></Field>
              <Field label="Organize uploads in month/year folders"><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permalinks" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Permalinks</CardTitle></CardHeader>
            <CardContent>
              <Field label="URL structure" hint="Choose how post URLs are generated.">
                <Select defaultValue="postname"><SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="postname">/sample-post/</SelectItem>
                    <SelectItem value="day">/2025/07/09/sample-post/</SelectItem>
                    <SelectItem value="month">/2025/07/sample-post/</SelectItem>
                    <SelectItem value="numeric">/?p=123</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader><CardTitle className="text-base font-medium">Privacy</CardTitle></CardHeader>
            <CardContent>
              <Field label="Privacy policy page"><Select defaultValue="Privacy Policy"><SelectTrigger className="bg-zinc-950/60 border-zinc-800"><SelectValue /></SelectTrigger><SelectContent className="bg-zinc-900 border-zinc-800">{['Privacy Policy','Terms of Service','About'].map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></Field>
              <Field label="Cookie consent banner"><Switch defaultChecked className="data-[state=checked]:bg-emerald-500" /></Field>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
