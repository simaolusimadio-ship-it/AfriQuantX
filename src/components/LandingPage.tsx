import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Menu, X, Globe, Sparkles
} from 'lucide-react';
import { LandingHome } from './pages/LandingHome';
import { ProductsPage } from './pages/ProductsPage';
import { InvestPage } from './pages/InvestPage';
import { PreIPOsPage } from './pages/PreIPOsPage';
import { AQEIEnginePage } from './pages/AQEIEnginePage';
import { BusinessPage } from './pages/BusinessPage';
import { LearnPage } from './pages/LearnPage';
import { AboutPage } from './pages/AboutPage';

interface LandingPageProps {
  onNavigateToAuth?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToAQEI?: () => void;
}

export function LandingPage({
  onNavigateToAuth,
  onNavigateToDashboard,
  onNavigateToAQEI
}: LandingPageProps) {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigatePage = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'invest', label: 'Invest' },
    { id: 'pre-ipos', label: 'Pre-IPOs' },
    { id: 'aqei-engine', label: 'AQEI Engine' },
    { id: 'business', label: 'Business' },
    { id: 'learn', label: 'Learn' },
    { id: 'about', label: 'About' }
  ];

  const renderActivePage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductsPage onNavigatePage={handleNavigatePage} onNavigateToAuth={onNavigateToAuth} />;
      case 'invest':
        return <InvestPage onNavigatePage={handleNavigatePage} onNavigateToAuth={onNavigateToAuth} />;
      case 'pre-ipos':
        return <PreIPOsPage onNavigatePage={handleNavigatePage} onNavigateToAuth={onNavigateToAuth} />;
      case 'aqei-engine':
        return <AQEIEnginePage onNavigatePage={handleNavigatePage} onNavigateToAuth={onNavigateToAuth} />;
      case 'business':
        return <BusinessPage onNavigatePage={handleNavigatePage} onNavigateToAuth={onNavigateToAuth} />;
      case 'learn':
        return <LearnPage onNavigatePage={handleNavigatePage} onNavigateToAuth={onNavigateToAuth} />;
      case 'about':
        return <AboutPage onNavigatePage={handleNavigatePage} onNavigateToAuth={onNavigateToAuth} />;
      case 'home':
      default:
        return (
          <LandingHome 
            onNavigatePage={handleNavigatePage} 
            onNavigateToAuth={onNavigateToAuth || (() => {})} 
            onNavigateToDashboard={onNavigateToDashboard}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#D5FF2F] relative">
      
      {/* GLOBAL STICKY HEADER NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 flex items-center ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]' 
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
      }`}>
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo Left */}
          <div 
            onClick={() => handleNavigatePage('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img src="/logo.svg" alt="AfriQuantX" className="w-8 h-8 object-contain filter invert group-hover:scale-105 transition-transform" />
            <span className="font-extrabold text-xl tracking-tight text-[#000000]">
              AfriQuant<span className="text-[#00C805]">X</span>
            </span>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => (
              <span
                key={item.id}
                onClick={() => handleNavigatePage(item.id)}
                className={`cursor-pointer transition-colors relative py-1 ${
                  currentPage === item.id 
                    ? 'text-black font-bold' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#00C805] rounded-full" 
                  />
                )}
              </span>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={onNavigateToAuth}
              className="text-sm font-semibold text-[#1A1A1A] hover:text-[#00C805] transition-colors"
            >
              Sign In
            </button>

            <button 
              onClick={onNavigateToAuth}
              className="h-[44px] px-6 rounded-full bg-black text-white hover:bg-[#D5FF2F] hover:text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white border-b border-gray-200 p-6 shadow-2xl lg:hidden space-y-4"
          >
            <div className="flex flex-col gap-3 font-mono text-sm">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavigatePage(item.id)}
                  className={`py-2 px-3 rounded-lg cursor-pointer ${currentPage === item.id ? 'bg-black text-white font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {item.label}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={onNavigateToAuth}
                className="w-full py-3 rounded-full bg-black text-white font-bold text-xs uppercase tracking-wider"
              >
                Sign In / Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER ACTIVE PAGE CONTENT */}
      <main className="relative z-10">
        {renderActivePage()}
      </main>

    </div>
  );
}
