import React from 'react';
import { 
  StudentProfile, 
  RegistrationState, 
  NavigationTab, 
  SemesterGradeRecord, 
  TimetableEntry, 
  CampusEvent 
} from '../../types';
import { 
  Award, 
  CalendarDays, 
  FileCheck2, 
  Building2, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  AlertCircle, 
  ArrowUpRight, 
  Bell,
  Users,
  Users2,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { quickNotices } from '../../data/mockData';

interface DashboardModuleProps {
  student: StudentProfile;
  registrationState: RegistrationState;
  setActiveTab: (tab: NavigationTab) => void;
  semesterGrades: SemesterGradeRecord[];
  todaySchedule: TimetableEntry[];
  upcomingEvents: CampusEvent[];
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  student,
  registrationState,
  setActiveTab,
  semesterGrades,
  todaySchedule,
  upcomingEvents
}) => {

  // Prepare chart data (Sem 1 to Sem 5)
  const chartData = [...semesterGrades]
    .reverse()
    .map(record => ({
      name: `Sem ${record.semester}`,
      sgpa: record.sgpa,
      cgpa: record.cgpa
    }));

  return (
    <div className="space-y-6">
      
      {/* Welcome Hero Banner - Apple Clean Style */}
      <div className="relative overflow-hidden rounded-[20px] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.04]">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-[#0071E3]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-[11px] font-semibold bg-[#0071E3]/10 text-[#0071E3] rounded-full uppercase tracking-wider">
                Even Semester 2026
              </span>
              <span className="text-xs text-[#86868B]">• Academic Session Active</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
              Welcome back, {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#86868B] mt-1 max-w-xl leading-relaxed">
              {student.program} • {student.department} • Scholar ID: <span className="font-mono text-[#1D1D1F] font-semibold">{student.scholarId}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              id="dash-hero-reg-btn"
              onClick={() => setActiveTab('registration')}
              className="px-5 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-xs sm:text-sm rounded-full shadow-xs transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-white" />
              <span>{registrationState.isCompleted ? 'View Registration' : 'Complete Registration'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards (5 Clean Academic Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Card 1: Current Semester */}
        <div className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all">
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">Semester</span>
            <span className="p-2 bg-black/[0.04] text-[#1D1D1F] rounded-xl"><Building2 className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-2xl font-semibold text-[#1D1D1F]">{student.semester}th</p>
          <p className="text-[11px] text-[#86868B] mt-0.5 truncate">Computer Science</p>
        </div>

        {/* Card 2: Registration Status */}
        <div 
          onClick={() => setActiveTab('registration')}
          className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">Registration</span>
            <span className={`p-2 rounded-xl ${registrationState.isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-[#0071E3]/10 text-[#0071E3]'}`}>
              <FileCheck2 className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-sm font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
            {registrationState.isCompleted ? 'Verified' : `Step ${registrationState.currentStep} / 4`}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#0071E3] mt-1 font-medium">
            <AlertCircle className="w-3 h-3" />
            <span>{registrationState.isCompleted ? 'Complete' : 'Mutual Group'}</span>
          </div>
        </div>

        {/* Card 3: CGPA */}
        <div 
          onClick={() => setActiveTab('grades')}
          className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">CGPA</span>
            <span className="p-2 bg-black/[0.04] text-[#0071E3] rounded-xl"><Award className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-2xl font-semibold text-[#0071E3] group-hover:scale-105 transition-transform">{student.cgpa}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Rank #4 in CSE</p>
        </div>

        {/* Card 4: Today's Classes */}
        <div 
          onClick={() => setActiveTab('timetable')}
          className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">Today's Lectures</span>
            <span className="p-2 bg-black/[0.04] text-[#1D1D1F] rounded-xl"><Clock className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-xl font-semibold text-[#1D1D1F] truncate">{todaySchedule.length} Classes</p>
          <p className="text-[11px] text-[#86868B] mt-0.5 truncate">Next: CS-204 @ 09:00 AM</p>
        </div>

        {/* Card 5: Academic Standing */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#86868B] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">Standing</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><ShieldCheck className="w-3.5 h-3.5" /></span>
          </div>
          <p className="text-lg font-semibold text-[#1D1D1F] truncate">Regular</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5 truncate">Good Standing</p>
        </div>

      </div>

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Quick Action Buttons */}
          <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <h3 className="text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <button
                type="button"
                id="quick-act-register"
                onClick={() => setActiveTab('registration')}
                className="p-4 bg-black/[0.02] hover:bg-black/[0.04] border border-black/[0.03] rounded-2xl text-left transition-all group cursor-pointer"
              >
                <div className="p-2 bg-[#0071E3] text-white rounded-xl w-fit mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#1D1D1F]">Semester Portal</p>
                <p className="text-[10px] text-[#86868B] mt-0.5">Mutual Roommates</p>
              </button>

              <button
                type="button"
                id="quick-act-clubs"
                onClick={() => setActiveTab('clubs')}
                className="p-4 bg-black/[0.02] hover:bg-black/[0.04] border border-black/[0.03] rounded-2xl text-left transition-all group cursor-pointer"
              >
                <div className="p-2 bg-[#0071E3] text-white rounded-xl w-fit mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Users2 className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#1D1D1F]">Clubs & Societies</p>
                <p className="text-[10px] text-[#86868B] mt-0.5">Explore & Join</p>
              </button>

              <button
                type="button"
                id="quick-act-grades"
                onClick={() => setActiveTab('grades')}
                className="p-4 bg-black/[0.02] hover:bg-black/[0.04] border border-black/[0.03] rounded-2xl text-left transition-all group cursor-pointer"
              >
                <div className="p-2 bg-[#0071E3] text-white rounded-xl w-fit mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#1D1D1F]">View Grades</p>
                <p className="text-[10px] text-[#86868B] mt-0.5">Sem 1 - Sem 4</p>
              </button>

              <button
                type="button"
                id="quick-act-timetable"
                onClick={() => setActiveTab('timetable')}
                className="p-4 bg-black/[0.02] hover:bg-black/[0.04] border border-black/[0.03] rounded-2xl text-left transition-all group cursor-pointer"
              >
                <div className="p-2 bg-[#0071E3] text-white rounded-xl w-fit mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#1D1D1F]">View Timetable</p>
                <p className="text-[10px] text-[#86868B] mt-0.5">Weekly Schedule</p>
              </button>

            </div>
          </div>

          {/* Academic Performance Trend Chart */}
          <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-[#1D1D1F]">Academic Performance Trend</h3>
                <p className="text-xs text-[#86868B] mt-0.5">Semester-wise SGPA vs Overall CGPA trajectory</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-[#1D1D1F]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1D1D1F]" /> SGPA
                </span>
                <span className="flex items-center gap-1.5 text-[#0071E3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]" /> Cumulative CGPA
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSgpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1D1D1F" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#1D1D1F" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCgpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0071E3" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#0071E3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#86868B" fontSize={11} tickLine={false} />
                  <YAxis domain={[8, 10]} stroke="#86868B" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                  />
                  <Area type="monotone" dataKey="sgpa" stroke="#1D1D1F" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSgpa)" />
                  <Area type="monotone" dataKey="cgpa" stroke="#0071E3" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCgpa)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Today's Classes Schedule Widget */}
          <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0071E3]" />
                <h3 className="text-base font-semibold text-[#1D1D1F]">Today's Lectures</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('timetable')}
                className="text-xs font-medium text-[#0071E3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full Timetable</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {todaySchedule.map((lecture, idx) => (
                <div 
                  key={lecture.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    idx === 0 ? 'bg-[#0071E3]/[0.03] border-[#0071E3]/20 ring-1 ring-[#0071E3]/10' : 'bg-black/[0.02] border-black/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-center px-3 py-1.5 bg-white rounded-xl border border-black/[0.05] shadow-xs shrink-0">
                      <span className="text-[10px] font-medium text-[#86868B] block uppercase">Time</span>
                      <span className="text-xs font-semibold text-[#1D1D1F] font-mono">{lecture.startTime}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white bg-[#0071E3] px-2 py-0.5 rounded-full font-mono">
                          {lecture.subjectCode}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">{lecture.subjectName}</h4>
                      </div>
                      <p className="text-xs text-[#86868B] mt-1">
                        {lecture.faculty} • <span className="font-semibold text-[#1D1D1F]">{lecture.room}</span>
                      </p>
                    </div>
                  </div>

                  {idx === 0 ? (
                    <span className="px-3 py-1 text-[10px] font-semibold bg-[#0071E3] text-white rounded-full uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-xs">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> Next
                    </span>
                  ) : (
                    <span className="text-xs text-[#86868B] font-medium shrink-0 hidden sm:block">
                      {lecture.type}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Latest Campus Notices Card */}
          <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#0071E3]" />
                <h3 className="text-sm font-semibold text-[#1D1D1F]">Official Notices</h3>
              </div>
              <span className="text-[11px] font-semibold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-0.5 rounded-full">Updated</span>
            </div>

            <div className="space-y-3">
              {quickNotices.map((notice) => (
                <div key={notice.id} className="p-3.5 bg-black/[0.02] hover:bg-black/[0.04] rounded-2xl border border-black/[0.03] transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 text-[9px] font-semibold rounded-full ${
                      notice.badge === 'Important' ? 'bg-red-50 text-red-600' : 'bg-[#0071E3]/10 text-[#0071E3]'
                    }`}>
                      {notice.badge}
                    </span>
                    <span className="text-[10px] text-[#86868B] font-mono">{notice.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#1D1D1F] leading-snug line-clamp-2">{notice.title}</p>
                  <p className="text-[10px] text-[#86868B] mt-1">{notice.department}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Upcoming Event Spotlight */}
          <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0071E3]" />
                <h3 className="text-sm font-semibold text-[#1D1D1F]">Featured Event</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className="text-xs font-medium text-[#0071E3] hover:underline"
              >
                Explore All
              </button>
            </div>

            {upcomingEvents[0] && (
              <div className="group rounded-2xl overflow-hidden border border-black/[0.05]">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={upcomingEvents[0].posterUrl} 
                    alt={upcomingEvents[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-semibold bg-[#0071E3] text-white rounded-full">
                    {upcomingEvents[0].category}
                  </span>
                </div>
                
                <div className="p-3.5 bg-white">
                  <p className="text-xs font-semibold text-[#1D1D1F] line-clamp-1">{upcomingEvents[0].title}</p>
                  <p className="text-[11px] text-[#86868B] mt-0.5">{upcomingEvents[0].date} • {upcomingEvents[0].location}</p>
                  
                  <button
                    type="button"
                    onClick={() => setActiveTab('events')}
                    className="mt-3 w-full py-2 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View & Register</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
