import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { availableRoommatePool } from '../../data/mockData';
import { 
  RegistrationState, 
  StudentProfile, 
  RoommateRequest,
  DocumentItem 
} from '../../types';
import { 
  Check, 
  FileText, 
  Upload, 
  Search, 
  UserPlus, 
  UserCheck, 
  CheckCircle2, 
  Lock, 
  AlertTriangle, 
  Eye, 
  Trash2, 
  Sparkles, 
  Download, 
  Building2, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  FileCheck,
  CreditCard,
  Clock
} from 'lucide-react';
// Helper to render monogram badge
const renderMonogram = (name: string, initials?: string, colorClass?: string) => {
  const displayInitials = initials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const bgClass = colorClass || 'bg-black/[0.05] text-[#1D1D1F]';
  return (
    <div className={`w-10 h-10 rounded-2xl ${bgClass} font-semibold text-xs flex items-center justify-center shrink-0 uppercase tracking-wider`}>
      {displayInitials}
    </div>
  );
};

interface SemesterRegistrationModuleProps {
  student: StudentProfile;
  registrationState: RegistrationState;
  setRegistrationState: React.Dispatch<React.SetStateAction<RegistrationState>>;
}

// Target Deadline: August 8th, 11:59 PM
const REGISTRATION_DEADLINE = new Date('2026-08-08T23:59:59');

function RegistrationCountdownTimer({ deadline }: { deadline: Date }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(deadline));
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  function calculateTimeLeft(target: Date) {
    const difference = +target - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  }

  if (timeLeft.expired) {
    return (
      <div className="mt-5 p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
        <Clock className="w-4 h-4 text-rose-600 shrink-0" />
        <span>Semester Registration Cutoff Deadline Has Passed</span>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-black/[0.02] border border-black/[0.05] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-[#0071E3]/10 text-[#0071E3] rounded-xl relative shrink-0">
          <Clock className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#0071E3] rounded-full animate-ping" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider">
              Registration Closing Countdown
            </span>
            <span className="px-2.5 py-0.5 text-[9px] font-semibold bg-amber-500/10 text-amber-700 rounded-full">
              Live Deadline Ticker
            </span>
          </div>
          <p className="text-[11px] text-[#86868B] mt-0.5">Deadline: August 8, 2026 at 11:59 PM • Fee clearance & room lock window</p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-center">
        <div className="flex flex-col items-center bg-white border border-black/[0.06] shadow-2xs px-3 py-1.5 rounded-xl min-w-[48px]">
          <span className="text-base font-semibold font-mono text-[#1D1D1F] leading-tight">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[9px] uppercase font-medium text-[#86868B]">Days</span>
        </div>
        <span className="text-xs font-bold text-[#86868B] -mt-2">:</span>
        <div className="flex flex-col items-center bg-white border border-black/[0.06] shadow-2xs px-3 py-1.5 rounded-xl min-w-[48px]">
          <span className="text-base font-semibold font-mono text-[#1D1D1F] leading-tight">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[9px] uppercase font-medium text-[#86868B]">Hours</span>
        </div>
        <span className="text-xs font-bold text-[#86868B] -mt-2">:</span>
        <div className="flex flex-col items-center bg-white border border-black/[0.06] shadow-2xs px-3 py-1.5 rounded-xl min-w-[48px]">
          <span className="text-base font-semibold font-mono text-[#1D1D1F] leading-tight">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[9px] uppercase font-medium text-[#86868B]">Mins</span>
        </div>
        <span className="text-xs font-bold text-[#86868B] -mt-2">:</span>
        <div className="flex flex-col items-center bg-[#0071E3] text-white shadow-2xs px-3 py-1.5 rounded-xl min-w-[48px]">
          <span className="text-base font-semibold font-mono leading-tight">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[9px] uppercase font-medium text-white/80">Secs</span>
        </div>
      </div>
    </div>
  );
}

export const SemesterRegistrationModule: React.FC<SemesterRegistrationModuleProps> = ({
  student,
  registrationState,
  setRegistrationState
}) => {
  // Step 1 State: Hostel Clearance Upload
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [dragOverStep1, setDragOverStep1] = useState(false);

  // Step 2 State: Roommate Search
  const [roommateSearch, setRoommateSearch] = useState('');
  const [mutualSubmitted, setMutualSubmitted] = useState(false);
  const [hostelFeeUploading, setHostelFeeUploading] = useState(false);

  // Step 3 State: Document preview modal
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  // Step 4 Submission State
  const [submittingRegistration, setSubmittingRegistration] = useState(false);

  // Helper for step progression
  const currentStep = registrationState.currentStep;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setRegistrationState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setRegistrationState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    }
  };

  // Step 1: Upload Old Hostel Dues Receipt
  const handleHostelReceiptUpload = (fileName: string) => {
    setUploadingReceipt(true);
    setTimeout(() => {
      setUploadingReceipt(false);
      setRegistrationState(prev => ({
        ...prev,
        oldHostel: {
          ...prev.oldHostel,
          status: 'Verification Pending',
          receiptFileName: fileName,
          uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        }
      }));
    }, 1200);
  };

  // Step 2: Add/Remove Roommates
  const handleAddRoommate = (friend: RoommateRequest) => {
    if (registrationState.newHostel.roommates.some(r => r.scholarId === friend.scholarId)) return;
    setRegistrationState(prev => ({
      ...prev,
      newHostel: {
        ...prev.newHostel,
        roommates: [...prev.newHostel.roommates, friend]
      }
    }));
  };

  const handleRemoveRoommate = (scholarId: string) => {
    setRegistrationState(prev => ({
      ...prev,
      newHostel: {
        ...prev.newHostel,
        roommates: prev.newHostel.roommates.filter(r => r.scholarId !== scholarId)
      }
    }));
  };

  const handleSubmitMutualRequest = () => {
    setMutualSubmitted(true);
  };

  // Step 2: Upload Hostel Fee Receipt
  const handleHostelFeeUpload = (fileName: string) => {
    setHostelFeeUploading(true);
    setTimeout(() => {
      setHostelFeeUploading(false);
      setRegistrationState(prev => ({
        ...prev,
        newHostel: {
          ...prev.newHostel,
          hostelFeeReceipt: fileName,
          hostelFeeStatus: 'Uploaded'
        }
      }));
    }, 1000);
  };

  // Step 3: File Upload per Document Card
  const handleDocFileUpload = (docId: string, fileName: string) => {
    setRegistrationState(prev => ({
      ...prev,
      documents: prev.documents.map(doc => {
        if (doc.id === docId) {
          return {
            ...doc,
            status: 'Pending',
            fileName: fileName,
            fileSize: '1.5 MB',
            uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          };
        }
        return doc;
      })
    }));
  };

  // Step 4: Final Submission
  const handleFinalSubmit = () => {
    setSubmittingRegistration(true);
    setTimeout(() => {
      setSubmittingRegistration(false);
      const regNum = `REG/2026/CSE/${Math.floor(1000 + Math.random() * 9000)}`;
      setRegistrationState(prev => ({
        ...prev,
        isCompleted: true,
        registrationNumber: regNum,
        submissionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      }));

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  // Calculate docs status count
  const uploadedDocsCount = registrationState.documents.filter(d => d.fileName).length;
  const totalDocsCount = registrationState.documents.length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Title */}
      <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 text-[11px] font-semibold bg-[#0071E3]/10 text-[#0071E3] rounded-full uppercase tracking-wider">
                Even Semester 2026
              </span>
              <span className="text-xs text-[#86868B] font-mono">CSE • Scholar ID: {student.scholarId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
              Semester Registration Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#86868B] mt-1">
              Complete hostel dues clearance, mutual roommate preference group, fee receipts, and document verification.
            </p>
          </div>

          {registrationState.isCompleted && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-emerald-900">Registration Complete</p>
                <p className="text-[11px] font-mono text-emerald-700">Ref: {registrationState.registrationNumber}</p>
              </div>
            </div>
          )}
        </div>

        {/* Real-time Countdown Timer */}
        <RegistrationCountdownTimer deadline={REGISTRATION_DEADLINE} />

        {/* Stepper Progress Bar */}
        <div className="mt-8 pt-6 border-t border-black/[0.05]">
          <div className="grid grid-cols-4 gap-2">
            {[
              { step: 1, title: 'Old Hostel Clearance', icon: Building2 },
              { step: 2, title: 'Mutual Roommates', icon: Users },
              { step: 3, title: 'Document Verification', icon: FileText },
              { step: 4, title: 'Final Review & Submit', icon: ShieldCheck }
            ].map((s) => {
              const Icon = s.icon;
              const isDone = registrationState.isCompleted || s.step < currentStep;
              const isCurrent = s.step === currentStep;

              return (
                <button
                  key={s.step}
                  type="button"
                  id={`stepper-btn-step-${s.step}`}
                  onClick={() => {
                    if (s.step <= currentStep || registrationState.isCompleted) {
                      setRegistrationState(prev => ({ ...prev, currentStep: s.step }));
                    }
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isDone 
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : isCurrent
                      ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-xs font-medium'
                      : 'bg-black/[0.02] border-black/[0.03] text-[#86868B] hover:bg-black/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                      isCurrent ? 'text-white/80' : isDone ? 'text-emerald-700' : 'text-[#86868B]'
                    }`}>
                      Step {s.step}
                    </span>
                    {isDone ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-[#86868B]'}`} />
                    )}
                  </div>
                  <p className="text-xs font-semibold truncate leading-snug">{s.title}</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ================= STEP 1: OLD HOSTEL CLEARANCE ================= */}
      {currentStep === 1 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900">Step 1: Old Hostel Dues Clearance</h2>
              <p className="text-xs text-slate-500 mt-0.5">Verify previous hostel mess and electricity dues clearance before proceeding.</p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200/60">
              Block B Clearance
            </span>
          </div>

          {/* Dues Status Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Hostel Block</span>
              <p className="text-lg font-bold text-slate-900">Block B (Single Sharing)</p>
              <p className="text-xs text-slate-500 mt-1">Previous Room: B-304</p>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">Pending Due</span>
              <p className="text-2xl font-bold font-serif text-amber-900">₹3,500</p>
              <p className="text-xs text-amber-700 mt-1">Mess & Electricity Dues</p>
            </div>

            <div className={`p-4 rounded-2xl border ${
              registrationState.oldHostel.status === 'Verification Pending' || registrationState.oldHostel.status === 'Cleared'
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <span className="text-xs font-semibold uppercase tracking-wider block mb-1 text-slate-500">Clearance Status</span>
              <div className="flex items-center gap-2">
                <p className={`text-lg font-bold ${
                  registrationState.oldHostel.status === 'Verification Pending' || registrationState.oldHostel.status === 'Cleared'
                    ? 'text-emerald-800'
                    : 'text-red-700'
                }`}>
                  {registrationState.oldHostel.status}
                </p>
                {registrationState.oldHostel.status === 'Verification Pending' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {registrationState.oldHostel.status === 'Pending' ? 'Requires Payment Receipt PDF' : 'Receipt uploaded and under administrative check'}
              </p>
            </div>

          </div>

          {/* Upload Receipt Area */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Upload Mess & Electricity Payment Receipt PDF
            </label>

            {registrationState.oldHostel.receiptFileName ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-950">{registrationState.oldHostel.receiptFileName}</p>
                    <p className="text-[11px] text-emerald-700">Uploaded on {registrationState.oldHostel.uploadDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-200 text-emerald-900 text-xs font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Verification Pending
                  </span>
                  <button
                    type="button"
                    onClick={() => handleHostelReceiptUpload('Hostel_Dues_Receipt_Updated.pdf')}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Replace
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onDragOver={(e) => { e.preventDefault(); setDragOverStep1(true); }}
                onDragLeave={() => setDragOverStep1(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverStep1(false);
                  handleHostelReceiptUpload(e.dataTransfer.files[0]?.name || 'Hostel_Dues_Payment.pdf');
                }}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragOverStep1 ? 'border-blue-600 bg-blue-50/80' : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
                }`}
              >
                {uploadingReceipt ? (
                  <div className="space-y-2 py-4">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-semibold text-blue-700">Uploading and validating receipt...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Drag and drop your Payment Receipt PDF here, or <label className="text-blue-600 hover:underline cursor-pointer">browse files<input type="file" accept=".pdf" className="hidden" onChange={(e) => handleHostelReceiptUpload(e.target.files?.[0]?.name || 'Hostel_Dues_Receipt.pdf')} /></label>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Supports PDF format up to 5MB</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 1 Navigation */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="button"
              id="step-1-next-btn"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Proceed to New Hostel Registration</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ================= STEP 2: MUTUAL ROOMMATES & PREFERENCE GROUP ================= */}
      {currentStep === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-8 animate-in fade-in duration-200">
          
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 p-6 text-white shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded-full uppercase tracking-wider">
                    Session 2026–27 | Hostel Eligible: H8
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  Welcome back, {student.name}! 👋
                </h2>
                <p className="text-xs sm:text-sm text-blue-200/90 mt-1 font-mono">
                  Scholar ID: <span className="text-white font-bold">{student.scholarId}</span> • {student.department} • 2nd Year UG
                </p>
              </div>
            </div>
          </div>

          {/* 4 Status KPI Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">PREFERENCE WINDOW</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-emerald-700">OPEN</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Accepting mutual groups</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">CURRENT GROUP</span>
              <p className="text-sm font-bold text-slate-900">2 / 3 Members Confirmed</p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '66%' }} />
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">REQUESTS RECEIVED</span>
              <p className="text-sm font-bold text-amber-700">1 Pending Request</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Respond before deadline</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">SUBMISSION STATUS</span>
              <p className="text-sm font-bold text-blue-700">Pending Members</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Awaiting Varshit's confirmation</p>
            </div>
          </div>

          {/* My Preference Group Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">My Preference Group (GRP-2026-104)</h3>
                  <p className="text-xs text-slate-500">Form a 3-member group for mutual hostel allotment in Block H8.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">
                  Target: 3 Seater (H8)
                </span>
                <button
                  type="button"
                  onClick={() => alert('Group preferences saved for admin allocation.')}
                  className="px-3 py-1 bg-slate-900 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  Save Group
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Group Slot Confirmations</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Slot 1: Leader (Thrishank) */}
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 relative">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    {renderMonogram("Thrishank", "TH", "bg-blue-600 text-white")}
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Accepted
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Thrishank (Leader)</h4>
                    <p className="text-xs text-slate-600 font-mono mt-0.5">Scholar ID: 2511096</p>
                    <p className="text-[11px] text-slate-500 mt-1">Computer Science • 2nd Year</p>
                  </div>
                </div>

                {/* Slot 2: Rishi */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    {renderMonogram("Rishi", "RI", "bg-purple-600 text-white")}
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Accepted
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Rishi</h4>
                    <p className="text-xs text-slate-600 font-mono mt-0.5">Scholar ID: 2511042</p>
                    <p className="text-[11px] text-slate-500 mt-1">Computer Science • 2nd Year</p>
                  </div>
                </div>

                {/* Slot 3: Varshit */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    {renderMonogram("Varshit", "VA", "bg-emerald-600 text-white")}
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Varshit</h4>
                    <p className="text-xs text-slate-600 font-mono mt-0.5">Scholar ID: 2512089</p>
                    <p className="text-[11px] text-slate-500 mt-1">Electronics & Comm • 2nd Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Roommates by 7-digit Scholar ID */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Find & Invite Roommates by Scholar ID</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter 7-digit Scholar ID (e.g. <strong>2312096</strong> where '23' represents year of joining) or student name.
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                id="roommate-search-input"
                value={roommateSearch}
                onChange={(e) => setRoommateSearch(e.target.value)}
                placeholder="Search by 7-digit Scholar ID (e.g. 2312096) or student name..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>

            {/* Search pool dropdown results */}
            {roommateSearch.trim() && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-md divide-y divide-slate-100 max-h-52 overflow-y-auto">
                {availableRoommatePool
                  .filter(p => p.name.toLowerCase().includes(roommateSearch.toLowerCase()) || p.scholarId.includes(roommateSearch))
                  .map((friend) => (
                    <div key={friend.scholarId} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        {renderMonogram(friend.name, friend.initials, friend.badgeColor)}
                        <div>
                          <p className="text-xs font-bold text-slate-900">{friend.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">Scholar ID: {friend.scholarId} • {friend.department}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleAddRoommate(friend);
                          setRoommateSearch('');
                        }}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <UserPlus className="w-3.5 h-3.5" /> Send Invite
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Incoming Request Section */}
          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Incoming Mutual Roommate Invitation</h3>
              </div>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">1 Pending</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {renderMonogram("Karan Verma", "KV", "bg-indigo-600 text-white")}
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Karan Verma</h4>
                  <p className="text-[11px] text-slate-500 font-mono">Scholar ID: 2312096 • Computer Science</p>
                  <p className="text-[10px] text-amber-700 mt-0.5">Wants to invite you to Group GRP-2026-88</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Accepted invitation from Karan Verma (2312096)')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Accept Invite
                </button>
                <button
                  type="button"
                  onClick={() => alert('Declined invitation')}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>

          {/* Hostel Fee Receipt Upload */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Upload Hostel Fee Receipt PDF (₹48,000 / Sem)
            </label>

            {registrationState.newHostel.hostelFeeReceipt ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-950">{registrationState.newHostel.hostelFeeReceipt}</p>
                    <p className="text-[11px] text-emerald-700">Verified Hostel Receipt Upload</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-200 text-emerald-900 text-xs font-bold rounded-full">
                  Uploaded
                </span>
              </div>
            ) : (
              <div 
                onClick={() => handleHostelFeeUpload('Hostel_Fee_Receipt_Sem4.pdf')}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/40 transition-all"
              >
                {hostelFeeUploading ? (
                  <div className="space-y-2 py-2">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-blue-700 font-semibold">Uploading Hostel Fee Receipt...</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-semibold text-slate-700">Click to upload Hostel Fee Receipt PDF (e.g. Hostel_Fee_Receipt_Sem4.pdf)</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 2 Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button"
              id="step-2-next-btn"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Proceed to Document Verification</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ================= STEP 3: FINAL DOCUMENTATION ================= */}
      {currentStep === 3 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900">Step 3: Document Verification Center</h2>
              <p className="text-xs text-slate-500 mt-0.5">Upload required academic and identity documents. Drag & drop or replace files easily.</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 block">{uploadedDocsCount} / {totalDocsCount} Uploaded</span>
              <span className="text-[10px] text-slate-400">Mandatory Verification</span>
            </div>
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {registrationState.documents.map((doc) => (
              <div 
                key={doc.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{doc.description}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                    doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : doc.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                {doc.fileName ? (
                  <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 truncate max-w-[200px]">{doc.fileName}</p>
                      <p className="text-[10px] text-slate-400">{doc.fileSize} • Uploaded {doc.uploadDate}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg text-xs"
                        title="Preview Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <label className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-semibold cursor-pointer">
                        Replace
                        <input 
                          type="file" 
                          accept=".pdf,.png,.jpg" 
                          className="hidden" 
                          onChange={(e) => handleDocFileUpload(doc.id, e.target.files?.[0]?.name || `${doc.title}_Updated.pdf`)} 
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center block cursor-pointer bg-white hover:bg-blue-50/50 transition-all">
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs font-semibold text-blue-600">Upload {doc.title} PDF</span>
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg" 
                      className="hidden" 
                      onChange={(e) => handleDocFileUpload(doc.id, e.target.files?.[0]?.name || `${doc.title}.pdf`)} 
                    />
                  </label>
                )}
              </div>
            ))}
          </div>

          {/* Step 3 Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button"
              id="step-3-next-btn"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Proceed to Final Review</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ================= STEP 4: FINAL REVIEW & SUBMISSION ================= */}
      {currentStep === 4 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900">Step 4: Final Review & Submission Checklist</h2>
              <p className="text-xs text-slate-500 mt-0.5">Review all submitted clearances and documents before final submission.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
              Final Stage
            </span>
          </div>

          {/* Verification Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Registration Readiness Checklist</h3>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
              
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Old Hostel Dues Clearance</p>
                    <p className="text-[11px] text-slate-500">Block B Payment Receipt Uploaded & Verified</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Ready</span>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Mutual Roommate Preference Group</p>
                    <p className="text-[11px] text-slate-500">Group GRP-2026-104 (Block H8 Allotment Target)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Confirmed</span>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Roommate Mutual Preference</p>
                    <p className="text-[11px] text-slate-500">
                      {registrationState.newHostel.roommates.length > 0 
                        ? `${registrationState.newHostel.roommates.length} roommate request(s) submitted` 
                        : 'Single Sharing - No roommate required'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Ready</span>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Document Verification Center</p>
                    <p className="text-[11px] text-slate-500">{uploadedDocsCount} of {totalDocsCount} Documents Uploaded & Checked</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Ready</span>
              </div>

            </div>
          </div>

          {/* Success Banner if Completed */}
          {registrationState.isCompleted ? (
            <div className="p-6 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white rounded-2xl shadow-xl space-y-4 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto ring-4 ring-white/30">
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold">Semester Registration Complete!</h3>
                <p className="text-xs text-emerald-100 mt-1">
                  Your registration for Even Semester 2026 has been successfully verified and registered.
                </p>
              </div>

              <div className="p-3 bg-black/20 rounded-xl inline-block text-xs font-mono">
                Official Reg No: <strong className="text-yellow-300 text-sm">{registrationState.registrationNumber}</strong>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => alert(`Downloading Registration Acknowledgement PDF for ${registrationState.registrationNumber}`)}
                  className="px-6 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-md transition-transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>Download Registration Acknowledgement PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-blue-50/80 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Ready to Submit?</h4>
                <p className="text-xs text-slate-600">Click below to generate your official Even Semester Registration slip.</p>
              </div>

              <button
                type="button"
                id="final-submit-registration-btn"
                onClick={handleFinalSubmit}
                disabled={submittingRegistration}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submittingRegistration ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Submit Semester Registration</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Navigation Back */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Documents
            </button>
          </div>

        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">{previewDoc.title}</h3>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-xs text-slate-400 hover:text-slate-800"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-8 bg-slate-100 rounded-xl text-center space-y-3">
              <FileText className="w-12 h-12 text-blue-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-800">{previewDoc.fileName}</p>
              <p className="text-[11px] text-slate-500">Official Document Preview Window Simulation</p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
