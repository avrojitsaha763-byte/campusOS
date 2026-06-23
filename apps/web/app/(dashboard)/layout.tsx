import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-background min-h-screen relative overflow-hidden bg-mesh font-sans selection:bg-primary/30">
      {/* Immersive Background Layers */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-mesh opacity-40" />
      
      {/* Global Command Center Scanline */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] select-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-breath" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[150px] animate-breath" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      <Sidebar />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
        <Topbar />
        
        <main className="flex-1 p-10 overflow-y-auto scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
