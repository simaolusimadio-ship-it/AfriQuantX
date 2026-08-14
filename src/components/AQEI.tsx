import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  TrendingUp, 
  Globe, 
  Activity, 
  ShieldAlert, 
  Search, 
  Filter,
  BarChart2,
  Zap,
  ChevronRight,
  MessageSquare,
  User,
  Newspaper
} from 'lucide-react';

import { AQEICopilot } from './AQEICopilot';
import { News } from './News';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const baseCompanies = [
  { name: 'Naspers', country: 'South Africa', exchange: 'JSE', sector: 'Technology' },
  { name: 'FirstRand', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Dangote Cement', country: 'Nigeria', exchange: 'NGX', sector: 'Materials' },
  { name: 'MTN Group', country: 'South Africa', exchange: 'JSE', sector: 'Telecom' },
  { name: 'Standard Bank Group', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Safaricom', country: 'Kenya', exchange: 'NSE', sector: 'Telecom' },
  { name: 'Attijariwafa Bank', country: 'Morocco', exchange: 'CSE', sector: 'Financials' },
  { name: 'Commercial International Bank', country: 'Egypt', exchange: 'EGX', sector: 'Financials' },
  { name: 'Capitec Bank', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Maroc Telecom', country: 'Morocco', exchange: 'CSE', sector: 'Telecom' },
  { name: 'Vodacom Group', country: 'South Africa', exchange: 'JSE', sector: 'Telecom' },
  { name: 'Airtel Africa', country: 'Nigeria', exchange: 'NGX', sector: 'Telecom' },
  { name: 'Gold Fields', country: 'South Africa', exchange: 'JSE', sector: 'Materials' },
  { name: 'MTN Nigeria', country: 'Nigeria', exchange: 'NGX', sector: 'Telecom' },
  { name: 'Sanlam', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Anglo American Platinum', country: 'South Africa', exchange: 'JSE', sector: 'Materials' },
  { name: 'Equity Group Holdings', country: 'Kenya', exchange: 'NSE', sector: 'Financials' },
  { name: 'BCP', country: 'Morocco', exchange: 'CSE', sector: 'Financials' },
  { name: 'Sasol', country: 'South Africa', exchange: 'JSE', sector: 'Energy' },
  { name: 'Absa Group', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'KCB Group', country: 'Kenya', exchange: 'NSE', sector: 'Financials' },
  { name: 'Eastern Company', country: 'Egypt', exchange: 'EGX', sector: 'Consumer Goods' },
  { name: 'LafargeHolcim Maroc', country: 'Morocco', exchange: 'CSE', sector: 'Materials' },
  { name: 'BUA Cement', country: 'Nigeria', exchange: 'NGX', sector: 'Materials' },
  { name: 'Nedbank Group', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Shoprite Holdings', country: 'South Africa', exchange: 'JSE', sector: 'Retail' },
  { name: 'Guaranty Trust Holding', country: 'Nigeria', exchange: 'NGX', sector: 'Financials' },
  { name: 'Sonatel', country: 'Senegal', exchange: 'BRVM', sector: 'Telecom' },
  { name: 'MCB Group', country: 'Mauritius', exchange: 'SEM', sector: 'Financials' },
  { name: 'Fawry', country: 'Egypt', exchange: 'EGX', sector: 'Technology' },
  { name: 'Zenith Bank', country: 'Nigeria', exchange: 'NGX', sector: 'Financials' },
  { name: 'Sibanye Stillwater', country: 'South Africa', exchange: 'JSE', sector: 'Materials' },
  { name: 'Bidcorp', country: 'South Africa', exchange: 'JSE', sector: 'Consumer Services' },
  { name: 'East African Breweries', country: 'Kenya', exchange: 'NSE', sector: 'Consumer Goods' },
  { name: 'Talaat Moustafa Group', country: 'Egypt', exchange: 'EGX', sector: 'Real Estate' },
  { name: 'Bank of Africa', country: 'Morocco', exchange: 'CSE', sector: 'Financials' },
  { name: 'Seplat Energy', country: 'Nigeria', exchange: 'NGX', sector: 'Energy' },
  { name: 'Discovery', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Remgro', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Ecobank Transnational', country: 'Togo', exchange: 'BRVM', sector: 'Financials' },
  { name: 'AngloGold Ashanti', country: 'South Africa', exchange: 'JSE', sector: 'Materials' },
  { name: 'Impala Platinum', country: 'South Africa', exchange: 'JSE', sector: 'Materials' },
  { name: 'Harmony Gold', country: 'South Africa', exchange: 'JSE', sector: 'Materials' },
  { name: 'Old Mutual', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Investec', country: 'South Africa', exchange: 'JSE', sector: 'Financials' },
  { name: 'Tiger Brands', country: 'South Africa', exchange: 'JSE', sector: 'Consumer Goods' },
  { name: 'Spar Group', country: 'South Africa', exchange: 'JSE', sector: 'Retail' },
  { name: 'Mr Price Group', country: 'South Africa', exchange: 'JSE', sector: 'Retail' },
  { name: 'Clicks Group', country: 'South Africa', exchange: 'JSE', sector: 'Retail' },
  { name: 'MultiChoice Group', country: 'South Africa', exchange: 'JSE', sector: 'Media' },
];

const generateTop100 = () => {
  const list = [];
  let currentScore = 98.5;
  
  let seed = 12345;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < baseCompanies.length; i++) {
    const trendVal = (random() * 4 - 1).toFixed(1);
    list.push({
      rank: i + 1,
      name: baseCompanies[i].name,
      country: baseCompanies[i].country,
      exchange: baseCompanies[i].exchange,
      score: parseFloat(currentScore.toFixed(1)),
      sector: baseCompanies[i].sector,
      trend: parseFloat(trendVal) > 0 ? `+${trendVal}%` : `${trendVal}%`
    });
    currentScore -= random() * 0.4 + 0.1;
  }

  const sectors = ['Financials', 'Telecom', 'Materials', 'Consumer Goods', 'Technology', 'Energy', 'Real Estate', 'Healthcare', 'Industrials'];
  const regions = [
    { c: 'South Africa', e: 'JSE' },
    { c: 'Nigeria', e: 'NGX' },
    { c: 'Kenya', e: 'NSE' },
    { c: 'Egypt', e: 'EGX' },
    { c: 'Morocco', e: 'CSE' },
    { c: 'Mauritius', e: 'SEM' },
    { c: 'Ivory Coast', e: 'BRVM' },
    { c: 'Ghana', e: 'GSE' },
    { c: 'Botswana', e: 'BSE' },
    { c: 'Namibia', e: 'NSX' },
  ];

  const prefixes = ['Pan-African', 'Global', 'National', 'United', 'First', 'Standard', 'Apex', 'Crown', 'Summit', 'Pioneer', 'Atlas', 'Meridian', 'Equatorial', 'Savannah', 'Oasis', 'Continental', 'Prime', 'Alpha', 'Nexus', 'Crest'];
  const suffixes = ['Holdings', 'Group', 'Bank', 'Corp', 'Resources', 'Industries', 'Enterprises', 'Capital', 'Partners', 'Ventures', 'Trust', 'Energy', 'Minerals', 'Agri', 'Manufacturing', 'Properties', 'Financial', 'Brewers', 'Cement', 'Telecom'];

  for (let i = baseCompanies.length; i < 100; i++) {
    const region = regions[Math.floor(random() * regions.length)];
    const sector = sectors[Math.floor(random() * sectors.length)];
    const name = `${prefixes[Math.floor(random() * prefixes.length)]} ${suffixes[Math.floor(random() * suffixes.length)]}`;
    const trendVal = (random() * 5 - 2).toFixed(1);
    
    list.push({
      rank: i + 1,
      name: name + (random() > 0.5 ? ' Ltd' : ''),
      country: region.c,
      exchange: region.e,
      score: parseFloat(currentScore.toFixed(1)),
      sector: sector,
      trend: parseFloat(trendVal) > 0 ? `+${trendVal}%` : `${trendVal}%`
    });
    currentScore -= random() * 0.3 + 0.05;
  }
  return list;
};

const topCompanies = generateTop100();

const signals = [
  { 
    id: 1, 
    type: 'Buy', 
    asset: 'Safaricom (SCOM)', 
    probability: '87%', 
    reason: 'Earnings surprise prediction based on mobile money flow data.', 
    time: '2h ago',
    currentPrice: 'KES 15.40',
    targetPrice: 'KES 18.50',
    stopLoss: 'KES 14.20'
  },
  { 
    id: 2, 
    type: 'Hold', 
    asset: 'MTN Group (MTN)', 
    probability: '65%', 
    reason: 'FX volatility tracking indicates potential short-term headwinds.', 
    time: '4h ago',
    currentPrice: 'ZAR 112.50',
    targetPrice: 'ZAR 120.00',
    stopLoss: 'ZAR 105.00'
  },
  { 
    id: 3, 
    type: 'Sell', 
    asset: 'Guaranty Trust (GTCO)', 
    probability: '72%', 
    reason: 'Sector rotation alert: Capital flowing from financials to infra.', 
    time: '5h ago',
    currentPrice: 'NGN 38.50',
    targetPrice: 'NGN 32.00',
    stopLoss: 'NGN 41.00'
  },
];

export function AQEI() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'top100' | 'advisor' | 'signals' | 'news'>('dashboard');
  const [sortColumn, setSortColumn] = useState<string>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState<string>('');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedCompanies = useMemo(() => {
    let result = topCompanies;

    if (filterText) {
      const lowerFilter = filterText.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(lowerFilter) || 
             c.country.toLowerCase().includes(lowerFilter) ||
             c.sector.toLowerCase().includes(lowerFilter) ||
             c.exchange.toLowerCase().includes(lowerFilter)
      );
    }

    result = [...result].sort((a, b) => {
      let valA = a[sortColumn as keyof typeof a];
      let valB = b[sortColumn as keyof typeof b];

      if (sortColumn === 'trend') {
        valA = parseFloat((valA as string).replace('%', ''));
        valB = parseFloat((valB as string).replace('%', ''));
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [filterText, sortColumn, sortDirection]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-8 py-6 border-b border-white/[0.08] flex-shrink-0 flex items-center justify-between bg-[#0A0A0A]/80 backdrop-blur-md z-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#D4AF37] to-[#8A7322] rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <BrainCircuit className="w-6 h-6 text-[#0A0A0A]" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">AfriQuant Exchange Intelligence</h1>
          </div>
          <p className="text-[#00FFB2]/80 mt-1 flex items-center gap-2 uppercase tracking-wider text-xs font-medium">
            <Globe className="w-4 h-4" />
            Unified AI-powered financial intelligence across 38+ African stock exchanges
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/20 uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <span className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
            INSTITUTIONAL QUANT DESK • 38+ AFRICAN BOURSES
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="px-8 py-4 border-b border-white/[0.08] flex gap-6 flex-shrink-0">
        {[
          { id: 'dashboard', label: 'Smart Dashboard', icon: BarChart2 },
          { id: 'top100', label: 'Top 100 AI Index', icon: TrendingUp },
          { id: 'signals', label: 'Predictive Signals', icon: Zap },
          { id: 'advisor', label: 'AI Advisor', icon: MessageSquare },
          { id: 'news', label: 'News', icon: Newspaper },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all uppercase tracking-wider text-xs ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#8A7322] text-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.3)] font-bold' 
                : 'text-zinc-400 hover:text-[#D4AF37] hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Existing AI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="p-2 bg-[#0066FF]/20 rounded-lg border border-[#0066FF]/30">
                      <Activity className="w-5 h-5 text-[#0066FF]" />
                    </div>
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Market Intelligence AI</h3>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 relative z-10">Real-time anomaly detection, liquidity heatmaps, and cross-border arbitrage.</p>
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">JSE Liquidity Spike</span>
                      <span className="text-[#00FFB2] font-medium">Detected</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">NGX/JSE Arbitrage</span>
                      <span className="text-[#0066FF] font-medium">0.4% Spread</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-lg border border-[#D4AF37]/30">
                      <Search className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Company Intelligence AI</h3>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 relative z-10">NLP on earnings reports, risk scoring, and growth prediction models.</p>
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">Earnings NLP Scans</span>
                      <span className="text-white font-medium">142 Today</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">ESG Risk Alerts</span>
                      <span className="text-red-400 font-medium">3 Active</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FFB2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="p-2 bg-[#00FFB2]/20 rounded-lg border border-[#00FFB2]/30">
                      <Globe className="w-5 h-5 text-[#00FFB2]" />
                    </div>
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Macro Intelligence AI</h3>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 relative z-10">FX volatility tracking, inflation modeling, and country risk scoring.</p>
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">ZAR/USD Volatility</span>
                      <span className="text-red-400 font-medium">High</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">AfCFTA Trade Flow</span>
                      <span className="text-[#00FFB2] font-medium">+12% MoM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Prices Change */}
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-[#0A0A0A] border-white/[0.08] overflow-hidden min-h-[450px] flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <CardHeader className="pb-3 shrink-0 border-b border-white/[0.04] flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#D4AF37]" /> Live Pan-African Market Indices
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>LIVE TwelveData & Finnhub proxy enabled</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-6 flex flex-col justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'JSE Top 40 (South Africa)', value: '74,850.20', change: '+1.42%', positive: true, code: 'ZAR' },
                        { name: 'NGX All-Share (Nigeria)', value: '102,140.50', change: '+2.15%', positive: true, code: 'NGN' },
                        { name: 'NSE 20 (Kenya)', value: '1,742.80', change: '-0.34%', positive: false, code: 'KES' },
                        { name: 'EGX 30 (Egypt)', value: '28,450.00', change: '+3.10%', positive: true, code: 'EGP' },
                        { name: 'BRVM Composite (Cote d’Ivoire)', value: '218.45', change: '+0.65%', positive: true, code: 'XOF' },
                        { name: 'AQX Pan-African Index', value: '3,892.40', change: '+2.48%', positive: true, code: 'AQX' }
                      ].map((idx, index) => (
                        <div 
                          key={index}
                          className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between hover:bg-white/[0.04] transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{idx.name}</span>
                            <span className="text-[10px] font-mono text-zinc-500 font-bold bg-white/5 px-2 py-0.5 rounded">
                              {idx.code}
                            </span>
                          </div>
                          <div className="flex items-end justify-between mt-4">
                            <div>
                              <span className="text-xs text-zinc-500">Value</span>
                              <p className="text-xl font-bold font-mono text-white mt-0.5">{idx.value}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-zinc-500">24h Chg</span>
                              <p className={`text-sm font-bold font-mono mt-0.5 ${idx.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                                {idx.change}
                              </p>
                            </div>
                          </div>
                          <div className="w-full bg-white/[0.04] h-1.5 rounded-full mt-4 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${idx.positive ? 'bg-emerald-500' : 'bg-red-500'}`} 
                              style={{ width: idx.positive ? '80%' : '35%' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-white/[0.04] text-xs text-zinc-500 gap-2">
                      <span>Interactive multi-exchange indexing module powered by AfriQuant Smart-Router</span>
                      <span className="font-mono text-[10px] text-zinc-600">Last updated: Just now</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <News />
        )}

        {activeTab === 'top100' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Top 100 Most Lucrative African Companies</h2>
                <p className="text-zinc-400 text-sm mt-1">Dynamic AI index updated daily based on revenue, liquidity, ESG, and innovation.</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search companies, sectors..." 
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="bg-[#0A0A0A]/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/5 transition-all w-64"
                  />
                </div>
                <button className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors border border-white/10 hover:border-[#D4AF37]/50">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs uppercase tracking-widest text-[#D4AF37] bg-white/[0.02]">
                    <th className="p-4 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('rank')}>
                      Rank {sortColumn === 'rank' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                      Company {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('exchange')}>
                      Exchange {sortColumn === 'exchange' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('sector')}>
                      Sector {sortColumn === 'sector' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('score')}>
                      AI Score {sortColumn === 'score' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('trend')}>
                      Trend (24h) {sortColumn === 'trend' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredAndSortedCompanies.map((company) => (
                    <tr key={company.rank} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 text-zinc-400 font-mono">#{company.rank}</td>
                      <td className="p-4">
                        <div className="font-bold text-white">{company.name}</div>
                        <div className="text-xs text-[#00FFB2]/80 uppercase tracking-wider">{company.country}</div>
                      </td>
                      <td className="p-4 text-sm text-zinc-300 font-medium">{company.exchange}</td>
                      <td className="p-4 text-sm text-zinc-300">{company.sector}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#8A7322] rounded-full"
                              style={{ width: `${company.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-white">{company.score}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-sm font-bold ${company.trend.startsWith('+') ? 'text-[#00FFB2]' : 'text-red-400'}`}>
                          {company.trend}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-lg transition-all">
                          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'signals' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Predictive Signals</h2>
              <p className="text-zinc-400 text-sm mt-1">Probability-based alerts generated by our AI models.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {signals.map((signal) => (
                <div key={signal.id} className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    signal.type === 'Buy' ? 'from-[#00FFB2]/5 to-transparent' :
                    signal.type === 'Sell' ? 'from-red-500/5 to-transparent' :
                    'from-[#D4AF37]/5 to-transparent'
                  }`} />
                  
                  <div className={`px-6 py-3 rounded-xl font-bold text-xl uppercase tracking-widest shrink-0 ${
                    signal.type === 'Buy' ? 'bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30 shadow-[0_0_20px_rgba(0,255,178,0.2)]' :
                    signal.type === 'Sell' ? 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]' :
                    'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  }`}>
                    {signal.type}
                  </div>
                  
                  <div className="flex-1 w-full relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl font-bold text-white">{signal.asset}</h3>
                      <span className="text-sm text-zinc-500 font-mono bg-white/5 px-3 py-1 rounded-lg border border-white/10">{signal.time}</span>
                    </div>
                    
                    <p className="text-zinc-300 mb-6 text-sm leading-relaxed">{signal.reason}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">AI Confidence</div>
                        <div className={`text-lg font-bold ${
                          signal.type === 'Buy' ? 'text-[#00FFB2]' :
                          signal.type === 'Sell' ? 'text-red-400' :
                          'text-[#D4AF37]'
                        }`}>{signal.probability}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Current Price</div>
                        <div className="text-lg font-bold text-white">{signal.currentPrice}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Target Price</div>
                        <div className="text-lg font-bold text-[#00FFB2]">{signal.targetPrice}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Stop Loss</div>
                        <div className="text-lg font-bold text-red-400">{signal.stopLoss}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'advisor' && (
          <AQEICopilot />
        )}
      </div>
    </div>
  );
}
