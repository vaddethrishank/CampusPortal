export type NavigationTab = 
  | 'dashboard'
  | 'registration'
  | 'clubs'
  | 'grades'
  | 'timetable'
  | 'events'
  | 'notifications'
  | 'profile'
  | 'settings';

export interface ClubMembership {
  id: string;
  clubName: string;
  category: string;
  role: 'Core Lead' | 'Technical Coordinator' | 'Executive Member' | 'General Member';
  joinedDate: string;
  upcomingEventsCount: number;
  badgeColor: string;
}

export interface StudentProfile {
  name: string;
  scholarId: string; // 7 digits, e.g. 2511096 or 2312096
  department: string;
  program: string;
  semester: number;
  email: string;
  phone: string;
  hostelStatus: string;
  roomNumber: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  cgpa: number;
  attendancePercentage: number;
  academicYear: string;
  isFinalYear: boolean;
  clubs?: ClubMembership[];
}

export type HostelType = 'Single Sharing' | 'Double Sharing' | 'Triple Sharing';

export type ClearanceStatus = 'Pending' | 'Verification Pending' | 'Cleared';

export interface OldHostelClearance {
  duesAmount: number;
  status: ClearanceStatus;
  receiptFileName?: string;
  uploadDate?: string;
}

export interface RoommateRequest {
  scholarId: string; // 7 digits
  name: string;
  department: string;
  year: string;
  status: 'Accepted' | 'Pending' | 'Declined';
  role?: 'Leader' | 'Member';
  initials?: string;
  badgeColor?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  status: 'Verified' | 'Pending' | 'Missing';
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
}

export interface RegistrationState {
  currentStep: number;
  isCompleted: boolean;
  registrationNumber?: string;
  submissionDate?: string;
  oldHostel: OldHostelClearance;
  newHostel: {
    selectedType: HostelType;
    isLocked: boolean;
    roommates: RoommateRequest[];
    hostelFeeReceipt?: string;
    hostelFeeStatus: 'Missing' | 'Uploaded' | 'Verified';
  };
  documents: DocumentItem[];
}

export interface CourseGrade {
  code: string;
  name: string;
  credits: number;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F';
  gradePoint: number;
  result: 'PASS' | 'FAIL';
}

export interface SemesterGradeRecord {
  semester: number;
  sgpa: number;
  cgpa: number;
  creditsEarned: number;
  courses: CourseGrade[];
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  subjectCode: string;
  subjectName: string;
  faculty: string;
  room: string;
  startTime: string;
  endTime: string;
  color: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export type EventCategory = 
  | 'All' 
  | 'Technical Clubs' 
  | 'Coding Club' 
  | 'Robotics' 
  | 'AI Club' 
  | 'Dance' 
  | 'Music' 
  | 'Sports' 
  | 'Cultural' 
  | 'Photography' 
  | 'Entrepreneurship' 
  | 'NSS' 
  | 'NCC' 
  | 'College Events';

export interface CampusEvent {
  id: string;
  title: string;
  category: EventCategory;
  posterUrl: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  description: string;
  isRegistered: boolean;
  attendeesCount: number;
  featured?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'Registration' | 'Fee' | 'Hostel' | 'Exam' | 'Club' | 'General';
  isRead: boolean;
  priority: 'High' | 'Normal' | 'Low';
}
