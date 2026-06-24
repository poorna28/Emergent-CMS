import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

export const DEVICE_PRESETS = {
  desktop: { label: 'Desktop', width: '100%', icon: Monitor },
  tablet: { label: 'Tablet', width: '820px', icon: Tablet },
  mobile: { label: 'Mobile', width: '390px', icon: Smartphone },
};

export default function DevicePreviewBar({ device, onChange }) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-md border border-zinc-800 bg-zinc-900/60 w-fit">
      {Object.entries(DEVICE_PRESETS).map(([k, p]) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          title={p.label}
          className={`px-2.5 py-1.5 rounded inline-flex items-center gap-1.5 text-xs transition-colors ${device === k ? 'bg-emerald-400/10 text-emerald-300' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'}`}
        >
          <p.icon className="size-3.5" />
          <span className="hidden sm:inline">{p.label}</span>
        </button>
      ))}
    </div>
  );
}
