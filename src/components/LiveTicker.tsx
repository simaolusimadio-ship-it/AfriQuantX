import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const tickerData = [
  { symbol: 'AQX.AFR', price: '1,245.50', change: '+2.4%', up: true },
  { symbol: 'TECH.EA', price: '450.20', change: '+5.1%', up: true },
  { symbol: 'AGRI.WA', price: '890.10', change: '-1.2%', up: false },
  { symbol: 'FIN.SA', price: '2,100.00', change: '+0.8%', up: true },
  { symbol: 'RE.NA', price: '1,560.75', change: '-0.5%', up: false },
  { symbol: 'ENERGY.PA', price: '3,420.00', change: '+4.2%', up: true },
  { symbol: 'HEALTH.AF', price: '670.30', change: '+1.5%', up: true },
  { symbol: 'EDU.WA', price: '340.90', change: '-0.3%', up: false },
];

export function LiveTicker() {
  return (
    <div className="w-full h-10 bg-[#05070D] border-b border-white/[0.05] overflow-hidden flex items-center shrink-0">
      <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Double the data to create a seamless loop */}
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={index} className="flex items-center gap-3 px-8 border-r border-white/[0.05]">
            <span className="font-mono text-xs font-bold text-white/80">{item.symbol}</span>
            <span className="font-mono text-xs text-white">{item.price}</span>
            <span className={`flex items-center gap-1 font-mono text-xs ${item.up ? 'text-[#00C896]' : 'text-[#FF3B3B]'}`}>
              {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
