import {
  StudentProfile,
  RegistrationState,
  SemesterGradeRecord,
  TimetableEntry,
  CampusEvent,
  NotificationItem,
  RoommateRequest
} from '../types';

export const initialStudentProfile: StudentProfile = {
  name: "Thrishank",
  scholarId: "2511096",
  department: "Computer Science",
  program: "2nd Year UG",
  semester: 4,
  email: "thrishank.2511096@nit.ac.in",
  phone: "+91 98765 43210",
  hostelStatus: "Hostel Block H8 (Triple Sharing)",
  roomNumber: "H8-204",
  bloodGroup: "O+",
  emergencyContact: {
    name: "Rajesh Kumar",
    relation: "Father",
    phone: "+91 98123 45678"
  },
  cgpa: 8.92,
  attendancePercentage: 94.0,
  academicYear: "2026 - 2027",
  isFinalYear: false,
  clubs: [
    {
      id: "club-1",
      clubName: "Google Developer Student Club (GDSC)",
      category: "Technical",
      role: "Technical Coordinator",
      joinedDate: "Aug 2025",
      upcomingEventsCount: 2,
      badgeColor: "bg-blue-600 text-white"
    },
    {
      id: "club-2",
      clubName: "Robotics & Automation Society",
      category: "Hardware & AI",
      role: "Core Lead",
      joinedDate: "Sep 2025",
      upcomingEventsCount: 1,
      badgeColor: "bg-purple-600 text-white"
    },
    {
      id: "club-3",
      clubName: "Literary & Debating Society",
      category: "Cultural",
      role: "Executive Member",
      joinedDate: "Oct 2025",
      upcomingEventsCount: 1,
      badgeColor: "bg-emerald-600 text-white"
    }
  ]
};

export const initialPreferenceGroupMembers: RoommateRequest[] = [
  {
    scholarId: "2511096",
    name: "Thrishank",
    department: "Computer Science",
    year: "2nd Year",
    status: "Accepted",
    role: "Leader",
    initials: "TH",
    badgeColor: "bg-blue-600 text-white"
  },
  {
    scholarId: "2511042",
    name: "Rishi",
    department: "Computer Science",
    year: "2nd Year",
    status: "Accepted",
    role: "Member",
    initials: "RI",
    badgeColor: "bg-purple-600 text-white"
  },
  {
    scholarId: "2512089",
    name: "Varshit",
    department: "Electronics & Comm",
    year: "2nd Year",
    status: "Pending",
    role: "Member",
    initials: "VA",
    badgeColor: "bg-emerald-600 text-white"
  }
];

export const initialRegistrationState: RegistrationState = {
  currentStep: 2,
  isCompleted: false,
  oldHostel: {
    duesAmount: 0,
    status: 'Cleared',
    receiptFileName: 'Hostel_Dues_Cleared_2026.pdf',
    uploadDate: '01 Aug 2026'
  },
  newHostel: {
    selectedType: 'Triple Sharing',
    isLocked: false,
    roommates: initialPreferenceGroupMembers,
    hostelFeeReceipt: undefined,
    hostelFeeStatus: 'Missing'
  },
  documents: [
    {
      id: 'doc-1',
      title: 'Academic Fee Receipt (Sem 4)',
      description: 'Official institute fee payment acknowledgment PDF for current semester.',
      required: true,
      status: 'Verified',
      fileName: 'Fee_Receipt_Sem4_Verified.pdf',
      fileSize: '1.4 MB',
      uploadDate: '02 Aug 2026'
    },
    {
      id: 'doc-2',
      title: 'Income Certificate',
      description: 'Govt issued competent authority income proof (Latest FY).',
      required: true,
      status: 'Verified',
      fileName: 'Income_Certificate_2026.pdf',
      fileSize: '1.2 MB',
      uploadDate: '15 Jan 2026'
    },
    {
      id: 'doc-3',
      title: 'Identity Proof (Aadhaar Card)',
      description: 'Government photo identification document.',
      required: true,
      status: 'Verified',
      fileName: 'Aadhaar_Card_Verified.pdf',
      fileSize: '2.1 MB',
      uploadDate: '05 Jan 2026'
    },
    {
      id: 'doc-4',
      title: 'Anti-Ragging Undertaking',
      description: 'Duly signed anti-ragging affidavit from student and parent.',
      required: true,
      status: 'Verified',
      fileName: 'Anti_Ragging_Affidavit.pdf',
      fileSize: '950 KB',
      uploadDate: '03 Aug 2026'
    }
  ]
};

export const availableRoommatePool: RoommateRequest[] = [
  {
    scholarId: "2312096",
    name: "Karan Verma",
    department: "Computer Science",
    year: "2nd Year",
    status: "Pending",
    initials: "KV",
    badgeColor: "bg-indigo-600 text-white"
  },
  {
    scholarId: "2511088",
    name: "Aditya Hegde",
    department: "Electrical Engg",
    year: "2nd Year",
    status: "Pending",
    initials: "AH",
    badgeColor: "bg-rose-600 text-white"
  },
  {
    scholarId: "2512012",
    name: "Siddharth Nair",
    department: "Electronics & Comm",
    year: "2nd Year",
    status: "Pending",
    initials: "SN",
    badgeColor: "bg-amber-600 text-white"
  },
  {
    scholarId: "2411034",
    name: "Vikramaditya Roy",
    department: "Computer Science",
    year: "2nd Year",
    status: "Pending",
    initials: "VR",
    badgeColor: "bg-teal-600 text-white"
  }
];

export const semesterGradesData: SemesterGradeRecord[] = [
  {
    semester: 5,
    sgpa: 9.42,
    cgpa: 9.24,
    creditsEarned: 24,
    courses: [
      { code: "CS-501", name: "Design & Analysis of Algorithms", credits: 4, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "CS-502", name: "Database Management Systems", credits: 4, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "CS-503", name: "Computer Networks & Security", credits: 4, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "CS-504", name: "Theory of Computation", credits: 3, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "CS-505P", name: "DBMS Laboratory", credits: 2, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "CS-506P", name: "Networks Laboratory", credits: 2, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "HS-501", name: "Engineering Economics & Management", credits: 3, grade: "A", gradePoint: 8, result: "PASS" },
    ]
  },
  {
    semester: 4,
    sgpa: 9.20,
    cgpa: 9.18,
    creditsEarned: 22,
    courses: [
      { code: "CS-401", name: "Operating Systems Architecture", credits: 4, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "CS-402", name: "Software Engineering & Agile", credits: 4, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "CS-403", name: "Object Oriented Design using Java", credits: 3, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "MA-401", name: "Discrete Mathematics & Graph Theory", credits: 4, grade: "A", gradePoint: 8, result: "PASS" },
      { code: "CS-405P", name: "OS & Shell Scripting Lab", credits: 2, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "CS-406P", name: "Software Design Lab", credits: 2, grade: "A+", gradePoint: 9, result: "PASS" },
    ]
  },
  {
    semester: 3,
    sgpa: 9.15,
    cgpa: 9.17,
    creditsEarned: 24,
    courses: [
      { code: "CS-301", name: "Data Structures & Algorithms", credits: 4, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "CS-302", name: "Digital Logic & Microprocessors", credits: 4, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "CS-303", name: "Computer Organization", credits: 4, grade: "A", gradePoint: 8, result: "PASS" },
      { code: "MA-301", name: "Probability & Statistics for Computing", credits: 4, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "CS-304P", name: "Data Structures Lab", credits: 2, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "CS-305P", name: "Digital Hardware Lab", credits: 2, grade: "A+", gradePoint: 9, result: "PASS" },
    ]
  },
  {
    semester: 2,
    sgpa: 9.10,
    cgpa: 9.18,
    creditsEarned: 22,
    courses: [
      { code: "CS-201", name: "Programming in C++ & Paradigms", credits: 4, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "PH-201", name: "Quantum Physics for Engineers", credits: 4, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "MA-201", name: "Linear Algebra & Differential Equations", credits: 4, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "EE-201", name: "Basic Electrical Engineering", credits: 3, grade: "A", gradePoint: 8, result: "PASS" },
      { code: "CS-202P", name: "C++ Programming Lab", credits: 2, grade: "O", gradePoint: 10, result: "PASS" },
    ]
  },
  {
    semester: 1,
    sgpa: 9.25,
    cgpa: 9.25,
    creditsEarned: 20,
    courses: [
      { code: "CS-101", name: "Introduction to Computer Science", credits: 4, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "MA-101", name: "Calculus & Vector Analysis", credits: 4, grade: "O", gradePoint: 10, result: "PASS" },
      { code: "CH-101", name: "Engineering Chemistry & Materials", credits: 4, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "HS-101", name: "Professional Communication & Ethics", credits: 3, grade: "A+", gradePoint: 9, result: "PASS" },
      { code: "ME-101P", name: "Workshop Practice & CAD", credits: 2, grade: "O", gradePoint: 10, result: "PASS" },
    ]
  }
];

export const weeklyTimetable: TimetableEntry[] = [
  // Monday
  { id: 'tt-1', day: 'Monday', subjectCode: 'CS-601', subjectName: 'Artificial Intelligence & Neural Nets', faculty: 'Dr. K. S. Ramanujam', room: 'LHC-201', startTime: '09:00 AM', endTime: '10:00 AM', color: 'bg-blue-50 border-blue-200 text-blue-800', type: 'Lecture' },
  { id: 'tt-2', day: 'Monday', subjectCode: 'CS-602', subjectName: 'Cloud Computing & Distributed Systems', faculty: 'Prof. Ananya Sen', room: 'LHC-203', startTime: '10:15 AM', endTime: '11:15 AM', color: 'bg-indigo-50 border-indigo-200 text-indigo-800', type: 'Lecture' },
  { id: 'tt-3', day: 'Monday', subjectCode: 'CS-603P', subjectName: 'AI & Machine Learning Lab', faculty: 'Dr. K. S. Ramanujam', room: 'CS-Lab 4', startTime: '02:00 PM', endTime: '04:00 PM', color: 'bg-purple-50 border-purple-200 text-purple-800', type: 'Lab' },

  // Tuesday
  { id: 'tt-4', day: 'Tuesday', subjectCode: 'CS-604', subjectName: 'Compiler Design & Optimization', faculty: 'Dr. Rajeshwar Rao', room: 'LHC-201', startTime: '09:00 AM', endTime: '10:00 AM', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', type: 'Lecture' },
  { id: 'tt-5', day: 'Tuesday', subjectCode: 'CS-605', subjectName: 'High Performance Computing', faculty: 'Prof. S. Chakraborty', room: 'LHC-105', startTime: '11:30 AM', endTime: '12:30 PM', color: 'bg-amber-50 border-amber-200 text-amber-800', type: 'Lecture' },
  { id: 'tt-6', day: 'Tuesday', subjectCode: 'CS-606P', subjectName: 'Compiler Construction Lab', faculty: 'Dr. Rajeshwar Rao', room: 'CS-Lab 2', startTime: '02:00 PM', endTime: '04:00 PM', color: 'bg-teal-50 border-teal-200 text-teal-800', type: 'Lab' },

  // Wednesday
  { id: 'tt-7', day: 'Wednesday', subjectCode: 'CS-601', subjectName: 'Artificial Intelligence & Neural Nets', faculty: 'Dr. K. S. Ramanujam', room: 'LHC-201', startTime: '09:00 AM', endTime: '10:00 AM', color: 'bg-blue-50 border-blue-200 text-blue-800', type: 'Lecture' },
  { id: 'tt-8', day: 'Wednesday', subjectCode: 'HS-601', subjectName: 'Entrepreneurship & IPR Law', faculty: 'Dr. Meenakshi Sundaram', room: 'LHC-101', startTime: '10:15 AM', endTime: '11:15 AM', color: 'bg-rose-50 border-rose-200 text-rose-800', type: 'Lecture' },
  { id: 'tt-9', day: 'Wednesday', subjectCode: 'CS-602', subjectName: 'Cloud Computing & Distributed Systems', faculty: 'Prof. Ananya Sen', room: 'LHC-203', startTime: '11:30 AM', endTime: '12:30 PM', color: 'bg-indigo-50 border-indigo-200 text-indigo-800', type: 'Lecture' },

  // Thursday
  { id: 'tt-10', day: 'Thursday', subjectCode: 'CS-604', subjectName: 'Compiler Design & Optimization', faculty: 'Dr. Rajeshwar Rao', room: 'LHC-201', startTime: '09:00 AM', endTime: '10:00 AM', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', type: 'Lecture' },
  { id: 'tt-11', day: 'Thursday', subjectCode: 'CS-607', subjectName: 'Major Capstone Project Review', faculty: 'Department Committee', room: 'CS-Seminar Hall', startTime: '02:00 PM', endTime: '05:00 PM', color: 'bg-violet-50 border-violet-200 text-violet-800', type: 'Tutorial' },

  // Friday
  { id: 'tt-12', day: 'Friday', subjectCode: 'CS-605', subjectName: 'High Performance Computing', faculty: 'Prof. S. Chakraborty', room: 'LHC-105', startTime: '10:15 AM', endTime: '11:15 AM', color: 'bg-amber-50 border-amber-200 text-amber-800', type: 'Lecture' },
  { id: 'tt-13', day: 'Friday', subjectCode: 'CS-608P', subjectName: 'Cloud Infrastructure Lab', faculty: 'Prof. Ananya Sen', room: 'Cloud Research Lab', startTime: '02:00 PM', endTime: '04:00 PM', color: 'bg-cyan-50 border-cyan-200 text-cyan-800', type: 'Lab' },

  // Saturday
  { id: 'tt-14', day: 'Saturday', subjectCode: 'HS-601', subjectName: 'Entrepreneurship & IPR Law', faculty: 'Dr. Meenakshi Sundaram', room: 'LHC-101', startTime: '09:30 AM', endTime: '11:00 AM', color: 'bg-rose-50 border-rose-200 text-rose-800', type: 'Lecture' }
];

export const initialCampusEvents: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'HACK-CAMPUS 2026: 36-Hour National Hackathon',
    category: 'Coding Club',
    posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    date: '18 Feb - 20 Feb 2026',
    time: '09:00 AM onwards',
    location: 'APJ Abdul Kalam Innovation Hub',
    organizer: 'Developers & Coding Society',
    status: 'Upcoming',
    description: 'Annual flagship hackathon focusing on AI for Social Good, Smart City Solutions, and Decentralized Systems. Prizes worth ₹2.5 Lakhs.',
    isRegistered: false,
    attendeesCount: 420,
    featured: true
  },
  {
    id: 'ev-2',
    title: 'RoboQuest: Autonomous Line Follower & Drone Race',
    category: 'Robotics',
    posterUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    date: '25 Feb 2026',
    time: '10:00 AM - 05:00 PM',
    location: 'Indoor Sports Complex Arena',
    organizer: 'Robotics & Mechatronics Club',
    status: 'Upcoming',
    description: 'Test your autonomous robotics build against national university teams in obstacles and high-speed aerial drone navigation.',
    isRegistered: true,
    attendeesCount: 280,
    featured: true
  },
  {
    id: 'ev-3',
    title: 'Generative AI & LLM Fine-Tuning Workshop',
    category: 'AI Club',
    posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    date: '12 Feb 2026',
    time: '02:00 PM - 05:30 PM',
    location: 'Main Auditorium (LHC)',
    organizer: 'AI & Data Science Research Group',
    status: 'Live',
    description: 'Hands-on masterclass on quantizing and fine-tuning open-weights models like Gemma 2 & Llama for enterprise deployment.',
    isRegistered: true,
    attendeesCount: 510,
    featured: true
  },
  {
    id: 'ev-4',
    title: 'SPRING SYMPHONY: Annual Inter-College Cultural Fest',
    category: 'Cultural',
    posterUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    date: '05 Mar - 07 Mar 2026',
    time: '05:00 PM - 10:00 PM',
    location: 'Open Air Theatre (OAT)',
    organizer: 'Student Cultural Council',
    status: 'Upcoming',
    description: 'Battle of bands, classical dance showcases, fashion shows, and celebrity night live performance.',
    isRegistered: false,
    attendeesCount: 1850,
    featured: true
  },
  {
    id: 'ev-5',
    title: 'Inter-Departmental Cricket Championship',
    category: 'Sports',
    posterUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
    date: '01 Feb - 08 Feb 2026',
    time: '03:00 PM Daily',
    location: 'Central University Sports Ground',
    organizer: 'Department of Physical Education',
    status: 'Live',
    description: 'Watch CSE XI take on ECE XI in the Quarter-Finals match under floodlights.',
    isRegistered: false,
    attendeesCount: 640
  },
  {
    id: 'ev-6',
    title: 'Venture Pitch 2026: Student Startup Incubator',
    category: 'Entrepreneurship',
    posterUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    date: '15 Mar 2026',
    time: '10:00 AM - 04:00 PM',
    location: 'E-Cell Boardroom',
    organizer: 'Incubation & Entrepreneurship Cell',
    status: 'Upcoming',
    description: 'Pitch your tech startup prototype to venture capitalists and angel investors for seed funding up to ₹10 Lakhs.',
    isRegistered: false,
    attendeesCount: 190
  },
  {
    id: 'ev-7',
    title: 'NSS Campus Cleanliness & Blood Donation Drive',
    category: 'NSS',
    posterUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop',
    date: '10 Jan 2026',
    time: '09:00 AM - 02:00 PM',
    location: 'Health Center Courtyard',
    organizer: 'NSS Student Wing',
    status: 'Completed',
    description: 'Annual voluntary blood donation drive in association with Red Cross Society.',
    isRegistered: true,
    attendeesCount: 310
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Even Semester Registration Deadline Approaching',
    message: 'Please complete your Step 1 (Hostel Clearance) and Step 3 (Fee Receipts Upload) before 15th Feb 2026 to avoid late fees.',
    timestamp: '10 mins ago',
    category: 'Registration',
    isRead: false,
    priority: 'High'
  },
  {
    id: 'notif-2',
    title: 'Roommate Mutual Request Portal Activated',
    message: 'Students in 4th Year Single Sharing hostel can now send mutual roommate preference requests in Step 2.',
    timestamp: '2 hours ago',
    category: 'Hostel',
    isRead: false,
    priority: 'Normal'
  },
  {
    id: 'notif-3',
    title: 'Semester 5 Official Grade Sheet Verified',
    message: 'Your SGPA 9.42 for Semester 5 has been finalized and updated on the Academic Portal.',
    timestamp: '1 day ago',
    category: 'Exam',
    isRead: true,
    priority: 'Normal'
  },
  {
    id: 'notif-4',
    title: 'Old Hostel Dues Payment Pending',
    message: 'Mess dues of ₹3,500 pending for Block B. Please upload payment receipt PDF in Step 1.',
    timestamp: '2 days ago',
    category: 'Fee',
    isRead: false,
    priority: 'High'
  },
  {
    id: 'notif-5',
    title: 'Selected for HACK-CAMPUS 2026 Shortlist',
    message: 'Congratulations! Your team submission for the Hackathon has passed initial screening.',
    timestamp: '3 days ago',
    category: 'Club',
    isRead: true,
    priority: 'Normal'
  }
];

export const quickNotices = [
  {
    id: 'notice-1',
    title: 'End-Semester Examination Date Sheet Schedule (May 2026)',
    date: '02 Feb 2026',
    department: 'Controller of Examinations',
    badge: 'Important'
  },
  {
    id: 'notice-2',
    title: 'Fee Waiver Scheme for SC/ST/EWS Category Students',
    date: '30 Jan 2026',
    department: 'Dean Academic Affairs',
    badge: 'Notice'
  },
  {
    id: 'notice-3',
    title: 'Library Hours Extended to 24x7 during Registration & Mid-Terms',
    date: '28 Jan 2026',
    department: 'Central Library',
    badge: 'General'
  }
];
