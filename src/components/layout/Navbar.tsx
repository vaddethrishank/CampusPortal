import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  GraduationCap, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronDown,
  ShieldCheck,
  Building2,
  BookOpen
} from 'lucide-react';
import { StudentProfile, NavigationTab, NotificationItem } from '../../types';

interface NavbarProps {
  student: StudentProfile;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  notifications: NotificationItem[];
  toggleMobileMenu: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  setActiveTab,
  notifications,
  toggleMobileMenu,
  onLogout
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-black/[0.05] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-[#1D1D1F] hover:bg-black/[0.05] lg:hidden transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#0071E3] flex items-center justify-center text-white shadow-xs group-hover:scale-[1.03] transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base text-[#1D1D1F] tracking-tight leading-none">Campus Portal</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-black/[0.05] text-[#1D1D1F] rounded-full uppercase tracking-wider">NIT</span>
                </div>
                <p className="text-[11px] text-[#86868B] font-normal tracking-wide mt-0.5">Enterprise Student ERP</p>
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="navbar-search-input"
                placeholder="Search courses, notices, timetable..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-black/[0.04] border border-transparent rounded-full text-[#1D1D1F] placeholder-[#86868B] focus:bg-white focus:border-[#0071E3]/30 focus:ring-2 focus:ring-[#0071E3]/15 transition-all outline-none"
              />
            </div>
          </div>

          {/* Right: Info Chips & Profile Menu */}
          <div className="flex items-center gap-3">
            
            {/* Quick Academic Chips (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 mr-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-black/[0.04] rounded-full text-xs font-medium text-[#1D1D1F]">
                <Building2 className="w-3.5 h-3.5 text-[#0071E3]" />
                <span className="max-w-[140px] truncate">{student.department.split(' ')[0]} Engg</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0071E3]/10 rounded-full text-xs font-semibold text-[#0071E3]">
                <BookOpen className="w-3.5 h-3.5 text-[#0071E3]" />
                <span>Sem {student.semester}</span>
              </div>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                id="navbar-notifications-btn"
                onClick={() => setShowNotifPopover(!showNotifPopover)}
                className="relative p-2 rounded-full text-[#1D1D1F] hover:bg-black/[0.05] transition-colors focus:outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0071E3] rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifPopover && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/[0.05] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2.5 border-b border-black/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#1D1D1F]">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#0071E3] text-white rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('notifications');
                        setShowNotifPopover(false);
                      }}
                      className="text-xs font-medium text-[#0071E3] hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-black/[0.03]">
                    {notifications.slice(0, 4).map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          setActiveTab('notifications');
                          setShowNotifPopover(false);
                        }}
                        className={`p-3.5 text-left hover:bg-black/[0.02] transition-colors cursor-pointer ${
                          !notif.isRead ? 'bg-[#0071E3]/[0.03]' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-[#1D1D1F] line-clamp-1">{notif.title}</p>
                          <span className="text-[10px] text-[#86868B] whitespace-nowrap">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#86868B] line-clamp-2 mt-0.5">{notif.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 border-t border-black/[0.05] text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('notifications');
                        setShowNotifPopover(false);
                      }}
                      className="w-full text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] py-1"
                    >
                      Open Notification Center
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Button */}
            <div className="relative">
              <button
                type="button"
                id="navbar-profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-black/[0.04] transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#0071E3] text-white font-semibold text-xs flex items-center justify-center shrink-0">
                  {student.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-[#1D1D1F] leading-tight">{student.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#86868B] hidden sm:block mr-1" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/[0.05] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-3 border-b border-black/[0.05]">
                    <p className="text-sm font-semibold text-[#1D1D1F]">{student.name}</p>
                    <p className="text-xs font-mono text-[#86868B] mt-0.5">{student.scholarId}</p>
                    <div className="mt-2.5 flex items-center justify-between text-xs text-[#86868B] pt-2 border-t border-black/[0.05]">
                      <span>CGPA: <strong className="text-[#0071E3] font-semibold">{student.cgpa}</strong></span>
                      <span>Attendance: <strong className="text-emerald-600 font-semibold">{student.attendancePercentage}%</strong></span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('profile');
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.03] transition-colors"
                    >
                      <User className="w-4 h-4 text-[#86868B]" />
                      View Student Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('settings');
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.03] transition-colors"
                    >
                      <Settings className="w-4 h-4 text-[#86868B]" />
                      Portal Settings
                    </button>
                  </div>

                  <div className="pt-1 border-t border-black/[0.05]">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
