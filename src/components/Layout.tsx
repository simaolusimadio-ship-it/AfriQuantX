import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Store, 
  BrainCircuit, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User,
  Wallet,
  ArrowRightLeft,
  BarChart3,
  ShieldAlert,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  ShieldCheck,
  Rocket,
  Cpu,
  Calculator
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { LiveTicker } from './LiveTicker';
import { CommandPalette } from './CommandPalette';
import { ThemeToggleSwitch } from './ThemeToggleSwitch';
import { BiometricAuthModal } from './BiometricAuthModal';
import { supabase } from '../lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
  userRole?: 'admin' | 'investor' | 'company';
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const allNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ipo-launch', label: 'IPO Bookbuilding', icon: Rocket },
  { id: 'algo-trading', label: 'Algo Execution Desk', icon: Cpu },
  { id: 'valuation-workbench', label: 'Valuation & Advisory', icon: Calculator },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'marketplace', label: 'Markets', icon: Store },
  { id: 'market-secondary', label: 'Secondary Market', icon: Store },
  { id: 'market-forex', label: 'Forex Market', icon: Store },
  { id: 'trade', label: 'Trade', icon: ArrowRightLeft },
  { id: 'index', label: 'Index', icon: BarChart3 },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'activity', label: 'Activity Center', icon: Bell },
  { id: 'payouts', label: 'Payouts', icon: ArrowRightLeft },
  { id: 'performance', label: 'Performance', icon: TrendingUp },
  { id: 'reports', label: 'Reports & Audits', icon: BarChart3 },
  { id: 'aqei', label: 'AQEI Intelligence', icon: BrainCircuit },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'admin', label: 'Admin', icon: ShieldAlert },
];

export function Layout({ 
  children, 
  activeTab, 
  setActiveTab, 
  onLogout, 
  userRole = 'investor',
  searchQuery = '',
  setSearchQuery
}: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      localStorage.setItem('sidebar_collapsed', (!prev).toString());
      return !prev;
    });
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState(false);
  const [biometricStatusMsg, setBiometricStatusMsg] = useState<string | null>(null);

  const [toastNotification, setToastNotification] = useState<any | null>(null);

  useEffect(() => {
    // Initial notifications
    setNotifications([
      { id: 'notif-init-1', title: 'Institutional Gateway Active', message: 'Direct market data feeds connected across JSE, NGX, and NSE Kenya.', time: 'Just now', read: false, type: 'info' },
      { id: 'notif-init-2', title: 'Real-Time Market Update', message: 'Pan-African Index surged +2.48% on strong telecommunications earnings.', time: '2m ago', read: false, type: 'market' }
    ]);
    setUnreadCount(2);

    // Live real-time notification generator for institutional feeds
    const liveEventPool = [
      { title: 'FIX 4.4 Trade Execution', message: 'Child slice of 2,500 shares filled for JSE:SBK at ZAR 208.50 on Strate.', type: 'trade' },
      { title: 'IPO Bookbuilding Update', message: 'AfriHydropower Green Bond syndicate reached 3.42x institutional oversubscription.', type: 'ipo' },
      { title: 'AQEI Predictive Signal', message: 'New high-conviction BUY alert detected for Safaricom (SCOM) with 87% confidence.', type: 'signal' },
      { title: 'DvP Settlement Cleared', message: 'Pre-funded escrow allotment of ZAR 4,500,000 cleared by CSD Custody Node.', type: 'settlement' },
      { title: 'Pre-Trade Risk Gate Checked', message: 'TWAP parent order VaR collar validated: 0.18% headroom within 2.5% band.', type: 'risk' },
      { title: 'Macro FX Telemetry', message: 'USD/ZAR implied volatility compressed 14 bps following SARB policy rate release.', type: 'macro' }
    ];

    let eventIdx = 0;
    const interval = setInterval(() => {
      const selected = liveEventPool[eventIdx % liveEventPool.length];
      eventIdx++;

      const newNotif = {
        id: `notif-live-${Date.now()}`,
        title: selected.title,
        message: selected.message,
        time: 'Just now',
        read: false,
        type: selected.type
      };

      setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
      setUnreadCount(prev => prev + 1);

      // Trigger temporary live real-time toast banner
      setToastNotification(newNotif);
      setTimeout(() => {
        setToastNotification((curr: any) => (curr?.id === newNotif.id ? null : curr));
      }, 4500);
    }, 12000);

    // Subscribe to real-time transactions in Supabase
    const channel = supabase.channel('realtime-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, payload => {
        const newNotif = {
          id: payload.new.id,
          title: 'New Transaction',
          message: `A new ${payload.new.type} of ${payload.new.amount} was recorded.`,
          time: 'Just now',
          read: false,
          type: 'trade'
        };
        setNotifications(prev => [newNotif, ...prev]);
        setUnreadCount(prev => prev + 1);
        setToastNotification(newNotif);
        setTimeout(() => setToastNotification(null), 4000);
      })
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current && !isCommandPaletteOpen) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  const navItems = allNavItems.filter(item => {
    if (item.id === 'admin') {
      return userRole === 'admin';
    }
    return true;
  });

  const mobileNavItems = navItems.filter(item => 
    ['dashboard', 'portfolio', 'marketplace', 'settings'].includes(item.id)
  );

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans selection:bg-white/30">
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        onNavigate={setActiveTab} 
      />
      
      {/* Sidebar (Desktop) */}
      <aside className={cn(
        "hidden md:flex flex-col border-r border-white/5 bg-black relative z-20 transition-all duration-300 ease-in-out shrink-0",
        isSidebarCollapsed ? "w-20" : "w-72"
      )}>
        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="absolute top-7 -right-3 w-6 h-6 bg-white border border-neutral-800 text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer z-50 shadow-md"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        <div className={cn("flex items-center gap-3 transition-all duration-300", isSidebarCollapsed ? "justify-center p-6" : "p-8")}>
          <img src="/logo.svg" alt="AfriQuantX Logo" className="w-10 h-10 object-contain" />
          {!isSidebarCollapsed && (
            <span className="font-extrabold text-xl tracking-tight text-white">AfriQuantX</span>
          )}
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center rounded-2xl transition-all duration-300 relative group uppercase tracking-wider text-xs font-bold",
                  isSidebarCollapsed ? "justify-center p-3.5" : "px-4 py-3.5 gap-3",
                  isActive 
                    ? "text-black" 
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.03]"
                )}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-desktop"
                    className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={cn("w-5 h-5 relative z-10 transition-transform duration-300", isActive ? "scale-110 text-black" : "group-hover:scale-110")} />
                {!isSidebarCollapsed && <span className="relative z-10">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile & Wallet */}
        <div className={cn("p-4 mt-auto transition-all duration-300", isSidebarCollapsed ? "items-center flex flex-col gap-4" : "")}>
          {isSidebarCollapsed ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-[2px] cursor-pointer hover:scale-105 transition-transform" title="Alex Investor">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer" title="Wallet Balance: $0">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 relative overflow-hidden group cursor-pointer hover:border-white/20 transition-colors shadow-2xl">
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white p-[2px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Alex Investor</p>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/5 relative z-10">
                <p className="text-[10px] text-zinc-400 mb-1 flex items-center gap-1 uppercase tracking-widest font-bold">
                  <Wallet className="w-3 h-3 text-white" /> Wallet Balance
                </p>
                <p className="text-lg font-bold font-mono text-white tracking-tight">$0</p>
              </div>
            </div>
          )}
          {onLogout && (
            <button 
              onClick={onLogout}
              className={cn(
                "mt-3 flex items-center justify-center bg-zinc-900 text-white hover:bg-white hover:text-black border border-white/10 transition-all text-xs font-bold uppercase tracking-wider rounded-xl",
                isSidebarCollapsed ? "w-10 h-10 p-0" : "w-full py-3 gap-2"
              )}
              title={isSidebarCollapsed ? "Sign Out" : undefined}
            >
              <LogOut className="w-4 h-4" />
              {!isSidebarCollapsed && "Sign Out"}
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-black">
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

        {/* Header (Desktop) */}
        <header className="hidden md:flex flex-col shrink-0 z-10">
          <div className="h-20 border-b border-white/5 bg-black/50 backdrop-blur-md flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCommandPaletteOpen(true)}
                className="flex items-center gap-3 bg-black rounded-2xl px-4 py-2.5 w-96 border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 shadow-2xl group"
              >
                <Search className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="text-sm text-zinc-500 font-medium flex-1 text-left">Search or jump to...</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-zinc-400 font-bold">⌘</kbd>
                  <kbd className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-zinc-400 font-bold">K</kbd>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-4 relative" ref={notificationsRef}>
              <ThemeToggleSwitch scale="compact" id="desktop-theme-toggle" />

              {/* Hardware Biometric Security Gate Trigger */}
              <button
                onClick={() => setIsBiometricModalOpen(true)}
                title="Hardware Biometric Security & Passkey Authentication"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl text-xs font-mono group"
              >
                <Fingerprint className="w-4 h-4 text-white group-hover:text-black group-hover:scale-110 transition-transform" />
                <span className="font-semibold hidden lg:inline">FIDO2 Biometrics</span>
              </button>

              <button 
                onClick={handleNotificationClick}
                className="relative p-2.5 rounded-xl bg-neutral-900 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 shadow-2xl"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-88 bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-neutral-900/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <h3 className="font-semibold text-white text-sm">Real-Time Telemetry & Alerts</h3>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">{notifications.length} events</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y divide-white/5">
                      {notifications.length > 0 ? (
                        notifications.map(notif => (
                          <div key={notif.id} className={`p-3.5 hover:bg-white/5 transition-colors ${!notif.read ? 'bg-white/[0.03]' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{notif.title}</h4>
                              <span className="text-[10px] text-zinc-500 font-mono">{notif.time}</span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">{notif.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-zinc-500 text-sm">
                          No notifications yet
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <LiveTicker />
        </header>

        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-white/5 bg-black/85 backdrop-blur-xl flex items-center justify-between px-4 shrink-0 z-20">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="AfriQuantX Logo" className="w-8 h-8 object-contain" />
            <span className="font-extrabold text-base tracking-tight text-white">AfriQuantX</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggleSwitch scale="micro" id="mobile-theme-toggle" />
            <button
              onClick={() => setIsBiometricModalOpen(true)}
              title="Hardware Biometrics"
              className="p-2 text-white hover:text-zinc-300 transition-colors"
            >
              <Fingerprint className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full"></span>
              )}
            </button>
            {onLogout && (
              <button onClick={onLogout} className="p-2 text-zinc-500 hover:text-white transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>
        <div className="md:hidden">
          <LiveTicker />
        </div>

        {/* Scrollable Content - FULL WIDTH STRETCHED LAYOUT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24 md:pb-8 z-10 scroll-smooth w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full min-h-[calc(100vh-140px)]"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Real-time Notification Toast Notification */}
        <AnimatePresence>
          {toastNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-black/95 border border-white/20 p-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-start gap-3 pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4 text-emerald-400 animate-bounce" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-xs font-bold text-white uppercase tracking-wider truncate">{toastNotification.title}</p>
                  <span className="text-[10px] text-zinc-500 font-mono">{toastNotification.time}</span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">{toastNotification.message}</p>
              </div>
              <button
                onClick={() => setToastNotification(null)}
                className="text-zinc-500 hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-2xl border-t border-white/5 z-50 px-6 pb-safe flex items-center justify-between">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center w-12 h-12"
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-mobile"
                  className="absolute inset-0 bg-white rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={cn("w-5 h-5 relative z-10 transition-transform duration-300", isActive ? "text-black -translate-y-1" : "text-zinc-600")} />
              <span className={cn("text-[9px] font-bold uppercase tracking-wider absolute bottom-0.5 transition-opacity duration-300", isActive ? "opacity-100 text-black font-extrabold" : "opacity-0")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Hardware Biometric Security Gate Modal */}
      <BiometricAuthModal
        isOpen={isBiometricModalOpen}
        actionTitle="Institutional Passkey & Biometric Enrollment"
        actionDescription="Secure hardware authentication using Web Authentication API (WebAuthn / FIDO2) with biometric sensor or hardware security key."
        onSuccess={(result) => {
          setIsBiometricModalOpen(false);
        }}
        onCancel={() => setIsBiometricModalOpen(false)}
      />
    </div>
  );
}
