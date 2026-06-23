import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, FileType2, Image as ImageIcon, MessageSquare,
  Palette, Plug, Users, Wrench, Settings as SettingsIcon, ChevronLeft, ChevronRight,
  Zap, ExternalLink, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/posts', label: 'Posts', icon: FileText },
  { to: '/admin/media', label: 'Media', icon: ImageIcon },
  { to: '/admin/pages', label: 'Pages', icon: FileType2 },
  { to: '/admin/builder', label: 'Page Builder', icon: Layers },
  { to: '/admin/comments', label: 'Comments', icon: MessageSquare },
  { to: '/admin/appearance', label: 'Appearance', icon: Palette },
  { to: '/admin/plugins', label: 'Plugins', icon: Plug },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/tools', label: 'Tools', icon: Wrench },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={cn(
        'sticky top-0 h-screen bg-[hsl(240_6%_7%)] border-r border-zinc-800/80 flex flex-col transition-[width] duration-300 ease-out',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-zinc-800/80">
        <Link to="/admin" className="flex items-center gap-2.5 min-w-0">
          <div className="size-9 rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30 grid place-items-center shrink-0">
            <Zap className="size-4 text-emerald-400" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-semibold tracking-tight leading-none">Pulse CMS</div>
              <div className="text-[11px] text-zinc-500 mt-1 leading-none truncate">v4.2.1</div>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors',
                'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60',
                isActive && 'bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15 hover:text-emerald-200'
              )
            }
          >
            <item.icon className="size-[18px] shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-zinc-800/80 p-2 space-y-1">
        <Link
          to="/site"
          className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
        >
          <ExternalLink className="size-[18px] shrink-0" />
          {!collapsed && <span>Visit Site</span>}
        </Link>
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 rounded-md px-2.5 py-2 text-sm text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
        >
          {collapsed ? <ChevronRight className="size-[18px]" /> : <ChevronLeft className="size-[18px]" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
