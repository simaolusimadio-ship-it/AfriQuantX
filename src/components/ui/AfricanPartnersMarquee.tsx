import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Zap, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface PartnerItem {
  name: string;
  symbol: string;
  category: 'corporate' | 'unicorn';
  sector: string;
  country: string;
  valOrTag: string;
  badgeBg: string;
  badgeTextColor: string;
  accentGlow: string;
  svgLogo: React.ReactNode;
}

export function AfricanPartnersMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  const corporatePartners: PartnerItem[] = [
    {
      name: 'MTN Group',
      symbol: 'MTN',
      category: 'corporate',
      sector: 'Telecommunications',
      country: 'South Africa',
      valOrTag: '$14B Market Cap',
      badgeBg: 'bg-amber-400',
      badgeTextColor: 'text-black',
      accentGlow: 'hover:border-amber-400/60 hover:shadow-amber-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-extrabold flex items-center justify-center text-[10px] tracking-tighter">
          MTN
        </div>
      )
    },
    {
      name: 'Dangote Industries',
      symbol: 'DANGOTE',
      category: 'corporate',
      sector: 'Industrial Conglomerate',
      country: 'Nigeria',
      valOrTag: '$20B+ Enterprise',
      badgeBg: 'bg-emerald-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-emerald-500/60 hover:shadow-emerald-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-[9px] tracking-tighter">
          DNG
        </div>
      )
    },
    {
      name: 'Standard Bank',
      symbol: 'SBG',
      category: 'corporate',
      sector: 'Investment Banking',
      country: 'South Africa',
      valOrTag: 'Pan-African Tier 1',
      badgeBg: 'bg-blue-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-blue-500/60 hover:shadow-blue-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-[9px]">
          SBG
        </div>
      )
    },
    {
      name: 'Safaricom / M-Pesa',
      symbol: 'M-PESA',
      category: 'corporate',
      sector: 'Mobile Money Leader',
      country: 'Kenya',
      valOrTag: '50M+ Transactors',
      badgeBg: 'bg-green-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-green-500/60 hover:shadow-green-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-green-600 text-white font-black flex items-center justify-center text-[8px]">
          MPESA
        </div>
      )
    },
    {
      name: 'Absa Group',
      symbol: 'ABSA',
      category: 'corporate',
      sector: 'Financial Services',
      country: 'South Africa',
      valOrTag: 'Global Clearing',
      badgeBg: 'bg-red-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-red-500/60 hover:shadow-red-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-red-600 text-white font-extrabold flex items-center justify-center text-[9px]">
          ABSA
        </div>
      )
    },
    {
      name: 'Ecobank',
      symbol: 'ETI',
      category: 'corporate',
      sector: '33-Country Bank',
      country: 'Pan-African',
      valOrTag: 'Sovereign Debt Desk',
      badgeBg: 'bg-teal-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-teal-500/60 hover:shadow-teal-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center text-[9px]">
          ECO
        </div>
      )
    },
    {
      name: 'Equity Bank',
      symbol: 'EQUITY',
      category: 'corporate',
      sector: 'Commercial Banking',
      country: 'Kenya / DRC',
      valOrTag: '$10B+ Assets',
      badgeBg: 'bg-amber-700',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-amber-600/60 hover:shadow-amber-600/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-[8px]">
          EQT
        </div>
      )
    },
    {
      name: 'FirstBank (FBN)',
      symbol: 'FIRST',
      category: 'corporate',
      sector: 'Banking Institution',
      country: 'Nigeria',
      valOrTag: '130 Yrs Banking',
      badgeBg: 'bg-blue-900',
      badgeTextColor: 'text-amber-300',
      accentGlow: 'hover:border-blue-400/60 hover:shadow-blue-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-blue-900 text-amber-300 font-extrabold flex items-center justify-center text-[8px]">
          FBN
        </div>
      )
    }
  ];

  const unicornPartners: PartnerItem[] = [
    {
      name: 'Flutterwave',
      symbol: 'FLW',
      category: 'unicorn',
      sector: 'Payments Infrastructure',
      country: 'Nigeria',
      valOrTag: '$3.2B Unicorn',
      badgeBg: 'bg-amber-500',
      badgeTextColor: 'text-black',
      accentGlow: 'hover:border-amber-400/60 hover:shadow-amber-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black flex items-center justify-center text-[9px]">
          FLW
        </div>
      )
    },
    {
      name: 'OPay',
      symbol: 'OPAY',
      category: 'unicorn',
      sector: 'Financial SuperApp',
      country: 'Nigeria',
      valOrTag: '$2.0B Unicorn',
      badgeBg: 'bg-emerald-500',
      badgeTextColor: 'text-black',
      accentGlow: 'hover:border-emerald-400/60 hover:shadow-emerald-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-black font-extrabold flex items-center justify-center text-[8px]">
          OPAY
        </div>
      )
    },
    {
      name: 'Wave Mobile',
      symbol: 'WAVE',
      category: 'unicorn',
      sector: 'Francophone Fintech',
      country: 'Senegal / Ivory Coast',
      valOrTag: '$1.7B Unicorn',
      badgeBg: 'bg-sky-500',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-sky-400/60 hover:shadow-sky-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-sky-500 text-white font-extrabold flex items-center justify-center text-[8px]">
          WAVE
        </div>
      )
    },
    {
      name: 'Interswitch',
      symbol: 'ISW',
      category: 'unicorn',
      sector: 'Switching & Processing',
      country: 'Nigeria',
      valOrTag: '$1.0B Pioneer',
      badgeBg: 'bg-red-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-red-500/60 hover:shadow-red-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-red-600 text-white font-extrabold flex items-center justify-center text-[8px]">
          ISW
        </div>
      )
    },
    {
      name: 'Moniepoint',
      symbol: 'MNP',
      category: 'unicorn',
      sector: 'Commercial Merchant Bank',
      country: 'Nigeria',
      valOrTag: '$1.0B Unicorn',
      badgeBg: 'bg-indigo-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-indigo-500/60 hover:shadow-indigo-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-[8px]">
          MNP
        </div>
      )
    },
    {
      name: 'Chipper Cash',
      symbol: 'CHIPPER',
      category: 'unicorn',
      sector: 'Cross-Border Money',
      country: 'Uganda / Ghana',
      valOrTag: 'African Fintech',
      badgeBg: 'bg-purple-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-purple-500/60 hover:shadow-purple-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-[8px]">
          CHP
        </div>
      )
    },
    {
      name: 'Andela',
      symbol: 'ANDELA',
      category: 'unicorn',
      sector: 'Global Tech Talent',
      country: 'Pan-African',
      valOrTag: '$1.5B Unicorn',
      badgeBg: 'bg-cyan-600',
      badgeTextColor: 'text-white',
      accentGlow: 'hover:border-cyan-500/60 hover:shadow-cyan-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-black flex items-center justify-center text-[8px]">
          AND
        </div>
      )
    },
    {
      name: 'Sun King',
      symbol: 'SUN',
      category: 'unicorn',
      sector: 'Off-Grid PayGo Credit',
      country: 'Kenya / Regional',
      valOrTag: 'Solar Fintech',
      badgeBg: 'bg-yellow-500',
      badgeTextColor: 'text-black',
      accentGlow: 'hover:border-yellow-400/60 hover:shadow-yellow-500/10',
      svgLogo: (
        <div className="w-8 h-8 rounded-full bg-yellow-500 text-black font-extrabold flex items-center justify-center text-[8px]">
          SUN
        </div>
      )
    }
  ];

  // Tripled list for infinite seamless marquee loop
  const loopRow1 = [...corporatePartners, ...corporatePartners, ...corporatePartners];
  const loopRow2 = [...unicornPartners, ...unicornPartners, ...unicornPartners];

  return (
    <div className="py-14 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-8 my-8 bg-zinc-950 text-white rounded-[32px] border border-zinc-800/80 relative overflow-hidden shadow-2xl">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[250px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800/80 relative z-10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>AFRICAN TARGETED STRATEGIC PARTNERS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Institutional Corporate Giants & African Tech Unicorns
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Hover over any partner badge to reveal real-time brand identity and active FX clearing network status.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Continuous Marquee Loop</span>
        </div>
      </div>

      {/* Marquee Wrapper with Side Fade Gradients */}
      <div 
        className="relative overflow-hidden space-y-4 py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none" />

        {/* Row 1: Corporate Giants (Scrolling Left) */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest px-2 flex items-center gap-1.5">
            <Award className="w-3 h-3 text-amber-400" />
            <span>Pan-African Corporate & Banking Giants</span>
          </div>

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-4 shrink-0"
              animate={{ x: isPaused ? '0%' : ['0%', '-33.333%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 28,
                  ease: 'linear'
                }
              }}
            >
              {loopRow1.map((item, idx) => (
                <PartnerCard key={`row1-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Row 2: Tech Unicorns (Scrolling Right) */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest px-2 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>African Tech Unicorns & High-Growth Champions</span>
          </div>

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-4 shrink-0"
              animate={{ x: isPaused ? '0%' : ['-33.333%', '0%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 32,
                  ease: 'linear'
                }
              }}
            >
              {loopRow2.map((item, idx) => (
                <PartnerCard key={`row2-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500 relative z-10">
        <div className="flex items-center gap-2 text-zinc-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Cross-Border Settlement via JSE, NGX, NSE & LSE Desks</span>
        </div>
        <div className="text-blue-400 font-bold">
          Grayscale Filter • Hover to Highlight & Inspect
        </div>
      </div>
    </div>
  );
}

// Sub-component for individual logo cards with Grayscale by Default -> Full Color on Hover
function PartnerCard({ item }: { item: PartnerItem }) {
  return (
    <div
      className={`
        w-64 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 
        transition-all duration-300 ease-out cursor-pointer group
        /* GRAYSCALE FILTER BY DEFAULT, HIGHLIGHT ON HOVER */
        grayscale contrast-125 opacity-70 
        hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:bg-zinc-900 
        hover:shadow-2xl hover:z-30 relative ${item.accentGlow}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          {item.svgLogo}
          <div>
            <span className="font-bold text-sm text-white group-hover:text-blue-200 transition-colors block leading-tight">
              {item.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block">
              {item.country}
            </span>
          </div>
        </div>

        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-extrabold ${item.badgeBg} ${item.badgeTextColor} shadow-sm`}>
          {item.symbol}
        </span>
      </div>

      <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono">
        <span className="text-zinc-400 truncate max-w-[130px]">{item.sector}</span>
        <span className="text-emerald-400 font-bold">{item.valOrTag}</span>
      </div>
    </div>
  );
}
