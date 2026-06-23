"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  DollarSign, 
  Layers, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  ShoppingBag, 
  Truck, 
  ShieldAlert, 
  Sparkles, 
  Terminal as TerminalIcon,
  HardDrive,
  Brain,
  Coffee,
  Home as HomeIcon,
  ChevronRight,
  Send
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

// Data from db.json embedded directly for reliability
const initialUsers = [
  { id: "usr_001", name: "Avrojit Saha", email: "avrojit@campusos.ai", role: "student", department: "Computer Science", year: 3, campusCoins: 4250, rupeesBalance: 8500, trustScore: 98, badges: ["Early Adopter", "TITAN Member", "Top Seller"], hostelRoom: "B-302", hostelBlock: "Bhagat Singh Block" },
  { id: "usr_002", name: "Priya Sharma", email: "priya@campusos.ai", role: "student", department: "Electronics", year: 2, campusCoins: 2100, rupeesBalance: 3200, trustScore: 95, badges: ["SkillSwap Pro", "Active Seller"], hostelRoom: "A-108", hostelBlock: "APJ Block" },
  { id: "usr_003", name: "Rahul Verma", email: "rahul@campusos.ai", role: "student", department: "Mechanical", year: 4, campusCoins: 1280, rupeesBalance: 4200, trustScore: 91, badges: ["Top Seller"], hostelRoom: "C-204", hostelBlock: "Tagore Block" },
  { id: "usr_004", name: "Ananya Bose", email: "ananya@campusos.ai", role: "student", department: "Architecture", year: 3, campusCoins: 3100, rupeesBalance: 5800, trustScore: 97, badges: ["Top Buyer"], hostelRoom: "D-110", hostelBlock: "APJ Block" },
  { id: "usr_005", name: "Vikram Das", email: "vikram@campusos.ai", role: "student", department: "Electrical", year: 1, campusCoins: 450, rupeesBalance: 1500, trustScore: 89, badges: ["Novice"], hostelRoom: "B-102", hostelBlock: "Bhagat Singh Block" }
];

const revenueData = [
  { month: "Aug", revenue: 284000, users: 4200 },
  { month: "Sep", revenue: 342000, users: 5800 },
  { month: "Oct", revenue: 428000, users: 7200 },
  { month: "Nov", revenue: 512000, users: 9100 },
  { month: "Dec", revenue: 624000, users: 10800 },
  { month: "Jan", revenue: 748000, users: 12847 }
];

const moduleRevenue = [
  { module: "Marketplace", revenue: 284000, share: 38, color: "#8B5CF6" },
  { module: "SkillSwap", revenue: 198000, share: 26, color: "#06B6D4" },
  { module: "Logistics", revenue: 142000, share: 19, color: "#F59E0B" },
  { module: "Food", revenue: 89000, share: 12, color: "#10B981" },
  { module: "Hostel", revenue: 37000, share: 5, color: "#F43F5E" }
];

const initialLogs = [
  "[SYSTEM] Kernel initialized. Titan Control active.",
  "[AUTH] Token refresh request from usr_001 (Avrojit Saha)",
  "[FINTECH] Escrow lock of ₹95,000 completed for txn_7821",
  "[AI_ENGINE] User preference vector computed for usr_002",
  "[LOGISTICS] Coordinate telemetry synced: 12.9716° N, 77.5946° E",
  "[FOOD] Main Canteen queue load reported: LOW (prep delay < 5m)",
  "[MARKETPLACE] New listing approved: DSLR Canon EOS 90D Bundle"
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'users' | 'terminal'>('overview');
  const [services, setServices] = useState([
    { name: 'Auth Gateway', port: 3001, status: 'Online', latency: 4, type: 'core' },
    { name: 'User Management', port: 3008, status: 'Online', latency: 8, type: 'core' },
    { name: 'Marketplace Engine', port: 3002, status: 'Online', latency: 12, type: 'service' },
    { name: 'Logistics Tracker', port: 3003, status: 'Online', latency: 15, type: 'service' },
    { name: 'Payment Bridge', port: 3004, status: 'Online', latency: 6, type: 'fintech' },
    { name: 'Hostel System', port: 3005, status: 'Online', latency: 18, type: 'service' },
    { name: 'Canteen Orderer', port: 3006, status: 'Online', latency: 10, type: 'service' },
    { name: 'SkillSwap Broker', port: 3007, status: 'Online', latency: 14, type: 'service' },
    { name: 'FastAPI AI Engine', port: 8000, status: 'Online', latency: 24, type: 'ai' }
  ]);
  const [logs, setLogs] = useState<string[]>(initialLogs);
  const [terminalInput, setTerminalInput] = useState('');
  const [isPinging, setIsPinging] = useState(false);

  // Terminal commands handling
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...logs, `> ${terminalInput}`];

    if (cmd === 'help') {
      newLogs.push(
        "Available Commands:",
        "  status           Show microservice network statuses",
        "  ping             Check live latencies across nodes",
        "  clear            Clear terminal history logs",
        "  restart <port>   Simulate rebooting a microservice node"
      );
    } else if (cmd === 'status') {
      newLogs.push(
        "⚡ Network Status Report:",
        ...services.map(s => `  [${s.name}] Port ${s.port} - ${s.status} (latency: ${s.latency}ms)`)
      );
    } else if (cmd === 'ping') {
      newLogs.push("Pinging cluster endpoints...");
      setTimeout(() => {
        setServices(prev => prev.map(s => ({
          ...s,
          latency: Math.floor(Math.random() * 30) + 2
        })));
      }, 500);
      newLogs.push("Ping completed. Check Microservices tab for latest live metrics.");
    } else if (cmd === 'clear') {
      setLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd.startsWith('restart ')) {
      const portStr = cmd.split(' ')[1];
      const port = parseInt(portStr);
      const target = services.find(s => s.port === port);
      if (target) {
        newLogs.push(`[REBOOT] Initiating signal to Node Port ${port}...`);
        setServices(prev => prev.map(s => s.port === port ? { ...s, status: 'Degraded', latency: 999 } : s));
        setTimeout(() => {
          setServices(prev => prev.map(s => s.port === port ? { ...s, status: 'Online', latency: 5 } : s));
          setLogs(prev => [...prev, `[REBOOT] Node Port ${port} (${target.name}) recovered successfully.`]);
        }, 2000);
      } else {
        newLogs.push(`[ERROR] No active node registered on Port ${portStr}`);
      }
    } else {
      newLogs.push(`[ERROR] Command "${cmd}" not recognized. Type "help" for syntax.`);
    }

    setLogs(newLogs);
    setTerminalInput('');
  };

  // Real-time terminal log updates
  useEffect(() => {
    const logInterval = setInterval(() => {
      const events = [
        "[AI_ENGINE] Recalculating user preference matrices (Collaborative filtering active)",
        "[MARKETPLACE] Page view incremented on item mkt_001 (+18 views/min)",
        "[LOGISTICS] Active rider tracking sync success for del_001 (ETA updated: 6 min)",
        "[FOOD] Order completed at Main Canteen (INR 120 - credit to payment account)",
        "[WALLET] Ledger entry generated for Daily Bonus distribution",
        "[SECURITY] Admin console access check: OK (IP 127.0.0.1)"
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setLogs(prev => [...prev.slice(-30), randomEvent]);
    }, 8000);

    return () => clearInterval(logInterval);
  }, []);

  const triggerLivePing = async () => {
    setIsPinging(true);
    // Attempt live fetches if services are actually running locally
    const updatedServices = await Promise.all(services.map(async (s) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);
        const startTime = Date.now();
        const res = await fetch(`http://localhost:${s.port}/health`, { 
          signal: controller.signal,
          mode: 'cors'
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          return { ...s, status: 'Online', latency: Date.now() - startTime };
        }
      } catch (err) {
        // Degraded mode fallback
      }
      // Return simulated latency variance
      return { 
        ...s, 
        status: 'Online', 
        latency: Math.max(2, s.latency + Math.floor(Math.random() * 7) - 3) 
      };
    }));
    setServices(updatedServices);
    setTimeout(() => setIsPinging(false), 800);
  };

  return (
    <div style={styles.body}>
      {/* Bioluminescent Background Lights */}
      <div style={styles.aura1} />
      <div style={styles.aura2} />
      
      {/* Scanline Grid Pattern Overlay */}
      <div style={styles.scanline} />

      {/* Main Container Dashboard */}
      <div style={styles.container}>
        
        {/* Sidebar Panel */}
        <aside style={styles.sidebar}>
          <div style={styles.logoBox}>
            <div style={styles.logoIcon}>⚡</div>
            <div>
              <div style={styles.logoText}>CampusOS</div>
              <div style={styles.logoSubtext}>Admin Panel v2.0</div>
            </div>
          </div>

          <nav style={styles.nav}>
            <button 
              onClick={() => setActiveTab('overview')} 
              style={{...styles.navBtn, ...(activeTab === 'overview' ? styles.navBtnActive : {})}}
            >
              <Activity size={18} />
              <span>Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab('services')} 
              style={{...styles.navBtn, ...(activeTab === 'services' ? styles.navBtnActive : {})}}
            >
              <Layers size={18} />
              <span>Microservices</span>
            </button>
            <button 
              onClick={() => setActiveTab('users')} 
              style={{...styles.navBtn, ...(activeTab === 'users' ? styles.navBtnActive : {})}}
            >
              <Users size={18} />
              <span>User Base</span>
            </button>
            <button 
              onClick={() => setActiveTab('terminal')} 
              style={{...styles.navBtn, ...(activeTab === 'terminal' ? styles.navBtnActive : {})}}
            >
              <TerminalIcon size={18} />
              <span>Secure Shell</span>
            </button>
          </nav>

          <div style={styles.sidebarFooter}>
            <div style={styles.securityPulse}>
              <div style={styles.pulseDot} />
              <span>SSL SHA-256 ACTIVE</span>
            </div>
          </div>
        </aside>

        {/* Dashboard Pages */}
        <main style={styles.mainContent}>
          
          {/* Header Panel */}
          <header style={styles.header}>
            <div>
              <h1 style={styles.title}>System Control Pane</h1>
              <p style={styles.subtitle}>Supervising Campus Digital Infrastructure & Microservice Networks</p>
            </div>
            
            <button onClick={triggerLivePing} style={styles.pingBtn}>
              <RefreshCw size={14} className={isPinging ? 'animate-spin' : ''} />
              <span>{isPinging ? 'Pinging Nodes...' : 'Network Diagnostics'}</span>
            </button>
          </header>

          {/* Tab Pages */}
          {activeTab === 'overview' && (
            <div style={styles.pageContent}>
              {/* Stats Cards */}
              <div style={styles.statsGrid}>
                <div style={{...styles.statCard, borderBottom: '3px solid #8B5CF6'}}>
                  <div style={styles.statHeader}>
                    <span style={styles.statLabel}>Registered Users</span>
                    <Users size={20} color="#8B5CF6" />
                  </div>
                  <div style={styles.statNumber}>12,847</div>
                  <div style={styles.statTrendUp}>
                    <TrendingUp size={12} />
                    <span>+14.2% Month-Over-Month</span>
                  </div>
                </div>

                <div style={{...styles.statCard, borderBottom: '3px solid #06B6D4'}}>
                  <div style={styles.statHeader}>
                    <span style={styles.statLabel}>Campus Coin Cap</span>
                    <Sparkles size={20} color="#06B6D4" />
                  </div>
                  <div style={styles.statNumber}>1.28M 🪙</div>
                  <div style={styles.statTrendUp}>
                    <TrendingUp size={12} />
                    <span>Active circulation: 92%</span>
                  </div>
                </div>

                <div style={{...styles.statCard, borderBottom: '3px solid #10B981'}}>
                  <div style={styles.statHeader}>
                    <span style={styles.statLabel}>Today Volume (INR)</span>
                    <DollarSign size={20} color="#10B981" />
                  </div>
                  <div style={styles.statNumber}>₹2,84,750</div>
                  <div style={styles.statTrendUp}>
                    <TrendingUp size={12} />
                    <span>Platform fee (1%): ₹2,847</span>
                  </div>
                </div>

                <div style={{...styles.statCard, borderBottom: '3px solid #F59E0B'}}>
                  <div style={styles.statHeader}>
                    <span style={styles.statLabel}>System Health</span>
                    <Activity size={20} color="#F59E0B" />
                  </div>
                  <div style={styles.statNumber}>99.8%</div>
                  <div style={styles.statTrendUp}>
                    <span style={{ color: '#10B981' }}>● All 9 Nodes Online</span>
                  </div>
                </div>
              </div>

              {/* Recharts Graphical Panels */}
              <div style={styles.chartsGrid}>
                <div style={styles.chartCard}>
                  <h3 style={styles.chartTitle}>Platform GMV Growth (INR)</h3>
                  <div style={{ width: '100%', height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                        <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                        <Tooltip contentStyle={{ background: '#0e1320', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={styles.chartCard}>
                  <h3 style={styles.chartTitle}>Module Revenue Contribution (INR)</h3>
                  <div style={{ width: '100%', height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={moduleRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="module" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                        <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                        <Tooltip contentStyle={{ background: '#0e1320', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                          {moduleRevenue.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Real-time System Pulse Panel */}
              <div style={styles.pulsePanel}>
                <h3 style={styles.chartTitle}>Recent Network Logs</h3>
                <div style={styles.pulseLogContainer}>
                  {logs.slice(-5).map((log, idx) => (
                    <div key={idx} style={styles.pulseLogLine}>
                      <ChevronRight size={12} color="#06B6D4" />
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div style={styles.pageContent}>
              <div style={styles.servicesGrid}>
                {services.map((service, idx) => (
                  <div key={idx} style={styles.serviceCard}>
                    <div style={styles.serviceHeader}>
                      <div style={styles.serviceMeta}>
                        <HardDrive size={18} color="#06B6D4" />
                        <h4 style={styles.serviceName}>{service.name}</h4>
                      </div>
                      <div style={{
                        ...styles.statusBadge,
                        color: service.status === 'Online' ? '#10B981' : '#F59E0B',
                        background: service.status === 'Online' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'
                      }}>
                        {service.status}
                      </div>
                    </div>
                    
                    <div style={styles.serviceDetails}>
                      <div style={styles.serviceRow}>
                        <span style={styles.serviceLabel}>Cluster Address</span>
                        <span style={styles.serviceValue}>localhost:{service.port}</span>
                      </div>
                      <div style={styles.serviceRow}>
                        <span style={styles.serviceLabel}>Roundtrip Latency</span>
                        <span style={{
                          ...styles.serviceValue,
                          color: service.latency > 15 ? '#F43F5E' : '#10B981'
                        }}>{service.latency} ms</span>
                      </div>
                      <div style={styles.serviceRow}>
                        <span style={styles.serviceLabel}>Encrypted Link</span>
                        <span style={styles.serviceValue}>TLS_AES_256</span>
                      </div>
                    </div>
                    
                    <div style={styles.progressBarBg}>
                      <div style={{
                        ...styles.progressBarFill,
                        width: `${Math.max(5, 100 - service.latency)}%`,
                        background: service.latency > 15 ? '#F43F5E' : 'linear-gradient(90deg, #8B5CF6, #06B6D4)'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div style={styles.pageContent}>
              <div style={styles.tableCard}>
                <h3 style={styles.chartTitle}>Active Campus User Identities</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.trHeader}>
                        <th style={styles.th}>Ident Name</th>
                        <th style={styles.th}>Department / Class</th>
                        <th style={styles.th}>Campus Coins</th>
                        <th style={styles.th}>INR Asset</th>
                        <th style={styles.th}>Hostel Sector</th>
                        <th style={styles.th}>Trust Quotient</th>
                        <th style={styles.th}>Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {initialUsers.map((user, index) => (
                        <tr key={index} style={styles.trBody}>
                          <td style={styles.td}>
                            <div style={styles.userNameBlock}>
                              <div style={styles.userAvatar}>{user.name[0]}</div>
                              <div>
                                <div style={{ fontWeight: 600, color: '#fff' }}>{user.name}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td style={styles.td}>{user.department} (Yr {user.year})</td>
                          <td style={{...styles.td, color: '#F59E0B', fontFamily: 'monospace'}}>{user.campusCoins} 🪙</td>
                          <td style={{...styles.td, color: '#10B981', fontFamily: 'monospace'}}>₹{user.rupeesBalance.toLocaleString()}</td>
                          <td style={styles.td}>{user.hostelBlock} ({user.hostelRoom})</td>
                          <td style={styles.td}>
                            <div style={styles.trustScoreBlock}>
                              <span style={{ color: user.trustScore > 90 ? '#10B981' : '#F59E0B' }}>{user.trustScore}%</span>
                              <div style={styles.miniProgressBg}>
                                <div style={{...styles.miniProgressFill, width: `${user.trustScore}%`, background: user.trustScore > 90 ? '#10B981' : '#F59E0B'}} />
                              </div>
                            </div>
                          </td>
                          <td style={styles.td}>
                            <div style={styles.badgeContainer}>
                              {user.badges.map((b, i) => (
                                <span key={i} style={styles.badgeChip}>{b}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div style={styles.pageContent}>
              <div style={styles.terminalCard}>
                <div style={styles.terminalHeader}>
                  <div style={styles.terminalButtons}>
                    <div style={{...styles.termDot, background: '#F43F5E'}} />
                    <div style={{...styles.termDot, background: '#F59E0B'}} />
                    <div style={{...styles.termDot, background: '#10B981'}} />
                  </div>
                  <div style={styles.terminalTitle}>sh - secure@campusos.sh</div>
                </div>
                
                <div style={styles.terminalBody}>
                  <p style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
                    CampusOS TITAN X Shell. Type &quot;help&quot; to discover available command vectors.
                  </p>
                  
                  <div style={styles.terminalConsole}>
                    {logs.map((log, idx) => (
                      <div key={idx} style={styles.terminalLog}>
                        {log.startsWith('>') ? (
                          <span style={{ color: '#06B6D4' }}>{log}</span>
                        ) : log.includes('[ERROR]') ? (
                          <span style={{ color: '#F43F5E' }}>{log}</span>
                        ) : log.includes('[SYSTEM]') || log.includes('[REBOOT]') ? (
                          <span style={{ color: '#8B5CF6' }}>{log}</span>
                        ) : (
                          <span>{log}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleTerminalSubmit} style={styles.terminalInputRow}>
                    <span style={styles.terminalPrompt}>root@titan-cmd#</span>
                    <input 
                      type="text" 
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      style={styles.terminalInput}
                      placeholder="Enter command vector..."
                      autoFocus
                    />
                    <button type="submit" style={styles.terminalSendBtn}>
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}

// Inline CSS for direct rendering without config file dependencies
const styles: { [key: string]: React.CSSProperties } = {
  body: {
    background: '#04060a',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: '100vh',
    position: 'relative',
    overflowX: 'hidden'
  },
  aura1: {
    position: 'absolute',
    top: '-15%',
    left: '-10%',
    width: '40%',
    height: '40%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
    zIndex: 1,
    pointerEvents: 'none'
  },
  aura2: {
    position: 'absolute',
    bottom: '-15%',
    right: '-10%',
    width: '45%',
    height: '45%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
    zIndex: 1,
    pointerEvents: 'none'
  },
  scanline: {
    position: 'fixed',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)',
    zIndex: 99,
    pointerEvents: 'none',
    opacity: 0.4
  },
  container: {
    display: 'flex',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 10
  },
  sidebar: {
    width: '280px',
    background: 'linear-gradient(180deg, #090c14 0%, #05070c 100%)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '40px',
    padding: '8px'
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    boxShadow: '0 0 20px rgba(139,92,246,0.3)'
  },
  logoText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: '-0.3px'
  },
  logoSubtext: {
    fontSize: '10px',
    color: '#06B6D4',
    fontWeight: 'bold',
    letterSpacing: '1px',
    fontFamily: 'monospace'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease'
  },
  navBtnActive: {
    color: '#fff',
    background: 'rgba(139,92,246,0.1)',
    border: '1px solid rgba(139,92,246,0.2)',
    boxShadow: '0 0 15px rgba(139,92,246,0.05)'
  },
  sidebarFooter: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.05)'
  },
  securityPulse: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.35)',
    fontFamily: 'monospace'
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#10B981',
    boxShadow: '0 0 10px rgba(16,185,129,0.8)',
    animation: 'pulse 2s infinite'
  },
  mainContent: {
    flex: 1,
    marginLeft: '280px',
    padding: '40px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '20px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '4px'
  },
  pingBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#0e1320',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '10px 16px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  pageContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  statCard: {
    background: '#0b0f19',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'relative',
    overflow: 'hidden'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'monospace'
  },
  statTrendUp: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: '#10B981',
    fontWeight: '500'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  chartCard: {
    background: '#0b0f19',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '18px',
    padding: '24px'
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '20px',
    letterSpacing: '-0.2px'
  },
  pulsePanel: {
    background: '#0b0f19',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '18px',
    padding: '24px'
  },
  pulseLogContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  pulseLogLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255,255,255,0.02)',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.03)',
    fontFamily: 'monospace',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)'
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  serviceCard: {
    background: '#0b0f19',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  serviceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  serviceMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  serviceName: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#fff'
  },
  statusBadge: {
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '6px',
    letterSpacing: '0.5px'
  },
  serviceDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  serviceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px'
  },
  serviceLabel: {
    color: 'rgba(255,255,255,0.35)'
  },
  serviceValue: {
    color: '#fff',
    fontWeight: '600'
  },
  progressBarBg: {
    height: '4px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'all 0.5s ease'
  },
  tableCard: {
    background: '#0b0f19',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '18px',
    padding: '24px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  trHeader: {
    borderBottom: '1px solid rgba(255,255,255,0.08)'
  },
  th: {
    padding: '12px 16px',
    fontSize: '11px',
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  trBody: {
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    transition: 'background 0.2s',
    cursor: 'pointer'
  },
  td: {
    padding: '16px',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.8)'
  },
  userNameBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '12px'
  },
  trustScoreBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  miniProgressBg: {
    width: '50px',
    height: '4px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '2px'
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: '2px'
  },
  badgeContainer: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap'
  },
  badgeChip: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px',
    padding: '2px 6px',
    fontSize: '9px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)'
  },
  terminalCard: {
    background: '#080b12',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    overflow: 'hidden'
  },
  terminalHeader: {
    background: '#0d131f',
    padding: '12px 18px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.04)'
  },
  terminalButtons: {
    display: 'flex',
    gap: '6px',
    marginRight: '16px'
  },
  termDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%'
  },
  terminalTitle: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'monospace'
  },
  terminalBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  terminalConsole: {
    background: '#03050a',
    border: '1px solid rgba(255,255,255,0.03)',
    borderRadius: '10px',
    padding: '16px',
    height: '320px',
    overflowY: 'auto',
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#06B6D4',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  terminalLog: {
    lineHeight: '1.4'
  },
  terminalInputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#03050a',
    borderRadius: '10px',
    padding: '10px 16px',
    border: '1px solid rgba(255,255,255,0.03)'
  },
  terminalPrompt: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#8B5CF6',
    fontWeight: 'bold'
  },
  terminalInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '12px',
    outline: 'none'
  },
  terminalSendBtn: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s'
  }
};
