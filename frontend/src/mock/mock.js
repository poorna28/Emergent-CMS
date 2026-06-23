// Mock data for Pulse CMS (WordPress-style)

export const IMAGES = [
  'https://images.unsplash.com/photo-1664076423411-e570cfdfcbed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODIxMTEwMzh8MA&ixlib=rb-4.1.0&q=85',
  'https://images.pexels.com/photos/7787200/pexels-photo-7787200.jpeg',
  'https://images.pexels.com/photos/4389795/pexels-photo-4389795.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwwfHx8fDE3ODIxMTEwNDV8MA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwwfHx8fDE3ODIxMTEwNDV8MA&ixlib=rb-4.1.0&q=85',
  'https://images.pexels.com/photos/6337/light-coffee-pen-working.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzgyMTExMDQ1fDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwzfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzgyMTExMDQ1fDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHw0fHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzgyMTExMDQ1fDA&ixlib=rb-4.1.0&q=85',
  'https://images.pexels.com/photos/52526/sign-places-travel-information-52526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/15005692/pexels-photo-15005692.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/12379606/pexels-photo-12379606.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
];

export const CATEGORIES = [
  { id: 'c1', name: 'Technology', slug: 'technology', count: 14 },
  { id: 'c2', name: 'Design', slug: 'design', count: 9 },
  { id: 'c3', name: 'Business', slug: 'business', count: 7 },
  { id: 'c4', name: 'Food', slug: 'food', count: 5 },
  { id: 'c5', name: 'Travel', slug: 'travel', count: 4 },
  { id: 'c6', name: 'Lifestyle', slug: 'lifestyle', count: 6 },
];

export const TAGS = ['react', 'product', 'editorial', 'minimal', 'startup', 'ai', 'open-source', 'analytics', 'studio'];

export const USERS = [
  { id: 'u1', name: 'Mira Chen', email: 'mira@pulsecms.io', role: 'Administrator', posts: 18, status: 'active' },
  { id: 'u2', name: 'Theo Walsh', email: 'theo@pulsecms.io', role: 'Editor', posts: 9, status: 'active' },
  { id: 'u3', name: 'Ana Ortega', email: 'ana@pulsecms.io', role: 'Author', posts: 12, status: 'active' },
  { id: 'u4', name: 'Kenji Tanaka', email: 'kenji@pulsecms.io', role: 'Contributor', posts: 3, status: 'pending' },
  { id: 'u5', name: 'Priya Patel', email: 'priya@pulsecms.io', role: 'Subscriber', posts: 0, status: 'active' },
];

const lorem = `Building a great editorial experience is part craft, part discipline. The right typography, the right rhythm of whitespace, and a sense of voice that carries through every page. In this piece we explore the small details that compound into something memorable.

We start with structure: a clear hierarchy of headlines, sub-headlines, and supporting copy. Then we move into rhythm — how blocks of text, pull quotes, and imagery dance together. Finally we look at distribution: getting the work in front of the right people without losing the soul of what made it worth making.`;

export const POSTS = [
  { id: 'p1', title: 'Designing for calm: a CMS that gets out of the way', slug: 'designing-for-calm', status: 'published', author: 'Mira Chen', category: 'Design', tags: ['editorial', 'minimal'], date: '2025-07-08', views: 2410, comments: 12, image: IMAGES[1], excerpt: 'How restraint, contrast and rhythm become the foundation of a publishing tool people actually love.', content: lorem },
  { id: 'p2', title: 'The new shape of small teams shipping software', slug: 'small-teams-shipping', status: 'published', author: 'Theo Walsh', category: 'Business', tags: ['startup', 'product'], date: '2025-07-05', views: 1820, comments: 8, image: IMAGES[3], excerpt: 'Six pillars of micro-teams that consistently outperform their headcount.', content: lorem },
  { id: 'p3', title: 'A field guide to editorial photography in 2025', slug: 'editorial-photography', status: 'draft', author: 'Ana Ortega', category: 'Design', tags: ['editorial'], date: '2025-07-02', views: 0, comments: 0, image: IMAGES[0], excerpt: 'Lighting, color, and the quiet decisions that separate good frames from great ones.', content: lorem },
  { id: 'p4', title: 'Why your slow morning is your competitive advantage', slug: 'slow-morning', status: 'published', author: 'Priya Patel', category: 'Lifestyle', tags: ['minimal'], date: '2025-06-30', views: 3120, comments: 21, image: IMAGES[5], excerpt: 'The compounding ROI of unhurried thinking before the inbox opens.', content: lorem },
  { id: 'p5', title: 'Notes from a kitchen that doesn\u2019t take itself too seriously', slug: 'kitchen-notes', status: 'published', author: 'Kenji Tanaka', category: 'Food', tags: ['editorial'], date: '2025-06-28', views: 1402, comments: 6, image: IMAGES[6], excerpt: 'Seasonal cooking, simple gear, and the joy of getting a single dish exactly right.', content: lorem },
  { id: 'p6', title: 'Quiet luxury, loud results: hotel design in 2025', slug: 'hotel-design-2025', status: 'scheduled', author: 'Ana Ortega', category: 'Travel', tags: ['editorial', 'studio'], date: '2025-07-15', views: 0, comments: 0, image: IMAGES[9], excerpt: 'Why the most-talked-about hotels of the year whisper instead of shout.', content: lorem },
  { id: 'p7', title: 'On-device AI is finally good enough to be invisible', slug: 'on-device-ai', status: 'published', author: 'Mira Chen', category: 'Technology', tags: ['ai', 'product'], date: '2025-06-24', views: 4870, comments: 33, image: IMAGES[2], excerpt: 'Smaller models, smarter UX, and the death of the loading spinner.', content: lorem },
  { id: 'p8', title: 'Building an analytics dashboard people will actually read', slug: 'analytics-dashboard', status: 'draft', author: 'Theo Walsh', category: 'Technology', tags: ['analytics', 'product'], date: '2025-06-22', views: 0, comments: 0, image: IMAGES[10], excerpt: 'Stop charting everything. Start showing the three things that change the decision.', content: lorem },
];

export const PAGES_DATA = [
  { id: 'pg1', title: 'About', slug: 'about', status: 'published', author: 'Mira Chen', date: '2025-05-10', parent: '\u2014' },
  { id: 'pg2', title: 'Contact', slug: 'contact', status: 'published', author: 'Mira Chen', date: '2025-05-12', parent: '\u2014' },
  { id: 'pg3', title: 'Privacy Policy', slug: 'privacy', status: 'published', author: 'Theo Walsh', date: '2025-05-15', parent: '\u2014' },
  { id: 'pg4', title: 'Terms of Service', slug: 'terms', status: 'published', author: 'Theo Walsh', date: '2025-05-16', parent: '\u2014' },
  { id: 'pg5', title: 'Press Kit', slug: 'press', status: 'draft', author: 'Ana Ortega', date: '2025-06-01', parent: 'About' },
];

export const COMMENTS = [
  { id: 'cm1', author: 'Lena Park', email: 'lena@mail.com', content: 'This is exactly the framing I needed for our redesign. Sharing internally.', post: 'Designing for calm: a CMS that gets out of the way', date: '2025-07-09', status: 'approved' },
  { id: 'cm2', author: 'Daniel Reyes', email: 'daniel@mail.com', content: 'Loved the pull-quote section. What font are you using here?', post: 'A field guide to editorial photography in 2025', date: '2025-07-08', status: 'pending' },
  { id: 'cm3', author: 'Jules', email: 'jules@mail.com', content: 'Disagree with point three but the rest is gold.', post: 'The new shape of small teams shipping software', date: '2025-07-07', status: 'approved' },
  { id: 'cm4', author: 'spamb0t99', email: 'noreply@spam.ru', content: 'Cheap watches, click here >>>', post: 'On-device AI is finally good enough to be invisible', date: '2025-07-06', status: 'spam' },
  { id: 'cm5', author: 'Maria S.', email: 'maria@mail.com', content: 'The kitchen post made my weekend, please write more like this.', post: 'Notes from a kitchen that doesn\u2019t take itself too seriously', date: '2025-07-05', status: 'approved' },
  { id: 'cm6', author: 'Anonymous', email: 'a@a.com', content: 'Take this down immediately.', post: 'Why your slow morning is your competitive advantage', date: '2025-07-04', status: 'trash' },
];

export const MEDIA = IMAGES.map((url, i) => ({
  id: 'm' + (i + 1),
  url,
  name: ['cover-editorial.jpg','magazine-spread.jpg','studio-tech.jpg','workspace-01.jpg','workspace-02.jpg','desk-light.jpg','plated-dish.jpg','breakfast-flat.jpg','dessert-macro.jpg','signpost-travel.jpg','interior-warm.jpg','interior-cool.jpg'][i],
  size: (200 + i * 37) + ' KB',
  type: 'image/jpeg',
  uploaded: '2025-06-' + String(10 + i).padStart(2, '0'),
  author: ['Mira','Theo','Ana','Kenji','Priya','Mira','Kenji','Kenji','Kenji','Ana','Ana','Theo'][i],
}));

export const PLUGINS = [
  { id: 'pl1', name: 'PulseSEO', desc: 'On-page SEO, sitemaps, and structured data \u2014 without the popups.', author: 'Pulse Labs', version: '4.2.1', active: true },
  { id: 'pl2', name: 'Akismet Anti-Spam', desc: 'Catches the spam comments your editors shouldn\u2019t have to.', author: 'Automattic', version: '5.3', active: true },
  { id: 'pl3', name: 'Yoast Forms', desc: 'Drag-and-drop forms with logic, integrations, and webhooks.', author: 'Yoast', version: '2.7.0', active: false },
  { id: 'pl4', name: 'WooCommerce', desc: 'Sell anything from anywhere. Open source storefront engine.', author: 'Automattic', version: '9.1.2', active: false },
  { id: 'pl5', name: 'Jetpack Performance', desc: 'Image CDN, lazy-loading, and uptime monitoring built in.', author: 'Automattic', version: '13.0', active: true },
  { id: 'pl6', name: 'Elementor', desc: 'Visual page builder with a deep template library.', author: 'Elementor', version: '3.22', active: false },
];

export const THEMES = [
  { id: 't1', name: 'Editorial', desc: 'Magazine-style theme with serif headlines and generous whitespace.', active: true, image: IMAGES[1] },
  { id: 't2', name: 'Lumen', desc: 'A minimalist dark theme tuned for long-form reading.', active: false, image: IMAGES[10] },
  { id: 't3', name: 'Studio', desc: 'Portfolio-first theme with bold grids and case-study layouts.', active: false, image: IMAGES[11] },
  { id: 't4', name: 'Kitchen', desc: 'Food-blog theme with recipe cards, ratings, and print view.', active: false, image: IMAGES[6] },
  { id: 't5', name: 'Wander', desc: 'Travel theme with map embeds and lightweight galleries.', active: false, image: IMAGES[9] },
  { id: 't6', name: 'Console', desc: 'Developer-blog theme with code-first typography and snippets.', active: false, image: IMAGES[2] },
];

export const ACTIVITY = [
  { id: 'a1', type: 'post', text: 'Mira published \u201cDesigning for calm\u201d', time: '2h ago' },
  { id: 'a2', type: 'comment', text: 'New comment on \u201cOn-device AI\u2026\u201d', time: '4h ago' },
  { id: 'a3', type: 'user', text: 'Kenji Tanaka requested editor access', time: '6h ago' },
  { id: 'a4', type: 'media', text: '7 images uploaded to media library', time: '1d ago' },
  { id: 'a5', type: 'plugin', text: 'PulseSEO updated to 4.2.1', time: '2d ago' },
];

export const STATS = {
  posts: POSTS.length,
  pages: PAGES_DATA.length,
  comments: COMMENTS.length,
  users: USERS.length,
  views30d: 18420,
  views30dDelta: 12.4,
  subscribers: 2841,
  subscribersDelta: 4.1,
};

export const SITE_INFO = {
  title: 'Pulse Journal',
  tagline: 'Editorial software, slow ideas, and the craft of shipping.',
  url: 'https://pulse.journal',
  language: 'en-US',
  timezone: 'UTC+0',
};
