import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, Building, FileText, BarChart3, Target, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface CompanyOnboardingFlowProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function CompanyOnboardingFlow({ onComplete, onCancel }: CompanyOnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [data, setData] = useState({
    companyName: '',
    email: '',
    password: '',
    registrationNumber: '',
    industry: 'fintech',
    headquarters: '',
    annualRevenue: 'under_1m',
    ebitda: '',
    fundraisingTarget: '',
    valuation: '',
    useOfFunds: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('onboardingProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.type === 'company') {
          setStep(parsed.step || 1);
          if (parsed.data) setData(parsed.data);
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('onboardingProgress', JSON.stringify({ type: 'company', step, data }));
  }, [step, data]);

  const updateData = (updates: Partial<typeof data>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!data.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!data.email.trim()) newErrors.email = 'Valid corporate email is required';
      if (!data.password || data.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!data.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
      if (!data.headquarters.trim()) newErrors.headquarters = 'Headquarters location is required';
    } else if (step === 2) {
      if (!data.ebitda.trim()) newErrors.ebitda = 'EBITDA Margin is required';
    } else if (step === 3) {
      if (!data.fundraisingTarget.trim()) newErrors.fundraisingTarget = 'Target amount is required';
      if (!data.valuation.trim()) newErrors.valuation = 'Valuation is required';
      if (!data.useOfFunds.trim()) newErrors.useOfFunds = 'Use of funds is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep()) return;
    
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        // Sign up with Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.companyName,
              role: 'company'
            }
          }
        });

        if (authError) throw authError;

        // Note: The profiles table is automatically populated via the Supabase trigger.
        // We could insert the company-specific data into the `companies` table here.
        if (authData.user) {
          const { error: companyError } = await supabase
            .from('companies')
            .insert([{
              profile_id: authData.user.id,
              name: data.companyName,
              registration_number: data.registrationNumber,
              jurisdiction: data.headquarters,
              sector: data.industry,
              mission: data.useOfFunds,
            }]);
            
          if (companyError) {
             console.error("Failed to insert company profile:", companyError);
          }
        }
        
        localStorage.setItem('userRole', 'company');
        localStorage.removeItem('onboardingProgress');
        onComplete();
      } catch (err: any) {
        setSubmitError(err.message || 'Failed to create company account');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
    else {
      localStorage.removeItem('onboardingProgress');
      onCancel();
    }
  };

  const steps = [
    { id: 1, title: 'Business Profile', icon: Building },
    { id: 2, title: 'Financial Data', icon: BarChart3 },
    { id: 3, title: 'Fundraising', icon: Target },
    { id: 4, title: 'Compliance', icon: FileText },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((s) => (
            <div key={s.id} className={`flex flex-col items-center gap-2 ${step >= s.id ? 'text-[#D4AF37]' : 'text-zinc-600'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= s.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-zinc-700 bg-zinc-800/50'}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium hidden sm:block">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
          <motion.div 
            className="h-full bg-[#D4AF37]"
            initial={{ width: `${((step - 1) / 4) * 100}%` }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
        transition={{ duration: 0.4 }}
        className="bg-transparent border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group"
      >
        <form onSubmit={handleNext} className="space-y-6 relative z-10">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 tracking-wide uppercase">Business Profile</h2>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Company Name</label>
                <input type="text" required value={data.companyName} onChange={e => { updateData({ companyName: e.target.value }); setErrors(prev => ({ ...prev, companyName: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.companyName ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all placeholder:text-zinc-600`} placeholder="Acme Corp Africa" />
                {errors.companyName && <p className="text-[#FF3B3B] text-xs mt-1">{errors.companyName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Corporate Email</label>
                <input type="text" required value={data.email} onChange={e => { updateData({ email: e.target.value }); setErrors(prev => ({ ...prev, email: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.email ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all placeholder:text-zinc-600`} placeholder="admin@acme.com" />
                {errors.email && <p className="text-[#FF3B3B] text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Password</label>
                <input type="password" required value={data.password} onChange={e => { updateData({ password: e.target.value }); setErrors(prev => ({ ...prev, password: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.password ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all placeholder:text-zinc-600`} placeholder="••••••••" />
                {errors.password && <p className="text-[#FF3B3B] text-xs mt-1">{errors.password}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Registration Number</label>
                  <input type="text" required value={data.registrationNumber} onChange={e => { updateData({ registrationNumber: e.target.value }); setErrors(prev => ({ ...prev, registrationNumber: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.registrationNumber ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all placeholder:text-zinc-600`} placeholder="RC-123456" />
                  {errors.registrationNumber && <p className="text-[#FF3B3B] text-xs mt-1">{errors.registrationNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Headquarters</label>
                  <input type="text" required value={data.headquarters} onChange={e => { updateData({ headquarters: e.target.value }); setErrors(prev => ({ ...prev, headquarters: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.headquarters ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all placeholder:text-zinc-600`} placeholder="Lagos, Nigeria" />
                  {errors.headquarters && <p className="text-[#FF3B3B] text-xs mt-1">{errors.headquarters}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 tracking-wide uppercase">Financial Data</h2>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Annual Revenue (USD)</label>
                <select value={data.annualRevenue} onChange={e => updateData({ annualRevenue: e.target.value })} className="w-full bg-[#0A0F1C]/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all appearance-none">
                  <option value="under_1m">Under $1M</option>
                  <option value="1m_5m">$1M - $5M</option>
                  <option value="5m_20m">$5M - $20M</option>
                  <option value="over_20m">Over $20M</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">EBITDA Margin (%)</label>
                <input type="number" required value={data.ebitda} onChange={e => { updateData({ ebitda: e.target.value }); setErrors(prev => ({ ...prev, ebitda: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.ebitda ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all placeholder:text-zinc-600`} placeholder="15" />
                {errors.ebitda && <p className="text-[#FF3B3B] text-xs mt-1">{errors.ebitda}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 tracking-wide uppercase">Fundraising Objectives</h2>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Target Amount (USD)</label>
                <input type="number" required value={data.fundraisingTarget} onChange={e => { updateData({ fundraisingTarget: e.target.value }); setErrors(prev => ({ ...prev, fundraisingTarget: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.fundraisingTarget ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all placeholder:text-zinc-600`} placeholder="5000000" />
                {errors.fundraisingTarget && <p className="text-[#FF3B3B] text-xs mt-1">{errors.fundraisingTarget}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Pre-Money Valuation (USD)</label>
                <input type="number" required value={data.valuation} onChange={e => { updateData({ valuation: e.target.value }); setErrors(prev => ({ ...prev, valuation: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.valuation ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all placeholder:text-zinc-600`} placeholder="20000000" />
                {errors.valuation && <p className="text-[#FF3B3B] text-xs mt-1">{errors.valuation}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Use of Funds</label>
                <textarea required value={data.useOfFunds} onChange={e => { updateData({ useOfFunds: e.target.value }); setErrors(prev => ({ ...prev, useOfFunds: '' })); }} className={`w-full bg-[#0A0F1C]/50 border ${errors.useOfFunds ? 'border-[#FF3B3B]/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white focus:border-[#D4AF37] focus:bg-white/[0.02] outline-none transition-all min-h-[100px] placeholder:text-zinc-600`} placeholder="Expansion into East Africa, R&D..." />
                {errors.useOfFunds && <p className="text-[#FF3B3B] text-xs mt-1">{errors.useOfFunds}</p>}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 tracking-wide uppercase">Compliance & Verification</h2>
              <p className="text-sm text-zinc-400 mb-4">Upload your official incorporation documents and latest tax clearance certificate to complete due diligence.</p>
              
              {submitError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{submitError}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Certificate of Incorporation</label>
                <div className="border-2 border-dashed border-[#0066FF]/30 rounded-xl p-6 text-center hover:border-[#0066FF]/80 hover:bg-[#0066FF]/5 hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-all cursor-pointer group relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#0066FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Upload className="w-6 h-6 text-[#0066FF]/50 mx-auto mb-2 group-hover:text-[#0066FF] transition-colors relative z-10" />
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 relative z-10">Upload PDF</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Tax Clearance Certificate</label>
                <div className="border-2 border-dashed border-[#0066FF]/30 rounded-xl p-6 text-center hover:border-[#0066FF]/80 hover:bg-[#0066FF]/5 hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-all cursor-pointer group relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#0066FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Upload className="w-6 h-6 text-[#0066FF]/50 mx-auto mb-2 group-hover:text-[#0066FF] transition-colors relative z-10" />
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 relative z-10">Upload PDF</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-8">
            <button type="button" onClick={handleBack} disabled={isSubmitting} className="px-6 py-3 text-zinc-400 hover:text-white font-medium transition-colors flex items-center gap-2 uppercase tracking-wider text-sm disabled:opacity-50">
              <ArrowLeft className="w-4 h-4" /> {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <button type="submit" disabled={isSubmitting} className="group relative px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] rounded-xl font-bold uppercase tracking-widest text-sm   hover:scale-[1.02] transition-all flex items-center gap-2 overflow-hidden disabled:opacity-50 disabled:hover:scale-100">
              <span className="relative">
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</span>
                ) : (
                  step === 4 ? 'Complete Onboarding' : 'Continue'
                )}
              </span>
              {!isSubmitting && <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
