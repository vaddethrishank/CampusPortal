import React, { useState } from 'react';
import { NotificationItem } from '../../types';
import { 
  Bell, 
  CheckCheck, 
  Filter, 
  AlertCircle, 
  FileCheck2, 
  CreditCard, 
  Building2, 
  Award, 
  Sparkles,
  Check
} from 'lucide-react';

interface NotificationsModuleProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export const NotificationsModule: React.FC<NotificationsModuleProps> = ({
  notifications,
  setNotifications
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Registration', 'Fee', 'Hostel', 'Exam', 'Club'];

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const filteredNotifs = notifications.filter(n => filterCategory === 'All' || n.category === filterCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Registration': return <FileCheck2 className="w-4 h-4 text-amber-600" />;
      case 'Fee': return <CreditCard className="w-4 h-4 text-red-600" />;
      case 'Hostel': return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'Exam': return <Award className="w-4 h-4 text-purple-600" />;
      default: return <Sparkles className="w-4 h-4 text-rose-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1D1D1F]">Notification Center</h1>
          <p className="text-xs text-[#86868B] mt-0.5">Stay updated with registration reminders, hostel alerts, and exam schedules.</p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          className="px-4 py-2 bg-black/[0.03] hover:bg-black/[0.06] text-[#1D1D1F] font-medium text-xs rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <CheckCheck className="w-4 h-4 text-[#0071E3]" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === cat ? 'bg-[#0071E3] text-white shadow-xs' : 'bg-white text-[#86868B] border border-black/[0.04] hover:bg-black/[0.02]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleToggleRead(notif.id)}
            className={`p-4.5 rounded-[20px] border transition-all cursor-pointer flex items-start gap-3.5 ${
              !notif.isRead
                ? 'bg-[#0071E3]/[0.03] border-[#0071E3]/20 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
                : 'bg-white border-black/[0.04] opacity-80'
            }`}
          >
            <div className={`p-2.5 rounded-2xl shrink-0 ${
              !notif.isRead ? 'bg-[#0071E3] text-white' : 'bg-black/[0.04] text-[#86868B]'
            }`}>
              {getCategoryIcon(notif.category)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">{notif.title}</h3>
                  <span className={`px-2.5 py-0.5 text-[10px] font-medium rounded-full ${
                    notif.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-black/[0.04] text-[#86868B]'
                  }`}>
                    {notif.category}
                  </span>
                </div>
                <span className="text-[10px] text-[#86868B] font-mono">{notif.timestamp}</span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">{notif.message}</p>
            </div>

            <button
              type="button"
              className="p-1 text-[#86868B] hover:text-[#1D1D1F]"
              title={notif.isRead ? 'Mark as Unread' : 'Mark as Read'}
            >
              <Check className={`w-4 h-4 ${notif.isRead ? 'text-emerald-600' : 'text-[#86868B]'}`} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
