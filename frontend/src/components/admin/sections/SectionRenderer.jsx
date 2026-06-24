import React from 'react';
import {
  ArrowRight, Quote, Type, Clock, Users, Sparkles, Image as ImageIcon,
  Code2, Mail, Plus, Minus, Grid3x3, Layers, Smartphone, Eye
} from 'lucide-react';
import { BLOCK_TYPES } from './SectionBlocks';

const featureIcons = { Type, Clock, Users, Sparkles, Image: ImageIcon, Code2, Grid3x3, Layers, Smartphone, Plus, Eye };

function ExtraBlock({ block }) {
  const cls = block.className || '';
  switch (block.type) {
    case 'h1': return <h1 className={`serif text-4xl font-semibold tracking-tight ${cls}`}>{block.content}</h1>;
    case 'h2': return <h2 className={`serif text-3xl font-semibold tracking-tight ${cls}`}>{block.content}</h2>;
    case 'h3': return <h3 className={`serif text-2xl font-semibold ${cls}`}>{block.content}</h3>;
    case 'p': return <p className={`text-zinc-300 leading-relaxed ${cls}`}>{block.content}</p>;
    case 'span': return <span className={`text-zinc-300 ${cls}`}>{block.content}</span>;
    case 'ul': return <ul className={`list-disc pl-6 space-y-1 text-zinc-300 ${cls}`}>{(block.items || []).map((it, i) => <li key={i}>{it}</li>)}</ul>;
    case 'ol': return <ol className={`list-decimal pl-6 space-y-1 text-zinc-300 ${cls}`}>{(block.items || []).map((it, i) => <li key={i}>{it}</li>)}</ol>;
    case 'button': return <button className={`bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-md text-sm font-medium transition-colors ${cls}`}>{block.content}</button>;
    case 'a': return <a href={block.href || '#'} className={`text-emerald-400 hover:text-emerald-300 underline-offset-4 hover:underline ${cls}`}>{block.content}</a>;
    case 'blockquote': return <blockquote className={`border-l-2 border-emerald-400 pl-4 italic text-zinc-300 ${cls}`}>{block.content}<footer className="text-sm text-zinc-500 not-italic mt-2">— {block.author}</footer></blockquote>;
    case 'code': return <code className={`mono text-sm bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-emerald-300 ${cls}`}>{block.content}</code>;
    case 'pre': return <pre className={`mono text-sm bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-zinc-200 ${cls}`}><code>{block.content}</code></pre>;
    case 'img': return <img src={block.src} alt={block.alt} className={`rounded-lg w-full ${cls}`} />;
    case 'hr': return <hr className={`border-zinc-800 ${cls}`} />;
    case 'div': return <div className={cls} dangerouslySetInnerHTML={{ __html: block.html || '' }} />;
    default: return null;
  }
}

function ExtraBlocks({ section }) {
  const blocks = section.extraBlocks || [];
  if (blocks.length === 0) return null;
  return (
    <div className={`max-w-3xl mx-auto px-6 lg:px-10 py-6 space-y-4 ${section.extraClass || ''}`}>
      {blocks.map(b => <ExtraBlock key={b.id} block={b} />)}
    </div>
  );
}

export default function SectionRenderer({ section, dark = true }) {
  if (section.customHTML) {
    return (
      <>
        {section.customCSS && <style>{section.customCSS}</style>}
        <div className="themed-custom-section" dangerouslySetInnerHTML={{ __html: section.customHTML }} />
      </>
    );
  }
  return (
    <>
      <SectionBody section={section} />
      <ExtraBlocks section={section} />
    </>
  );
}

function SectionBody({ section }) {
  const c = section.content || {};
  switch (section.type) {
    case 'hero':
      return (
        <section className="relative overflow-hidden border-b border-zinc-900">
          <div className="absolute inset-0"><img src={c.image} alt="" className="size-full object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/85 to-zinc-950" /></div>
          <div className={`relative max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-32 ${c.align === 'center' ? 'text-center' : ''}`}>
            {c.eyebrow && <div className="text-xs uppercase tracking-[0.18em] text-emerald-400">{c.eyebrow}</div>}
            <h1 className="mt-3 serif text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">{c.title}</h1>
            {c.subtitle && <p className="mt-5 text-lg text-zinc-300 max-w-2xl leading-relaxed">{c.subtitle}</p>}
            {c.ctaLabel && (
              <div className={`mt-7 flex gap-3 ${c.align === 'center' ? 'justify-center' : ''}`}>
                <button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium px-5 py-2.5 rounded-md inline-flex items-center gap-1.5 transition-colors">{c.ctaLabel} <ArrowRight className="size-4" /></button>
                <button className="border border-zinc-800 hover:bg-zinc-900 text-zinc-200 px-5 py-2.5 rounded-md transition-colors">Read latest</button>
              </div>
            )}
          </div>
        </section>
      );

    case 'heading': {
      const Tag = `h${c.level || 2}`;
      const sizes = { 2: 'text-3xl md:text-4xl', 3: 'text-2xl md:text-3xl', 4: 'text-xl md:text-2xl' };
      return <section className="max-w-3xl mx-auto px-6 lg:px-10 py-6"><Tag className={`serif font-semibold tracking-tight ${sizes[c.level || 2]}`}>{c.text}</Tag></section>;
    }

    case 'paragraph':
      return <section className="max-w-3xl mx-auto px-6 lg:px-10 py-4"><p className="text-zinc-300 leading-[1.8] text-[17px]">{c.text}</p></section>;

    case 'image':
      return (
        <section className="max-w-4xl mx-auto px-6 lg:px-10 py-6">
          <div className="rounded-xl overflow-hidden border border-zinc-900"><img src={c.url} alt={c.caption} className="w-full object-cover" /></div>
          {c.caption && <div className="text-xs text-zinc-500 mt-2 text-center">{c.caption}</div>}
        </section>
      );

    case 'split':
      return (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16 border-b border-zinc-900">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${c.reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-zinc-900"><img src={c.image} alt="" className="size-full object-cover" /></div>
            <div>
              <h3 className="serif text-3xl font-semibold tracking-tight leading-tight">{c.title}</h3>
              <p className="mt-4 text-zinc-400 leading-relaxed">{c.text}</p>
              <button className="mt-5 text-emerald-400 hover:text-emerald-300 text-sm inline-flex items-center gap-1">Learn more <ArrowRight className="size-3.5" /></button>
            </div>
          </div>
        </section>
      );

    case 'gallery':
      return (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(c.images || []).map((u, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border border-zinc-900 group"><img src={u} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
            ))}
          </div>
        </section>
      );

    case 'quote':
      return (
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
          <Quote className="size-8 text-emerald-400 mb-4" />
          <blockquote className="serif text-2xl md:text-3xl font-medium leading-snug text-zinc-100">“{c.text}”</blockquote>
          <div className="mt-5 text-sm text-zinc-400"><span className="text-zinc-200">{c.author}</span>{c.role && ` — ${c.role}`}</div>
        </section>
      );

    case 'cta':
      return (
        <section className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-6 md:px-12 py-12 text-center">
            <h3 className="serif text-3xl md:text-4xl font-semibold tracking-tight">{c.title}</h3>
            {c.subtitle && <p className="mt-3 text-zinc-300">{c.subtitle}</p>}
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium px-5 py-2.5 rounded-md">{c.label}</button>
              {c.secondary && <button className="border border-zinc-800 hover:bg-zinc-900 text-zinc-200 px-5 py-2.5 rounded-md">{c.secondary}</button>}
            </div>
          </div>
        </section>
      );

    case 'stats':
      return (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-14 border-b border-zinc-900">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(c.items || []).map((it, i) => (
              <div key={i} className="rounded-xl border border-zinc-900 bg-zinc-950 p-6">
                <div className="serif text-4xl font-semibold text-zinc-100">{it.value}</div>
                <div className="text-sm text-zinc-500 mt-1">{it.label}</div>
              </div>
            ))}
          </div>
        </section>
      );

    case 'testimonial':
      return (
        <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-8 md:p-10 flex flex-col md:flex-row gap-7 items-start">
            <img src={c.image} alt="" className="size-20 rounded-full object-cover ring-1 ring-zinc-800 shrink-0" />
            <div>
              <Quote className="size-6 text-emerald-400" />
              <p className="serif text-xl md:text-2xl text-zinc-100 mt-2 leading-snug">“{c.quote}”</p>
              <div className="mt-4 text-sm"><span className="text-zinc-200">{c.author}</span><span className="text-zinc-500"> — {c.role}</span></div>
            </div>
          </div>
        </section>
      );

    case 'features':
      return (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16 border-b border-zinc-900">
          {c.title && <h3 className="serif text-3xl md:text-4xl font-semibold tracking-tight mb-10 max-w-2xl">{c.title}</h3>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(c.items || []).map((it, i) => {
              const Icon = featureIcons[it.icon] || Sparkles;
              return (
                <div key={i} className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 hover:border-zinc-700 transition-colors">
                  <div className="size-10 rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/20 grid place-items-center"><Icon className="size-5 text-emerald-400" /></div>
                  <div className="mt-4 text-zinc-100 font-medium">{it.title}</div>
                  <div className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{it.text}</div>
                </div>
              );
            })}
          </div>
        </section>
      );

    case 'faq':
      return (
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
          {c.title && <h3 className="serif text-3xl font-semibold mb-8">{c.title}</h3>}
          <div className="divide-y divide-zinc-900 border-y border-zinc-900">
            {(c.items || []).map((it, i) => (
              <details key={i} className="group py-4">
                <summary className="cursor-pointer flex items-center justify-between text-zinc-100"><span className="font-medium">{it.q}</span><Plus className="size-4 text-zinc-500 group-open:rotate-45 transition-transform" /></summary>
                <p className="mt-3 text-zinc-400 leading-relaxed">{it.a}</p>
              </details>
            ))}
          </div>
        </section>
      );

    case 'newsletter':
      return (
        <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-10 text-center">
            <Mail className="size-6 text-emerald-400 mx-auto" />
            <h3 className="serif text-3xl font-semibold mt-3">{c.title}</h3>
            {c.subtitle && <p className="mt-2 text-zinc-400">{c.subtitle}</p>}
            <div className="mt-5 flex items-center gap-2 max-w-md mx-auto">
              <input placeholder="you@studio.com" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3.5 py-2.5 text-sm placeholder:text-zinc-500" />
              <button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-medium px-4 py-2.5 rounded-md">Subscribe</button>
            </div>
          </div>
        </section>
      );

    case 'code':
      return (
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500 mono flex items-center gap-2"><Code2 className="size-3.5" /> {c.lang}</div>
            <pre className="mono text-sm p-4 text-zinc-200 overflow-x-auto leading-relaxed"><code>{c.code}</code></pre>
          </div>
        </section>
      );

    case 'divider':
      return <section className="max-w-3xl mx-auto px-6 lg:px-10 py-6"><div className="h-px bg-zinc-900" /></section>;

    case 'grid': {
      const cols = c.cols || 3;
      const gap = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' }[c.gap || 'md'];
      const gridCols = { 1: 'grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4', 6: 'sm:grid-cols-3 lg:grid-cols-6' }[cols] || 'sm:grid-cols-3';
      return (
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-14 border-b border-zinc-900">
          <div className={`grid grid-cols-1 ${gridCols} ${gap}`}>
            {(c.items || []).map((it, i) => {
              const Icon = featureIcons[it.icon] || Sparkles;
              return (
                <div key={i} className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 hover:border-zinc-700 transition-colors">
                  <div className="size-10 rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/20 grid place-items-center"><Icon className="size-5 text-emerald-400" /></div>
                  <div className="mt-4 text-zinc-100 font-medium">{it.title}</div>
                  <div className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{it.text}</div>
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    case 'tabs': {
      const TabsBlock = () => {
        const items = c.items || [];
        const [i, setI] = React.useState(0);
        return (
          <section className="max-w-4xl mx-auto px-6 lg:px-10 py-14">
            <div className="flex gap-1 border-b border-zinc-900 overflow-x-auto">
              {items.map((it, idx) => (
                <button key={idx} onClick={() => setI(idx)} className={`relative px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${i === idx ? 'text-emerald-300' : 'text-zinc-400 hover:text-zinc-100'}`}>
                  {it.label}{i === idx && <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-emerald-400" />}
                </button>
              ))}
            </div>
            <div className="mt-6 text-zinc-300 leading-relaxed">{items[i]?.content}</div>
          </section>
        );
      };
      return <TabsBlock />;
    }
    case 'form':
      return (
        <section className="max-w-2xl mx-auto px-6 lg:px-10 py-14">
          <h3 className="serif text-3xl font-semibold tracking-tight">{c.title}</h3>
          {c.subtitle && <p className="mt-2 text-zinc-400">{c.subtitle}</p>}
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {(c.formFields || []).map((f, i) => (
              <div key={i}>
                <label className="text-xs uppercase tracking-wider text-zinc-400">{f.label}</label>
                {f.type === 'textarea'
                  ? <textarea rows={4} placeholder={f.placeholder} className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm resize-none" />
                  : <input type={f.type || 'text'} placeholder={f.placeholder} className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm" />}
              </div>
            ))}
            <button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium px-5 py-2.5 rounded-md transition-colors">{c.submitLabel || 'Submit'}</button>
          </form>
        </section>
      );
    case 'list':
      return (
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-14">
          {c.title && <h3 className="serif text-3xl font-semibold mb-6">{c.title}</h3>}
          <ul className="divide-y divide-zinc-900 border-y border-zinc-900">
            {(c.items || []).map((it, i) => (
              <li key={i} className="py-4 flex gap-4 items-start">
                <span className="size-7 rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/20 grid place-items-center text-emerald-300 text-xs mono shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0"><div className="text-zinc-100 font-medium">{it.title}</div><div className="text-sm text-zinc-400 mt-0.5">{it.text}</div></div>
              </li>
            ))}
          </ul>
        </section>
      );
    case 'card':
      return (
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-14">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden flex flex-col md:flex-row">
            {c.image && <div className="md:w-2/5 aspect-video md:aspect-auto"><img src={c.image} alt="" className="size-full object-cover" /></div>}
            <div className="p-8 flex-1">
              <h3 className="serif text-2xl font-semibold leading-tight">{c.title}</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">{c.text}</p>
              {c.ctaLabel && <button className="mt-5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium px-4 py-2 rounded-md text-sm">{c.ctaLabel}</button>}
            </div>
          </div>
        </section>
      );
    case 'wizard': {
      const WizardBlock = () => {
        const steps = c.steps || [];
        const [step, setStep] = React.useState(0);
        return (
          <section className="max-w-4xl mx-auto px-6 lg:px-10 py-14">
            {c.title && <h3 className="serif text-3xl font-semibold mb-8 text-center">{c.title}</h3>}
            <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  <button onClick={() => setStep(i)} className="flex flex-col items-center gap-2">
                    <div className={`size-9 rounded-full grid place-items-center text-xs font-semibold ring-2 transition-colors ${i <= step ? 'bg-emerald-500 text-zinc-950 ring-emerald-500/30' : 'bg-zinc-900 text-zinc-500 ring-zinc-800'}`}>{i < step ? '✓' : i + 1}</div>
                    <span className={`text-xs whitespace-nowrap ${i === step ? 'text-zinc-100' : 'text-zinc-500'}`}>{s.label}</span>
                  </button>
                  {i < steps.length - 1 && <div className={`h-px flex-1 mx-2 ${i < step ? 'bg-emerald-500' : 'bg-zinc-800'}`} />}
                </React.Fragment>
              ))}
            </div>
            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-8 text-center">
              <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">Step {step + 1} of {steps.length}</div>
              <h4 className="serif text-2xl font-semibold">{steps[step]?.label}</h4>
              <p className="mt-3 text-zinc-400">{steps[step]?.text}</p>
              <div className="mt-6 flex items-center justify-center gap-2">
                <button onClick={() => setStep(Math.max(0, step - 1))} className="border border-zinc-800 hover:bg-zinc-900 text-zinc-200 px-4 py-2 rounded-md text-sm">Back</button>
                <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-md text-sm font-medium">Next →</button>
              </div>
            </div>
          </section>
        );
      };
      return <WizardBlock />;
    }
    case 'custom_code':
      return (
        <section className="pulse-custom-code">
          {c.css && <style>{c.css}</style>}
          <div dangerouslySetInnerHTML={{ __html: c.html || '' }} />
        </section>
      );
    case 'slider': {
      const SliderBlock = () => {
        const slides = c.slides || [];
        const [i, setI] = React.useState(0);
        React.useEffect(() => {
          if (!c.autoplay || slides.length < 2) return;
          const id = setInterval(() => setI(x => (x + 1) % slides.length), 4000);
          return () => clearInterval(id);
        }, [slides.length, c.autoplay]);
        if (slides.length === 0) return null;
        return (
          <section className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
            <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-zinc-900">
              {slides.map((s, idx) => (
                <div key={idx} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === idx ? 1 : 0 }}>
                  <img src={s.image} alt="" className="size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <h3 className="serif text-3xl md:text-4xl font-semibold text-zinc-100">{s.title}</h3>
                    <p className="mt-2 text-zinc-300 max-w-lg">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {slides.map((_, idx) => (<button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-emerald-400' : 'w-4 bg-zinc-700 hover:bg-zinc-500'}`} />))}
            </div>
          </section>
        );
      };
      return <SliderBlock />;
    }
    case 'marquee': {
      const duration = { slow: '60s', normal: '35s', fast: '18s' }[c.speed || 'normal'];
      const items = c.items || [];
      return (
        <section className="border-y border-zinc-900 bg-zinc-950 overflow-hidden py-6">
          <style>{`@keyframes pulse-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
          <div className="flex gap-12 whitespace-nowrap" style={{ animation: `pulse-marquee ${duration} linear infinite`, width: 'max-content' }}>
            {[...items, ...items].map((it, idx) => (
              <span key={idx} className="serif text-2xl text-zinc-300 inline-flex items-center gap-12">
                {it.text || it}<span className="size-1.5 rounded-full bg-emerald-400 inline-block" />
              </span>
            ))}
          </div>
        </section>
      );
    }

    default:
      return <div className="p-6 text-zinc-500">Unknown section: {section.type}</div>;
  }
}
