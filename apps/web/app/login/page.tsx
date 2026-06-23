"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Fingerprint, 
  Cpu, 
  ArrowRight, 
  CheckCircle,
  Eye,
  Server
} from 'lucide-react';
import { GlowButton } from '../../components/ui/GlowButton';
import { TitanCard } from '../../components/ui/TitanCard';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('titan_studios');
  const [password, setPassword] = useState('••••••••••••');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: Idle, 1: Scanning, 2: Access Granted

  const handleBiometricAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setScanStep(1);
  };

  useEffect(() => {
    if (scanStep === 1) {
      const scanTimer = setTimeout(() => {
        setScanStep(2);
      }, 2500);
      return () => clearTimeout(scanTimer);
    } else if (scanStep === 2) {
      const redirectTimer = setTimeout(() => {
        router.push('/home');
      }, 1200);
      return () => clearTimeout(redirectTimer);
    }
  }, [scanStep, router]);

  return (
    <main className="min-h-screen text-white relative flex items-center justify-center bg-black font-sans selection:bg-primary selection:text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-25 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[160px] -z-10 pointer-events-none" />

      <div className="w-full max-w-lg p-6 relative z-10">
        
        {/* Logo and Greeting */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-space tracking-tight text-white">CampusOS Security Gateway</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">Verify credentials or biometric signature to access Titan Node</p>
        </div>

        <AnimatePresence mode="wait">
          {!isScanning ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TitanCard className="p-10 border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent shadow-2xl relative overflow-hidden group">
                <form onSubmit={handleBiometricAuth} className="space-y-6">
                  {/* Security Notice */}
                  <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-500 font-medium">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                    <span>Warning: Unauthorized access is actively logged under legal campus compliance codes.</span>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-space">Node Username</label>
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-space">Secret Token / Password</label>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-4 space-y-4">
                    <GlowButton type="submit" className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/btn">
                      Verify Secret Phrase <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </GlowButton>

                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                      <button type="button" className="hover:text-white transition-colors">Reset Token</button>
                      <span className="text-gray-700">|</span>
                      <button type="button" className="hover:text-white transition-colors">Access Logs</button>
                    </div>
                  </div>
                </form>

                {/* Decorative Bio Glow */}
                <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
              </TitanCard>
            </motion.div>
          ) : (
            <motion.div
              key="biometric-scan"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <TitanCard className="p-10 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent text-center min-h-[400px] flex flex-col justify-between items-center relative overflow-hidden">
                <div className="w-full">
                  <div className="flex items-center justify-between text-[9px] font-bold text-gray-600 uppercase tracking-widest font-mono mb-6">
                    <span className="flex items-center gap-2"><Server className="w-3 h-3 text-primary animate-pulse" /> SECURITY_STATUS: ENGAGED</span>
                    <span>LATENCY: 4ms</span>
                  </div>

                  <h3 className="text-2xl font-bold font-space text-white tracking-tight">
                    {scanStep === 1 ? 'Simulating Biometric Scan' : 'Authentication Success'}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 font-medium">
                    {scanStep === 1 ? 'Reading facial node mappings & digital signatures...' : 'Secure session tokens established. Syncing portal.'}
                  </p>
                </div>

                {/* Animated Biometric Target Grid */}
                <div className="relative w-36 h-36 border border-white/10 rounded-full flex items-center justify-center my-6 overflow-hidden">
                  <Eye className="w-16 h-16 text-primary animate-pulse-slow" />
                  
                  {/* Laser Sweeper Line */}
                  {scanStep === 1 && (
                    <motion.div 
                      animate={{ y: [-72, 72, -72] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,1)]"
                    />
                  )}

                  {/* Complete Check Circle overlay */}
                  {scanStep === 2 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-black/80 flex items-center justify-center"
                    >
                      <CheckCircle className="w-16 h-16 text-green-400" />
                    </motion.div>
                  )}
                </div>

                <div className="w-full">
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={scanStep === 2 ? { width: "100%" } : { width: "90%" }}
                      transition={scanStep === 2 ? { duration: 0.5 } : { duration: 2.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest mt-3">
                    {scanStep === 1 ? 'READING_BIOMETRIC_DATA...' : 'PORTAL_ACCESS_GRANTED'}
                  </div>
                </div>

                {/* Aura circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              </TitanCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
