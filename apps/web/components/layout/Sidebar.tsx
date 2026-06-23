"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  ShoppingBag, 
  Utensils, 
  Zap, 
  Building2, 
  Truck, 
  MessageSquare, 
  Wallet,
  Settings,
  User,
  Trophy
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const routes = [
    { label: 'Intelligence', path: '/home', icon: Home },
    { label: 'Titan League', path: '/titan-league', icon: Trophy },
    { label: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { label: 'Canteen', path: '/food', icon: Utensils },
    { label: 'SkillSwap', path: '/skillswap', icon: Zap },
    { label: 'Hostel PG', path: '/hostel', icon: Building2 },
    { label: 'Logistics', path: '/logistics', icon: Truck },
    { label: 'Feed', path: '/social', icon: MessageSquare },
    { label: 'Wallet', path: '/wallet', icon: Wallet },
  ];

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-64 z-50 flex flex-col pointer-events-none">
      <div className="flex-1 glass-card border-white/5 p-4 flex flex-col pointer-events-auto rounded-[2rem] relative overflow-hidden">
        {/* Bioluminescent Aura Background */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="px-4 py-8 mb-4">
          <Link href="/home" className="group">
            <h2 className="text-2xl font-bold font-space text-white flex items-center gap-2 group-hover:scale-105 transition-transform">
              <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">T</span>
              <span className="glow-text">TITAN <span className="text-primary">X</span></span>
            </h2>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {routes.map((route) => {
            const isActive = pathname === route.path;
            const Icon = route.icon;

            return (
              <Link
                key={route.path}
                href={route.path}
                onMouseEnter={() => setHoveredPath(route.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className={cn(
                  "relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group",
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {hoveredPath === route.path && !isActive && (
                  <motion.div
                    layoutId="sidebar-hover"
                    className="absolute inset-0 bg-white/5 rounded-2xl -z-20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <Icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "text-gray-500"
                )} />
                <span className="text-sm font-semibold tracking-wide font-space">{route.label}</span>
                
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-lg">
              JS
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-white font-space truncate uppercase tracking-widest">James Student</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Level 4 Titanium</p>
            </div>
            <Settings className="w-4 h-4 text-gray-600 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
