import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Lock, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Smartphone
} from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h1 className="text-2xl font-semibold text-[#1D1D1F]">Portal Settings</h1>
        <p className="text-xs text-[#86868B] mt-0.5">Manage notification triggers, portal security preferences, and accessibility defaults.</p>
      </div>

      <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
        
        {/* Notifications Section */}
        <div className="space-y-3 pb-6 border-b border-black/[0.04]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0071E3]" />
            <h3 className="font-semibold text-[#1D1D1F] text-sm">Notification Triggers</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 bg-black/[0.02] border border-black/[0.04] rounded-2xl cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-[#1D1D1F]">Email Alerts for Registration Updates</p>
                <p className="text-[11px] text-[#86868B]">Receive receipt verification confirmations via email.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-black/[0.02] border border-black/[0.04] rounded-2xl cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-[#1D1D1F]">SMS Notifications for Exam Dates</p>
                <p className="text-[11px] text-[#86868B]">Instant SMS alerts for date sheet releases.</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-3 pb-6 border-b border-black/[0.04]">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#0071E3]" />
            <h3 className="font-semibold text-[#1D1D1F] text-sm">Security & Password</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[#1D1D1F] font-medium mb-1">Current Password</label>
              <input
                type="password"
                value="••••••••••••"
                readOnly
                className="w-full px-4 py-2 bg-black/[0.02] border border-black/[0.04] rounded-full font-mono text-[#86868B]"
              />
            </div>
            <div>
              <label className="block text-[#1D1D1F] font-medium mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 bg-black/[0.02] border border-black/[0.04] rounded-full font-mono text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved!
            </span>
          ) : (
            <span className="text-[11px] text-[#86868B]">Settings synchronized with ERP Server</span>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0071E3]/90 text-white font-semibold text-xs rounded-full shadow-xs transition-all cursor-pointer"
          >
            Save Changes
          </button>
        </div>

      </div>

    </div>
  );
};
