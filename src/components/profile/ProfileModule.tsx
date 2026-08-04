import React from 'react';
import { StudentProfile } from '../../types';
import { 
  User, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Building2, 
  Heart, 
  PhoneCall, 
  Award, 
  GraduationCap, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface ProfileModuleProps {
  student: StudentProfile;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ student }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Student ID Card / Header Profile Hero */}
      <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#0071E3] text-white font-semibold text-2xl flex items-center justify-center shadow-md shrink-0">
            {student.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-0.5 bg-[#0071E3]/10 text-[#0071E3] font-semibold text-xs rounded-full uppercase tracking-wider">
                Official Student Identity
              </span>
              <span className="px-3 py-0.5 bg-black/[0.03] text-[#86868B] text-xs font-mono rounded-full">
                Scholar ID: {student.scholarId}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight flex items-center justify-center sm:justify-start gap-2">
              {student.name}
              <ShieldCheck className="w-5 h-5 text-[#0071E3]" />
            </h1>

            <p className="text-xs sm:text-sm text-[#86868B]">
              {student.program} • {student.department}
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#86868B] font-mono">
              <span>CGPA: <strong className="text-[#0071E3] font-sans text-sm">{student.cgpa}</strong></span>
              <span>•</span>
              <span>Semester {student.semester}</span>
              <span>•</span>
              <span>Academic Year {student.academicYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal & Academic Info */}
        <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-black/[0.04]">
            <GraduationCap className="w-5 h-5 text-[#0071E3]" />
            <h3 className="font-semibold text-[#1D1D1F] text-base">Academic Credentials</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-black/[0.03]">
              <span className="text-[#86868B] font-medium">Scholar ID</span>
              <span className="font-mono font-semibold text-[#1D1D1F]">{student.scholarId}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/[0.03]">
              <span className="text-[#86868B] font-medium">Department</span>
              <span className="font-semibold text-[#1D1D1F]">{student.department}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/[0.03]">
              <span className="text-[#86868B] font-medium">Degree Program</span>
              <span className="font-semibold text-[#1D1D1F]">{student.program}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/[0.03]">
              <span className="text-[#86868B] font-medium">Current Term</span>
              <span className="font-semibold text-[#0071E3]">Semester {student.semester} (Final Year)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#86868B] font-medium">Academic Standing</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">EXCELLENT</span>
            </div>
          </div>
        </div>

        {/* Contact & Emergency Info */}
        <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-black/[0.04]">
            <PhoneCall className="w-5 h-5 text-[#0071E3]" />
            <h3 className="font-semibold text-[#1D1D1F] text-base">Contact & Emergency Contacts</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-black/[0.03]">
              <span className="text-[#86868B] font-medium">Institute Email</span>
              <span className="font-mono text-[#1D1D1F]">{student.email}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/[0.03]">
              <span className="text-[#86868B] font-medium">Phone Number</span>
              <span className="font-mono text-[#1D1D1F]">{student.phone}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/[0.03]">
              <span className="text-[#86868B] font-medium">Hostel Residence</span>
              <span className="font-semibold text-[#1D1D1F]">{student.hostelStatus} ({student.roomNumber})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/[0.03]">
              <span className="text-[#86868B] font-medium">Blood Group</span>
              <span className="font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">{student.bloodGroup}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#86868B] font-medium">Emergency Contact</span>
              <span className="font-semibold text-[#1D1D1F]">{student.emergencyContact.name} ({student.emergencyContact.relation}) • {student.emergencyContact.phone}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
