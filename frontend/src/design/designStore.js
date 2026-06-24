// Central design system store (themes / templates / layouts).
// Persisted to localStorage so changes survive reloads.

const STORAGE_KEY = 'pulse_design_v2';

export const FONT_OPTIONS = [
  { name: 'Inter', family: "'Inter', sans-serif", category: 'sans' },
  { name: 'Manrope', family: "'Manrope', sans-serif", category: 'sans' },
  { name: 'DM Sans', family: "'DM Sans', sans-serif", category: 'sans' },
  { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", category: 'sans' },
  { name: 'IBM Plex Sans', family: "'IBM Plex Sans', sans-serif", category: 'sans' },
  { name: 'Fraunces', family: "'Fraunces', serif", category: 'serif' },
  { name: 'Playfair Display', family: "'Playfair Display', serif", category: 'serif' },
  { name: 'Lora', family: "'Lora', serif", category: 'serif' },
  { name: 'Source Serif 4', family: "'Source Serif 4', serif", category: 'serif' },
  { name: 'JetBrains Mono', family: "'JetBrains Mono', monospace", category: 'mono' },
];

export const WIDTHS = {
  narrow: { label: 'Narrow', value: '48rem' },
  medium: { label: 'Medium', value: '64rem' },
  wide: { label: 'Wide', value: '76rem' },
  full: { label: 'Full bleed', value: '100%' },
};
export const SPACINGS = {
  compact: { label: 'Compact', value: '2.5rem' },
  comfortable: { label: 'Comfortable', value: '4rem' },
  spacious: { label: 'Spacious', value: '6rem' },
};

export const DEFAULT_LAYOUTS = [
  { id: 'l1', name: 'Narrow Reader', width: 'narrow', columns: 1, spacing: 'comfortable' },
  { id: 'l2', name: 'Standard Single', width: 'medium', columns: 1, spacing: 'comfortable' },
  { id: 'l3', name: 'Wide Editorial', width: 'wide', columns: 1, spacing: 'spacious' },
  { id: 'l4', name: 'Two Column', width: 'wide', columns: 2, spacing: 'comfortable' },
  { id: 'l5', name: 'Three Column Grid', width: 'wide', columns: 3, spacing: 'compact' },
  { id: 'l6', name: 'Full Bleed', width: 'full', columns: 1, spacing: 'spacious' },
];

export const DEFAULT_TEMPLATES = [
  { id: 't1', name: 'Magazine', layoutId: 'l3', description: 'Generous whitespace, serif headlines, wide editorial layout.', customCSS: '/* Editorial vibe */\n.themed-site h1, .themed-site h2 { letter-spacing: -0.02em; }' },
  { id: 't2', name: 'Reader', layoutId: 'l1', description: 'Maximum legibility for long-form essays.', customCSS: '/* Reader */\n.themed-site p { line-height: 1.9; }' },
  { id: 't3', name: 'Blog + Sidebar', layoutId: 'l4', description: 'Classic 2-column with article on the left, meta on the right.', customCSS: '' },
  { id: 't4', name: 'Card Grid', layoutId: 'l5', description: '3-up grid for collections, topics and archives.', customCSS: '' },
  { id: 't5', name: 'Landing', layoutId: 'l6', description: 'Edge-to-edge layout for marketing and home pages.', customCSS: '' },
];

export const DEFAULT_THEMES = [
  { id: 'th1', name: 'Aurora Dark', isDark: true,
    colors: { bg: '#09090b', surface: '#18181b', text: '#fafafa', muted: '#a1a1aa', accent: '#10b981', accentText: '#052e22', border: '#27272a' },
    fonts: { heading: "'Fraunces', serif", body: "'Inter', sans-serif" } },
  { id: 'th2', name: 'Paper Light', isDark: false,
    colors: { bg: '#fafaf9', surface: '#ffffff', text: '#0c0a09', muted: '#78716c', accent: '#0f766e', accentText: '#ffffff', border: '#e7e5e4' },
    fonts: { heading: "'Fraunces', serif", body: "'Inter', sans-serif" } },
  { id: 'th3', name: 'Sunset', isDark: true,
    colors: { bg: '#1c1917', surface: '#292524', text: '#fafaf9', muted: '#a8a29e', accent: '#f59e0b', accentText: '#451a03', border: '#44403c' },
    fonts: { heading: "'Playfair Display', serif", body: "'Inter', sans-serif" } },
  { id: 'th4', name: 'Ocean', isDark: true,
    colors: { bg: '#0c1929', surface: '#152238', text: '#e2e8f0', muted: '#94a3b8', accent: '#22d3ee', accentText: '#082f49', border: '#1e293b' },
    fonts: { heading: "'Fraunces', serif", body: "'IBM Plex Sans', sans-serif" } },
  { id: 'th5', name: 'Rose', isDark: false,
    colors: { bg: '#fdf2f8', surface: '#ffffff', text: '#1f1228', muted: '#9f1239', accent: '#be185d', accentText: '#ffffff', border: '#f9a8d4' },
    fonts: { heading: "'Playfair Display', serif", body: "'DM Sans', sans-serif" } },
];

const DEFAULTS = {
  themes: DEFAULT_THEMES,
  templates: DEFAULT_TEMPLATES,
  layouts: DEFAULT_LAYOUTS,
  activeThemeId: 'th1',
  activeTemplateId: 't1',
};

export function loadDesign() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch (e) { return DEFAULTS; }
}
export function saveDesign(d) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch (e) { /* ignore */ }
}

export function computeCSSVars(theme, template, layouts) {
  const layout = layouts.find(l => l.id === template?.layoutId) || layouts[0];
  return {
    '--site-bg': theme.colors.bg,
    '--site-surface': theme.colors.surface,
    '--site-text': theme.colors.text,
    '--site-muted': theme.colors.muted,
    '--site-accent': theme.colors.accent,
    '--site-accent-text': theme.colors.accentText,
    '--site-border': theme.colors.border,
    '--site-font-heading': theme.fonts.heading,
    '--site-font-body': theme.fonts.body,
    '--site-container': WIDTHS[layout.width].value,
    '--site-section-py': SPACINGS[layout.spacing].value,
    '--site-columns': String(layout.columns),
  };
}

export function uid(prefix) {
  return prefix + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
}
