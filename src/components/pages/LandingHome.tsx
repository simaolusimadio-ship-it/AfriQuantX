import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, ShieldCheck, Zap, ArrowRight, Play, CheckCircle2, 
  Sparkles, Layers, Cpu, Globe, PieChart, Star, ChevronRight, Lock, 
  BarChart3, Activity, UserCheck, DollarSign
} from 'lucide-react';
import { AfricanGlobeCanvas } from './AfricanGlobeCanvas';
import { SharedFooter } from './SharedFooter';
import { 
  KineticWordReveal, 
  TextMorph, 
  AnimatedQuoteCarousel, 
  TypewriterText,
  KineticCharacterStagger 
} from '../ui/KineticTypography';
import { CinematicAIBackground } from '../ui/CinematicAIBackground';
import { CinematicShowcase } from '../ui/CinematicShowcase';
import { FeatureExplorerHub } from '../ui/FeatureExplorerHub';
import { LiveMarketTicker } from '../ui/LiveMarketTicker';
import { HeroVideoBackground } from '../ui/HeroVideoBackground';
import { 
  SecurityVaultCard, 
  CustomerJourneyFlow 
} from '../ui/InteractiveFintechGraphics';
import { AfriQuantXInvestmentBankSection } from '../ui/AfriQuantXInvestmentBankSection';
import { PlatformVideoPlayerSection } from '../ui/PlatformVideoPlayerSection';
import { AfricanPartnersMarquee } from '../ui/AfricanPartnersMarquee';

interface LandingHomeProps {
  onNavigatePage: (page: string) => void;
  onNavigateToAuth: () => void;
  onNavigateToDashboard?: () => void;
}

const LIVE_TICKER_ITEMS = [
  { symbol: 'PAYST', name: 'Paystack Pre-IPO', price: '$18.40', change: '+4.2%', up: true },
  { symbol: 'FLTW', name: 'Flutterwave Equity', price: '$32.10', change: '+6.8%', up: true },
  { symbol: 'DANGCEM', name: 'Dangote Cement', price: '₦680.00', change: '+1.4%', up: true },
  { symbol: 'SCOM', name: 'Safaricom PLC', price: 'KSh 18.50', change: '-0.3%', up: false },
  { symbol: 'NPN', name: 'Naspers Ltd', price: 'R 3,420.00', change: '+2.1%', up: true },
  { symbol: 'MNPT', name: 'Moniepoint Secondary', price: '$12.00', change: '+5.5%', up: true },
];

const TESTIMONIALS = [
  {
    name: 'Tariq Al-Mansoor',
    role: 'Managing Partner, Sahara Capital',
    quote: 'AfriQuantX provided our fund with instant FX clearing and secondary access to Flutterwave pre-IPO equity that was previously unreachable.',
    roi: '+48.2% ROI',
    avatar: '👨‍💼'
  },
  {
    name: 'Dr. Chioma Nwachukwu',
    role: 'Private Investor, Lagos',
    quote: 'The AQEI Engine auto-rebalanced my portfolio into high-yield sovereign Eurobonds right before interest rate adjustments. Absolute game changer.',
    roi: '+22.4% APY',
    avatar: '👩‍🔬'
  },
  {
    name: 'Kofi Mensah',
    role: 'Tech Lead & Angel Investor, Accra',
    quote: 'Fractional dual-listed shares across JSE and NGX from a single app. The interface polish is Apple-level.',
    roi: '+34.8% ROI',
    avatar: '👨‍💻'
  }
];

export function LandingHome({ onNavigatePage, onNavigateToAuth, onNavigateToDashboard }: LandingHomeProps) {
  // Interactive AQEI Score State in Preview Section
  const [selectedAsset, setSelectedAsset] = useState('PAYST');

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#D5FF2F] overflow-x-hidden">
      
      {/* HIGH-PERFORMANCE LIVE MARKET TICKER WITH NEON GLOW */}
      <LiveMarketTicker />

      {/* 1. HERO SECTION WITH CINEMATIC YOUTUBE VIDEO BACKGROUND */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden">
        
        {/* Cinematic Background YouTube Video Showcasing Fintech Revolution in Africa */}
        <HeroVideoBackground videoId="LXb3EKWsInQ" overlayOpacity={0.88} />

        {/* Left Column Text & CTAs */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-semibold tracking-tight leading-[1.05] text-black">
              <KineticWordReveal text="Invest in Africa's" delay={0.1} />
              <br />
              <div className="pt-2">
                <TextMorph 
                  words={[
                    "High-Growth Assets.",
                    "Pre-IPO Tech Equity.",
                    "Sovereign Eurobonds.",
                    "Dual-Listed Equities.",
                    "Autonomous AI Vaults."
                  ]} 
                  interval={3000}
                />
              </div>
            </h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed"
          >
            Access dual-listed stocks, pre-IPO tech unicorn equity, and sovereign Eurobond vaults powered by DeepMind-inspired AI risk intelligence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <button 
              onClick={onNavigateToAuth}
              className="w-full sm:w-auto h-[54px] px-9 rounded-full bg-black text-white hover:bg-[#D5FF2F] hover:text-black font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>Start Investing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => onNavigatePage('products')}
              className="w-full sm:w-auto h-[54px] px-8 rounded-full bg-[#F5F5F7] text-black hover:bg-gray-200 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Products</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: AI Animated Globe & Floating Dashboard Preview */}
        <div className="lg:col-span-5 relative">
          <AfricanGlobeCanvas />
        </div>

      </section>

      {/* VIDEO SECTION & TARGETED AFRICAN PARTNERS */}
      <section className="px-6 lg:px-12 max-w-[1280px] mx-auto -mt-6 mb-12 space-y-12">
        <PlatformVideoPlayerSection />
        <AfricanPartnersMarquee />
      </section>

      {/* 2. TRUSTED BY & STATS BAR */}
      <section className="py-14 bg-[#F5F5F7] border-y border-gray-200/80 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono">
            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-black">$42.8B+</span>
              <span className="text-xs text-gray-500 block uppercase tracking-wider">ASSETS UNDER MANAGEMENT</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-[#00C805]">300,000+</span>
              <span className="text-xs text-gray-500 block uppercase tracking-wider">ACTIVE INVESTORS</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-black">14</span>
              <span className="text-xs text-gray-500 block uppercase tracking-wider">AFRICAN EXCHANGES</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-[#00C805]">99.99%</span>
              <span className="text-xs text-gray-500 block uppercase tracking-wider">CLEARING UPTIME</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY AFRIQUANTX (3 PREMIUM HOVER FEATURE CARDS) */}
      <section className="py-28 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">THE AQX ADVANTAGE</span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-black">Why leading institutional & retail investors choose AfriQuantX.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-[28px] p-8 border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-300 space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-black text-[#D5FF2F] flex items-center justify-center">
              <Cpu className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-black">AI Investment Intelligence</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              AQEI neural models process 1.4B daily market signals to dynamically hedge portfolio risk and capture multi-currency yield opportunities.
            </p>
            <button 
              onClick={() => onNavigatePage('aqei-engine')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00C805] hover:text-black transition-colors"
            >
              <span>Explore AQEI Architecture</span> <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-[28px] p-8 border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-300 space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#00C805] flex items-center justify-center">
              <PieChart className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-black">Fractional Investing</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Buy fractional shares of high-value African blue chips (Dangote, Naspers, Safaricom) and US equities from as little as $1.
            </p>
            <button 
              onClick={() => onNavigatePage('products')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00C805] hover:text-black transition-colors"
            >
              <span>View Fractional Assets</span> <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-[28px] p-8 border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-300 space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-black">Cross-Border FX Access</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Seamlessly deposit in local currencies (NGN, ZAR, KES, EUR, USD) with sub-second FX conversion rates and zero spread markup.
            </p>
            <button 
              onClick={() => onNavigatePage('invest')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00C805] hover:text-black transition-colors"
            >
              <span>Learn About Multi-Currency</span> <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* 4. INTERACTIVE DASHBOARD SHOWCASE (STICKY SCROLL STYLE) */}
      <section className="py-24 bg-black text-white border-y border-gray-800 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <span className="text-xs font-mono font-bold text-[#D5FF2F] uppercase tracking-widest">LIVE PLATFORM EXPERIENCE</span>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Real-time portfolio management designed for clarity.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Monitor your total net worth across public stocks, pre-IPO equity certificates, and automated yield vaults with sub-millisecond precision.
            </p>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400">AQEI RISK INDEX</span>
                <span className="text-[#00C805] font-bold">94/100 (LOW RISK)</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400">PROJECTED ANNUAL YIELD</span>
                <span className="text-[#D5FF2F] font-bold">+18.4% APY</span>
              </div>
            </div>

            <button 
              onClick={onNavigateToAuth}
              className="h-[52px] px-8 rounded-full bg-[#00C805] hover:bg-[#D5FF2F] text-black font-bold text-xs uppercase tracking-wider transition-all"
            >
              Open Live Trading Demo
            </button>
          </div>

          {/* Right Desktop/Phone Mockup with Animated Charts */}
          <div className="lg:col-span-7 bg-zinc-900 rounded-[32px] p-8 border border-zinc-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between text-xs font-mono border-b border-zinc-800 pb-4">
              <span className="text-white font-bold">PORTFOLIO OVERVIEW — AFRIQUANTX</span>
              <span className="text-[#00C805] font-bold">● LIVE CLEARING</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-zinc-500 font-mono">TOTAL NET BALANCE</span>
              <div className="text-4xl lg:text-5xl font-extrabold font-mono text-[#D5FF2F]">$148,920.40</div>
            </div>

            {/* Simulated Live Chart Area */}
            <div className="h-48 bg-zinc-950 rounded-2xl p-4 border border-zinc-800 flex items-end gap-2">
              {[35, 42, 58, 50, 65, 80, 75, 90, 85, 110, 100, 125, 140, 148].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[#00C805]/20 to-[#00C805] rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. AQEI ENGINE PREVIEW (DARK FUTURISTIC SECTION) */}
      <section className="py-28 bg-[#070708] text-white px-6 lg:px-12 border-b border-zinc-800">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D5FF2F]">AQEI ENGINE PREVIEW</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white">Neural Market Predictions in Action.</h2>
          </div>

          <div className="bg-zinc-900 rounded-[32px] p-8 lg:p-12 border border-zinc-800 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-400">SELECT ASSET TO RUN AQEI AUDIT:</span>
                <div className="flex gap-2">
                  {['PAYST', 'FLTW', 'DANGCEM', 'NPN'].map((sym) => (
                    <button 
                      key={sym}
                      onClick={() => setSelectedAsset(sym)}
                      className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all ${selectedAsset === sym ? 'bg-[#00C805] text-black' : 'bg-zinc-950 text-zinc-400 hover:text-white'}`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-xs font-mono text-[#D5FF2F] font-bold">PREDICTION CONFIDENCE: 98.4%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-center">
              <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                <span className="text-xs text-zinc-500">RISK INDEX</span>
                <div className="text-3xl font-bold text-white">92 / 100</div>
              </div>
              <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                <span className="text-xs text-zinc-500">GROWTH FORECAST</span>
                <div className="text-3xl font-bold text-[#D5FF2F]">+24.5%</div>
              </div>
              <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                <span className="text-xs text-zinc-500">ACTION SIGNAL</span>
                <div className="text-3xl font-bold text-[#00C805]">STRONG BUY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.4 AFRIQUANTX INVESTMENT BANK SERVICES SPOTLIGHT */}
      <AfriQuantXInvestmentBankSection onNavigateToAuth={onNavigateToAuth} />

      {/* 5.5 INTERACTIVE FINTECH DESIGN GRAPHICS (SECURITY VAULT, CUSTOMER JOURNEY) */}
      <section className="py-16 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-12">
        {/* Customer Wealth Journey */}
        <CustomerJourneyFlow />

        {/* Security Vault */}
        <SecurityVaultCard />
      </section>

      {/* 5.6 CINEMATIC PRODUCT TRAILER SECTION */}
      <section className="py-24 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00C805]">CINEMATIC SHOWCASE</span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-black">
            Experience the future of Pan-African quantitative finance.
          </h2>
          <p className="text-gray-500 text-sm">
            Story-driven cinematic breakdown of our quantitative risk intelligence, pre-IPO equity engine, and autonomous yield vaults.
          </p>
        </div>

        <CinematicShowcase />
      </section>

      {/* 5.8 ALL 12 CORE PLATFORM MODULES EXPLORER */}
      <FeatureExplorerHub 
        onNavigateToAuth={onNavigateToAuth}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      {/* 6. ANIMATED INVESTOR TESTIMONIAL QUOTES */}
      <section className="py-24 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">ANIMATED INVESTOR TESTIMONIALS</span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-black">
            Trusted by venture partners & institutional treasuries.
          </h2>
        </div>

        <AnimatedQuoteCarousel 
          quotes={[
            {
              author: 'Tariq Al-Mansoor',
              role: 'Managing Partner',
              company: 'Sahara Capital Dubai',
              quote: 'AfriQuantX provided our fund with instant FX clearing and secondary access to Flutterwave pre-IPO equity that was previously unreachable in GCC markets.',
              roi: '+48.2% ROI',
              avatar: '👨‍💼'
            },
            {
              author: 'Dr. Chioma Nwachukwu',
              role: 'Private Investor',
              company: 'Lagos Tech Angels',
              quote: 'The AQEI Engine auto-rebalanced my portfolio into high-yield sovereign Eurobonds right before interest rate adjustments. Absolute quantitative masterclass.',
              roi: '+22.4% APY',
              avatar: '👩‍🔬'
            },
            {
              author: 'Kofi Mensah',
              role: 'Tech Lead & Angel Investor',
              company: 'Accra Capital',
              quote: 'Fractional dual-listed shares across JSE and NGX from a single app. The typography, smooth animations, and kinetic interface polish are world-class.',
              roi: '+34.8% ROI',
              avatar: '👨‍💻'
            },
            {
              author: 'Elena Rostova',
              role: 'Global Emerging Markets Lead',
              company: 'Helios Fund London',
              quote: 'Executing $10M+ block trades in Pan-African sovereign debt with zero counterparty settlement risk and live neural confidence metrics.',
              roi: '+19.6% APY',
              avatar: '👩‍💼'
            }
          ]} 
          autoPlayInterval={5000}
        />
      </section>

      {/* 7. FINAL BLACK CTA SECTION */}
      <section className="py-28 bg-black text-white px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00C805]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
            Invest in Africa's Future Today.
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Join 300,000+ investors creating wealth with zero commission dual-listed stocks and AI intelligence.
          </p>

          <div className="pt-4 flex justify-center">
            <button 
              onClick={onNavigateToAuth}
              className="h-[60px] px-12 rounded-full bg-[#00C805] hover:bg-[#D5FF2F] text-black font-extrabold text-base uppercase tracking-wider transition-all duration-200 shadow-[0_0_50px_rgba(0,200,5,0.4)] flex items-center gap-3"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SharedFooter onNavigatePage={onNavigatePage} onNavigateToAuth={onNavigateToAuth} />

    </div>
  );
}
