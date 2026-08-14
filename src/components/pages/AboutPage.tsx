import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, ShieldCheck, Award, Users, HeartHandshake, MapPin, 
  ArrowRight, CheckCircle2, Building2, Sparkles, Mail, Phone
} from 'lucide-react';
import { AfricanGlobeCanvas } from './AfricanGlobeCanvas';
import { SharedFooter } from './SharedFooter';
import { HeroVideoBackground } from '../ui/HeroVideoBackground';
import { GlobalPaymentMesh } from '../ui/InteractiveFintechGraphics';
import { AfriQuantXInvestmentBankSection } from '../ui/AfriQuantXInvestmentBankSection';

interface AboutPageProps {
  onNavigatePage: (page: string) => void;
  onNavigateToAuth?: () => void;
}

const TIMELINE_EVENTS = [
  { year: '2022', title: 'Founded in Lagos & London', desc: 'Started with a mission to democratize cross-border securities clearing for African investors.' },
  { year: '2024', title: 'SEC & Regulatory Licensing', desc: 'Achieved clearing house integrations and partner broker licenses across Nigeria, South Africa, and Kenya.' },
  { year: '2025', title: 'AQEI AI Engine Deployment', desc: 'Launched DeepMind-trained neural network executing 410ns order routing and volatility predictions.' },
  { year: '2026', title: '$42B+ AUM & Pre-IPO Platform', desc: 'Expanded to 14 African markets, serving over 300,000 active investors globally.' }
];

const LEADERSHIP = [
  { name: 'Lusima Adio', role: 'Founder & Chief Executive Officer', bio: 'Former DeepMind AI researcher and Pan-African macro strategist.', avatar: '👨‍💼' },
  { name: 'Amina Bello', role: 'Chief Risk & Compliance Officer', bio: 'Ex-SEC Securities regulator with 15+ years cross-border legal experience.', avatar: '👩‍💼' },
  { name: 'David Van Der Merwe', role: 'Chief Technology Officer', bio: 'Pioneer of high-frequency exchange matching engines in Johannesburg.', avatar: '👨‍💻' }
];

const OFFICES = [
  { city: 'Lagos, Nigeria', address: 'Victoria Island Financial District', phone: '+234 1 800 AQX' },
  { city: 'Johannesburg, South Africa', address: 'Sandton City Financial Tower', phone: '+27 11 900 AQX' },
  { city: 'Nairobi, Kenya', address: 'Westlands Commercial Center', phone: '+254 20 700 AQX' },
  { city: 'London, United Kingdom', address: 'Canary Wharf Tech Hub', phone: '+44 20 300 AQX' }
];

export function AboutPage({ onNavigatePage, onNavigateToAuth }: AboutPageProps) {
  const [activeOffice, setActiveOffice] = useState(0);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#D5FF2F]">
      
      {/* 1. HERO SECTION WITH ANIMATED GLOBE & YOUTUBE VIDEO BACKGROUND */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 max-w-[1280px] mx-auto text-center space-y-8 overflow-hidden">
        <HeroVideoBackground videoId="LXb3EKWsInQ" overlayOpacity={0.88} />

        <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-semibold tracking-tight leading-[1.04]">
          Building Africa's <br />
          <span>Financial Future.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          We are building the intelligent clearing and investment rails connecting African wealth to global capital markets.
        </p>

        {/* Vector Globe */}
        <div className="pt-6">
          <AfricanGlobeCanvas />
        </div>
      </section>

      {/* 2. MISSION STATEMENT */}
      <section className="py-24 bg-[#F5F5F7] border-y border-gray-200/80 px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">OUR CORE PURPOSE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black leading-tight">
            "To remove friction, FX barriers, and access limits for every investor building wealth in Africa."
          </h2>
        </div>
      </section>

      {/* 3. STORY TIMELINE */}
      <section className="py-24 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">OUR MILESTONES</span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-black">From vision to $42B+ AUM infrastructure.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {TIMELINE_EVENTS.map((event, idx) => (
            <div key={idx} className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-sm space-y-3 relative">
              <span className="text-2xl font-extrabold font-mono text-[#00C805] block">{event.year}</span>
              <h3 className="text-lg font-bold text-black">{event.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{event.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AFRIQUANTX INVESTMENT BANK SERVICES HIGHLIGHT */}
      <AfriQuantXInvestmentBankSection onNavigateToAuth={onNavigateToAuth} />

      {/* PAN-AFRICAN & GLOBAL CLEARING MESH */}
      <section className="py-12 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-8">
        <GlobalPaymentMesh />
      </section>

      {/* 4. LEADERSHIP CARDS */}
      <section className="py-24 bg-black text-white border-y border-gray-800 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D5FF2F]">EXECUTIVES</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white">Backed by world-class leaders.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <div key={idx} className="bg-zinc-900 rounded-[28px] p-8 border border-zinc-800 space-y-4 hover:border-[#00C805] transition-all">
                <span className="text-5xl block">{leader.avatar}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <span className="text-xs font-mono text-[#00C805] font-bold block mt-1">{leader.role}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE OFFICE LOCATIONS */}
      <section className="py-24 px-6 lg:px-12 max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">GLOBAL PRESENCE</span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-black">Our Regional Hubs.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {OFFICES.map((off, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveOffice(idx)}
              className={`p-6 rounded-[24px] border cursor-pointer transition-all space-y-3 ${activeOffice === idx ? 'bg-black text-white border-black shadow-xl' : 'bg-[#F5F5F7] text-black border-gray-200'}`}
            >
              <MapPin className={`w-5 h-5 ${activeOffice === idx ? 'text-[#D5FF2F]' : 'text-[#00C805]'}`} />
              <h4 className="font-bold text-lg">{off.city}</h4>
              <p className={`text-xs ${activeOffice === idx ? 'text-gray-400' : 'text-gray-500'}`}>{off.address}</p>
              <p className={`text-[11px] font-mono ${activeOffice === idx ? 'text-[#00C805]' : 'text-gray-600'}`}>{off.phone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <SharedFooter onNavigatePage={onNavigatePage} onNavigateToAuth={onNavigateToAuth} />

    </div>
  );
}
