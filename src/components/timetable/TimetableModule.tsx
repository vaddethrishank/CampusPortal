import React, { useState } from 'react';
import { TimetableEntry } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Sparkles, 
  ChevronRight, 
  BookOpen,
  Building2
} from 'lucide-react';

interface TimetableModuleProps {
  timetable: TimetableEntry[];
}

export const TimetableModule: React.FC<TimetableModuleProps> = ({ timetable }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
  const [selectedDay, setSelectedDay] = useState<typeof days[number]>('Monday');

  const filteredClasses = timetable.filter(t => t.day === selectedDay);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 text-[11px] font-semibold bg-[#0071E3]/10 text-[#0071E3] rounded-full uppercase tracking-wider">
              Academic Schedule
            </span>
            <span className="text-xs text-[#86868B] font-mono">Even Sem 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
            Weekly Class Timetable
          </h1>
          <p className="text-xs sm:text-sm text-[#86868B] mt-1">
            Interactive weekly schedule with lecture hall numbers, faculty details, and lab sessions.
          </p>
        </div>

        {/* Live Class Highlight Box */}
        <div className="p-3.5 bg-[#0071E3]/[0.03] border border-[#0071E3]/20 rounded-2xl flex items-center gap-3 shrink-0">
          <div className="w-2.5 h-2.5 bg-[#0071E3] rounded-full animate-ping" />
          <div>
            <p className="text-[10px] font-semibold text-[#0071E3] uppercase tracking-wider">Active Lecture Slot</p>
            <p className="text-xs font-semibold text-[#1D1D1F]">CS-601: Artificial Intelligence</p>
            <p className="text-[10px] text-[#86868B]">LHC-201 • Dr. K. S. Ramanujam</p>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs (Monday to Saturday) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          const count = timetable.filter(t => t.day === day).length;

          return (
            <button
              key={day}
              type="button"
              id={`timetable-day-${day.toLowerCase()}`}
              onClick={() => setSelectedDay(day)}
              className={`
                px-5 py-2.5 rounded-full border font-medium text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer
                ${isSelected
                  ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-xs'
                  : 'bg-white text-[#86868B] hover:bg-black/[0.02] border-black/[0.04]'
                }
              `}
            >
              <span>{day}</span>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-semibold ${
                isSelected ? 'bg-white/20 text-white' : 'bg-black/[0.04] text-[#86868B]'
              }`}>
                {count} {count === 1 ? 'class' : 'classes'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timetable Cards List for Selected Day */}
      <div className="space-y-4">
        {filteredClasses.length === 0 ? (
          <div className="p-12 bg-white rounded-[20px] border border-black/[0.04] text-center space-y-2">
            <Calendar className="w-12 h-12 text-[#86868B] mx-auto" />
            <h3 className="text-sm font-semibold text-[#1D1D1F]">No Lectures Scheduled</h3>
            <p className="text-xs text-[#86868B]">Enjoy your study break or capstone research hours on {selectedDay}.</p>
          </div>
        ) : (
          filteredClasses.map((item, index) => (
            <div 
              key={item.id}
              className={`p-5 rounded-[20px] border bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 border-black/[0.04]`}
            >
              <div className="flex items-start sm:items-center gap-4">
                
                {/* Time Badge Column */}
                <div className="px-3.5 py-2.5 bg-black/[0.02] border border-black/[0.04] rounded-2xl text-center shrink-0">
                  <span className="text-[10px] font-semibold text-[#86868B] uppercase block">Time Slot</span>
                  <span className="text-xs font-mono font-semibold text-[#1D1D1F] block mt-0.5">{item.startTime}</span>
                  <span className="text-[10px] font-mono text-[#86868B] block">{item.endTime}</span>
                </div>

                {/* Subject Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold bg-[#0071E3]/10 text-[#0071E3] rounded-full">
                      {item.subjectCode}
                    </span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
                      item.type === 'Lab' ? 'bg-purple-50 text-purple-700' : item.type === 'Tutorial' ? 'bg-amber-50 text-amber-700' : 'bg-black/[0.04] text-[#1D1D1F]'
                    }`}>
                      {item.type}
                    </span>
                    {index === 0 && selectedDay === 'Monday' && (
                      <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-600 text-white rounded-full flex items-center gap-1">
                        LIVE NOW
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-[#1D1D1F] leading-snug">
                    {item.subjectName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#86868B] pt-1">
                    <span className="flex items-center gap-1 text-[#1D1D1F] font-medium">
                      <User className="w-3.5 h-3.5 text-[#0071E3]" />
                      {item.faculty}
                    </span>
                    <span className="flex items-center gap-1 text-[#1D1D1F] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#86868B]" />
                      Hall: {item.room}
                    </span>
                  </div>
                </div>

              </div>

              {/* Lecture Action */}
              <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-black/[0.04]">
                <button
                  type="button"
                  onClick={() => alert(`View course notes & slides for ${item.subjectCode}`)}
                  className="px-4 py-1.5 bg-black/[0.03] hover:bg-[#0071E3]/10 hover:text-[#0071E3] text-[#1D1D1F] font-medium text-xs rounded-full transition-colors"
                >
                  Course Slides
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
