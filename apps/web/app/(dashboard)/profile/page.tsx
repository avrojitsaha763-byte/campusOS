"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Cpu, 
  Zap, 
  Award, 
  Globe, 
  Settings, 
  RefreshCcw, 
  Terminal, 
  Key,
  Fingerprint
} from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { GlowButton } from '../../../components/ui/GlowButton';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { cn } from '../../../lib/utils';

export default function ProfilePage() {
  const [isUpdatingBio, setIsUpdatingBio] = useState(false);
  const [securityStatus, setSecurityStatus] = useState('Encrypted');
  
  const studentInfo = {
    name: "James Student",
    role: "Titan Research Fellow",
    level: "Level 4 Titanium",
    aura: 884,
    nodeId: "TITAN_NODE_0X49C",
    sector: "Systems Lab, Sector 7",
    joined: "Aug 2025"
  };

  const recentLogs = [
    { event: "Biometric authentication signature validated", time: "Today, 7:54 PM", status: "success" },
    { event: "Escrow hold created for SkillSwap Node", time: "Yesterday, 3:12 PM", status: "info" },
    { event: "Logistics routing token #882 assigned", time: "2 days ago", status: "info" },
    { event: "Aura reputation reward (+15) processed", time: "3 days ago", status: "success" }
  ];

  const handleSyncKeys = () => {
    setSecurityStatus('Re-keying...');
    window.dispatchEvent(new CustomEvent('campus-toast', { 
      detail: { message: 'Rotating cryptographic node authentication keys...', type: 'info' } 
    }));
    
    setTimeout(() => {
      setSecurityStatus('Encrypted');
      window.dispatchEvent(new CustomEvent('campus-toast', { 
        detail: { message: 'Security node rotated. New 256-bit encryption signature active.', type: 'success' } 
      }));
    }, 1500);
  };

  const handleUpdateBiometric = () => {
    setIsUpdatingBio(true);
    window.dispatchEvent(new CustomEvent('campus-toast', { 
      detail: { message: 'Initializing biometric scanner... Look at the sensor.', type: 'info' } 
    }));

    setTimeout(() => {
      setIsUpdatingBio(false);
      window.dispatchEvent(new CustomEvent('campus-toast', { 
        detail: { message: 'Biometric signature updated and synced to decentralized consensus network.', type: 'success' } 
      }));
    }, 2500);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary mb-3"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-space text-gray-500">Identity telemetry</span>
          </motion.div>
          <h1 className="text-4xl font-bold font-space text-white tracking-tight">Identity <span className="text-primary glow-text">Profile</span><span className="text-primary">.</span></h1>
          <p className="text-gray-400 mt-2 text-lg font-medium leading-relaxed max-w-xl">
             Manage your decentralized campus identity, security credentials, and neural aura multipliers.
          </p>
        </div>
      </header>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column - Card Summary */}
        <div className="lg:col-span-4 space-y-8">
          <TitanCard className="p-10 text-center flex flex-col items-center bg-gradient-to-br from-primary/10 via-background to-transparent border-primary/20 relative overflow-hidden group">
            
            {/* Avatar Glow */}
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-4xl font-bold text-white shadow-2xl animate-float border border-white/15">
                JS
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 border-4 border-slate-950 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
            </div>

            <h3 className="text-3xl font-bold text-white font-space tracking-tight mb-1">{studentInfo.name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em] mb-4">{studentInfo.role}</p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-primary uppercase tracking-widest mb-10">
              <Award className="w-3.5 h-3.5" /> {studentInfo.level}
            </div>

            <div className="w-full space-y-4 pt-8 border-t border-white/5 font-space text-xs text-left">
              <div className="flex justify-between">
                <span className="text-gray-600 uppercase font-bold tracking-widest text-[9px]">Node ID</span>
                <span className="text-white font-mono font-bold">{studentInfo.nodeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 uppercase font-bold tracking-widest text-[9px]">Active Sector</span>
                <span className="text-white font-bold">{studentInfo.sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 uppercase font-bold tracking-widest text-[9px]">Joined</span>
                <span className="text-white font-bold">{studentInfo.joined}</span>
              </div>
            </div>

            {/* Background Blob */}
            <div className="absolute top-[-30%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          </TitanCard>

          <AdaptiveWidget variant="bioluminescent" title="Aura Influence" className="p-8">
             <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 font-space">Reputation Aura</p>
                  <p className="text-4xl font-bold text-white font-space glow-text">{studentInfo.aura} <span className="text-xs text-gray-500">Points</span></p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Zap className="w-6 h-6 animate-pulse" />
                </div>
             </div>
             <p className="text-xs text-gray-500 leading-relaxed font-medium">
               Your aura multiplier is currently **1.45x**. Trade products and complete SkillSwaps to increase your influence ranking.
             </p>
          </AdaptiveWidget>
        </div>

        {/* Right Column - Credentials & Logs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Security Node Configuration */}
          <AdaptiveWidget variant="glass" title="Security & Biometrics Control">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 hover:border-primary/20 transition-colors">
                   <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white font-space uppercase tracking-wider">Authentication Keys</h4>
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-bold uppercase font-mono tracking-widest",
                        securityStatus === 'Encrypted' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-amber-500/10 border border-amber-500/20 text-amber-500 animate-pulse'
                      )}>{securityStatus}</span>
                   </div>
                   <p className="text-xs text-gray-500 leading-relaxed font-medium">
                      Reset or rotate your 256-bit cryptographic security key used to authorize decentralized Escrow releases.
                   </p>
                   <GlowButton 
                     onClick={handleSyncKeys}
                     variant="secondary" 
                     className="w-full py-3 text-xs gap-2 rounded-xl border-white/10"
                   >
                     <RefreshCcw className="w-3.5 h-3.5" /> Rotate Key Cryptography
                   </GlowButton>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 hover:border-accent/20 transition-colors">
                   <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white font-space uppercase tracking-wider">Biometric Registry</h4>
                      <Fingerprint className="w-5 h-5 text-accent" />
                   </div>
                   <p className="text-xs text-gray-500 leading-relaxed font-medium">
                      Configure your facial structure node metrics or signature used for login authentication.
                   </p>
                   <GlowButton 
                     onClick={handleUpdateBiometric}
                     className="w-full py-3 text-xs gap-2 rounded-xl"
                     glowColor="rgba(14, 165, 233, 0.4)"
                   >
                     <Key className="w-3.5 h-3.5" /> Update Registry {isUpdatingBio && '...'}
                   </GlowButton>
                </div>
             </div>
          </AdaptiveWidget>

          {/* Node Security Log */}
          <div className="space-y-6">
             <div className="flex items-center gap-3">
               <Terminal className="w-5 h-5 text-gray-600" />
               <h3 className="text-xl font-bold text-white font-space uppercase tracking-widest leading-none">Security Node Audit Logs</h3>
             </div>
             
             <div className="space-y-4">
                {recentLogs.map((log, i) => (
                  <div 
                    key={i} 
                    className="p-5 rounded-[1.5rem] bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between"
                  >
                     <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          log.status === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]'
                        )} />
                        <div>
                          <p className="text-sm font-semibold text-white leading-relaxed">{log.event}</p>
                          <span className="text-[10px] text-gray-600 font-mono mt-0.5 block">{log.time}</span>
                        </div>
                     </div>
                     <span className="text-[9px] text-gray-800 font-mono uppercase font-bold tracking-widest hidden md:inline">AUDIT_VERIFIED</span>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
