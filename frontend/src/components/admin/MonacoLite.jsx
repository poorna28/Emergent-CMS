import React from 'react';
import Editor from '@monaco-editor/react';

// Lightweight wrapper around Monaco that locks in the Pulse dark theme.
export default function MonacoLite({ language = 'html', value = '', onChange, height = 380, readOnly = false }) {
  return (
    <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#0a0a0b]">
      <div className="h-9 px-3 flex items-center justify-between bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 mono uppercase tracking-wider">
          <span className="size-2 rounded-full bg-emerald-400" />
          {language}
        </div>
        <div className="flex gap-1">
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
        </div>
      </div>
      <Editor
        height={height}
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange && onChange(v ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          padding: { top: 12, bottom: 12 },
          readOnly,
          smoothScrolling: true,
          tabSize: 2,
          renderLineHighlight: 'gutter',
        }}
      />
    </div>
  );
}
