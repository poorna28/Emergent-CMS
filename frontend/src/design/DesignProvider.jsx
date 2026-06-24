import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadDesign, saveDesign, computeCSSVars } from './designStore';

const DesignCtx = createContext(null);

export function DesignProvider({ children }) {
  const [design, setDesign] = useState(() => loadDesign());
  useEffect(() => { saveDesign(design); }, [design]);

  const activeTheme = useMemo(
    () => design.themes.find(t => t.id === design.activeThemeId) || design.themes[0],
    [design.themes, design.activeThemeId]
  );
  const activeTemplate = useMemo(
    () => design.templates.find(t => t.id === design.activeTemplateId) || design.templates[0],
    [design.templates, design.activeTemplateId]
  );
  const activeLayout = useMemo(
    () => design.layouts.find(l => l.id === activeTemplate?.layoutId) || design.layouts[0],
    [design.layouts, activeTemplate]
  );

  // CRUD helpers
  const upsert = (key) => (item) => setDesign(d => {
    const arr = d[key];
    const exists = arr.some(x => x.id === item.id);
    return { ...d, [key]: exists ? arr.map(x => x.id === item.id ? item : x) : [...arr, item] };
  });
  const remove = (key, idField = 'id') => (id) => setDesign(d => ({ ...d, [key]: d[key].filter(x => x[idField] !== id) }));

  const value = {
    ...design,
    activeTheme, activeTemplate, activeLayout,
    setActiveTheme: (id) => setDesign(d => ({ ...d, activeThemeId: id })),
    setActiveTemplate: (id) => setDesign(d => ({ ...d, activeTemplateId: id })),
    upsertTheme: upsert('themes'),
    upsertTemplate: upsert('templates'),
    upsertLayout: upsert('layouts'),
    deleteTheme: remove('themes'),
    deleteTemplate: remove('templates'),
    deleteLayout: remove('layouts'),
  };

  return <DesignCtx.Provider value={value}>{children}</DesignCtx.Provider>;
}

export function useDesign() {
  const ctx = useContext(DesignCtx);
  if (!ctx) throw new Error('useDesign must be used inside <DesignProvider>');
  return ctx;
}

// Wrapper that applies the active (or overridden) theme + template to its subtree.
// Uses CSS variables + scoped overrides so existing zinc/emerald classes adopt the theme automatically.
export function ThemedRoot({ children, themeOverride, templateOverride, className = '' }) {
  const ctx = useDesign();
  const theme = themeOverride || ctx.activeTheme;
  const template = templateOverride || ctx.activeTemplate;
  const vars = computeCSSVars(theme, template, ctx.layouts);

  const css = `
.themed-site { background-color: var(--site-bg); color: var(--site-text); font-family: var(--site-font-body); }
.themed-site .serif { font-family: var(--site-font-heading) !important; }
.themed-site h1, .themed-site h2, .themed-site h3 { font-family: var(--site-font-heading); }

.themed-site .bg-zinc-950, .themed-site .bg-zinc-950\\/85, .themed-site .bg-zinc-950\\/80, .themed-site .bg-zinc-950\\/90 { background-color: var(--site-bg) !important; }
.themed-site .bg-zinc-900, .themed-site .bg-zinc-900\\/40, .themed-site .bg-zinc-900\\/50, .themed-site .bg-zinc-900\\/60, .themed-site .bg-zinc-900\\/80, .themed-site .bg-zinc-900\\/90 { background-color: var(--site-surface) !important; }

.themed-site .text-zinc-100, .themed-site .text-zinc-200, .themed-site .text-zinc-300 { color: var(--site-text) !important; }
.themed-site .text-zinc-400, .themed-site .text-zinc-500, .themed-site .text-zinc-600 { color: var(--site-muted) !important; }

.themed-site .border-zinc-900, .themed-site .border-zinc-800, .themed-site .border-zinc-700, .themed-site .divide-zinc-900 > * + *, .themed-site .divide-zinc-800 > * + * { border-color: var(--site-border) !important; }

.themed-site .text-emerald-400, .themed-site .text-emerald-300, .themed-site .text-emerald-200 { color: var(--site-accent) !important; }
.themed-site .bg-emerald-500, .themed-site .bg-emerald-400, .themed-site .hover\\:bg-emerald-500:hover, .themed-site .hover\\:bg-emerald-400:hover { background-color: var(--site-accent) !important; color: var(--site-accent-text) !important; }
.themed-site .text-zinc-950 { color: var(--site-accent-text) !important; }
.themed-site .border-emerald-400\\/30, .themed-site .border-emerald-400\\/40, .themed-site .border-emerald-400\\/20, .themed-site .border-emerald-400\\/50 { border-color: color-mix(in srgb, var(--site-accent) 40%, transparent) !important; }
.themed-site .ring-emerald-400\\/30, .themed-site .ring-emerald-400\\/20 { --tw-ring-color: color-mix(in srgb, var(--site-accent) 30%, transparent) !important; }
.themed-site .bg-emerald-400\\/10, .themed-site .bg-emerald-400\\/15, .themed-site .bg-emerald-400\\/5 { background-color: color-mix(in srgb, var(--site-accent) 10%, transparent) !important; }
.themed-site .bg-gradient-to-b, .themed-site .bg-gradient-to-t { background-image: linear-gradient(to bottom, color-mix(in srgb, var(--site-bg) 60%, transparent), var(--site-bg)) !important; }

.themed-site .max-w-3xl, .themed-site .max-w-4xl, .themed-site .max-w-5xl, .themed-site .max-w-6xl { max-width: var(--site-container) !important; }
.themed-site section.tpl-section { padding-top: var(--site-section-py); padding-bottom: var(--site-section-py); }

${template?.customCSS || ''}
  `;

  return (
    <div className={`themed-site ${className}`} style={vars}>
      <style>{css}</style>
      {children}
    </div>
  );
}
