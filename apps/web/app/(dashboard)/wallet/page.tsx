"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Lock, 
  History, 
  ShieldCheck,
  CreditCard,
  Target
} from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { GlowButton } from '../../../components/ui/GlowButton';
import { BalanceFlow, FinancialAura } from '../../../components/ui/BalanceFlow';
import { cn } from '../../../lib/utils';
import { api } from '../../../lib/api';

export default function WalletPage() {
  const [walletData, setWalletData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const json = await api.get('/wallet');
        if (json.success) {
          setWalletData(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch wallet data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWallet();
  }, []);

  if (isLoading) return <div className="text-white p-20 text-center">Loading Financial Intelligence...</div>;
  if (!walletData) return <div className="text-white p-20 text-center">Failed to load wallet data.</div>;

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary mb-3"
          >
            <ShieldCheck className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-space text-gray-500">TITAN SECURE VAULT</span>
          </motion.div>
          <h1 className="text-4xl font-bold font-space text-white tracking-tight">Financial <span className="text-primary glow-text">Intelligence</span><span className="text-primary">.</span></h1>
          <p className="text-gray-400 mt-2 font-medium text-lg leading-relaxed max-w-xl">
             Your hyper-secure campus capital hub. Real-time liquidity node active with <span className="text-primary">99.9% Up-time</span>.
          </p>
        </div>
        <div className="flex gap-4">
          <GlowButton variant="secondary" className="px-6 py-3 border-white/10 rounded-2xl">Ledger Export</GlowButton>
          <GlowButton className="gap-2 px-8 py-3 rounded-2xl group">
             <CreditCard className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Mint Assets
          </GlowButton>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Balance Command Center */}
        <TitanCard className="lg:col-span-8 p-12 bg-gradient-to-br from-indigo-500/10 via-background to-transparent relative overflow-hidden group perspective-1000">
          <FinancialAura />
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] font-space mb-1">Global Liquidity Status</p>
                  <p className="text-green-500 text-xs font-bold uppercase flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Synchronized
                  </p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] text-gray-700 font-mono">NODE_HASH: 0x2A...8F9E</p>
                  <p className="text-[9px] text-gray-800 font-mono mt-0.5">VAULT_STABILITY: CORE_MAX</p>
               </div>
            </div>
            
            <div className="mb-auto">
               <p className="text-gray-500 font-bold uppercase text-[11px] tracking-[0.2em] mb-4">Total Combined Capital</p>
               <BalanceFlow value={walletData.balance} className="mb-4" />
               <p className="text-xs text-gray-600 font-bold tracking-widest uppercase mb-12">≈ ₹{(walletData.balance * 5.2).toLocaleString()} Estimated</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
               <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/5 hover:border-primary/20 transition-colors group/stat">
                 <p className="text-[10px] text-gray-700 font-bold uppercase mb-2 tracking-widest group-hover/stat:text-white transition-colors">Daily Node Delta</p>
                 <p className="text-xl font-bold text-white font-space tracking-tight">-45.00 <span className="text-[10px] text-gray-600">CC</span></p>
               </div>
               <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/5 hover:border-accent/20 transition-colors group/stat">
                 <p className="text-[10px] text-gray-700 font-bold uppercase mb-2 tracking-widest group-hover/stat:text-white transition-colors">Yield Projection</p>
                 <p className="text-xl font-bold text-green-500 font-space tracking-tight">+₹1,240 <span className="text-[10px] text-gray-600">MO</span></p>
               </div>
               <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/5 hover:border-purple-500/20 transition-colors group/stat">
                 <p className="text-[10px] text-gray-700 font-bold uppercase mb-2 tracking-widest group-hover/stat:text-white transition-colors">Trust Verification</p>
                 <p className="text-xl font-bold text-white font-space tracking-tight">Level 9</p>
               </div>
            </div>
          </div>

          <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-breath" />
        </TitanCard>

        {/* Escrow & Goals */}
        <div className="lg:col-span-4 space-y-8">
          <AdaptiveWidget variant="glow" title="Neural Vault" icon={<Lock className="w-5 h-5 text-neon-pink" />}>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-4">Secured Assets</p>
                <div className="text-4xl font-bold text-white font-space glow-text">₹{walletData.pendingEscrow.toFixed(2)}</div>
                <div className="mt-2 flex items-center gap-2">
                   <div className="w-3 h-[2px] bg-red-500" />
                   <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Restricted Liquidity</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                Funds locked for **2 active logistics nodes** and **1 pending SkillSwap**. Assets will release upon verification hash match.
              </p>
              <GlowButton variant="secondary" className="w-full text-xs font-bold py-4 rounded-2xl border-white/10 uppercase tracking-widest">Verify Release</GlowButton>
            </div>
          </AdaptiveWidget>

          <AdaptiveWidget variant="glass" title="Capital Projection" icon={<Target className="w-5 h-5 text-accent" />}>
             <div className="space-y-6">
               <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-bold text-white font-space uppercase">Target: MacBook Pro</span>
                    <span className="text-xs text-accent font-bold font-mono">68.2%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "68.2%" }}
                      className="h-full bg-accent shadow-[0_0_15px_rgba(14,165,233,0.6)] rounded-full" 
                      transition={{ duration: 1.5, ease: "circOut" }}
                    />
                  </div>
               </div>
               <div className="flex items-center justify-between text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
                  <span>14,500 CC Left</span>
                  <span>122 Days Est.</span>
               </div>
             </div>
          </AdaptiveWidget>
        </div>

        {/* Intelligence Ledger (Transaction History) */}
        <div className="lg:col-span-12">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-gray-600" />
              <h3 className="text-2xl font-bold text-white font-space tracking-tight uppercase tracking-widest">Transaction Intelligence</h3>
            </div>
            <div className="flex gap-2">
               <button className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Filter Node</button>
               <button className="px-4 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">View Analysis</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {walletData.recentTransactions.map((tx: any, i: number) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 border",
                    tx.type === 'credit' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                  )}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{tx.category}</span>
                       <span className="w-1 h-1 rounded-full bg-gray-800" />
                       <span className="text-[10px] text-gray-700 font-mono">{tx.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white font-space tracking-tight group-hover:text-primary transition-colors">{tx.description}</h4>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={cn(
                    "text-xl font-bold font-space glow-text",
                    tx.type === 'credit' ? "text-green-500" : "text-white"
                  )}>
                    {tx.type === 'credit' ? '+' : '-'}{tx.amount.toFixed(2)} <span className="text-[10px] text-gray-600 tracking-widest">CC</span>
                  </p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.2em] mt-1",
                    tx.status === 'Completed' ? "text-green-900" : "text-amber-700 animate-pulse"
                  )}>{tx.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
