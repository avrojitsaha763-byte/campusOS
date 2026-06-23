"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Filter, 
  Heart, 
  ArrowRight,
  Sparkles,
  Tag
} from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { GlowButton } from '../../../components/ui/GlowButton';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { Product3DPreview } from '../../../components/ui/Product3DPreview';
import { cn } from '../../../lib/utils';

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3002/products');
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Academic', 'Electronics', 'Lifestyle', 'Events', 'Notes'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary mb-3"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-space text-gray-500">TITAN ECONOMY</span>
          </motion.div>
          <h1 className="text-4xl font-bold font-space text-white tracking-tight">Marketplace <span className="text-primary glow-text">Node</span></h1>
          <p className="text-gray-400 mt-2 text-lg font-medium leading-relaxed">
            The hyper-local campus exchange. Every item tells a story, every swap builds a connection.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="bg-transparent border-none text-sm focus:outline-none text-white font-medium w-32"
            />
          </div>
          <GlowButton 
             onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
               detail: { message: 'Minting Sell Order form... Initializing asset metadata sync.', type: 'info' } 
             }))}
             className="gap-2 px-6"
           >
             <Plus className="w-4 h-4" /> Start Selling
           </GlowButton>
        </div>
      </header>

      {/* Luxury Category Navigation */}
      <nav className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar lg:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "relative px-6 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
              activeCategory === cat 
                ? "text-white" 
                : "text-gray-500 hover:text-white bg-white/[0.02] border border-white/5 hover:border-white/10"
            )}
          >
            {activeCategory === cat && (
              <motion.div 
                layoutId="category-pill"
                className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-2xl -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {cat}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.03] text-gray-600 hidden lg:flex">
          <Filter className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">More Filters</span>
        </div>
      </nav>

      {/* Immersive Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-gray-500 font-space animate-pulse">Syncing with Marketplace Node...</div>
        ) : filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <TitanCard 
              glowColor={product.glow}
              className="group cursor-pointer flex flex-col h-full bg-gradient-to-br from-white/[0.02] to-transparent perspective-1000"
            >
              {/* Product 3D Preview Wrapper */}
              <Product3DPreview glowColor={product.glow} className="mb-6">
                 {/* Product Icon/Visual */}
                 <div className="text-8xl group-hover:scale-110 transition-transform duration-700 select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] flex flex-col items-center">
                  {product.icon}
                  
                  {/* Stock Indicator (Holographic) */}
                  <div className="mt-4 px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", product.stock < 5 ? "bg-red-500" : "bg-green-500")} />
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{product.stock} units in field</span>
                  </div>
                </div>
                
                {/* Condition & Surge Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest">
                    {product.condition}
                  </div>
                  {product.surge && (
                    <div className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-xl text-[9px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Supply Surge
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300">
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                      detail: { message: `Saved ${product.name} to wishlist node!`, type: 'success' } 
                    }))}
                    className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-pink-500/20 hover:text-pink-500 transition-all"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </Product3DPreview>

              <div className="flex flex-col flex-1 px-2">
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">{product.category}</p>
                  <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/10 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                      {product.seller[0]}
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{product.seller}</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white font-space tracking-tight">₹{product.price.toLocaleString()}</div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-accent mt-0.5 glow-text-cyan">
                      <Tag className="w-3 h-3" />
                      <span>{product.coins} Campus Coins</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <GlowButton 
                      onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                        detail: { message: `Telemetry check: condition is ${product.condition} - high quality verified.`, type: 'info' } 
                      }))}
                      variant="secondary" 
                      className="px-3 py-2.5 rounded-xl border-white/5"
                    >
                      <Sparkles className="w-4 h-4" />
                    </GlowButton>
                    <GlowButton 
                      onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                        detail: { message: `Escrow synchronized for ${product.name}. Transferring ${product.coins} CC.`, type: 'success' } 
                      }))}
                      className="gap-2 px-5 py-2.5 rounded-xl text-sm group/btn"
                    >
                      Exchange <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </GlowButton>
                  </div>
                </div>
              </div>
            </TitanCard>
          </motion.div>
        ))}
      </div>
      
      {/* Dynamic Recommendation Panel */}
      <AdaptiveWidget variant="bioluminescent" className="mt-12 p-10 flex flex-col items-center text-center">
        <Sparkles className="w-10 h-10 text-primary mb-6 animate-pulse-slow" />
        <h2 className="text-3xl font-bold text-white font-space mb-4 tracking-tight">Supply <span className="text-primary">Intelligence</span> Sync</h2>
        <p className="text-gray-400 text-lg max-w-2xl font-medium leading-relaxed mb-8">
          Market analysis complete. High demand detected for **Academic Notes**. 
          Current liquidity allows for 15.3% higher exchange rates for elite sellers.
        </p>
        <GlowButton 
          onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
            detail: { message: 'Inventory synchronicity complete. Price surges adjusted across all categories.', type: 'success' } 
          }))}
          className="px-10"
        >
          Sync Inventory Logic
        </GlowButton>
      </AdaptiveWidget>
    </div>
  );
}
