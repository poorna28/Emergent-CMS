import { IMAGES } from '@/mock/mock';

// Each section type has: name, icon (lucide name), group, defaults, fields (for editor)
export const SECTION_TYPES = {
  hero: {
    name: 'Hero',
    icon: 'Sparkles',
    group: 'Layout',
    defaults: {
      eyebrow: 'Issue — July 2025',
      title: 'Editorial software, slow ideas, and the craft of shipping.',
      subtitle: 'A weekly journal on calm, considered work — from the studio behind Pulse.',
      ctaLabel: 'Subscribe',
      image: IMAGES[1],
      align: 'left',
    },
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'textarea' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
      { key: 'image', label: 'Background image', type: 'image' },
      { key: 'align', label: 'Alignment', type: 'select', options: ['left', 'center'] },
    ],
  },
  heading: {
    name: 'Heading',
    icon: 'Heading1',
    group: 'Text',
    defaults: { text: 'A section heading goes here', level: 2 },
    fields: [
      { key: 'text', label: 'Text', type: 'text' },
      { key: 'level', label: 'Level', type: 'select', options: [2, 3, 4] },
    ],
  },
  paragraph: {
    name: 'Paragraph',
    icon: 'AlignLeft',
    group: 'Text',
    defaults: { text: 'Write your paragraph here. Good writing reads like a conversation: clear, kind, and unafraid to leave a beat of silence between ideas.' },
    fields: [{ key: 'text', label: 'Text', type: 'textarea' }],
  },
  image: {
    name: 'Image',
    icon: 'Image',
    group: 'Media',
    defaults: { url: IMAGES[3], caption: 'A caption that gently provides context.' },
    fields: [
      { key: 'url', label: 'Image', type: 'image' },
      { key: 'caption', label: 'Caption', type: 'text' },
    ],
  },
  split: {
    name: 'Two columns',
    icon: 'Columns2',
    group: 'Layout',
    defaults: {
      title: 'Built for editors who care about the small details',
      text: 'From the typography to the keyboard shortcuts — every surface is shaped by the writers who use it daily.',
      image: IMAGES[10],
      reverse: false,
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'text', label: 'Body', type: 'textarea' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'reverse', label: 'Reverse layout', type: 'switch' },
    ],
  },
  gallery: {
    name: 'Gallery',
    icon: 'LayoutGrid',
    group: 'Media',
    defaults: { images: [IMAGES[0], IMAGES[6], IMAGES[7], IMAGES[8], IMAGES[9], IMAGES[11]] },
    fields: [{ key: 'images', label: 'Images', type: 'imageList' }],
  },
  quote: {
    name: 'Pull quote',
    icon: 'Quote',
    group: 'Text',
    defaults: { text: 'Restraint is the highest form of confidence in a design.', author: 'Mira Chen', role: 'Editor-in-chief' },
    fields: [
      { key: 'text', label: 'Quote', type: 'textarea' },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
    ],
  },
  cta: {
    name: 'Call to action',
    icon: 'MousePointerClick',
    group: 'Conversion',
    defaults: { title: 'Start writing on Pulse', subtitle: 'Free for two editors, forever.', label: 'Create your journal', secondary: 'See pricing' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'label', label: 'Primary button', type: 'text' },
      { key: 'secondary', label: 'Secondary button', type: 'text' },
    ],
  },
  stats: {
    name: 'Stats',
    icon: 'BarChart3',
    group: 'Social proof',
    defaults: {
      items: [
        { value: '12k+', label: 'Active writers' },
        { value: '3.4M', label: 'Words shipped' },
        { value: '99.99%', label: 'Uptime' },
        { value: '2 min', label: 'Avg. setup' },
      ],
    },
    fields: [{ key: 'items', label: 'Items', type: 'items', shape: [{ key: 'value', label: 'Value' }, { key: 'label', label: 'Label' }] }],
  },
  testimonial: {
    name: 'Testimonial',
    icon: 'MessageCircle',
    group: 'Social proof',
    defaults: { quote: 'We replaced three tools with Pulse and our team actually publishes more.', author: 'Lena Park', role: 'Head of Content, Aurora Studios', image: IMAGES[3] },
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea' },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'image', label: 'Photo', type: 'image' },
    ],
  },
  features: {
    name: 'Feature grid',
    icon: 'Grid3x3',
    group: 'Layout',
    defaults: {
      title: 'A complete editorial workspace',
      items: [
        { title: 'Block editor', text: 'Compose with rich blocks and keyboard-first writing.', icon: 'Type' },
        { title: 'Scheduled publishing', text: 'Queue posts to drop at the right time, in any timezone.', icon: 'Clock' },
        { title: 'Roles & workflows', text: 'Editors, authors and contributors with sensible defaults.', icon: 'Users' },
        { title: 'AI assist', text: 'Rewrite, summarize, and outline — only when you ask.', icon: 'Sparkles' },
        { title: 'Media library', text: 'Drag, organize and reuse assets across the journal.', icon: 'Image' },
        { title: 'Open API', text: 'A clean REST surface for every entity in your site.', icon: 'Code2' },
      ],
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'items', label: 'Features', type: 'items', shape: [{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text' }, { key: 'icon', label: 'Icon' }] },
    ],
  },
  faq: {
    name: 'FAQ',
    icon: 'HelpCircle',
    group: 'Text',
    defaults: {
      title: 'Frequently asked',
      items: [
        { q: 'Can I import from WordPress?', a: 'Yes — upload your XML export and we map posts, pages, authors and media.' },
        { q: 'Is there a free tier?', a: 'Free for up to two editors, forever. No credit card required.' },
        { q: 'Do you offer custom domains?', a: 'Yes, on every plan. Provision SSL is automatic.' },
        { q: 'Where is content stored?', a: 'In the region closest to you — EU, US, or APAC — with daily backups.' },
      ],
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'items', label: 'Questions', type: 'items', shape: [{ key: 'q', label: 'Question' }, { key: 'a', label: 'Answer' }] },
    ],
  },
  newsletter: {
    name: 'Newsletter',
    icon: 'Mail',
    group: 'Conversion',
    defaults: { title: 'Get the journal in your inbox', subtitle: 'One thoughtful piece every Friday. Unsubscribe with a single click.' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
    ],
  },
  code: {
    name: 'Code block',
    icon: 'Code2',
    group: 'Text',
    defaults: { lang: 'js', code: "const greet = (name) => `Hello, ${name} — welcome to Pulse.`;\nconsole.log(greet('reader'));" },
    fields: [
      { key: 'lang', label: 'Language', type: 'text' },
      { key: 'code', label: 'Code', type: 'textarea' },
    ],
  },
  divider: {
    name: 'Divider',
    icon: 'Minus',
    group: 'Layout',
    defaults: {},
    fields: [],
  },
};

export const DEFAULT_PAGE = [
  { id: 's1', type: 'hero' },
  { id: 's2', type: 'features' },
  { id: 's3', type: 'split' },
  { id: 's4', type: 'gallery' },
  { id: 's5', type: 'quote' },
  { id: 's6', type: 'stats' },
  { id: 's7', type: 'testimonial' },
  { id: 's8', type: 'faq' },
  { id: 's9', type: 'cta' },
  { id: 's10', type: 'newsletter' },
].map(s => ({ ...s, content: { ...SECTION_TYPES[s.type].defaults } }));

export function makeSection(type) {
  return {
    id: 's' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    type,
    content: JSON.parse(JSON.stringify(SECTION_TYPES[type].defaults)),
  };
}

const STORAGE_KEY = 'pulse_page_sections_v1';
export function loadSections() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PAGE;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_PAGE;
  } catch { return DEFAULT_PAGE; }
}
export function saveSections(sections) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sections)); } catch (e) { /* ignore */ }
}
