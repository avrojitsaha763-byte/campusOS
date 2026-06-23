"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Zap, 
  Shield, 
  ArrowUp, 
  Sparkles,
  Flame,
  Binary,
  Star,
  Activity
} from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { GlowButton } from '../../../components/ui/GlowButton';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { cn } from '../../../lib/utils';

const TITANS = [
  { rank: 1, name: "Arjun Titan", aura: 99.8, sync: 98, status: "God Level", theme: "from-amber-400 to-orange-600", color: "rgba(245, 158, 11, 0.4)", avatar: "🔱" },
  { rank: 2, name: "Sarah Neuro", aura: 97.5, sync: 95, status: "Legendary", theme: "from-blue-400 to-indigo-600", color: "rgba(59, 130, 246, 0.4)", avatar: "🔮" },
  { rank: 3, name: "Vikram Cyber", aura: 94.2, sync: 92, status: "Universal", theme: "from-purple-400 to-pink-600", color: "rgba(168, 85, 247, 0.4)", avatar: "⚛️" },
  { rank: 4, name: "Isha Matrix", aura: 89.1, sync: 88, status: "Titan", theme: "from-green-400 to-emerald-600", color: "rgba(16, 185, 129, 0.4)", avatar: "🐉" },
  { rank: 5, name: "Leo Flux", aura: 85.4, sync: 82, status: "Titan", theme: "from-red-400 to-rose-600", color: "rgba(244, 63, 94, 0.4)", avatar: "🔥" },
];

export default function TitanLeaguePage() {
  return (
    <div className="space-y-16 pb-32">
      {/* Cinematic Hero Header */}
      <header className="relative h-[400px] flex items-center justify-center overflow-hidden rounded-[3rem] border border-white/5 bg-black/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.3] contrast-125"
          />
        </div>
        
        <div className="relative z-20 text-center px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col items-center"
           >
              <div className="p-4 rounded-3xl bg-amber-500/20 border border-amber-500/30 mb-8 animate-float shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                 <Crown className="w-12 h-12 text-amber-500 glow-text" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold font-space text-white tracking-tighter mb-4 leading-none">
                TITAN <span className="text-amber-500 glow-text-gold">LEAGUE</span>
              </h1>
              <div className="flex items-center gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-[0.5em] font-space">
                <span className="flex items-center gap-2"><Binary className="w-4 h-4" /> BEYOND_HUMAN_TIER</span>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                <span className="flex items-center gap-2 text-amber-500"><Flame className="w-4 h-4" /> SYNC_ACTIVE</span>
              </div>
           </motion.div>
        </div>
        
        {/* Animated Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50.5%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* The Throne Display (Top 3) */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-10">
           {TITANS.slice(0, 3).map((titan, i) => (
             <motion.div
               key={titan.rank}
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ delay: i * 0.2 }}
             >
               <TitanCard 
                 glowColor={titan.color}
                 className={cn(
                   "p-10 text-center flex flex-col items-center group relative overflow-hidden",
                   i === 0 ? "border-amber-500/40 bg-amber-500/[0.02] md:scale-110 md:-translate-y-4" : "border-white/5"
                 )}
               >
                 {i === 0 && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />}
                 
                 <div className="relative mb-8">
                    <div className={cn(
                      "w-24 h-24 rounded-[2.5rem] bg-surface border-2 flex items-center justify-center text-5xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-2xl",
                      i === 0 ? "border-amber-500/50 shadow-amber-500/20" : "border-white/10 shadow-black/40"
                    )}>
                      {titan.avatar}
                    </div>
                    <div className={cn(
                      "absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl border flex items-center justify-center text-xs font-bold font-space",
                      i === 0 ? "bg-amber-500 text-black border-amber-400" : "bg-white/10 text-white border-white/20"
                    )}>
                      #{titan.rank}
                    </div>
                 </div>

                 <h3 className="text-3xl font-bold text-white font-space tracking-tight mb-2 group-hover:glow-text transition-all">{titan.name}</h3>
                 <p className={cn(
                   "text-[10px] font-bold uppercase tracking-[0.3em] mb-10 font-space",
                   i === 0 ? "text-amber-500" : "text-gray-500"
                 )}>
                   {titan.status}
                 </p>

                 <div className="w-full space-y-6">
                    <div>
                       <div className="flex justify-between items-end mb-2">
                         <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Neural Aura</span>
                         <span className="text-sm font-bold text-white font-mono">{titan.aura}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${titan.aura}%` }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className={cn("h-full rounded-full bg-gradient-to-r", titan.theme)}
                          />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-end mb-2">
                         <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">System Sync</span>
                         <span className="text-sm font-bold text-white font-mono">{titan.sync}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${titan.sync}%` }}
                            transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                            className={cn("h-full rounded-full bg-gradient-to-r", titan.theme)}
                          />
                       </div>
                    </div>
                 </div>

                 <GlowButton variant="secondary" className="mt-12 w-full py-4 rounded-2xl border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] font-space group-hover:border-white/20">Challenge Node</GlowButton>
               </TitanCard>
             </motion.div>
           ))}
        </div>

        {/* The Extended Standings Table */}
        <div className="lg:col-span-8">
           <TitanCard className="p-0 overflow-hidden border-white/5 bg-transparent">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                 <h2 className="text-xl font-bold text-white font-space tracking-widest flex items-center gap-3">
                    <Zap className="w-5 h-5 text-gray-700" /> CHALLENGER_NODES
                 </h2>
                 <span className="text-[10px] text-gray-800 font-mono font-bold bg-white/5 px-4 py-1 rounded-lg">ACTIVE_COMPETITION_WINDOW_7.1h</span>
              </div>
              <div className="divide-y divide-white/5">
                {TITANS.slice(3).map((titan) => (
                  <div key={titan.rank} className="p-8 hover:bg-white/[0.02] flex items-center justify-between group transition-colors">
                     <div className="flex items-center gap-8">
                        <span className="text-xl font-bold font-space text-gray-800 w-8">#{titan.rank}</span>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl border border-white/10 group-hover:scale-110 transition-transform">
                          {titan.avatar}
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-white font-space tracking-tight group-hover:text-amber-500 transition-colors">{titan.name}</h4>
                           <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">{titan.status}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-12 text-right">
                        <div>
                           <p className="text-[9px] text-gray-800 font-bold uppercase tracking-widest mb-1">Aura Delta</p>
                           <p className="text-lg font-bold text-white font-mono flex items-center gap-2 justify-end">
                              <ArrowUp className="w-4 h-4 text-green-500" /> {titan.aura}
                           </p>
                        </div>
                        <GlowButton variant="secondary" className="p-3 rounded-xl">
                          <Activity className="w-4 h-4" />
                        </GlowButton>
                     </div>
                  </div>
                ))}
              </div>
           </TitanCard>
        </div>

        {/* Live News & Events Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <AdaptiveWidget variant="glow" title="League Broadcast" icon={<Star className="w-5 h-5 text-amber-500 animate-pulse" />}>
              <div className="space-y-6">
                 <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                    <h5 className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-2 font-space flex items-center gap-2">
                       <Zap className="w-4 h-4 fill-amber-500" /> Rank Shift Detected
                    </h5>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                       **Arjun Titan** just hit **99.8% Sync** after completing the "Beyond Human" coding gauntlet. Standings updated.
                    </p>
                 </div>
                 <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                    <h5 className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-2 font-space">Upcoming Nexus Duel</h5>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                       Sector 7 Duels start in **2h 45m**. Top 10 participants gain +5.0 Aura boost.
                    </p>
                 </div>
                 <GlowButton className="w-full py-4 rounded-2xl text-xs font-bold uppercase font-space bg-amber-500/10 hover:bg-amber-500 hover:text-black border-amber-500/20 transition-all">Submit Duel Request</GlowButton>
              </div>
           </AdaptiveWidget>

           <AdaptiveWidget variant="glow" title="League Metrics" icon={<Trophy className="w-5 h-5 text-blue-500" />}>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest font-space text-gray-600">
                    <span>Active Competitors</span>
                    <span className="text-white">1,204</span>
                 </div>
                 <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest font-space text-gray-600">
                    <span>Neural Pool Total</span>
                    <span className="text-white">45.2M CC</span>
                 </div>
                 <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest font-space text-gray-600">
                    <span>League Tier</span>
                    <span className="text-amber-500 flex items-center gap-2">GOD_MODE <Sparkles className="w-3 h-3" /></span>
                 </div>
              </div>
           </AdaptiveWidget>
        </div>

      </div>
    </div>
  );
}
