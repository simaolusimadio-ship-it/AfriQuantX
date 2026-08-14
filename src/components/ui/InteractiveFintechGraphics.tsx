import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Lock, Cpu, CpuIcon, Activity, Sparkles, Wallet, Globe, ArrowRight,
  TrendingUp, CheckCircle2, FileCheck, Layers, Eye, RefreshCw, Key, Landmark, 
  DollarSign, PieChart, ShieldAlert, Zap, Server, ChevronRight, Fingerprint, UserCheck, 
  Send, Award, CreditCard, Network, Database, ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar 
} from 'recharts';

// --- 1. GLASSMORPHISM FLOATING 3D HERO DASHBOARD WIDGET ---
export function GlassmorphismHeroDashboard() {
  const [activeTab, setActiveTab] = useState<'balance' | 'yield' | 'ai'>('balance');

  const chartData = [
    { month: 'Jan', value: 12400, yield: 4.2 },
    { month: 'Feb', value: 18900, yield: 6.8 },
    { month: 'Mar', value: 24500, yield: 9.1 },
    { month: 'Apr', value: 38200, yield: 12.4 },
    { month: 'May', value: 52100, yield: 15.8 },
    { month: 'Jun', value: 68400, yield: 19.2 },
    { month: 'Jul', value: 89600, yield: 24.5 },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 p-1">
      {/* Subtle Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-500/20 rounded-[32px] blur-2xl opacity-60 pointer-events-none" />

      {/* Main Glass Panel */}
      <div className="relative bg-zinc-950/90 text-white rounded-[28px] border border-white/10 shadow-2xl p-6 md:p-8 backdrop-blur-xl overflow-hidden space-y-6">
        
        {/* Top Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">AFRIQUANTX TREASURY VAULT</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <span>$89,600.00 USD</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +24.5% YTD
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab('balance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'balance' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('yield')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'yield' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Yield APY
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'ai' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              AI Signals
            </button>
          </div>
        </div>

        {/* Live Area Chart Display */}
        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                formatter={(val: any) => [`$${val.toLocaleString()}`, 'Portfolio Valuation']}
              />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 3D Floating Sub-Widgets Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          {/* Card 1: Multi-Currency */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>MULTI-CURRENCY</span>
              <Globe className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-white font-mono">USD / NGN / ZAR</div>
            <div className="text-xs text-emerald-400 font-mono">Sub-410ms Instant FX Clearance</div>
          </motion.div>

          {/* Card 2: AI Risk Score */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>AQEI NEURAL SCORE</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white font-mono">98.4 / 100 Safe</div>
            <div className="text-xs text-zinc-400 font-mono">Continuous VaR Stress Test</div>
          </motion.div>

          {/* Card 3: Security & Custody */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>CUSTODY VAULT</span>
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-white font-mono">HSM FIPS 140-2</div>
            <div className="text-xs text-blue-400 font-mono">$250K FDIC/NDIC Segregated</div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

// --- 2. AI & MACHINE LEARNING WORKFLOW & DECISION TREE ---
export function AIDecisionTreeFlow() {
  const [selectedStep, setSelectedStep] = useState<number>(2);

  const steps = [
    {
      step: 1,
      title: 'Data Ingestion',
      icon: Database,
      tagline: '1.2M Datapoints/Sec',
      desc: 'Real-time telemetry stream ingesting central bank rates, satellite shipping logs, and regional order book depth.'
    },
    {
      step: 2,
      title: 'Neural Risk Scoring',
      icon: Cpu,
      tagline: 'AQEI DeepMind v4.2',
      desc: 'Multi-layer neural network evaluating macroeconomic volatility, credit spread risks, and liquidity concentration.'
    },
    {
      step: 3,
      title: 'Smart Order Router',
      icon: Network,
      tagline: 'Sub-2.4ms Latency',
      desc: 'Algorithmic routing picking optimal liquidity venues across JSE, NGX, NSE, and private SPV dark pools.'
    },
    {
      step: 4,
      title: 'Instant Execution',
      icon: Zap,
      tagline: 'Zero Slippage Guarantee',
      desc: 'Cryptographic execution with atomic settlement finality across multi-currency bank clearing accounts.'
    }
  ];

  return (
    <div className="py-12 px-6 bg-zinc-950 text-white rounded-[32px] border border-zinc-800 my-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AQEI NEURAL DECISION ARCHITECTURE</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Automated Algorithmic Execution Pipeline
        </h3>
        <p className="text-zinc-400 text-sm">
          Click through each node to inspect how the AI neural engine processes live market telemetry into instant trade finality.
        </p>
      </div>

      {/* Process Flow Interactive Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((item) => {
          const Icon = item.icon;
          const isActive = selectedStep === item.step;

          return (
            <motion.div
              key={item.step}
              onClick={() => setSelectedStep(item.step)}
              whileHover={{ scale: 1.02 }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 relative overflow-hidden ${
                isActive 
                  ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
              )}
              
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-400">0{item.step}</span>
                <div className={`p-2 rounded-xl ${isActive ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <h4 className="font-bold text-base text-white">{item.title}</h4>
              <p className="font-mono text-xs text-blue-300">{item.tagline}</p>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// --- 3. BANK-GRADE SECURITY & COMPLIANCE VAULT GRAPHIC ---
export function SecurityVaultCard() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="p-8 rounded-[32px] bg-zinc-950 border border-zinc-800 text-white my-8 space-y-6 relative overflow-hidden">
      {/* Background Security Wave Pattern */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL GRADE SECURITY</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Multi-Layer Cryptographic Vault Protection
          </h3>
          <p className="text-xs text-zinc-400 font-mono">
            SOC2 Type II • ISO 27001 • FIPS 140-2 Level 3 Hardware Security Modules
          </p>
        </div>

        <button
          onClick={() => setUnlocked(!unlocked)}
          className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 border ${
            unlocked 
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
              : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700'
          }`}
        >
          {unlocked ? <Lock className="w-4 h-4 text-emerald-400" /> : <Key className="w-4 h-4" />}
          <span>{unlocked ? 'VAULT ACTIVE & VERIFIED' : 'TEST BIOMETRIC AUTH'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <Fingerprint className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-mono text-zinc-500">LAYER 1</span>
          </div>
          <div className="font-bold text-sm text-white">Biometric Multi-Sig</div>
          <div className="text-xs text-zinc-400">WebAuthn, Hardware Passkeys & Corporate Threshold Signatures.</div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <Lock className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-mono text-zinc-500">LAYER 2</span>
          </div>
          <div className="font-bold text-sm text-white">AES-256 HSM Encryption</div>
          <div className="text-xs text-zinc-400">Data at rest and in transit encrypted with isolated keys.</div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <FileCheck className="w-5 h-5 text-cyan-400" />
            <span className="text-[10px] font-mono text-zinc-500">LAYER 3</span>
          </div>
          <div className="font-bold text-sm text-white">Zero-Knowledge Audits</div>
          <div className="text-xs text-zinc-400">Real-time proof of reserve verified by Big 4 accounting standards.</div>
        </div>
      </div>
    </div>
  );
}

// --- 4. CUSTOMER JOURNEY & FINTECH PROCESS FLOW ---
export function CustomerJourneyFlow() {
  const steps = [
    { num: '01', label: 'Instant Sign Up', desc: 'Corporate & Individual Onboarding' },
    { num: '02', label: 'Verify Identity', desc: 'Automated KYC & AML Screen' },
    { num: '03', label: 'Fund Wallet', desc: 'Local Fiat ACH, Wire or USD' },
    { num: '04', label: 'AI Risk Allocation', desc: 'Automated Portfolio Tuning' },
    { num: '05', label: 'Grow Wealth', desc: 'Compound Returns & Payouts' },
  ];

  return (
    <div className="py-10 px-6 bg-gray-50 border border-gray-200 rounded-[32px] my-10 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-bold text-black tracking-tight">Your Seamless Wealth Journey</h3>
        <p className="text-xs font-mono text-gray-500">From setup to institutional execution in under 3 minutes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((s, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm text-center space-y-1 relative">
            <div className="w-8 h-8 rounded-full bg-black text-white font-mono text-xs font-bold flex items-center justify-center mx-auto mb-2">
              {s.num}
            </div>
            <div className="font-bold text-sm text-black">{s.label}</div>
            <div className="text-[11px] text-gray-500 leading-tight">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 5. PAN-AFRICAN & GLOBAL PAYMENT NODE MESH ---
export function GlobalPaymentMesh() {
  const nodes = [
    { city: 'London', rate: 'USD/GBP 0.78', status: 'Active Node' },
    { city: 'Lagos', rate: 'USD/NGN 1,480.50', status: 'Active Vault' },
    { city: 'Johannesburg', rate: 'USD/ZAR 18.24', status: 'JSE Gateway' },
    { city: 'Nairobi', rate: 'USD/KES 129.50', status: 'NSE Gateway' },
    { city: 'New York', rate: 'NYSE / NASDAQ DMA', status: 'Primary Desk' },
  ];

  return (
    <div className="p-8 rounded-[32px] bg-zinc-900 border border-zinc-800 text-white my-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">PAN-AFRICAN & GLOBAL CLEARING MESH</span>
          <h3 className="text-2xl font-bold text-white tracking-tight">Connected Liquidity Nodes</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Sub-Second Settlement</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {nodes.map((n, i) => (
          <div key={i} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{n.city}</span>
            </div>
            <div className="text-xs font-mono text-emerald-400">{n.rate}</div>
            <div className="text-[10px] font-mono text-zinc-500">{n.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
