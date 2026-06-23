"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Cpu, 
  Database, 
  Sparkles, 
  Code,
  Terminal,
  Layers,
  Link2
} from 'lucide-react';
import { GlowButton } from '../../components/ui/GlowButton';
import { TitanCard } from '../../components/ui/TitanCard';

// ─── Cyberpunk Microservice Relay Visualizer ─────────────────────────────────
const MicroserviceVisualizer = ({ selectedModule }: { selectedModule: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Positions of microservice nodes
      const nodes = [
        { id: 'marketplace', name: 'Marketplace Service', port: '3002', x: centerX - 240, y: centerY - 60, color: 'rgb(14, 165, 233)' },
        { id: 'skillswap', name: 'SkillSwap Service', port: '3007', x: centerX + 240, y: centerY - 60, color: 'rgb(168, 85, 247)' },
        { id: 'logistics', name: 'Logistics Service', port: '3003', x: centerX - 240, y: centerY + 60, color: 'rgb(244, 63, 94)' },
        { id: 'fintech', name: 'Fintech Wallet', port: '3004', x: centerX + 240, y: centerY + 60, color: 'rgb(16, 185, 129)' }
      ];

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Draw connection relays and packets
      nodes.forEach(node => {
        const isActive = selectedModule === node.id;
        ctx.strokeStyle = isActive ? node.color : 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = isActive ? 2.5 : 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();

        // Animate packets flowing along paths
        const packetCount = isActive ? 3 : 1;
        for (let i = 0; i < packetCount; i++) {
          const speed = isActive ? 0.012 : 0.004;
          const offset = i / packetCount;
          const progress = ((t * speed) + offset) % 1;
          const packetX = centerX + (node.x - centerX) * progress;
          const packetY = centerY + (node.y - centerY) * progress;

          // Packet glow and circle
          ctx.fillStyle = isActive ? '#fff' : 'rgba(255, 255, 255, 0.2)';
          ctx.beginPath();
          ctx.arc(packetX, packetY, isActive ? 4 : 2, 0, Math.PI * 2);
          ctx.fill();

          if (isActive) {
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 12;
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      });

      // Draw Central client Node (Next.js App)
      ctx.fillStyle = '#0a0a16';
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('NEXT.JS', centerX, centerY - 4);
      ctx.fillStyle = '#818cf8';
      ctx.fillText('PORT 3000', centerX, centerY + 6);

      // Draw Outer Node Hubs
      nodes.forEach(node => {
        const isActive = selectedModule === node.id;

        if (isActive) {
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 20;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 38, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = '#020205';
        ctx.strokeStyle = isActive ? node.color : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isActive ? '#fff' : '#475569';
        ctx.font = 'bold 8px monospace';
        ctx.fillText(node.id.toUpperCase(), node.x, node.y - 4);
        ctx.fillStyle = isActive ? node.color : '#334155';
        ctx.fillText(`PORT ${node.port}`, node.x, node.y + 6);
      });

      t++;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedModule]);

  return (
    <div className="relative w-full h-[280px] bg-slate-950/40 border border-white/5 rounded-[2rem] overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} width={800} height={280} className="w-full h-full max-w-[800px]" />
      
      {/* Corner HUD Markers */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/10 rounded-tl-xl" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/10 rounded-tr-xl" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/10 rounded-bl-xl" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/10 rounded-br-xl" />
      
      <div className="absolute top-4 left-10 text-[8px] font-mono text-gray-600 uppercase tracking-widest">
        ARCHITECTURAL_RELAY_HUD
      </div>
    </div>
  );
};

// ─── Main Explore Page Component ─────────────────────────────────────────────
export default function ExplorePage() {
  const [selectedModule, setSelectedModule] = useState('marketplace');

  const modules = {
    marketplace: {
      name: "Marketplace Node",
      port: 3002,
      endpoint: "GET /products",
      jsonPayload: {
        success: true,
        data: [
          { id: "1", name: "Neural Network Notes", price: 150, coins: 15, seller: "Alex Chen", category: "Academic" },
          { id: "2", name: "Mechanical Keyboard", price: 2400, coins: 240, seller: "Sarah J.", category: "Electronics" }
        ]
      },
      terminalLog: [
        "[info] Marketplace Service listening on port 3002",
        "[info] Incoming request: GET /products from host 127.0.0.1",
        "[db] DB Connection active. Returning Map-Fallback data (3 records)",
        "[info] Response status: 200 OK - Latency: 4ms"
      ]
    },
    skillswap: {
      name: "SkillSwap Node",
      port: 3007,
      endpoint: "POST /matches/find",
      jsonPayload: {
        success: true,
        data: [
          { provider_id: "user_101", name: "Alice", offered: "Advanced React.js and Next.js UI development", match_score_percentage: 98.4 },
          { provider_id: "user_103", name: "Charlie", offered: "UI/UX Design, Figma prototyping", match_score_percentage: 84.1 }
        ]
      },
      terminalLog: [
        "[info] SkillSwap Service listening on port 3007",
        "[info] Incoming request: POST /matches/find - query: 'React'",
        "[ai-engine] Invoking FastAPI TF-IDF similarity model at port 8000...",
        "[ai-engine] Success. Vector distance computed.",
        "[info] Response status: 200 OK - Latency: 12ms"
      ]
    },
    logistics: {
      name: "Logistics Router",
      port: 3003,
      endpoint: "GET /deliveries/delivery_982",
      jsonPayload: {
        success: true,
        deliveryId: "delivery_982",
        status: "in-transit",
        eta: "8 mins",
        coordinates: { lat: 12.9716, lng: 77.5946 },
        courier: "Rahul K. (Aura Multiplier: 1.2x)"
      },
      terminalLog: [
        "[info] Logistics Service listening on port 3003",
        "[info] Connected client via Socket.IO room 'delivery_delivery_982'",
        "[info] Dispatching live coordinate updates..."
      ]
    },
    fintech: {
      name: "Fintech Wallet Escrow",
      port: 3004,
      endpoint: "POST /wallet/escrow/lock",
      jsonPayload: {
        success: true,
        escrowId: "escrow_84920",
        amountCoins: 15.00,
        status: "locked",
        buyerId: "student_402",
        sellerId: "student_981"
      },
      terminalLog: [
        "[info] Payment Service listening on port 3004",
        "[ledger] Double-entry validation: buyer balance 245.50 >= 15.00",
        "[ledger] Escrow #84920 initialized. Balance locked."
      ]
    }
  };

  const current = modules[selectedModule as keyof typeof modules];

  return (
    <main className="min-h-screen text-white relative bg-black font-sans selection:bg-primary selection:text-white pb-20">
      <div className="absolute inset-0 bg-grid opacity-20 -z-10 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/">
          <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest font-space">
            <ArrowLeft className="w-4 h-4" /> Back to Orbit
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-accent animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 font-mono">Platform API Visualizer</span>
        </div>
      </header>

      {/* Visualizer Area */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <MicroserviceVisualizer selectedModule={selectedModule} />
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] font-space">JSON Connectivity</span>
            <h1 className="text-4xl font-bold font-space text-white tracking-tight mt-2">API Microservices</h1>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed font-medium">
              Explore how Next.js communicates with Node.js microservices through unified JSON API structures. Click any service to view its live data payload and server console mock.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {Object.keys(modules).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedModule(key)}
                className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  selectedModule === key
                    ? 'bg-primary/15 border-primary/35 text-white'
                    : 'bg-white/[0.01] border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold font-space uppercase tracking-widest">{modules[key as keyof typeof modules].name}</h4>
                  <p className="text-[10px] text-gray-600 font-mono mt-1 font-bold">PORT: {modules[key as keyof typeof modules].port}</p>
                </div>
                <Link2 className={`w-4 h-4 ${selectedModule === key ? 'text-primary' : 'text-gray-700'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Console and Code Visualizer */}
        <div className="lg:col-span-8 space-y-8">
          {/* Endpoint Selector Header */}
          <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-[10px] font-bold text-green-400 font-mono uppercase">ONLINE</span>
              <span className="text-sm font-bold text-white font-mono">{current.endpoint}</span>
            </div>
            <span className="text-xs text-gray-500 font-mono">LATENCY: ~8ms</span>
          </div>

          {/* Code Viewer Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Terminal Logs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest font-space">
                <Terminal className="w-3.5 h-3.5" /> Service Console Output
              </div>
              <div className="bg-black border border-white/5 p-6 rounded-2xl h-[340px] font-mono text-[11px] text-gray-400 overflow-y-auto space-y-3 select-none">
                {current.terminalLog.map((log, idx) => (
                  <div key={idx} className={log.includes('[db]') ? 'text-cyan-400' : log.includes('[ai-engine]') ? 'text-purple-400' : ''}>
                    {log}
                  </div>
                ))}
                <div className="text-green-400 animate-pulse">_</div>
              </div>
            </div>

            {/* JSON Response Payloads */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest font-space">
                <Code className="w-3.5 h-3.5" /> JSON Data Payload
              </div>
              <pre className="bg-black border border-white/5 p-6 rounded-2xl h-[340px] font-mono text-[11px] text-primary overflow-auto">
                {JSON.stringify(current.jsonPayload, null, 2)}
              </pre>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link href="/login">
              <GlowButton className="px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-2xl">Enter System Sandbox</GlowButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
