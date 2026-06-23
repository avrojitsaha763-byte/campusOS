"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Zap, 
  Cpu, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  Globe, 
  Server,
  Lock
} from 'lucide-react';
import { GlowButton } from '../components/ui/GlowButton';
import { TitanCard } from '../components/ui/TitanCard';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('ecosystem');
  const [stats, setStats] = useState({
    users: 1240,
    volume: 84320,
    matches: 342,
    nodes: 8
  });

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + (Math.random() > 0.7 ? 1 : 0),
        volume: prev.volume + (Math.random() > 0.4 ? Math.floor(Math.random() * 50) : 0),
        matches: prev.matches + (Math.random() > 0.85 ? 1 : 0),
        nodes: prev.nodes
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = {
    ecosystem: {
      title: "The Campus Super-App",
      desc: "CampusOS brings all campus utilities—marketplace, skill barter, logistics, rent payment, and social interactions—into a single digital economy platform.",
      highlights: ["Unified Student Identity", "Double-Entry Ledgers", "Real-Time Geo-Tracking"]
    },
    fintech: {
      title: "Fintech & Campus Coins",
      desc: "An internal digital currency model backed by secure escrows. Users trade services and goods using coins or fiat, with automated fraud detection and zero transaction fees.",
      highlights: ["Secure Escrow Protocol", "UPI Instant Settlement", "Aura Multipliers"]
    },
    ai: {
      title: "AI-Powered Matching Engine",
      desc: "FastAPI neural engine using TF-IDF and cosine similarity to pair students for SkillSwaps, predict crowd density at menus, and recommend marketplace goods.",
      highlights: ["TF-IDF Match Profiles", "Predictive Demand Models", "Collaborative Filtering"]
    }
  };

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-black font-sans selection:bg-primary selection:text-white">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-grid opacity-20 -z-10 pointer-events-none" />
      
      {/* Cosmic Aura Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] -z-10" />

      {/* Floating Particle Orbs */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-3 h-3 bg-primary rounded-full blur-sm opacity-50"
      />
      <motion.div 
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full blur-xs opacity-45"
      />

      {/* Luxury Nav Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold font-space text-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">C</div>
          <span className="font-space font-bold text-lg tracking-wider text-white">CampusOS <span className="text-primary">X</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
          <a href="#features" className="hover:text-white transition-colors">Platform</a>
          <a href="#infrastructure" className="hover:text-white transition-colors">Infrastructure</a>
          <a href="#metrics" className="hover:text-white transition-colors">Live HUD</a>
        </div>
        <div>
          <Link href="/login">
            <GlowButton variant="secondary" className="px-6 py-2.5 rounded-xl border-white/10 text-xs gap-2">
              <Lock className="w-3.5 h-3.5" /> Portal Login
            </GlowButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-primary mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent glow-text" /> 
          Now Active: Next-Gen Campus Economy
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold font-space tracking-tight text-white leading-tight max-w-5xl mx-auto"
        >
          Unified Campus Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[size:200%] animate-gradient-flow glow-text">Super-App</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-8 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
        >
          An investor-ready, AI-driven, distributed campus operating system. Seamlessly connect students to marketplace listings, skill trading, real-time logistics, and digital wallet assets.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link href="/login">
            <GlowButton className="px-10 py-4 text-sm font-semibold rounded-2xl group flex items-center gap-2">
              Launch Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </GlowButton>
          </Link>
          <a href="#features">
            <GlowButton variant="secondary" className="px-10 py-4 text-sm font-semibold rounded-2xl border-white/5 bg-white/5 hover:bg-white/10">
              Interactive Tour
            </GlowButton>
          </a>
        </motion.div>
      </section>

      {/* Live System HUD Section */}
      <section id="metrics" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="flex items-center gap-3 mb-10">
          <Activity className="w-5 h-5 text-accent animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 font-space">Live Network Status Ticker</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Active Campus Nodes", value: stats.users.toLocaleString(), icon: Globe, suffix: " students" },
            { label: "Coins Exchanged Volume", value: `₹${stats.volume.toLocaleString()}`, icon: Coins, suffix: " equivalent" },
            { label: "AI Matches Created", value: stats.matches.toString(), icon: Zap, suffix: " matches" },
            { label: "Operational Microservices", value: stats.nodes.toString(), icon: Server, suffix: "/8 active" }
          ].map((stat, i) => (
            <TitanCard key={i} className="p-8 bg-white/[0.01] border-white/5 flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest font-space">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold font-space text-white tracking-tight">{stat.value}</div>
                <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">{stat.suffix}</div>
              </div>
            </TitanCard>
          ))}
        </div>
      </section>

      {/* Interactive Feature Demo Tour */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] font-space">Ecosystem Demo</span>
              <h2 className="text-4xl font-bold font-space text-white mt-3 tracking-tight">Interactive Platform Showcase</h2>
            </div>

            <div className="space-y-4">
              {Object.keys(features).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between ${
                    activeTab === tab 
                      ? 'bg-primary/10 border-primary/30 text-white' 
                      : 'bg-white/[0.01] border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div>
                    <h4 className="font-bold font-space uppercase tracking-wider text-sm">{tab === 'ai' ? 'AI Matcher' : tab}</h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium line-clamp-1">{features[tab as keyof typeof features].title}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${activeTab === tab ? 'translate-x-1 text-primary' : 'text-gray-700'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TitanCard className="p-10 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent min-h-[350px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Cpu className="w-5 h-5 text-accent animate-spin-slow" />
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-space">System Module Active</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold font-space text-white tracking-tight mb-4">
                      {features[activeTab as keyof typeof features].title}
                    </h3>
                    <p className="text-gray-400 font-medium text-lg leading-relaxed mb-8">
                      {features[activeTab as keyof typeof features].desc}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-3 font-space">Enterprise Capabilities</p>
                    <div className="flex flex-wrap gap-3">
                      {features[activeTab as keyof typeof features].highlights.map((highlight, idx) => (
                        <div key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400 font-space uppercase tracking-wider">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </TitanCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Startup Architecture Section */}
      <section id="infrastructure" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] font-space">Architectural Infrastructure</span>
          <h2 className="text-4xl font-bold font-space text-white mt-3 tracking-tight">Decentralized Microservice Mesh</h2>
          <p className="text-gray-400 mt-4 font-medium text-lg">
            Built using a resilient, multi-tiered architecture to secure zero-downtime, sub-10ms response times, and bulletproof user privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Titan Backend Nodes", desc: "A cluster of 8 lightweight Node.js/FastAPI servers handling individual domains (Auth, Payment, Logistics) in complete isolation.", icon: Server },
            { title: "Goat Web Client", desc: "Two unified Next.js 14 applications targeting students and platform managers, enriched with Glassmorphism UI/UX rules.", icon: Cpu },
            { title: "Escrow Coin Ledgers", desc: "Double-entry database schemas in PostgreSQL tracking UPI currency reserves and in-memory Redis caches speeding up live tracking requests.", icon: ShieldCheck }
          ].map((infra, i) => (
            <TitanCard key={i} className="p-10 bg-white/[0.01] border-white/5 hover:border-primary/20 transition-all flex flex-col justify-between min-h-[220px]">
              <div>
                <infra.icon className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-bold font-space text-white tracking-tight mb-3">{infra.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{infra.desc}</p>
              </div>
            </TitanCard>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="border-t border-white/5 bg-black py-16 text-center text-gray-600 text-xs font-bold uppercase tracking-wider font-space">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span>&copy; {new Date().getFullYear()} CampusOS Technologies Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-white transition-colors">Platforms</a>
            <a href="#metrics" className="hover:text-white transition-colors">Tickers</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
