import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Play, Square, Activity, ShieldCheck, AlertTriangle, 
  Clock, Zap, CheckCircle2, RefreshCw, BarChart2, Layers, 
  Terminal, Lock, ArrowUpRight, ArrowDownRight, Settings2, Sliders
} from 'lucide-react';
import { BiometricAuthModal } from './BiometricAuthModal';

export interface AlgoStrategy {
  id: 'twap' | 'vwap' | 'iceberg' | 'pov' | 'sniper';
  name: string;
  badge: string;
  description: string;
  defaultDurationMin: number;
  participationRate?: number;
  slippageLimitBps: number;
}

const STRATEGIES: AlgoStrategy[] = [
  {
    id: 'twap',
    name: 'TWAP (Time-Weighted Average Price)',
    badge: 'Linear Slice & Randomizer',
    description: 'Evenly distributes large parent orders across customized time horizons with stochastic jitter to obscure algorithmic footprint.',
    defaultDurationMin: 60,
    slippageLimitBps: 15
  },
  {
    id: 'vwap',
    name: 'VWAP (Volume-Weighted Average Price)',
    badge: 'Intraday Curve Matching',
    description: 'Dynamically scales child slices according to historical intraday volume profile to minimize market price impact.',
    defaultDurationMin: 120,
    slippageLimitBps: 20
  },
  {
    id: 'iceberg',
    name: 'Iceberg (Synthetic Hidden Reserve)',
    badge: 'Dark / Lit Split',
    description: 'Displays only a fraction (e.g. 5%) of the total order size in the public order book while refreshing automatically as filled.',
    defaultDurationMin: 45,
    slippageLimitBps: 10
  },
  {
    id: 'pov',
    name: 'POV (Percentage of Volume)',
    badge: '10% - 25% Inline Participation',
    description: 'Chases real-time tape volume directly by matching 15% of printed prints in the public market until parent size is filled.',
    defaultDurationMin: 90,
    participationRate: 15,
    slippageLimitBps: 25
  },
  {
    id: 'sniper',
    name: 'Sniper (Dark Liquidity Seeker)',
    badge: 'Zero Lit Footprint',
    description: 'Resting non-displayed orders across OTC dark liquidity pools; opportunistically attacks aggressive crossing prices.',
    defaultDurationMin: 30,
    slippageLimitBps: 8
  }
];

export function AlgorithmicTradingDesk({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [selectedStrategy, setSelectedStrategy] = useState<AlgoStrategy>(STRATEGIES[0]);
  const [symbol, setSymbol] = useState('JSE:SBK (Standard Bank)');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [totalQuantity, setTotalQuantity] = useState<number>(50000);
  const [limitPrice, setLimitPrice] = useState<number>(208.50);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [sliceDisplayQty, setSliceDisplayQty] = useState<number>(2500);
  const [maxParticipationRate, setMaxParticipationRate] = useState<number>(15);
  const [slippageBps, setSlippageBps] = useState<number>(15);

  // Execution State
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [activeAlgos, setActiveAlgos] = useState<any[]>([
    {
      id: 'ALGO-9082',
      strategy: 'VWAP',
      symbol: 'JSE:NPN (Naspers)',
      side: 'BUY',
      totalQty: 25000,
      filledQty: 18400,
      avgFillPrice: 3420.50,
      progress: 73.6,
      status: 'RUNNING',
      latencyMicrosec: 142,
      startedAt: '10:14:02'
    },
    {
      id: 'ALGO-9081',
      strategy: 'Iceberg',
      symbol: 'NGX:DANGCEM',
      side: 'SELL',
      totalQty: 100000,
      filledQty: 45000,
      avgFillPrice: 680.00,
      progress: 45.0,
      status: 'RUNNING',
      latencyMicrosec: 210,
      startedAt: '10:30:15'
    }
  ]);

  // FIX Protocol Live Stream Telemetry
  const [fixMessages, setFixMessages] = useState<any[]>([
    { time: '11:24:02.819', tag: '35=8 (ExecutionReport)', detail: 'ExecType=F (Trade) CumQty=18400 Price=3420.50 ClOrdID=ALGO-9082' },
    { time: '11:23:45.102', tag: '35=D (NewOrderSingle)', detail: 'Side=1 Symbol=JSE:NPN OrdType=2 (Limit) Qty=1200 Price=3421.00' },
    { time: '11:22:18.490', tag: '35=G (OrderCancelReplace)', detail: 'OrigClOrdID=SLICE-889 Price=680.50 NewQty=2500' }
  ]);

  useEffect(() => {
    // Generate simulated real-time FIX messages & progress increments
    const interval = setInterval(() => {
      const timeStr = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100);
      const isFill = Math.random() > 0.4;
      const newMsg = isFill
        ? { time: timeStr, tag: '35=8 (ExecutionReport)', detail: `ExecType=F (Fill) CumQty=+${Math.floor(Math.random() * 500 + 100)} SubNode=StrateTape Latency=112μs` }
        : { time: timeStr, tag: '35=D (ChildSlicePost)', detail: `OrdType=Limit DisplayQty=${sliceDisplayQty} RoutedTo=JSE_Lit_Book` };

      setFixMessages(prev => [newMsg, ...prev.slice(0, 7)]);

      // Increment progress of active algos
      setActiveAlgos(prev => prev.map(algo => {
        if (algo.status === 'RUNNING' && algo.filledQty < algo.totalQty) {
          const addFill = Math.min(algo.totalQty - algo.filledQty, Math.floor(Math.random() * 150 + 20));
          const newFilled = algo.filledQty + addFill;
          return {
            ...algo,
            filledQty: newFilled,
            progress: parseFloat(((newFilled / algo.totalQty) * 100).toFixed(1)),
            status: newFilled >= algo.totalQty ? 'COMPLETED' : 'RUNNING'
          };
        }
        return algo;
      }));
    }, 4500);

    return () => clearInterval(interval);
  }, [sliceDisplayQty]);

  const totalNotional = totalQuantity * limitPrice;

  const handleLaunchAlgo = () => {
    setIsBioModalOpen(true);
  };

  const executeConfirmedAlgo = () => {
    const newAlgo = {
      id: `ALGO-${Math.floor(Math.random() * 9000 + 1000)}`,
      strategy: selectedStrategy.name.split(' ')[0],
      symbol: symbol,
      side: side,
      totalQty: totalQuantity,
      filledQty: 0,
      avgFillPrice: limitPrice,
      progress: 0,
      status: 'RUNNING',
      latencyMicrosec: Math.floor(Math.random() * 120 + 80),
      startedAt: new Date().toLocaleTimeString()
    };
    setActiveAlgos(prev => [newAlgo, ...prev]);
  };

  const handleCancelAlgo = (algoId: string) => {
    setActiveAlgos(prev => prev.map(a => a.id === algoId ? { ...a, status: 'CANCELLED' } : a));
    const timeStr = new Date().toTimeString().split(' ')[0];
    setFixMessages(prev => [{
      time: timeStr,
      tag: '35=F (OrderCancelRequest)',
      detail: `ClOrdID=${algoId} Status=CANCELLED_BY_DESK`
    }, ...prev]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-white/10 p-6 rounded-3xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF]/10 border border-[#FFFFFF]/30 rounded-full text-xs font-mono text-[#FFFFFF]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Smart Order Routing & Algorithmic Execution Suite</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Institutional Algorithmic Desk
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Execute large parent blocks with low slippage using TWAP, VWAP, synthetic Iceberg, and POV dark liquidity routers with sub-millisecond pre-trade risk gates.
          </p>
        </div>

        {/* Latency & Tape KPI */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-black/60 border border-white/10 rounded-2xl p-3.5 text-center min-w-[120px]">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Engine Latency</span>
            <span className="text-lg font-mono font-black text-emerald-400">114 μs</span>
          </div>
          <div className="bg-black/60 border border-white/10 rounded-2xl p-3.5 text-center min-w-[130px]">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Active Strategies</span>
            <span className="text-lg font-mono font-black text-[#FFFFFF]">{activeAlgos.filter(a => a.status === 'RUNNING').length} Active</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Setup Form, Right Active Telemetry & FIX Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Strategy Configurator */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#FFFFFF]" /> Strategy Configurator
            </h3>

            {/* Strategy Selector Pills */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-zinc-400 uppercase">Select Execution Algorithm</label>
              <div className="grid grid-cols-1 gap-2">
                {STRATEGIES.map((strat) => {
                  const isSelected = selectedStrategy.id === strat.id;
                  return (
                    <button
                      key={strat.id}
                      onClick={() => setSelectedStrategy(strat)}
                      className={`text-left p-3 rounded-xl border transition-all text-xs ${
                        isSelected 
                          ? 'bg-[#FFFFFF]/10 border-[#FFFFFF] text-white' 
                          : 'bg-black border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white">{strat.name}</span>
                        <span className="text-[9px] font-mono text-[#FFFFFF] bg-black px-1.5 py-0.5 rounded border border-[#FFFFFF]/30">{strat.badge}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{strat.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Asset & Order Parameters */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Ticker / Asset</label>
                <select
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#FFFFFF] focus:outline-none font-mono"
                >
                  <option value="JSE:SBK (Standard Bank)">JSE:SBK (Standard Bank Group)</option>
                  <option value="JSE:NPN (Naspers Ltd)">JSE:NPN (Naspers Ltd)</option>
                  <option value="NGX:DANGCEM (Dangote)">NGX:DANGCEM (Dangote Cement)</option>
                  <option value="NSE:SCOM (Safaricom)">NSE:SCOM (Safaricom Kenya)</option>
                  <option value="JSE:SOL (Sasol Ltd)">JSE:SOL (Sasol Energy)</option>
                </select>
              </div>

              {/* Side (Buy/Sell) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSide('BUY')}
                  className={`py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                    side === 'BUY' ? 'bg-emerald-500 text-black' : 'bg-black border border-white/10 text-zinc-400'
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setSide('SELL')}
                  className={`py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                    side === 'SELL' ? 'bg-rose-500 text-white' : 'bg-black border border-white/10 text-zinc-400'
                  }`}
                >
                  SELL
                </button>
              </div>

              {/* Total Qty & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Total Parent Qty</label>
                  <input
                    type="number"
                    step="1000"
                    value={totalQuantity}
                    onChange={(e) => setTotalQuantity(parseInt(e.target.value) || 1000)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:border-[#FFFFFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Limit Price</label>
                  <input
                    type="number"
                    step="0.50"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:border-[#FFFFFF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Algo Specific Controls */}
              {selectedStrategy.id === 'iceberg' && (
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Visible Display Slice Qty</label>
                  <input
                    type="number"
                    step="500"
                    value={sliceDisplayQty}
                    onChange={(e) => setSliceDisplayQty(parseInt(e.target.value) || 500)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-[#FFFFFF] focus:outline-none"
                  />
                </div>
              )}

              {selectedStrategy.id === 'pov' && (
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Target Volume Participation (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="30"
                    value={maxParticipationRate}
                    onChange={(e) => setMaxParticipationRate(parseInt(e.target.value) || 10)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-[#FFFFFF] focus:outline-none"
                  />
                </div>
              )}

              {/* Pre-Trade Risk Gate Check */}
              <div className="bg-black/60 border border-white/10 rounded-xl p-3.5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Gross Notional:</span>
                  <span className="text-white font-bold">ZAR {totalNotional.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Pre-Trade VaR Impact:</span>
                  <span className="text-emerald-400 font-bold">&lt; 0.42% (Within Collar)</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Slippage Protection:</span>
                  <span className="text-[#FFFFFF]">{slippageBps} bps</span>
                </div>
              </div>

              {/* Launch Strategy Button */}
              <button
                onClick={handleLaunchAlgo}
                className="w-full py-3.5 bg-[#FFFFFF] text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-[#E4E4E7] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Launch Algorithmic Execution</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Live Running Algos & FIX Protocol Inspector */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Running Algorithms */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FFFFFF]" /> Active Algorithmic Parent Orders
              </h3>
              <span className="text-xs font-mono text-zinc-400">Real-time Slicing Telemetry</span>
            </div>

            <div className="space-y-3">
              {activeAlgos.map((algo) => (
                <div key={algo.id} className="bg-black border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-[#FFFFFF]">{algo.id}</span>
                        <span className="text-xs font-bold text-white">{algo.strategy} Strategy</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          algo.side === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {algo.side}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-300 mt-1">{algo.symbol}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        algo.status === 'RUNNING' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse' :
                        algo.status === 'COMPLETED' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {algo.status}
                      </span>
                      {algo.status === 'RUNNING' && (
                        <button
                          onClick={() => handleCancelAlgo(algo.id)}
                          className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded text-[10px] font-mono font-bold uppercase transition-colors"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress & Stats */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">Filled: {algo.filledQty.toLocaleString()} / {algo.totalQty.toLocaleString()} shares</span>
                      <span className="text-[#FFFFFF] font-bold">{algo.progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#FFFFFF] h-full rounded-full transition-all duration-300"
                        style={{ width: `${algo.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                      <span>Avg Fill: R {algo.avgFillPrice.toFixed(2)}</span>
                      <span>Latency: {algo.latencyMicrosec} μs</span>
                      <span>Started: {algo.startedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FIX Protocol 4.4 / 5.0 Live Inspector */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" /> FIX Protocol 4.4 / 5.0 Audit Stream
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Session Active
              </span>
            </div>

            <div className="bg-black border border-white/10 rounded-xl p-4 font-mono text-xs space-y-2 overflow-x-auto">
              {fixMessages.map((msg, idx) => (
                <div key={idx} className="flex items-start gap-3 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-zinc-500 text-[10px] shrink-0">{msg.time}</span>
                  <span className="text-[#FFFFFF] font-bold text-[11px] shrink-0">{msg.tag}</span>
                  <span className="text-zinc-300 text-[11px] truncate">{msg.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Biometric Security Gate Modal */}
      <BiometricAuthModal
        isOpen={isBioModalOpen}
        actionTitle="Authorize Algorithmic Parent Order"
        actionDescription={`Hardware verification required to sign and route algorithmic ${selectedStrategy.name} order for ${totalQuantity.toLocaleString()} shares of ${symbol}.`}
        amount={totalNotional}
        currency="ZAR"
        onSuccess={() => {
          setIsBioModalOpen(false);
          executeConfirmedAlgo();
        }}
        onCancel={() => setIsBioModalOpen(false)}
      />
    </div>
  );
}
