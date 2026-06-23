"use client";

import React, { useState, useEffect } from 'react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { GlowButton } from '../../../components/ui/GlowButton';
import { VibeMetrics, RoomBadge } from '../../../components/ui/VibeMetrics';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Wrench,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { api } from '../../../lib/api';

export default function HostelPage() {
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const json = await api.get('/hostel/properties');
        if (json.success) {
          setHostels(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch hostel grid data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);

  if (loading) return <div className="text-white p-20 text-center">Scanning Habitat Grid...</div>;

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent mb-3"
          >
            <Building2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-space text-gray-500">HABITAT INTELLIGENCE</span>
          </motion.div>
          <h1 className="text-4xl font-bold font-space text-white tracking-tight">Accommodation <span className="text-accent glow-text">Grid</span><span className="text-primary">.</span></h1>
          <p className="text-gray-400 mt-2 font-medium text-lg leading-relaxed max-w-xl">
            Synchronize your living node. Find elite housing and manage your habitat telemetry.
          </p>
        </div>
        
        <div className="flex bg-white/[0.03] border border-white/5 p-1 rounded-2xl">
           <button 
             onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
               detail: { message: 'Habitat Discovery Grid active.', type: 'info' } 
             }))}
             className="px-6 py-2.5 rounded-xl bg-accent text-white text-[10px] font-bold uppercase tracking-widest font-space"
           >
             Discovery
           </button>
           <button 
             onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
               detail: { message: 'Habitat scanning sequence active... Searching for signal nodes.', type: 'info' } 
             }))}
             className="px-6 py-2.5 rounded-xl text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest font-space transition-colors"
           >
             Habitat Scan
           </button>
        </div>
      </header>

      {/* Filter HUD */}
      <div className="flex flex-wrap gap-4 items-center">
         <div className="relative group/search flex-1 min-w-[300px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within/search:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search by Node, Sector, or Vibe..." 
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-14 py-4 text-sm font-medium text-white focus:outline-none focus:border-accent/50 focus:bg-white/[0.08] transition-all"
            />
         </div>
         {["All Sectors", "Titan Core", "Rim PGs", "Elite Hubs"].map((cat, i) => (
           <button key={i} className={cn(
             "px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border font-space",
             i === 0 ? "bg-white/[0.05] border-white/20 text-white" : "bg-transparent border-white/5 text-gray-600 hover:border-white/20 hover:text-white"
           )}>
             {cat}
           </button>
         ))}
         <button className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-gray-500 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {hostels.map((pg: any) => (
          <TitanCard key={pg.id} className="p-0 overflow-hidden border-white/5 hover:border-accent/30 flex flex-col group transition-all duration-500">
             <div className="relative h-48 bg-surface border-b border-white/5 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
                <div className="z-20 animate-float">{pg.image}</div>
                
                {/* Availability Badge */}
                <div className="absolute top-6 right-6 z-30">
                  <RoomBadge active={pg.available > 0} />
                </div>
                
                <div className="absolute bottom-6 left-8 z-30 flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                      <MapPin className="w-4 h-4 text-accent" />
                   </div>
                   <span className="text-[10px] font-bold text-white uppercase tracking-widest font-space">{pg.location}</span>
                </div>
             </div>
             
             <div className="p-8 flex-1 flex flex-col pt-6">
                <div className="flex justify-between items-start mb-2">
                   <div>
                     <h2 className="text-2xl font-bold text-white font-space tracking-tight mb-1">{pg.name}</h2>
                     <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">{pg.type}</span>
                   </div>
                   <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-colors">
                      <ShieldCheck className="w-5 h-5 text-accent" />
                   </div>
                </div>

                <div className="my-8 py-6 border-y border-white/5">
                   <p className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.3em] mb-5 font-space">Node Metrics</p>
                   <VibeMetrics metrics={pg.vibe} />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {pg.amenities.map((amenity: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-white/[0.03] border border-white/5 text-[9px] text-gray-500 uppercase tracking-widest font-bold rounded-lg transition-colors group-hover:border-accent/20">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between">
                   <div>
                     <p className="text-[8px] text-gray-700 uppercase font-bold tracking-[0.4em] mb-1 font-space text-gray-500">Node Sync Fee</p>
                     <p className="text-2xl font-bold text-white font-space tracking-tight">₹{pg.price.toLocaleString()}<span className="text-sm text-gray-600 font-normal">/mo</span></p>
                   </div>
                   <GlowButton 
                      onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                        detail: { message: `Synced with ${pg.name}. Secure smart lease contract initialized.`, type: 'success' } 
                      }))}
                      variant="secondary" 
                      className="px-6 py-2.5 rounded-xl border-white/10 text-[10px] font-bold uppercase tracking-widest"
                    >
                      Connect Node
                    </GlowButton>
                </div>
             </div>
          </TitanCard>
        ))}
      </div>

      {/* Maintenance Command Terminal */}
      <TitanCard className="p-12 mt-12 bg-primary/5 hover:bg-primary/10 border-primary/20 relative overflow-hidden group">
         <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            <div className="flex items-center gap-10">
               <div className="w-24 h-24 rounded-[2.5rem] bg-primary/20 flex items-center justify-center text-4xl border border-primary/30 shadow-[0_0_20px_rgba(14,165,233,0.3)] group-hover:scale-105 transition-transform duration-500">
                  <Wrench className="w-10 h-10 text-primary glow-text" />
               </div>
               <div>
                 <h3 className="text-3xl font-bold text-white font-space uppercase tracking-tight mb-2">Neural Maintenance Relay</h3>
                 <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-xl">
                   Hardware malfunction? Plumbing leak? WiFi blackout? Establish an immediate maintenance link for instant priority node repair.
                 </p>
               </div>
            </div>
             <GlowButton 
               onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                 detail: { message: 'Maintenance Ticket generated successfully. Dispatched to local sector engineer.', type: 'success' } 
               }))}
               className="bg-primary hover:bg-primary-hover px-12 py-5 rounded-[2rem] font-bold text-white text-base shadow-[0_0_30px_rgba(14,165,233,0.5)] transform group-hover:scale-105 transition-all"
             >
               Submit Ticket.IO
             </GlowButton>
         </div>

         <div className="absolute top-0 right-0 w-[400px] h-full bg-[radial-gradient(circle_at_right,_rgba(14,165,233,0.1),transparent)] pointer-events-none" />
      </TitanCard>
    </div>
  );
}
