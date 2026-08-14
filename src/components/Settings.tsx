import React, { useState } from 'react';
import { InvestorSettings } from './settings/InvestorSettings';
import { CompanySettings } from './settings/CompanySettings';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function Settings({ userRole, onRoleChange, setActiveTab }: { userRole: 'admin' | 'investor' | 'company', onRoleChange: (role: 'admin' | 'investor' | 'company') => void, setActiveTab: (tab: string) => void }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 relative pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
          <p className="text-zinc-400 mt-1">Manage your account, compliance, and preferences.</p>
        </div>
      </div>

      {userRole === 'company' ? <CompanySettings setActiveTab={setActiveTab} /> : <InvestorSettings setActiveTab={setActiveTab} />}
    </div>
  );
}
