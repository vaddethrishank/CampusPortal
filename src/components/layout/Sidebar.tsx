import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck2, 
  Award, 
  CalendarDays, 
  Sparkles, 
  Bell, 
  UserCircle, 
  Settings, 
  BadgeCheck,
  ChevronRight,
  ShieldAlert,
  Users2
} from 'lucide-react';
import { NavigationTab, RegistrationState } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  registrationState: RegistrationState;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  registrationState,
  mobileOpen,
  setMobileOpen
}) => {

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'registration', 
      label: 'Semester Registration', 
      icon: FileCheck2, 
      badge: registrationState.isCompleted ? 'Completed' : 'Step ' + registrationState.currentStep + '/4',
      badgeColor: registrationState.isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800 border border-sky-200'
    },
    { id: 'clubs', label: 'Clubs & Societies', icon: Users2, badge: 'Active', badgeColor: 'bg-blue-600 text-white font-bold shadow-2xs' },
    { id: 'grades', label: 'Grades & CGPA', icon: Award },
    { id: 'timetable', label: 'Weekly Timetable', icon: CalendarDays },
    { id: 'events', label: 'Campus Events', icon: Sparkles, badge: 'Live', badgeColor: 'bg-sky-100 text-sky-900 border border-sky-200' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Student Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-16 left-0 z-40
        w-64 h-[calc(100vh-4rem)] bg-[#F5F5F7] lg:bg-transparent border-r border-black/[0.05] lg:border-none
        flex flex-col justify-between p-4 overflow-y-auto
        transition-transform duration-200 ease-in-out
        ${mobileOpen ? 'translate-x-0 bg-white' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Nav Items */}
        <div className="space-y-6">
          
          <div>
            <p className="px-3 text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-2">
              Main Menu
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => handleSelectTab(item.id)}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm
                      transition-all duration-150 group text-left cursor-pointer
                      ${isActive 
                        ? 'bg-[#0071E3] text-white shadow-xs font-semibold' 
                        : 'text-[#1D1D1F] hover:bg-black/[0.04]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-105 ${isActive ? 'text-white' : 'text-[#86868B] group-hover:text-[#1D1D1F]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-black/[0.05] text-[#1D1D1F]'
                      }`}>
                        {item.badge}
                      </span>
                    ) : (
                      isActive && <ChevronRight className="w-4 h-4 opacity-75" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Registration Status Callout Card */}
          <div className="p-4 bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.04]">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="w-4 h-4 text-[#0071E3]" />
              <span className="text-xs font-semibold text-[#1D1D1F]">Sem 6 Registration</span>
            </div>
            
            <p className="text-[11px] text-[#86868B] mb-2.5 leading-relaxed">
              {registrationState.isCompleted 
                ? 'Semester registration completed successfully!'
                : `Currently at Step ${registrationState.currentStep} of 4.`
              }
            </p>

            <div className="w-full bg-black/[0.05] h-1.5 rounded-full overflow-hidden mb-3">
              <div 
                className="bg-[#0071E3] h-full transition-all duration-500 rounded-full"
                style={{ width: `${registrationState.isCompleted ? 100 : (registrationState.currentStep / 4) * 100}%` }}
              />
            </div>

            <button
              type="button"
              id="sidebar-quick-register-btn"
              onClick={() => handleSelectTab('registration')}
              className="w-full py-2 px-3 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {registrationState.isCompleted ? 'View Registration' : 'Continue Registration'}
            </button>
          </div>

        </div>

        {/* System Support / Academic Year footer */}
        <div className="pt-4 border-t border-black/[0.05] text-xs text-[#86868B] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[#86868B] font-medium">Academic Year</span>
            <span className="font-semibold text-[#1D1D1F]">2025 - 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#86868B] font-medium">Session</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Even Sem
            </span>
          </div>
          <div className="pt-2 text-[10px] text-[#86868B] text-center">
            Apex Institute ERP v4.2.0 • Presentation Demo
          </div>
        </div>

      </aside>
    </>
  );
};
