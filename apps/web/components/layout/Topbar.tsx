"use client";

import React from 'react';
import { Search, Bell, CreditCard, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Topbar() {
  return (
    <header className="h-20 sticky top-0 z-40 flex items-center justify-between px-8 bg-background/20 backdrop-blur-md border-b border-white/5">
      <div className="flex-1">
        <div className="relative group max-w-md">
          <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          <input 
            type="text" 
            placeholder="Intelligence Search..." 
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] text-white transition-all pl-12 font-space tracking-wide"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="text-[10px] font-bold text-gray-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">⌘</span>
            <span className="text-[10px] font-bold text-gray-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl px-4 py-2 border border-white/5 cursor-pointer transition-all group">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Balance</span>
            <span className="text-sm font-bold text-white font-space tracking-tight">245.50 CC</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-600 ml-2 group-hover:translate-y-0.5 transition-transform" />
        </div>
        
        <button className="relative w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white/[0.06] hover:border-white/10 transition-all group">
          <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        </button>
      </div>
    </header>
  );
}
