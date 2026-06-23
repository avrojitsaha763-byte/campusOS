"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Activity, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { TitanCard } from './TitanCard';

export const AuraDiagnosticHUD = () => {
  const [aura, setAura] = useState(142.4);
  const [logs, setLogs] = useState([
    { id: 1, text: "Perfect completion of React tutor barter session", change: "+12.4 Aura", isPositive: true, time: "2h ago" },
    { id: 2, text: "Food canteen logistics pickup delayed by 5 mins", change: "-2.0 Aura", isPositive: false, time: "5h ago" },
    { id: 3, text: "Secure escrow payment finalized for Notes exchange", change: "+5.0 Aura", isPositive: true, time: "1d ago" }
  ]);

  // Simulate subtle aura breathing
  useEffect(() => {
    const interval = setInterval(() => {
      setAura(prev => parseFloat((prev + (Math.random() > 0.6 ? 0.1 : -0.1)).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const dimensions = [
    { name: "Helpfulness Index", value: 92, icon: UserCheck, color: "text-purple-400" },
    { name: "Punctuality Rate", value: 96, icon: Activity, color: "text-cyan-400" },
    { name: "Escrow Integrity", value: 98, icon: ShieldCheck, color: "text-emerald-400" }
  ];

  return (
    <TitanCard className="p-8 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent border-purple-500/10 relative overflow-hidden group">
      <div className="relative z-10 space-y-6">
        
        {/* Header HUD */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-neon-purple animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500 font-space">Neural Aura Diagnostic</h3>
          </div>
          <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-[9px] font-bold text-neon-purple font-mono tracking-widest uppercase">
            AURA_MULTIPLIER: 1.15x
          </span>
        </div>

        {/* Big Aura Display */}
        <div className="flex items-baseline gap-4 py-2">
          <motion.div 
            key={aura}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold font-space tracking-tight text-white glow-text-purple"
          >
            {aura}
          </motion.div>
          <div className="text-xs font-bold text-gray-600 uppercase tracking-widest font-space">Total Aura Score</div>
        </div>

        {/* Progress Mappings */}
        <div className="space-y-4">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest font-space">Dimension Analysis</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dimensions.map((dim, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 font-space uppercase tracking-wider">{dim.name}</span>
                  <dim.icon className={`w-4 h-4 ${dim.color}`} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white font-space">{dim.value}%</span>
                  <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${dim.value}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aura Logs */}
        <div className="space-y-3 pt-2">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest font-space">Aura Transaction Ledger</p>
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/5 text-xs">
                <span className="text-gray-400 font-medium">{log.text}</span>
                <div className="flex items-center gap-3 font-mono font-bold ml-4 whitespace-nowrap">
                  <span className={log.isPositive ? 'text-green-400' : 'text-red-400'}>
                    {log.isPositive ? '+' : ''}{log.change}
                  </span>
                  <span className="text-[9px] text-gray-600 font-medium italic">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Futuristic Aura Breathe Background */}
      <div className="absolute top-[-30%] right-[-10%] w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none animate-breath" />
    </TitanCard>
  );
};
