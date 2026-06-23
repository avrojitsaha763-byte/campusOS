"use client";

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Map as MapIcon, 
  Navigation, 
  Phone, 
  AlertCircle,
  CheckCircle2,
  Navigation2,
  Sparkles,
  Zap
} from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { GlowButton } from '../../../components/ui/GlowButton';
import { HolographicMap } from '../../../components/ui/HolographicMap';
import { cn } from '../../../lib/utils';

export default function LogisticsPage() {
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [status, setStatus] = useState('Idle');
  const [location, setLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!deliveryId) return;
    const socket = io('http://localhost:3003');

    socket.emit('subscribe_tracking', { deliveryId });
    socket.on('location_update', (data: any) => {
      setLocation({ lat: data.lat, lng: data.lng });
      setProgress(data.progress);
    });
    socket.on('status_update', (data: any) => setStatus(data.status));

    return () => { socket.disconnect(); };
  }, [deliveryId]);

  const startMockDelivery = async () => {
    try {
      const res = await fetch('http://localhost:3003/deliveries/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: 'ORD_' + Math.floor(Math.random() * 1000),
          pickupCoords: [77.5946, 12.9716],
          dropoffCoords: [77.6413, 12.9716],
          fee: 30
        })
      });
      const data = await res.json();
      if (data.success) {
        setDeliveryId(data.deliveryId);
        setStatus('Partner Assigned');
      }
    } catch (err) {
      console.error('Failed to start mock delivery:', err);
      // Fallback for demo
      setDeliveryId('TITAN_DEMO_001');
      setStatus('In Transit');
      setProgress(42);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent mb-3"
          >
            <Navigation className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-space text-gray-500">Geospatial Intelligence</span>
          </motion.div>
          <h1 className="text-4xl font-bold font-space text-white tracking-tight">Logistics <span className="text-accent glow-text-cyan">Command Center</span><span className="text-primary">.</span></h1>
          <p className="text-gray-400 mt-2 font-medium max-w-xl text-lg leading-relaxed">
            Real-time coordinate sync with campus delivery partners. Encryption active: <span className="text-accent">NODE_PULSE_256</span>.
          </p>
        </div>
      </header>

      {!deliveryId ? (
        <TitanCard className="p-20 text-center flex flex-col items-center justify-center max-w-4xl mx-auto bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
          <div className="w-24 h-24 bg-accent/10 border border-accent/20 rounded-[2.5rem] flex items-center justify-center mb-8 text-4xl animate-float">🛵</div>
          <h2 className="text-3xl font-bold text-white mb-4 font-space">Initialize Grid Node</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed font-medium">
            Your delivery network is currently offline. Synchronize with a delivery node to begin real-time tracking across the campus grid.
          </p>
          <GlowButton onClick={startMockDelivery} className="px-12 py-4 text-lg">Establish Connection</GlowButton>
        </TitanCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Tracking Terminal */}
          <div className="lg:col-span-8 space-y-6">
            <TitanCard className="p-10 relative overflow-hidden bg-white/[0.01]">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(14,165,233,0.4)] border border-accent/30">
                    <Navigation2 className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-1">Node Identifier</p>
                    <p className="text-white font-space font-bold text-xl glow-text-cyan">{deliveryId}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="px-5 py-2 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                     {status}
                   </div>
                   <span className="text-[9px] text-gray-700 font-mono">Uptime: 14m 22s</span>
                </div>
              </div>

              {/* Holographic Map Interaction Layer */}
              <HolographicMap progress={progress} status={status} className="mb-10" />

              {/* Progress System */}
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1 font-space">Sector Synchronization</p>
                     <p className="text-2xl font-bold text-white font-space tracking-tight">Active Node Telemetry</p>
                   </div>
                   <div className="text-right">
                     <p className="text-5xl font-bold text-accent font-space">{progress}%</p>
                   </div>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-cyan-500/50 via-accent to-accent rounded-full shadow-[0_0_20px_rgba(14,165,233,0.6)]" 
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/5 flex items-center gap-4 group hover:border-accent/20 transition-colors">
                    <div className="p-3 rounded-2xl bg-white/5 text-accent">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Pickup Origin</p>
                      <p className="text-sm text-white font-bold">Main Canteen, Block A</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/5 flex items-center gap-4 group hover:border-accent/20 transition-colors">
                    <div className="p-3 rounded-2xl bg-white/5 text-accent">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Transit Target</p>
                      <p className="text-sm text-white font-bold">Boy's Hostel, Sector 4</p>
                    </div>
                  </div>
                </div>
              </div>
            </TitanCard>
          </div>

          {/* Delivery Intelligence Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <AdaptiveWidget variant="glass" title="Fleet Personnel">
              <div className="flex items-center gap-5 mb-8 p-6 bg-white/[0.04] rounded-[2.5rem] border border-white/10 group">
                <div className="relative">
                   <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-accent/30 to-indigo-500/30 flex items-center justify-center text-4xl border border-white/10 group-hover:scale-105 transition-transform duration-500">👤</div>
                   <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-slate-950 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white font-space tracking-tight">Rohan S.</h4>
                  <div className="flex text-amber-500 text-xs mt-1 items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="text-sm">4.9</span>
                    <span className="text-gray-500 font-medium lowercase tracking-tighter">(1.2k Ratings)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5">
                   <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Arrival Probability</span>
                   <span className="text-base font-bold text-accent font-space">94.3%</span>
                </div>
                <div className="flex gap-4">
                  <GlowButton variant="secondary" className="flex-1 py-4 px-0 border-white/10 rounded-2xl group">
                    <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> Comms
                  </GlowButton>
                  <GlowButton variant="secondary" className="flex-1 py-4 px-0 border-white/10 rounded-2xl text-red-400 border-red-500/10 hover:bg-red-500/5 group">
                    <AlertCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> SOS
                  </GlowButton>
                </div>
              </div>
            </AdaptiveWidget>

            <AdaptiveWidget variant="bioluminescent" title="Neural Traffic Relay">
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <div className="p-3 rounded-2xl bg-accent/20 text-accent border border-accent/20">
                     <Zap className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-[10px] text-white font-bold mb-1 uppercase tracking-widest">Path Optimization</p>
                     <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                       Node is currently navigating a Low-Congestion zone. ETA reduced by 241 seconds due to sector clearing.
                     </p>
                   </div>
                 </div>
                 
                 <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 space-y-3 font-mono text-[9px] text-accent/60 uppercase tracking-[0.2em]">
                    <div className="flex justify-between items-center"><span className="text-gray-600">X_COORD:</span> <span className="text-white font-bold">12.971638</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600">Y_COORD:</span> <span className="text-white font-bold">77.594625</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600">VELOCITY:</span> <span className="text-white font-bold">5.82 m/s</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600">HEADING:</span> <span className="text-white font-bold">34.2 DEG</span></div>
                 </div>
               </div>
            </AdaptiveWidget>
            
            <GlowButton 
              onClick={() => setDeliveryId(null)}
              variant="ghost"
              className="w-full text-[10px] py-4 text-gray-700 hover:text-white uppercase tracking-widest font-bold font-space"
            >
              Terminate Session Node
            </GlowButton>
          </div>
        </div>
      )}
    </div>
  );
}
