import React, { useState } from 'react';
import { Search, Bell, Plus, Command, Sun, Moon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';

export default function Topbar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 h-16 bg-[hsl(240_6%_6%)]/85 backdrop-blur-md border-b border-zinc-800/80">
      <div className="h-full px-6 lg:px-10 flex items-center gap-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts, pages, media, users…"
            className="pl-9 pr-16 h-10 bg-zinc-900/60 border-zinc-800 focus-visible:ring-emerald-400/40 placeholder:text-zinc-500"
          />
          <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 text-[10px] text-zinc-500 border border-zinc-800 rounded px-1.5 py-0.5">
            <Command className="size-3" /> K
          </kbd>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            size="sm"
            onClick={() => navigate('/admin/posts/new')}
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"
          >
            <Plus className="size-4 mr-1.5" /> New Post
          </Button>

          <button className="size-10 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 grid place-items-center transition-colors" title="Toggle theme">
            <Moon className="size-[18px]" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative size-10 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 grid place-items-center transition-colors">
                <Bell className="size-[18px]" />
                <span className="absolute top-2 right-2 size-1.5 rounded-full bg-emerald-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel className="text-zinc-300">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              {[
                { t: 'New comment awaiting approval', s: '2m ago' },
                { t: '“On-device AI” hit 5k views', s: '1h ago' },
                { t: 'PulseSEO update available', s: 'yesterday' },
              ].map((n, i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5 focus:bg-zinc-800">
                  <span className="text-sm text-zinc-200">{n.t}</span>
                  <span className="text-xs text-zinc-500">{n.s}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-md hover:bg-zinc-800/60 transition-colors">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-emerald-400/10 text-emerald-300 text-xs font-semibold">MC</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm text-zinc-100 leading-none">Mira Chen</div>
                  <div className="text-[11px] text-zinc-500 leading-none mt-1">Administrator</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel className="text-zinc-400 text-xs">mira@pulsecms.io</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="focus:bg-zinc-800" asChild><Link to="/admin/users">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-800" asChild><Link to="/admin/settings">Settings</Link></DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-800" asChild><Link to="/site">Visit site</Link></DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="focus:bg-zinc-800 text-zinc-400">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
