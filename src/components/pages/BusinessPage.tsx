import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Layers, ShieldCheck, TrendingUp, Users, DollarSign, 
  ArrowRight, CheckCircle2, FileText, Send, Lock, Sparkles, BarChart3
} from 'lucide-react';
import { SharedFooter } from './SharedFooter';
import { HeroVideoBackground } from '../ui/HeroVideoBackground';
import { GlobalPaymentMesh } from '../ui/InteractiveFintechGraphics';
import { 
  KineticWordReveal, 
  TextMorph, 
  AnimatedQuoteCarousel, 
  TypewriterText,
  KineticCharacterStagger 
} from '../ui/KineticTypography';
import { CinematicAIBackground } from '../ui/CinematicAIBackground';

interface BusinessPageProps {
  onNavigatePage: (page: string) => void;
  onNavigateToAuth?: () => void;
}

const SOLUTIONS = [
  {
    title: 'Treasury Yield Vaults',
    desc: 'Park corporate cash in high-yield Eurobonds and money market funds generating up to 12.5% APY with daily liquidity.',
    icon: DollarSign,
    badge: '12.5% APY'
  },
  {
    title: 'Corporate Stock Portfolios',
    desc: 'Hedge inflation and currency devaluation by investing treasury reserves in USD and Pan-African blue chips.',
    icon: TrendingUp,
    badge: 'Currency Hedge'
  },
  {
    title: 'Employee Wealth & Equity Plans',
    desc: 'Offer automated stock options, ESOP management, and high-yield savings plans to your workforce across Africa.',
    icon: Users,
    badge: 'ESOP & Savings'
  },
  {
    title: 'Institutional Allocations',
    desc: 'Customized API access for family offices and venture funds managing $10M+ AUM with dedicated relationship leads.',
    icon: Layers,
    badge: 'API & Multi-Sig'
  }
];

export function BusinessPage({ onNavigatePage, onNavigateToAuth }: BusinessPageProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [aumRange, setAumRange] = useState('$100k - $1M');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#D5FF2F]">
      
      {/* 1. HERO SECTION WITH YOUTUBE VIDEO BACKGROUND */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 max-w-[1280px] mx-auto text-center space-y-8 overflow-hidden">
        <HeroVideoBackground videoId="LXb3EKWsInQ" overlayOpacity={0.88} />

        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold tracking-tight leading-[1.04]">
          <KineticWordReveal text="Investment Solutions" delay={0.1} /> <br />
          <TextMorph 
            words={[
              "For Modern Businesses.",
              "12.5% Treasury Vault APY.",
              "Sub-Second FX Settlement.",
              "Multi-Sig Corporate Accounts.",
              "Automated ESOP Equity."
            ]} 
            interval={3000}
          />
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Optimize balance sheet yields, hedge FX devaluation risk, and empower your workforce with institutional treasury vaults.
        </p>

        <div className="pt-4 flex justify-center gap-4">
          <a href="#contact-sales" className="h-[52px] px-9 rounded-full bg-black text-white hover:bg-[#D5FF2F] hover:text-black font-semibold text-base transition-all shadow-lg flex items-center gap-2">
            <span>Contact Enterprise Sales</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 2. BUSINESS SOLUTIONS GRID */}
      <section className="py-24 bg-[#F5F5F7] border-y border-gray-200/80 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">ENTERPRISE MODULES</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-black">Tailored for corporate growth.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div key={idx} className="bg-white rounded-[28px] p-8 border border-gray-200/80 shadow-[0_12px_36px_rgba(0,0,0,0.04)] space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#D5FF2F]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#00C805] font-mono font-bold text-xs">
                      {sol.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-black">{sol.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{sol.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GLOBAL PAYMENT MESH FOR ENTERPRISE */}
      <section className="py-12 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-8">
        <GlobalPaymentMesh />
      </section>

      {/* 3. CASE STUDIES & TRUST */}
      <section className="py-24 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-14">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">ENTERPRISE CASE STUDY</span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-black">Trusted by 450+ African scale-ups.</h2>
        </div>

        <div className="bg-black text-white rounded-[32px] p-8 lg:p-12 border border-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-[#D5FF2F] font-bold uppercase tracking-widest">CASE STUDY: PAN-AFRICAN FINTECH</span>
            <h3 className="text-3xl font-bold text-white">"AfriQuantX saved us 14% on currency devaluation in 2025."</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              By sweeping idle operating cash into AQX Treasury Eurobond Vaults, our finance team secured an additional $420,000 in annual net interest income while maintaining instant T+0 operational liquidity.
            </p>
          </div>
          <div className="lg:col-span-5 bg-zinc-900 rounded-[24px] p-6 border border-zinc-800 text-center font-mono space-y-2">
            <span className="text-gray-400 text-xs block">TREASURY YIELD GAINED</span>
            <div className="text-4xl font-extrabold text-[#00C805]">$420,000</div>
            <span className="text-[11px] text-gray-500 block">T+0 Liquidity Maintained</span>
          </div>
        </div>
      </section>

      {/* 4. CONTACT SALES FORM */}
      <section id="contact-sales" className="py-24 bg-[#F5F5F7] border-t border-gray-200 px-6 lg:px-12">
        <div className="max-w-[700px] mx-auto bg-white rounded-[32px] p-8 lg:p-12 border border-gray-200 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-black">Speak with Enterprise Treasury</h2>
            <p className="text-xs text-gray-500">Get a custom treasury yield audit for your company balance sheet.</p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#00C805] mx-auto" />
              <h4 className="text-lg font-bold text-black">Treasury Request Received!</h4>
              <p className="text-xs text-gray-600">An institutional relationship lead will reach out within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-gray-600 block mb-1">COMPANY NAME</label>
                <input 
                  type="text" required placeholder="e.g. Acme Africa Ltd"
                  value={companyName} onChange={e => setCompanyName(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#00C805]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-gray-600 block mb-1">WORK EMAIL</label>
                <input 
                  type="email" required placeholder="cfo@company.com"
                  value={workEmail} onChange={e => setWorkEmail(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#00C805]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-gray-600 block mb-1">ESTIMATED TREASURY SIZE</label>
                <select 
                  value={aumRange} onChange={e => setAumRange(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#00C805]"
                >
                  <option>$100k - $1M</option>
                  <option>$1M - $10M</option>
                  <option>$10M - $50M</option>
                  <option>$50M+</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-full bg-black text-white hover:bg-[#D5FF2F] hover:text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                Submit Enterprise Audit Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <SharedFooter onNavigatePage={onNavigatePage} onNavigateToAuth={onNavigateToAuth} />

    </div>
  );
}
