import React, { useState, useEffect } from 'react';
import { LineChart, Activity, TrendingUp, TrendingDown, Bell, Zap, Globe, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { generateMarketIntelligence } from '../services/geminiService';

export function MarketIntelligence() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await generateMarketIntelligence();
      if (result) {
        setData(result);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-3xl flex flex-col overflow-hidden relative backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0066FF] via-[#D4AF37] to-[#00C896]" />
      
      <div className="p-6 border-b border-white/10 bg-white/[0.01] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066FF]/20 to-[#D4AF37]/20 flex items-center justify-center border border-white/10">
            <Globe className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white font-bold tracking-tight text-xl">Smart Market Intelligence</h2>
            <p className="text-sm text-zinc-400 mt-1">Live market data, AI summaries, and trend detection.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Smart Alerts
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
            <p className="text-zinc-400 text-sm">Analyzing global markets...</p>
          </div>
        ) : data ? (
          <>
            {/* Live Market Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {data.overview?.map((stat: any, idx: number) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{stat.label}</span>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className={`text-xs font-bold flex items-center gap-1 ${stat.up === true ? 'text-[#00C896]' : stat.up === false ? 'text-[#FF3B3B]' : 'text-[#D4AF37]'}`}>
                    {stat.up === true && <TrendingUp className="w-3 h-3" />}
                    {stat.up === false && <TrendingDown className="w-3 h-3" />}
                    {stat.up === null && <AlertTriangle className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Summaries: Why it moved */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D4AF37]" />
                AI Market Summaries: "Why it moved today"
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.summaries?.map((summary: any, idx: number) => (
                  <div key={idx} className={`p-5 rounded-2xl border border-white/10 relative overflow-hidden ${summary.up ? 'bg-gradient-to-br from-[#00C896]/5 to-[#0066FF]/5' : 'bg-gradient-to-br from-[#FF3B3B]/5 to-[#D4AF37]/5'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold border ${summary.up ? 'bg-[#00C896]/20 text-[#00C896] border-[#00C896]/30' : 'bg-[#FF3B3B]/20 text-[#FF3B3B] border-[#FF3B3B]/30'}`}>
                          {summary.ticker} {summary.change}
                        </span>
                        <span className="text-sm font-bold text-white">{summary.name}</span>
                      </div>
                      <Activity className={`w-4 h-4 ${summary.up ? 'text-[#00C896]' : 'text-[#FF3B3B]'}`} />
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {summary.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Detection Engine */}
            <div className="p-6 rounded-2xl bg-black/20 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <LineChart className="w-4 h-4 text-[#0066FF]" />
                Trend Detection Engine
              </h3>
              <div className="space-y-4">
                {data.trends?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <div className="text-sm font-bold text-white">{item.trend}</div>
                      <div className="text-xs text-zinc-500 mt-1">Timeframe: {item.timeframe}</div>
                    </div>
                    <div className="flex gap-4 text-right">
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Confidence</div>
                        <div className="text-sm font-bold text-[#0066FF]">{item.confidence}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Impact</div>
                        <div className="text-sm font-bold text-[#00C896]">{item.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <AlertTriangle className="w-8 h-8 text-[#FF3B3B]" />
            <p className="text-zinc-400 text-sm">Failed to load market intelligence.</p>
          </div>
        )}
      </div>
    </div>
  );
}
