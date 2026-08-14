import React from 'react';
import { 
  ArrowRight, ShieldCheck, Globe, Twitter, Linkedin, Github, 
  Send, Smartphone, ChevronRight, CheckCircle2, Lock
} from 'lucide-react';

interface SharedFooterProps {
  onNavigatePage: (page: string) => void;
  onNavigateToAuth?: () => void;
}

export function SharedFooter({ onNavigatePage, onNavigateToAuth }: SharedFooterProps) {
  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-zinc-800/80 pt-20 pb-12 px-6 lg:px-12 text-xs font-sans relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#00C805]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto space-y-16 relative z-10">
        
        {/* Top Newsletter & App Download Bar */}
        <div className="bg-zinc-900/90 rounded-[24px] p-8 lg:p-10 border border-zinc-800 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-mono font-bold text-[#D5FF2F] uppercase tracking-widest">
              AFRIQUANTX INTELLIGENCE BRIEFING
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Get weekly institutional market insights.
            </h3>
            <p className="text-zinc-400 text-sm">
              Join 120,000+ investors receiving our proprietary AI macro research every Monday.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <input 
                type="email" 
                placeholder="Enter your work email"
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-full px-5 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00C805] transition-colors"
              />
            </div>
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#00C805] hover:bg-[#D5FF2F] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shrink-0 shadow-lg">
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Products */}
          <div className="space-y-4">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">PRODUCTS</h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li onClick={() => onNavigatePage('invest')} className="hover:text-[#00C805] cursor-pointer transition-colors">Global Multi-Currency</li>
              <li onClick={() => onNavigatePage('invest')} className="hover:text-[#00C805] cursor-pointer transition-colors">Instant FX Clearing</li>
              <li onClick={() => onNavigatePage('products')} className="hover:text-[#00C805] cursor-pointer transition-colors">Whop Gold Metal Card</li>
              <li onClick={() => onNavigatePage('products')} className="hover:text-[#00C805] cursor-pointer transition-colors">Treasury Yield Vaults</li>
              <li onClick={() => onNavigatePage('products')} className="hover:text-[#00C805] cursor-pointer transition-colors">Fractional Stocks</li>
            </ul>
          </div>

          {/* Column 2: Invest */}
          <div className="space-y-4">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">INVEST</h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li onClick={() => onNavigatePage('invest')} className="hover:text-[#00C805] cursor-pointer transition-colors">Stock Portfolios</li>
              <li onClick={() => onNavigatePage('invest')} className="hover:text-[#00C805] cursor-pointer transition-colors">African Index Funds</li>
              <li onClick={() => onNavigatePage('pre-ipos')} className="hover:text-[#00C805] cursor-pointer transition-colors">Pre-IPO Secondary Equity</li>
              <li onClick={() => onNavigatePage('aqei-engine')} className="hover:text-[#00C805] cursor-pointer transition-colors">AQEI Automated Trading</li>
              <li onClick={() => onNavigatePage('invest')} className="hover:text-[#00C805] cursor-pointer transition-colors">High Yield Sovereign Bonds</li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-4">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">PLATFORM</h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li onClick={() => onNavigatePage('aqei-engine')} className="hover:text-[#00C805] cursor-pointer transition-colors">AQEI Router Node</li>
              <li onClick={() => onNavigatePage('aqei-engine')} className="hover:text-[#00C805] cursor-pointer transition-colors">AI Risk Matrix</li>
              <li onClick={() => onNavigatePage('business')} className="hover:text-[#00C805] cursor-pointer transition-colors">Enterprise Treasury</li>
              <li onClick={() => onNavigatePage('learn')} className="hover:text-[#00C805] cursor-pointer transition-colors">API Documentation</li>
              <li onClick={() => onNavigatePage('about')} className="hover:text-[#00C805] cursor-pointer transition-colors">System Uptime (99.99%)</li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-4">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">RESOURCES</h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li onClick={() => onNavigatePage('learn')} className="hover:text-[#00C805] cursor-pointer transition-colors">AQX Academy</li>
              <li onClick={() => onNavigatePage('learn')} className="hover:text-[#00C805] cursor-pointer transition-colors">Weekly Market Reports</li>
              <li onClick={() => onNavigatePage('learn')} className="hover:text-[#00C805] cursor-pointer transition-colors">Investor Guides</li>
              <li onClick={() => onNavigatePage('about')} className="hover:text-[#00C805] cursor-pointer transition-colors">Security & Audits</li>
              <li onClick={() => onNavigatePage('about')} className="hover:text-[#00C805] cursor-pointer transition-colors">Help Center</li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="space-y-4">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">COMPANY</h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li onClick={() => onNavigatePage('about')} className="hover:text-[#00C805] cursor-pointer transition-colors">About AfriQuantX</li>
              <li onClick={() => onNavigatePage('about')} className="hover:text-[#00C805] cursor-pointer transition-colors">Careers (We're Hiring)</li>
              <li onClick={() => onNavigatePage('about')} className="hover:text-[#00C805] cursor-pointer transition-colors">Press & Media</li>
              <li onClick={() => onNavigatePage('business')} className="hover:text-[#00C805] cursor-pointer transition-colors">Institutional Sales</li>
              <li onClick={() => onNavigatePage('about')} className="hover:text-[#00C805] cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>

        </div>

        {/* Legal & Regulatory Footnote */}
        <div className="pt-10 border-t border-zinc-800/80 space-y-5 font-mono text-[11px] text-zinc-500 leading-relaxed">
          <p>
            AfriQuantX Ltd. (AQX) is a technology platform offering digital securities clearing infrastructure, algorithmic order routing, and multi-currency liquidity management. Brokerage services are facilitated through SEC and FINRA registered clearing partners. Banking and custodial services are provided by FDIC-insured partner banks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#00C805]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>© 2026 AfriQuantX Technologies Inc. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-colors">Regulatory Disclosures</span>
              <span className="hover:text-white cursor-pointer transition-colors">Security</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
