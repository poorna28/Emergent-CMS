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
  grid: {
    name: 'Grid builder',
    icon: 'Grid2x2',
    group: 'Layout',
    defaults: {
      cols: 3,
      gap: 'md',
      items: [
        { title: 'Cell one', text: 'Lightweight, composable. Drag anywhere.', icon: 'Sparkles' },
        { title: 'Cell two', text: 'Tweak columns, gap and breakpoints in seconds.', icon: 'Grid3x3' },
        { title: 'Cell three', text: 'Each cell holds its own typography and CTA.', icon: 'Layers' },
        { title: 'Cell four', text: 'Responsive by default \u2014 collapses cleanly.', icon: 'Smartphone' },
        { title: 'Cell five', text: 'Add as many cells as your story needs.', icon: 'Plus' },
        { title: 'Cell six', text: 'Press preview to ship your layout.', icon: 'Eye' },
      ],
    },
    fields: [
      { key: 'cols', label: 'Columns', type: 'select', options: [1, 2, 3, 4, 6] },
      { key: 'gap', label: 'Gap', type: 'select', options: ['sm', 'md', 'lg'] },
      { key: 'items', label: 'Cells', type: 'items', shape: [{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text' }, { key: 'icon', label: 'Icon' }] },
    ],
  },
  tabs: {
    name: 'Tabs', icon: 'Tags', group: 'Interactive',
    defaults: {
      items: [
        { label: 'Editor', content: 'A keyboard-first block editor. Inline AI suggestions, markdown shortcuts and quiet autosave.' },
        { label: 'Workflow', content: 'Editors, authors and contributors with sensible defaults. Approval flows for high-stakes posts.' },
        { label: 'Analytics', content: 'Three numbers that move the needle: read time, finished reads, subscriber lift.' },
        { label: 'API', content: 'A clean REST surface for every entity. Webhooks fire on publish, edit, delete.' },
      ],
    },
    fields: [{ key: 'items', label: 'Tabs', type: 'items', shape: [{ key: 'label', label: 'Label' }, { key: 'content', label: 'Content' }] }],
  },
  form: {
    name: 'Form', icon: 'FormInput', group: 'Interactive',
    defaults: {
      title: 'Get in touch', subtitle: 'We typically reply within one business day.', submitLabel: 'Send message',
      formFields: [
        { label: 'Full name', type: 'text', placeholder: 'Mira Chen' },
        { label: 'Email', type: 'email', placeholder: 'you@studio.com' },
        { label: 'Company', type: 'text', placeholder: 'Pulse Labs' },
        { label: 'How can we help?', type: 'textarea', placeholder: 'A few words…' },
      ],
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'submitLabel', label: 'Submit label', type: 'text' },
      { key: 'formFields', label: 'Fields', type: 'items', shape: [{ key: 'label', label: 'Label' }, { key: 'type', label: 'Type' }, { key: 'placeholder', label: 'Placeholder' }] },
    ],
  },
  list: {
    name: 'List', icon: 'List', group: 'Text',
    defaults: {
      title: 'What you get',
      items: [
        { title: 'Unlimited posts and pages', text: 'No artificial caps, ever.' },
        { title: 'Custom domains', text: 'SSL provisioned automatically.' },
        { title: 'Open REST + GraphQL API', text: 'Build any front-end you want.' },
        { title: 'Daily backups', text: 'Per-region, encrypted at rest.' },
      ],
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'items', label: 'Items', type: 'items', shape: [{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text' }] },
    ],
  },
  card: {
    name: 'Card', icon: 'CreditCard', group: 'Layout',
    defaults: { title: 'Try Pulse free for two editors', text: 'Spin up a publication in under 60 seconds. No credit card required.', ctaLabel: 'Start free', image: '' },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'text', label: 'Text', type: 'textarea' },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
      { key: 'image', label: 'Image (optional)', type: 'image' },
    ],
  },
  wizard: {
    name: 'Wizard', icon: 'ListChecks', group: 'Interactive',
    defaults: {
      title: 'Launch in four steps',
      steps: [
        { label: 'Create account', text: 'Pick a publication name and an editor seat.' },
        { label: 'Choose theme', text: 'Start from a starter or import your own.' },
        { label: 'Invite team', text: 'Add editors, authors and contributors.' },
        { label: 'Publish first post', text: 'Hit publish — we handle the CDN.' },
      ],
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'steps', label: 'Steps', type: 'items', shape: [{ key: 'label', label: 'Label' }, { key: 'text', label: 'Text' }] },
    ],
  },
  custom_code: {
    name: 'Custom code', icon: 'Braces', group: 'Developer',
    defaults: {
      html: '<div class="custom-block">\n  <h2>Custom HTML block</h2>\n  <p>Drop any HTML, inline styles or embeds here.</p>\n</div>',
      css: '.custom-block { padding: 4rem 1.5rem; max-width: 48rem; margin: 0 auto; text-align: center; }\n.custom-block h2 { font-size: 2rem; letter-spacing: -0.02em; }\n.custom-block p { color: #a1a1aa; margin-top: 0.5rem; }',
    },
    fields: [
      { key: 'html', label: 'HTML', type: 'monaco-html' },
      { key: 'css', label: 'CSS', type: 'monaco-css' },
    ],
  },
  slider: {
    name: 'Slider', icon: 'GalleryHorizontal', group: 'Media',
    defaults: {
      autoplay: true,
      slides: [
        { title: 'Editorial that ships', text: 'Built for teams who publish weekly.', image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200' },
        { title: 'Calm software', text: 'Distraction-free writing, every time.', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200' },
        { title: 'Hosted, fast, secure', text: 'Edge-cached on every continent.', image: 'https://images.pexels.com/photos/15005692/pexels-photo-15005692.jpeg?w=1200' },
      ],
    },
    fields: [
      { key: 'autoplay', label: 'Autoplay', type: 'switch' },
      { key: 'slides', label: 'Slides', type: 'items', shape: [{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text' }, { key: 'image', label: 'Image URL' }] },
    ],
  },
  marquee: {
    name: 'Marquee', icon: 'ArrowRightLeft', group: 'Media',
    defaults: { speed: 'normal', items: [{ text: 'Trusted by 12,000+ writers' }, { text: 'Featured in Sidebar' }, { text: 'Featured in Dense Discovery' }, { text: '99.99% uptime' }, { text: 'Self-hosting available' }, { text: 'Open-source friendly' }] },
    fields: [
      { key: 'speed', label: 'Speed', type: 'select', options: ['slow', 'normal', 'fast'] },
      { key: 'items', label: 'Items', type: 'items', shape: [{ key: 'text', label: 'Text' }] },
    ],
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
    extraBlocks: [],
    extraClass: '',
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
