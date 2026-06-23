"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Search, 
  MapPin, 
  Clock, 
  Plus, 
  Star, 
  TrendingUp,
  CreditCard,
  Target,
  ArrowRight,
  CookingPot,
  UtensilsCrossed,
  ChefHat,
  Coffee,
  Zap,
  Flame,
  Binary
} from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { GlowButton } from '../../../components/ui/GlowButton';
import { OrderTimeline, FoodTag } from '../../../components/ui/OrderTimeline';
import { cn } from '../../../lib/utils';
import { api } from '../../../lib/api';

export default function FoodPage() {
  const [activeTab, setActiveTab] = useState('Direct Delivery');
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const orderSteps = [
    { id: '1', label: 'Order Synchronized', status: 'completed' as const, time: '12:45 PM', icon: Zap },
    { id: '2', label: 'Kitchen Processing', status: 'completed' as const, time: '12:48 PM', icon: CookingPot },
    { id: '3', label: 'Live Preparation', status: 'current' as const, icon: Flame },
    { id: '4', label: 'Logistics Handover', status: 'pending' as const, icon: MapPin },
  ];

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await api.get('/food/menus', { cache: 'no-store' });
        setMenus(res.data || []);
      } catch (err) {
        console.error("Failed to fetch menus from backend", err);
        setMenus([
          { _id: '1', name: 'Peri-Peri Paneer Wrap', price: 145, description: 'Grilled paneer with spicy peri-peri sauce.', category: 'Veg', tags: ['High Protein'] },
          { _id: '2', name: 'Hazelnut Cold Brew', price: 120, description: 'Slow-steeped coffee with hazelnut flavor.', category: 'Beverage', tags: ['Fast'] },
          { _id: '3', name: 'Cheese Burst Pizza', price: 299, description: 'Extra cheesy crust with garden fresh toppings.', category: 'Veg', tags: ['Trending'] },
          { _id: '4', name: 'Veg Hakka Noodles', price: 90, description: 'Street-style noodles with crisp vegetables.', category: 'Veg', tags: ['High Protein'] }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  const vendors = [
    { name: 'Main Canteen', rating: 4.8, time: '15-20 min', tags: ['Snacks', 'Bioluminescent'], status: 'Active', color: 'rgba(14, 165, 233, 0.2)', icon: <ChefHat className="w-8 h-8" /> },
    { name: 'Nescafe Spot', rating: 4.9, time: '5-10 min', tags: ['Caffeine', 'Quick'], status: 'Active', color: 'rgba(99, 102, 241, 0.2)', icon: <Coffee className="w-8 h-8" /> },
    { name: 'Night Reserve', rating: 4.6, time: '20-25 min', tags: ['Dinner', 'Late Night'], status: 'Closing Soon', color: 'rgba(192, 132, 252, 0.2)', icon: <UtensilsCrossed className="w-8 h-8" /> },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent mb-3"
          >
            <Utensils className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-space text-gray-500">TITAN GASTRONOMY CENTER</span>
          </motion.div>
          <h1 className="text-4xl font-bold font-space text-white tracking-tight">GASTRONOMY <span className="text-accent glow-text">NODE</span><span className="text-primary">.</span></h1>
          <p className="text-gray-400 mt-2 text-lg font-medium leading-relaxed max-w-xl">
             Hyper-sync fuel for intellectual breakthrough. Real-time preparation telemetry active.
          </p>
        </div>

        <div className="flex p-1.5 bg-white/[0.03] border border-white/5 rounded-[2rem] w-max gap-1">
          {['Direct Delivery', 'Neural Subscriptions'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "px-10 py-3.5 rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 font-space",
                 activeTab === tab ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "text-gray-600 hover:text-white"
               )}
             >
               {tab}
             </button>
          ))}
        </div>
      </header>

      {/* Featured Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {vendors.map((vendor, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <TitanCard 
              glowColor={vendor.color}
              className="p-10 cursor-pointer group hover:bg-gradient-to-br hover:from-white/[0.04] transition-all duration-500 min-h-[300px] flex flex-col border-white/5 hover:border-white/20"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.03] border border-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {vendor.icon}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                   <div className={cn(
                     "px-3 py-1 border rounded-lg text-[10px] font-bold uppercase tracking-widest",
                     vendor.status === 'Active' ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                   )}>
                     {vendor.status}
                   </div>
                   <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                     <Star className="w-3.5 h-3.5 fill-amber-500" /> {vendor.rating}
                   </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 font-space tracking-tight group-hover:text-accent transition-colors">{vendor.name}</h3>
              <div className="flex items-center gap-3 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-10 font-space">
                <Clock className="w-4 h-4" /> Transit: {vendor.time}
              </div>

              <div className="flex gap-2 flex-wrap mt-auto">
                {vendor.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-bold text-gray-600 tracking-widest uppercase group-hover:text-white group-hover:border-white/10 transition-all font-space">
                    {tag}
                  </span>
                ))}
              </div>
            </TitanCard>
          </motion.div>
        ))}
      </div>

      {/* Synchronized Menu Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-accent animate-pulse" />
              <h2 className="text-2xl font-bold text-white font-space tracking-tight uppercase tracking-widest">Active Gastronomy Node</h2>
            </div>
            <div className="flex items-center gap-2">
               <Binary className="w-4 h-4 text-gray-800" />
               <span className="text-[10px] text-gray-800 font-mono font-bold uppercase">Node_Stability: Optimal</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {menus.map((item: any, i: number) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TitanCard className="p-8 flex items-center gap-8 group cursor-pointer hover:border-accent/40 transition-all duration-500 bg-white/[0.01] border-white/5 relative overflow-hidden">
                   <div className="w-24 h-24 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-700 shadow-inner group-hover:shadow-accent/10">
                      {item.category === 'Beverage' ? '🥤' : '🍱'}
                   </div>
                   <div className="flex-1 relative z-10">
                      <div className="flex gap-2 mb-2">
                        <FoodTag category="Veg" />
                        {item.tags?.map((t: string) => <FoodTag key={t} category={t} />)}
                      </div>
                      <h4 className="text-xl font-bold text-white font-space tracking-tight mb-2 group-hover:text-accent transition-colors leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-6 font-medium leading-relaxed">{item.description}</p>
                      <div className="flex items-center justify-between">
                         <span className="text-2xl font-bold text-white font-space">₹{item.price}</span>
                         <button 
                           onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                             detail: { message: `Added ${item.name} to active fuel cart!`, type: 'success' } 
                           }))}
                           className="w-11 h-11 rounded-2xl bg-white/[0.04] hover:bg-accent hover:text-white border border-white/10 flex items-center justify-center transition-all duration-500 group-active:scale-95"
                         >
                            <Plus className="w-6 h-6" />
                         </button>
                      </div>
                   </div>
                   <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
                </TitanCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Order Tracking Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <AdaptiveWidget variant="bioluminescent" title="Neural Tracking Terminal" className="p-10 border-accent/20">
             <div className="flex items-center justify-between mb-10">
               <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 font-space">Current Node</p>
                  <p className="text-white font-bold leading-relaxed font-space text-lg">ORDER_77A1_X</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] text-gray-700 font-mono">12m to Destination</p>
               </div>
             </div>
             
             <OrderTimeline steps={orderSteps} />

             <div className="mt-10 pt-10 border-t border-white/5">
                <GlowButton 
                   onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                     detail: { message: 'Encrypted communication channel established with delivery partner Rohan S. Latency: 14ms.', type: 'security' } 
                   }))}
                   className="w-full gap-3 py-4 rounded-2xl group text-sm font-bold uppercase tracking-widest"
                >
                   Establish Comm Link <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </GlowButton>
             </div>
          </AdaptiveWidget>

          <AdaptiveWidget variant="glass" title="Nutritional Intelligence" className="p-10">
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-accent/10 text-accent border border-accent/20 transition-transform hover:scale-105">
                     <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-[11px] text-white font-bold uppercase tracking-widest mb-1 font-space">Fuel Recommendation</h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                       Neural scans suggest high-glucose recovery needed. Recommended: **Hazelnut Cold Brew** to reset task focus.
                    </p>
                  </div>
                </div>
                <div className="h-[2px] w-full bg-white/5 rounded-full" />
                <div className="flex items-center justify-between">
                   <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest font-space">Sync Efficiency</p>
                   <p className="text-amber-500 font-bold font-mono text-xs">92.4%</p>
                </div>
             </div>
          </AdaptiveWidget>
        </div>
      </div>
    </div>
  );
}
