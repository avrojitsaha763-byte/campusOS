"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Coffee, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  MessageSquare,
  Sparkles,
  MapPin
} from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { GlowButton } from '../../../components/ui/GlowButton';
import { getTimePeriod, cn } from '../../../lib/utils';
import { AuraDiagnosticHUD } from '../../../components/ui/AuraDiagnosticHUD';

export default function HomePage() {
  const [timePeriod, setTimePeriod] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimePeriod(getTimePeriod());
    setMounted(true);
    const interval = setInterval(() => setTimePeriod(getTimePeriod()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const config = {
    morning: {
      greeting: "Good Morning, Titan",
      subtitle: "Your academic day is starting. Here's your schedule.",
      icon: Sun,
      color: "text-amber-400",
      accent: "from-amber-500/20 to-orange-500/5",
      primaryWidget: { title: "Next Class", time: "10:30 AM", detail: "Advanced Algorithms", loc: "Block C, Room 402" }
    },
    afternoon: {
      greeting: "Good Afternoon, Titan",
      subtitle: "Mid-day check-in. Any lunch plans or deliveries?",
      icon: Coffee,
      color: "text-sky-400",
      accent: "from-sky-500/20 to-indigo-500/5",
      primaryWidget: { title: "Canteen Status", time: "Live", detail: "Main Canteen: Low Crowd", loc: "Order now for 5min pickup" }
    },
    evening: {
      greeting: "Good Evening, Titan",
      subtitle: "Wind down or sync up. See what's happening tonight.",
      icon: Moon,
      color: "text-indigo-400",
      accent: "from-indigo-500/20 to-purple-500/5",
      primaryWidget: { title: "Night Feed", time: "Trending", detail: "SkillSwap Meetup at Library", loc: "Started 10m ago" }
    }
  }[timePeriod];

  const Icon = config.icon;

  return (
    <div className="space-y-10 pb-20">
      {/* Contextual Header */}
      <header className="relative py-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className={cn("p-2 rounded-xl bg-white/5", config.color)}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 font-space">Universal Intelligence</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-bold font-space text-white tracking-tight"
        >
          {config.greeting}<span className="text-primary">.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-3 text-lg max-w-xl font-medium"
        >
          {config.subtitle}
        </motion.p>
      </header>

      {/* Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Predictive Primary Widget */}
        <AdaptiveWidget 
          variant="bioluminescent" 
          title={config.primaryWidget.title}
          icon={<Clock className="w-5 h-5 text-accent" />}
          className="lg:col-span-8 group overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full min-h-[160px]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-white font-space tracking-tight">{config.primaryWidget.time}</span>
                <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">Priority</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">{config.primaryWidget.detail}</h4>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{config.primaryWidget.loc}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <GlowButton 
                variant="secondary" 
                className="px-6 py-3 border-white/5 bg-white/5"
                onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                  detail: { message: 'Mapping optimized route. Initializing HUD GPS...', type: 'info' } 
                }))}
              >
                View Full Route
              </GlowButton>
              <GlowButton 
                className="group/btn"
                onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                  detail: { message: 'Biometric Class Check-in Successful! Syncing attendance registry.', type: 'success' } 
                }))}
              >
                Check In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </GlowButton>
            </div>
          </div>
          
          {/* Decorative Pulse */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
        </AdaptiveWidget>

        {/* Global Wallet Summary */}
        <TitanCard className="lg:col-span-4 flex flex-col justify-between p-8 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
          <div>
            <div className="flex items-center justify-between mb-8">
               <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 font-space">Titan Assets</span>
               <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-bold text-white font-space">245.50</h3>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Campus Coins</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 tracking-wide font-medium">Equal to approx. ₹1,227.50</p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
            <div className="flex-1">
              <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Growth</p>
              <p className="text-sm font-bold text-white">+12.5%</p>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Escrow</p>
              <p className="text-sm font-bold text-white">45.00</p>
            </div>
          </div>
        </TitanCard>

        {/* Aura Reputation HUD */}
        <div className="lg:col-span-12 mt-4">
          <AuraDiagnosticHUD />
        </div>

        {/* Real-time Discovery Feed */}
        <div className="lg:col-span-12 mt-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-space text-white flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary glow-text" />
              Pulse Discovery
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">ALL</button>
              <button className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">URGENT</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'SkillSwap', user: 'Ariana V.', content: 'Looking for Python help in exchange for UI Design', time: '2m ago', color: 'border-accent/30', icon: Zap },
              { type: 'Logistics', status: 'In Transit', content: 'Lunch Order #289 is near Block D', time: 'Just now', color: 'border-primary/30', icon: Clock },
              { type: 'Social', user: 'Campus HR', content: 'Hackathon registrations open now at Lab 2', time: '15m ago', color: 'border-pink-500/30', icon: MessageSquare }
            ].map((item, i) => (
              <TitanCard key={i} className={cn("border", item.color)}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-space">{item.type}</span>
                  </div>
                  <span className="text-[10px] text-gray-600 font-medium italic">{item.time}</span>
                </div>
                <p className="text-sm text-gray-300 font-medium leading-relaxed">
                  {item.content}
                </p>
                <div 
                  onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                    detail: { message: `Syncing telemetry data for ${item.type} update...`, type: 'info' } 
                  }))}
                  className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-bold text-primary cursor-pointer hover:underline uppercase tracking-wider"
                >
                  View Insight <ArrowRight className="w-3 h-3" />
                </div>
              </TitanCard>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
