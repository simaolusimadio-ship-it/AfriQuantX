import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, ShieldCheck, CheckCircle2, AlertCircle, ScanFace, Lock, RefreshCw, X } from 'lucide-react';
import { BiometricService, BiometricVerificationResult } from '../services/biometricService';

interface BiometricAuthModalProps {
  isOpen: boolean;
  actionTitle?: string;
  actionDescription?: string;
  onSuccess: (result: BiometricVerificationResult) => void;
  onCancel: () => void;
}

export function BiometricAuthModal({
  isOpen,
  actionTitle = 'Authenticate Action',
  actionDescription = 'Verify your biometric identity using Face ID / Touch ID or Passkey to proceed.',
  onSuccess,
  onCancel
}: BiometricAuthModalProps) {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultData, setResultData] = useState<BiometricVerificationResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage(null);
      setResultData(null);
      // Auto-start scan for seamless biometrics
      handleScan();
    }
  }, [isOpen]);

  const handleScan = async () => {
    setStatus('scanning');
    setErrorMessage(null);

    try {
      const res = await BiometricService.authenticate(actionTitle);
      if (res.success) {
        setStatus('success');
        setResultData(res);
        setTimeout(() => {
          onSuccess(res);
        }, 1000);
      } else {
        setStatus('failed');
        setErrorMessage(res.message);
      }
    } catch (err: any) {
      setStatus('failed');
      setErrorMessage(err.message || 'Biometric hardware challenge failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-sm bg-neutral-950 border border-white/10 rounded-3xl p-6 shadow-2xl text-white text-center overflow-hidden"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3">
            <Lock className="w-3 h-3 text-emerald-400" />
            Hardware Enclave Auth
          </div>
          <h3 className="text-xl font-extrabold tracking-tight text-white uppercase">{actionTitle}</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">{actionDescription}</p>
        </div>

        {/* Biometric Sensor Scanner Visual */}
        <div className="my-8 flex justify-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Animated Ring */}
            {status === 'scanning' && (
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 border-t-emerald-400 animate-spin" />
            )}
            {status === 'success' && (
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400 bg-emerald-500/10 animate-pulse" />
            )}
            {status === 'failed' && (
              <div className="absolute inset-0 rounded-full border-2 border-rose-500 bg-rose-500/10" />
            )}

            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              status === 'scanning' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
              status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400 scale-105' :
              status === 'failed' ? 'bg-rose-500/20 text-rose-400 border border-rose-500' :
              'bg-white/5 text-zinc-400 border border-white/10'
            }`}>
              {status === 'success' ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              ) : status === 'failed' ? (
                <AlertCircle className="w-10 h-10 text-rose-400" />
              ) : (
                <ScanFace className="w-10 h-10 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="min-h-[40px] flex items-center justify-center">
          {status === 'scanning' && (
            <p className="text-xs font-mono text-emerald-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Scanning Face ID / Touch ID...
            </p>
          )}
          {status === 'success' && (
            <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
              Identity Confirmed ({resultData?.methodUsed || 'Biometric'})
            </div>
          )}
          {status === 'failed' && (
            <p className="text-xs text-rose-400 font-mono">{errorMessage || 'Verification Failed'}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2">
          {status === 'failed' && (
            <button
              onClick={handleScan}
              className="w-full py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors"
            >
              Retry Biometric Scan
            </button>
          )}
          <button
            onClick={onCancel}
            className="w-full py-2.5 text-zinc-400 hover:text-white font-medium text-xs transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
