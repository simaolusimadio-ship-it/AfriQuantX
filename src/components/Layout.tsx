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
  ShieldCheck
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

  useEffect(() => {
    // Fetch initial mock notifications
    setNotifications([
      { id: '1', title: 'Welcome to NXG', message: 'Your account is ready.', time: 'Just now', read: false },
      { id: '2', title: 'Market Update', message: 'Equities are up 2.4% today.', time: '2h ago', read: false }
    ]);
    setUnreadCount(2);

    // Subscribe to real-time transactions
    const channel = supabase.channel('realtime-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, payload => {
        const newNotif = {
          id: payload.new.id,
          title: 'New Transaction',
          message: `A new ${payload.new.type} of ${payload.new.amount} was recorded.`,
          time: 'Just now',
          read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
        setUnreadCount(prev => prev + 1);
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'audit_logs' }, payload => {
        const newNotif = {
          id: payload.new.id,
          title: 'System Alert',
          message: payload.new.action,
          time: 'Just now',
          read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
        setUnreadCount(prev => prev + 1);
      })
      .subscribe();

    return () => {
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
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] p-[2px] cursor-pointer hover:scale-105 transition-transform" title="Alex Investor">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] cursor-pointer" title="Wallet Balance: $0">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-black border border-white/10 relative overflow-hidden group cursor-pointer hover:border-[#D4AF37]/40 transition-colors shadow-2xl">
              <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] p-[2px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Alex Investor</p>
                  <p className="text-[10px] text-[#D4AF37] flex items-center gap-1 uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" /> Verified
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 relative z-10">
                <p className="text-[10px] text-zinc-400 mb-1 flex items-center gap-1 uppercase tracking-widest font-bold">
                  <Wallet className="w-3 h-3 text-[#D4AF37]" /> Wallet Balance
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300 shadow-2xl text-xs font-mono group"
              >
                <Fingerprint className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="font-semibold hidden lg:inline">FIDO2 Biometrics</span>
              </button>

              <button 
                onClick={handleNotificationClick}
                className="relative p-2.5 rounded-xl bg-black border border-white/5 text-zinc-500 hover:text-white hover:border-white/20 transition-all duration-300 shadow-2xl"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <span className="text-xs text-zinc-500">{notifications.length} total</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notif => (
                          <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${!notif.read ? 'bg-white/5' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-sm font-medium text-white">{notif.title}</h4>
                              <span className="text-xs text-zinc-500">{notif.time}</span>
                            </div>
                            <p className="text-xs text-zinc-400">{notif.message}</p>
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
              className="p-2 text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
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
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full"></span>
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 md:pb-8 md:p-8 z-10 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
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
