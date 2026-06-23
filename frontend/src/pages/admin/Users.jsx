import React, { useState } from 'react';
import { UserPlus, MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { USERS } from '@/mock/mock';

const roleColor = {
  Administrator: 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5',
  Editor: 'border-cyan-400/30 text-cyan-300 bg-cyan-400/5',
  Author: 'border-amber-400/30 text-amber-300 bg-amber-400/5',
  Contributor: 'border-zinc-700 text-zinc-300',
  Subscriber: 'border-zinc-700 text-zinc-400',
};

export default function Users() {
  const [users, setUsers] = useState(USERS);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name:'', email:'', role:'Author' });
  const { toast } = useToast();

  const initials = (n) => n.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
  const filtered = users.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));

  const addUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: 'u'+(users.length+1), ...newUser, posts: 0, status: 'pending' }]);
    setNewUser({ name:'', email:'', role:'Author' });
    setOpen(false);
    toast({ title: 'Invitation sent', description: newUser.email });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400/80">Team</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight serif">Users</h1>
          <p className="text-sm text-zinc-400 mt-1">{users.length} members</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"><UserPlus className="size-4 mr-1.5" /> Invite user</Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader><DialogTitle>Invite a new user</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><label className="text-xs text-zinc-400">Full name</label><Input value={newUser.name} onChange={e=>setNewUser({...newUser, name:e.target.value})} className="bg-zinc-950/60 border-zinc-800 mt-1" /></div>
              <div><label className="text-xs text-zinc-400">Email</label><Input value={newUser.email} onChange={e=>setNewUser({...newUser, email:e.target.value})} className="bg-zinc-950/60 border-zinc-800 mt-1" /></div>
              <div><label className="text-xs text-zinc-400">Role</label>
                <Select value={newUser.role} onValueChange={(v)=>setNewUser({...newUser, role:v})}>
                  <SelectTrigger className="bg-zinc-950/60 border-zinc-800 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {['Administrator','Editor','Author','Contributor','Subscriber'].map(r=><SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={()=>setOpen(false)} className="border-zinc-800 bg-zinc-900">Cancel</Button>
                <Button onClick={addUser} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950">Send invite</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
        <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name or email" className="pl-9 bg-zinc-900/60 border-zinc-800" />
      </div>

      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Role</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Posts</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-zinc-800/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9"><AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs">{initials(u.name)}</AvatarFallback></Avatar>
                    <div><div className="text-zinc-100">{u.name}</div><div className="text-xs text-zinc-500">{u.email}</div></div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell"><Badge variant="outline" className={roleColor[u.role]}>{u.role}</Badge></td>
                <td className="px-4 py-3 text-zinc-400 hidden lg:table-cell">{u.posts}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={u.status==='active' ? 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5' : 'border-amber-400/30 text-amber-300 bg-amber-400/5'}>{u.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><button className="size-8 rounded-md hover:bg-zinc-800 text-zinc-400 grid place-items-center"><MoreHorizontal className="size-4" /></button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem className="focus:bg-zinc-800">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-zinc-800">Send reset link</DropdownMenuItem>
                      <DropdownMenuItem onClick={()=>setUsers(users.filter(x=>x.id!==u.id))} className="text-red-400 focus:bg-red-500/10">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
