"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HolographicMapProps {
  progress: number;
  status: string;
  className?: string;
}

export const HolographicMap = ({ progress, status, className }: HolographicMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Grid Lines
      ctx.strokeStyle = "rgba(14, 165, 233, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Connection Pulse (from pickup to destination)
      const startX = canvas.width * 0.15;
      const startY = canvas.height / 2;
      const endX = canvas.width * 0.85;
      const endY = canvas.height / 2;

      ctx.setLineDash([5, 10]);
      ctx.strokeStyle = "rgba(14, 165, 233, 0.2)";
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(canvas.width / 2, startY - 100, canvas.width / 2, endY + 100, endX, endY);
      ctx.stroke();
      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={`relative w-full h-[400px] bg-slate-950/80 rounded-[2.5rem] border border-white/5 overflow-hidden group ${className}`}>
      {/* Background Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={400} 
        className="absolute inset-0 w-full h-full opacity-50"
      />

      {/* Decorative HUD Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner HUD markers */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-accent/30 rounded-tr-2xl" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-accent/30 rounded-br-2xl" />
        
        {/* Vertical Coordinates Sidebar */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 text-[8px] font-mono text-accent/40 uppercase tracking-widest leading-none">
          {['Lat: 12.9716', 'Lng: 77.5946', 'Alt: 924m', 'Spd: 24km/h'].map((coord, i) => (
            <div key={i} className="rotate-90 origin-left whitespace-nowrap">{coord}</div>
          ))}
        </div>
      </div>

      {/* Scanline & Grain Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-[length:100%_4px,3px_100%]" />
      
      {/* Tracking Marker (🛵) */}
      <motion.div 
        initial={false}
        animate={{ 
            left: `${15 + (progress * 0.7)}%`,
            top: `${(canvasRef.current?.height || 400) / 2}px` 
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-30"
      >
        <div className="relative">
          <div className="absolute inset-[-20px] bg-accent/20 rounded-full blur-2xl animate-breath" />
          <div className="w-16 h-16 rounded-2xl bg-accent border border-accent/50 shadow-[0_0_30px_rgba(14,165,233,0.8)] flex items-center justify-center text-3xl">
            🛵
          </div>
          <div className="absolute -bottom-8 -left-2 px-2 py-1 bg-black/60 backdrop-blur-md border border-accent/30 rounded-lg whitespace-nowrap text-[8px] font-bold text-accent uppercase tracking-widest">
            NODE_SYNC: {progress}%
          </div>
        </div>
      </motion.div>

      {/* Destination Node */}
      <div className="absolute right-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
         <div className="w-6 h-6 bg-red-500 rounded-full animate-ping absolute opacity-40" />
         <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white relative z-10 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
         <div className="mt-4 px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sector B4-2</span>
         </div>
      </div>

      {/* Real-time Telemetry Overlay */}
      <div className="absolute bottom-8 left-8 flex items-center gap-6 z-40 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl">
         <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <p className="text-[10px] text-accent font-mono tracking-widest uppercase">ENCRYPTED_STREAM: ACTIVE</p>
         </div>
         <div className="h-6 w-[1px] bg-white/10" />
         <div className="flex gap-4 font-mono text-[9px] text-gray-500">
           <span>SIG_STRENGTH: 98%</span>
           <span>LATENCY: 12ms</span>
         </div>
      </div>
    </div>
  );
};
