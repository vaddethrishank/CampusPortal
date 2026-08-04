import React, { useState } from 'react';
import { SemesterGradeRecord, StudentProfile } from '../../types';
import { 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  BarChart3, 
  BookOpen, 
  Sparkles, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

interface GradesModuleProps {
  student: StudentProfile;
  semesterGrades: SemesterGradeRecord[];
}

export const GradesModule: React.FC<GradesModuleProps> = ({ student, semesterGrades }) => {
  const [selectedSem, setSelectedSem] = useState<number>(5);

  const activeRecord = semesterGrades.find(r => r.semester === selectedSem) || semesterGrades[0];

  const chartData = [...semesterGrades].reverse().map(r => ({
    semester: `Sem ${r.semester}`,
    sgpa: r.sgpa,
    cgpa: r.cgpa
  }));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 text-[11px] font-semibold bg-[#0071E3]/10 text-[#0071E3] rounded-full uppercase tracking-wider">
              Academic Transcripts
            </span>
            <span className="text-xs text-[#86868B] font-mono">B.Tech Honors CSE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
            Grades & Academic Standings
          </h1>
          <p className="text-xs sm:text-sm text-[#86868B] mt-1">
            Official verified credit breakdown, grade points, and semester performance charts.
          </p>
        </div>

        {/* Semester Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-[#86868B] uppercase">Semester:</label>
          <div className="relative">
            <select
              id="grades-sem-selector"
              value={selectedSem}
              onChange={(e) => setSelectedSem(Number(e.target.value))}
              className="appearance-none bg-black/[0.02] border border-black/[0.06] text-[#1D1D1F] font-semibold text-xs sm:text-sm py-2 pl-4 pr-10 rounded-full focus:bg-white focus:border-[#0071E3] outline-none cursor-pointer"
            >
              {semesterGrades.map((s) => (
                <option key={s.semester} value={s.semester}>
                  Semester {s.semester} (SGPA: {s.sgpa})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#86868B] absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block mb-1">Sem {selectedSem} SGPA</span>
          <p className="text-2xl sm:text-3xl font-semibold text-[#0071E3]">{activeRecord.sgpa}</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Excellent Grade
          </p>
        </div>

        <div className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block mb-1">Cumulative CGPA</span>
          <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F]">{student.cgpa}</p>
          <p className="text-[10px] text-[#86868B] mt-1">Overall Transcript</p>
        </div>

        <div className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block mb-1">Credits Earned</span>
          <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F]">{activeRecord.creditsEarned}</p>
          <p className="text-[10px] text-[#86868B] mt-1">Sem {selectedSem} Total</p>
        </div>

        <div className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block mb-1">Backlogs</span>
          <p className="text-2xl sm:text-3xl font-semibold text-emerald-600">0</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">Clean Record</p>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white p-5 rounded-[20px] border border-[#0071E3]/20 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] font-semibold text-[#0071E3] uppercase tracking-wider block mb-1">Academic Standing</span>
          <p className="text-sm font-semibold text-[#1D1D1F] leading-tight">DEAN'S LIST</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 bg-[#0071E3]/10 text-[#0071E3] text-[10px] font-semibold rounded-full">
            Top Honors
          </span>
        </div>

      </div>

      {/* Branch Rank Card */}
      <div className="p-6 bg-white rounded-[20px] text-[#1D1D1F] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-[#0071E3]/10 rounded-2xl text-[#0071E3]">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#0071E3]/10 text-[#0071E3] font-semibold text-[10px] rounded-full uppercase tracking-wider">
                Official Merit Standing
              </span>
            </div>
            <h3 className="text-xl font-semibold text-[#1D1D1F] mt-1">
              Branch Rank: <span className="text-[#0071E3]">#4 in CSE Department</span>
            </h3>
            <p className="text-xs text-[#86868B] mt-0.5">
              Ranked among the Top 2% across 180 Computer Science & Engineering Undergraduates.
            </p>
          </div>
        </div>

        <div className="px-5 py-3 bg-black/[0.02] border border-black/[0.04] rounded-2xl text-center shrink-0">
          <span className="text-[10px] text-[#86868B] uppercase font-semibold block">Percentile</span>
          <span className="text-xl font-semibold text-[#1D1D1F]">98.2th Percentile</span>
        </div>
      </div>

      {/* Performance Graph Section */}
      <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#1D1D1F]">Semester-wise SGPA Progression</h3>
            <p className="text-xs text-[#86868B]">Academic performance history across completed terms</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#86868B]">
            <BarChart3 className="w-4 h-4 text-[#0071E3]" />
            <span>Grade Points / 10.0 Scale</span>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="semester" stroke="#86868B" fontSize={11} tickLine={false} />
              <YAxis domain={[8, 10]} stroke="#86868B" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
              />
              <Bar dataKey="sgpa" fill="#0071E3" radius={[8, 8, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Grade Table */}
      <div className="bg-white rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-5 border-b border-black/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0071E3]" />
            <h3 className="text-base font-semibold text-[#1D1D1F]">
              Semester {selectedSem} Course Breakdown
            </h3>
          </div>
          <span className="text-xs text-[#86868B] font-mono">
            Total Credits: {activeRecord.creditsEarned}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/[0.02] text-[#86868B] font-semibold uppercase tracking-wider border-b border-black/[0.04]">
              <tr>
                <th className="py-3.5 px-5">Course Code</th>
                <th className="py-3.5 px-5">Course Name</th>
                <th className="py-3.5 px-5 text-center">Credits</th>
                <th className="py-3.5 px-5 text-center">Grade</th>
                <th className="py-3.5 px-5 text-center">Grade Point</th>
                <th className="py-3.5 px-5 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.03] text-[#1D1D1F] font-medium">
              {activeRecord.courses.map((course) => (
                <tr key={course.code} className="hover:bg-black/[0.01] transition-colors">
                  <td className="py-3.5 px-5 font-mono font-semibold text-[#0071E3]">{course.code}</td>
                  <td className="py-3.5 px-5 font-semibold text-[#1D1D1F]">{course.name}</td>
                  <td className="py-3.5 px-5 text-center">{course.credits}</td>
                  <td className="py-3.5 px-5 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full font-semibold ${
                      course.grade === 'O' ? 'bg-emerald-50 text-emerald-700' : 'bg-[#0071E3]/10 text-[#0071E3]'
                    }`}>
                      {course.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-center font-semibold font-mono">{course.gradePoint} / 10</td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {course.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
