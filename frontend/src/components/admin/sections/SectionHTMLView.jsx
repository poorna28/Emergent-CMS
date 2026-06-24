import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, FileCode2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MonacoLite from '@/components/admin/MonacoLite';
import { SECTION_TYPES } from '@/components/admin/sections/sectionTypes';
import { BLOCK_TYPES } from './SectionBlocks';

function esc(v) { return String(v ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function blockToHTML(b) {
  const cls = b.className ? ` class="${esc(b.className)}"` : '';
  switch (b.type) {
    case 'h1': case 'h2': case 'h3': case 'p': case 'span':
      return `<${b.type}${cls}>${esc(b.content || '')}</${b.type}>`;
    case 'ul': case 'ol':
      return `<${b.type}${cls}>\n${(b.items || []).map(i => `  <li>${esc(i)}</li>`).join('\n')}\n</${b.type}>`;
    case 'button':
      return `<button${cls}>${esc(b.content || '')}</button>`;
    case 'a':
      return `<a href="${esc(b.href || '#')}"${cls}>${esc(b.content || '')}</a>`;
    case 'blockquote':
      return `<blockquote${cls}>\n  <p>${esc(b.content || '')}</p>\n  <cite>${esc(b.author || '')}</cite>\n</blockquote>`;
    case 'code':
      return `<code${cls}>${esc(b.content || '')}</code>`;
    case 'pre':
      return `<pre${cls}><code>${esc(b.content || '')}</code></pre>`;
    case 'img':
      return `<img src="${esc(b.src || '')}" alt="${esc(b.alt || '')}"${cls} />`;
    case 'hr':
      return `<hr${cls} />`;
    case 'div':
      return b.html || '<div></div>';
    default:
      return '';
  }
}

export function sectionToHTML(section) {
  const type = section.type;
  const meta = SECTION_TYPES[type];
  const c = section.content || {};
  let body = '';
  switch (type) {
    case 'hero':
      body = `<section class="pulse-hero pulse-align-${esc(c.align || 'left')}">
  <div class="pulse-hero__bg" style="background-image:url('${esc(c.image)}')"></div>
  <div class="pulse-container">
    <p class="pulse-eyebrow">${esc(c.eyebrow || '')}</p>
    <h1 class="pulse-title">${esc(c.title || '')}</h1>
    <p class="pulse-subtitle">${esc(c.subtitle || '')}</p>
    ${c.ctaLabel ? `<button class="pulse-cta">${esc(c.ctaLabel)}</button>` : ''}
  </div>
</section>`; break;
    case 'heading':
      body = `<section class="pulse-heading">
  <h${c.level || 2} class="pulse-h${c.level || 2}">${esc(c.text || '')}</h${c.level || 2}>
</section>`; break;
    case 'paragraph':
      body = `<section class="pulse-paragraph">
  <p>${esc(c.text || '')}</p>
</section>`; break;
    case 'image':
      body = `<section class="pulse-image">
  <figure>
    <img src="${esc(c.url || '')}" alt="${esc(c.caption || '')}" />
    ${c.caption ? `<figcaption>${esc(c.caption)}</figcaption>` : ''}
  </figure>
</section>`; break;
    case 'split':
      body = `<section class="pulse-split${c.reverse ? ' pulse-split--reverse' : ''}">
  <div class="pulse-split__media"><img src="${esc(c.image || '')}" alt="" /></div>
  <div class="pulse-split__copy">
    <h3>${esc(c.title || '')}</h3>
    <p>${esc(c.text || '')}</p>
  </div>
</section>`; break;
    case 'gallery':
      body = `<section class="pulse-gallery">
  <div class="pulse-gallery__grid">
    ${(c.images || []).map(u => `<img src="${esc(u)}" alt="" />`).join('\n    ')}
  </div>
</section>`; break;
    case 'quote':
      body = `<section class="pulse-quote">
  <blockquote>${esc(c.text || '')}</blockquote>
  <cite>${esc(c.author || '')}${c.role ? ' — ' + esc(c.role) : ''}</cite>
</section>`; break;
    case 'cta':
      body = `<section class="pulse-cta-section">
  <h3>${esc(c.title || '')}</h3>
  <p>${esc(c.subtitle || '')}</p>
  <div class="pulse-actions">
    <button class="pulse-btn pulse-btn--primary">${esc(c.label || '')}</button>
    ${c.secondary ? `<button class="pulse-btn">${esc(c.secondary)}</button>` : ''}
  </div>
</section>`; break;
    case 'stats':
      body = `<section class="pulse-stats">
  ${(c.items || []).map(it => `<div class="pulse-stat"><strong>${esc(it.value)}</strong><span>${esc(it.label)}</span></div>`).join('\n  ')}
</section>`; break;
    case 'testimonial':
      body = `<section class="pulse-testimonial">
  <img src="${esc(c.image || '')}" alt="" />
  <blockquote>${esc(c.quote || '')}</blockquote>
  <cite>${esc(c.author || '')} — ${esc(c.role || '')}</cite>
</section>`; break;
    case 'features':
      body = `<section class="pulse-features">
  <h3>${esc(c.title || '')}</h3>
  <div class="pulse-features__grid">
    ${(c.items || []).map(it => `<article><h4>${esc(it.title)}</h4><p>${esc(it.text)}</p></article>`).join('\n    ')}
  </div>
</section>`; break;
    case 'faq':
      body = `<section class="pulse-faq">
  <h3>${esc(c.title || '')}</h3>
  ${(c.items || []).map(it => `<details><summary>${esc(it.q)}</summary><p>${esc(it.a)}</p></details>`).join('\n  ')}
</section>`; break;
    case 'newsletter':
      body = `<section class="pulse-newsletter">
  <h3>${esc(c.title || '')}</h3>
  <p>${esc(c.subtitle || '')}</p>
  <form><input type="email" placeholder="you@studio.com" /><button>Subscribe</button></form>
</section>`; break;
    case 'code':
      body = `<section class="pulse-code">
  <pre><code class="lang-${esc(c.lang || 'js')}">${esc(c.code || '')}</code></pre>
</section>`; break;
    case 'divider':
      body = `<hr class="pulse-divider" />`; break;
    case 'grid':
      body = `<section class="pulse-grid" data-cols="${c.cols || 3}" data-gap="${c.gap || 'md'}">
  ${(c.items || []).map(it => `<div class="pulse-grid__cell"><h4>${esc(it.title)}</h4><p>${esc(it.text)}</p></div>`).join('\n  ')}
</section>`; break;
    default:
      body = `<!-- ${esc(meta?.name || type)} -->`;
  }

  if (section.extraBlocks && section.extraBlocks.length > 0) {
    body += `\n<div class="${esc(section.extraClass || 'section-extra')}">\n${section.extraBlocks.map(b => '  ' + blockToHTML(b).replace(/\n/g, '\n  ')).join('\n')}\n</div>`;
  }
  return body;
}

export default function SectionHTMLView({ open, onOpenChange, section }) {
  const { toast } = useToast();
  if (!section) return null;
  const html = sectionToHTML(section);
  const copy = () => { navigator.clipboard.writeText(html); toast({ title: 'HTML copied' }); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-100 flex items-center gap-2">
            <FileCode2 className="size-4 text-emerald-400" />
            HTML for {SECTION_TYPES[section.type]?.name || section.type}
            <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] ml-2">read-only</Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500">Generated from the section’s content. Copy and paste into any project.</div>
          <Button size="sm" variant="outline" onClick={copy} className="border-zinc-800 bg-zinc-950"><Copy className="size-3.5 mr-1" /> Copy</Button>
        </div>
        <MonacoLite language="html" value={html} readOnly height={420} />
      </DialogContent>
    </Dialog>
  );
}
