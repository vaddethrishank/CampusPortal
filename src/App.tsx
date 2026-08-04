import React, { useState } from 'react';
import { 
  NavigationTab, 
  StudentProfile, 
  RegistrationState, 
  SemesterGradeRecord, 
  TimetableEntry, 
  CampusEvent, 
  NotificationItem 
} from './types';
import { 
  initialStudentProfile, 
  initialRegistrationState, 
  semesterGradesData, 
  weeklyTimetable, 
  initialCampusEvents, 
  initialNotifications 
} from './data/mockData';
import { LoginPage } from './components/auth/LoginPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardModule } from './components/dashboard/DashboardModule';
import { SemesterRegistrationModule } from './components/registration/SemesterRegistrationModule';
import { ClubsModule } from './components/clubs/ClubsModule';
import { GradesModule } from './components/grades/GradesModule';
import { TimetableModule } from './components/timetable/TimetableModule';
import { EventsModule } from './components/events/EventsModule';
import { NotificationsModule } from './components/notifications/NotificationsModule';
import { ProfileModule } from './components/profile/ProfileModule';
import { SettingsModule } from './components/settings/SettingsModule';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Core Application Mock State
  const [student, setStudent] = useState<StudentProfile>(initialStudentProfile);
  const [registrationState, setRegistrationState] = useState<RegistrationState>(initialRegistrationState);
  const [semesterGrades, setSemesterGrades] = useState<SemesterGradeRecord[]>(semesterGradesData);
  const [timetable, setTimetable] = useState<TimetableEntry[]>(weeklyTimetable);
  const [events, setEvents] = useState<CampusEvent[]>(initialCampusEvents);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans flex flex-col antialiased selection:bg-[#0071E3] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        student={student}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Main Layout Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex gap-6 pt-6 pb-12">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          registrationState={registrationState}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0">
          
          {activeTab === 'dashboard' && (
            <DashboardModule
              student={student}
              registrationState={registrationState}
              setActiveTab={setActiveTab}
              semesterGrades={semesterGrades}
              todaySchedule={timetable.filter(t => t.day === 'Monday')}
              upcomingEvents={events}
            />
          )}

          {activeTab === 'registration' && (
            <SemesterRegistrationModule
              student={student}
              registrationState={registrationState}
              setRegistrationState={setRegistrationState}
            />
          )}

          {activeTab === 'clubs' && (
            <ClubsModule
              student={student}
            />
          )}

          {activeTab === 'grades' && (
            <GradesModule
              student={student}
              semesterGrades={semesterGrades}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableModule
              timetable={timetable}
            />
          )}

          {activeTab === 'events' && (
            <EventsModule
              events={events}
              setEvents={setEvents}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsModule
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileModule
              student={student}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsModule />
          )}

        </main>

      </div>

    </div>
  );
}
