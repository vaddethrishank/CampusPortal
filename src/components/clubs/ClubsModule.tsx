import React, { useState } from 'react';
import { StudentProfile, ClubMembership } from '../../types';
import { 
  Users2, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  UserPlus, 
  Award, 
  ChevronRight, 
  ExternalLink,
  MessageSquare,
  Check
} from 'lucide-react';

interface ClubsModuleProps {
  student: StudentProfile;
}

interface ClubCatalogItem {
  id: string;
  name: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Literature' | 'Social & E-Cell';
  description: string;
  leadName: string;
  leadRole: string;
  membersCount: number;
  meetingTime: string;
  location: string;
  badgeColor: string;
  isEnrolled: boolean;
  myRole?: string;
  upcomingEvent?: string;
  eventDate?: string;
}

export const ClubsModule: React.FC<ClubsModuleProps> = ({ student }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'my-clubs'>('all');
  
  // State for user club memberships
  const [myClubs, setMyClubs] = useState<ClubMembership[]>(student.clubs || [
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
      clubName: "Robotics & Automation Society (RAS)",
      category: "Technical",
      role: "Core Lead",
      joinedDate: "Sep 2025",
      upcomingEventsCount: 1,
      badgeColor: "bg-purple-600 text-white"
    },
    {
      id: "club-3",
      clubName: "Literary & Debating Society",
      category: "Literature",
      role: "Executive Member",
      joinedDate: "Oct 2025",
      upcomingEventsCount: 1,
      badgeColor: "bg-emerald-600 text-white"
    }
  ]);

  const [clubsCatalog, setClubsCatalog] = useState<ClubCatalogItem[]>([
    {
      id: "club-1",
      name: "Google Developer Student Club (GDSC)",
      category: "Technical",
      description: "Focuses on web development, cloud technologies, mobile apps, and machine learning projects.",
      leadName: "Aarav Sharma",
      leadRole: "Lead Coordinator",
      membersCount: 142,
      meetingTime: "Wednesdays at 5:00 PM",
      location: "Lab 3, CS Block",
      badgeColor: "bg-blue-600 text-white",
      isEnrolled: true,
      myRole: "Technical Coordinator",
      upcomingEvent: "Full-Stack Web Dev Hackathon",
      eventDate: "12th Aug 2026"
    },
    {
      id: "club-2",
      name: "Robotics & Automation Society (RAS)",
      category: "Technical",
      description: "Designing autonomous rovers, microcontroller programming, and drone hardware systems.",
      leadName: "Varshit Sai",
      leadRole: "Core Lead",
      membersCount: 98,
      meetingTime: "Fridays at 4:30 PM",
      location: "Robotics Lab, EE Dept",
      badgeColor: "bg-purple-600 text-white",
      isEnrolled: true,
      myRole: "Core Lead",
      upcomingEvent: "Bot Race & Maze Runner 2026",
      eventDate: "15th Aug 2026"
    },
    {
      id: "club-3",
      name: "Literary & Debating Society",
      category: "Literature",
      description: "Fostering parliamentary debates, creative writing, poetry slams, and model UN conferences.",
      leadName: "Priya Nair",
      leadRole: "President",
      membersCount: 85,
      meetingTime: "Thursdays at 5:30 PM",
      location: "Seminar Hall B",
      badgeColor: "bg-emerald-600 text-white",
      isEnrolled: true,
      myRole: "Executive Member",
      upcomingEvent: "Annual Inter-College Parliamentary Debate",
      eventDate: "20th Aug 2026"
    },
    {
      id: "club-4",
      name: "Apex AI & Data Science Guild",
      category: "Technical",
      description: "Hands-on workshops on LLMs, Neural Networks, Computer Vision, and Kaggle competitions.",
      leadName: "Rishi Kumar",
      leadRole: "Founder & Lead",
      membersCount: 110,
      meetingTime: "Tuesdays at 5:00 PM",
      location: "AI Research Center",
      badgeColor: "bg-indigo-600 text-white",
      isEnrolled: false,
      upcomingEvent: "Generative AI & Agent Workshop",
      eventDate: "18th Aug 2026"
    },
    {
      id: "club-5",
      name: "Rhythm & Beats - Music & Dance Club",
      category: "Cultural",
      description: "Promoting instrumental music, classical and contemporary dance ensembles, and annual fests.",
      leadName: "Ananya Roy",
      leadRole: "Cultural Convener",
      membersCount: 165,
      meetingTime: "Mondays & Fridays 6:00 PM",
      location: "Open Air Theatre (OAT)",
      badgeColor: "bg-rose-600 text-white",
      isEnrolled: false,
      upcomingEvent: "Unplugged Acoustic Night",
      eventDate: "22nd Aug 2026"
    },
    {
      id: "club-6",
      name: "Entrepreneurship Cell (E-Cell)",
      category: "Social & E-Cell",
      description: "Nurturing campus startups, pitch competitions, angel investor meets, and incubation support.",
      leadName: "Varun Mehta",
      leadRole: "Head of Operations",
      membersCount: 120,
      meetingTime: "Saturdays at 11:00 AM",
      location: "Incubation Center, Room 102",
      badgeColor: "bg-amber-600 text-white",
      isEnrolled: false,
      upcomingEvent: "Campus Pitch Tank 2026",
      eventDate: "25th Aug 2026"
    },
    {
      id: "club-7",
      name: "Shutterbugs - Photography & Media",
      category: "Cultural",
      description: "Capturing institute memories, photo walks, video editing workshops, and official event coverage.",
      leadName: "Vikramaditya",
      leadRole: "Chief Editor",
      membersCount: 74,
      meetingTime: "Saturdays at 4:00 PM",
      location: "Media Studio",
      badgeColor: "bg-teal-600 text-white",
      isEnrolled: false,
      upcomingEvent: "Monsoon Campus Photowalk",
      eventDate: "14th Aug 2026"
    },
    {
      id: "club-8",
      name: "Apex Sports & Athletics Club",
      category: "Sports",
      description: "Organizing intra-college leagues in Football, Cricket, Badminton, Basketball, and Chess.",
      leadName: "Karan Verma",
      leadRole: "Sports Captain",
      membersCount: 210,
      meetingTime: "Daily 5:30 PM",
      location: "Sports Complex & Ground",
      badgeColor: "bg-orange-600 text-white",
      isEnrolled: false,
      upcomingEvent: "Inter-Hostel Football Cup",
      eventDate: "10th Aug 2026"
    }
  ]);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Literature', 'Social & E-Cell'];

  const handleToggleEnrollment = (clubId: string) => {
    setClubsCatalog(prev => prev.map(c => {
      if (c.id === clubId) {
        const nextState = !c.isEnrolled;
        if (nextState) {
          // Add to myClubs
          const newMembership: ClubMembership = {
            id: c.id,
            clubName: c.name,
            category: c.category,
            role: "General Member",
            joinedDate: "Aug 2026",
            upcomingEventsCount: 1,
            badgeColor: c.badgeColor
          };
          setMyClubs(my => [...my, newMembership]);
        } else {
          // Remove from myClubs
          setMyClubs(my => my.filter(m => m.id !== clubId));
        }
        return {
          ...c,
          isEnrolled: nextState,
          membersCount: nextState ? c.membersCount + 1 : c.membersCount - 1
        };
      }
      return c;
    }));
  };

  const filteredCatalog = clubsCatalog.filter(c => {
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.leadName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || (selectedFilter === 'my-clubs' && c.isEnrolled);
    return matchesCategory && matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner - Apple Style */}
      <div className="relative overflow-hidden rounded-[20px] bg-white p-6 sm:p-8 text-[#1D1D1F] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.04]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-[#0071E3]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 text-[11px] font-semibold bg-[#0071E3]/10 text-[#0071E3] rounded-full uppercase tracking-wider">
                Student Life & Leadership
              </span>
              <span className="text-xs text-[#86868B]">• Session 2026–27</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
              Clubs & Student Societies
            </h1>
            <p className="text-xs sm:text-sm text-[#86868B] max-w-xl leading-relaxed">
              Explore official institute student organizations, track your active memberships, manage leadership roles, and participate in campus activities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-black/[0.02] border border-black/[0.04] px-5 py-3 rounded-2xl text-center">
              <span className="text-2xl font-semibold text-[#0071E3] block">{myClubs.length}</span>
              <span className="text-[10px] text-[#86868B] uppercase font-semibold">Active Memberships</span>
            </div>
            <div className="bg-black/[0.02] border border-black/[0.04] px-5 py-3 rounded-2xl text-center">
              <span className="text-2xl font-semibold text-[#1D1D1F] block">2</span>
              <span className="text-[10px] text-[#86868B] uppercase font-semibold">Core Lead Positions</span>
            </div>
          </div>
        </div>
      </div>

      {/* My Enrolled Clubs Highlights Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1D1D1F]" />
            <h2 className="text-lg font-semibold text-[#1D1D1F]">My Club Memberships ({myClubs.length})</h2>
          </div>
          <span className="text-xs text-[#86868B] font-mono">Scholar ID: {student.scholarId}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myClubs.map((club) => (
            <div 
              key={club.id} 
              className="p-5 bg-white rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 text-[10px] font-semibold rounded-full bg-[#0071E3]/10 text-[#0071E3]">
                    {club.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#86868B]">Since {club.joinedDate}</span>
                </div>

                <h3 className="text-base font-semibold text-[#1D1D1F] line-clamp-2">{club.clubName}</h3>
                
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-black/[0.03] text-[#1D1D1F] rounded-full text-xs font-semibold border border-black/[0.04]">
                  <Award className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>Role: {club.role}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between text-xs text-[#86868B]">
                <span className="flex items-center gap-1 font-medium text-emerald-600">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  {club.upcomingEventsCount} Upcoming Activity
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-[10px]">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Club Directory & Explorer */}
      <div className="bg-white p-6 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.04]">
          <div>
            <h2 className="text-xl font-semibold text-[#1D1D1F]">Institute Club Directory</h2>
            <p className="text-xs text-[#86868B] mt-0.5">Explore recognised student clubs across Technical, Cultural, and Sports domains.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === 'all' 
                  ? 'bg-[#1D1D1F] text-white shadow-xs' 
                  : 'bg-black/[0.04] text-[#86868B] hover:bg-black/[0.08]'
              }`}
            >
              All Clubs ({clubsCatalog.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('my-clubs')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === 'my-clubs' 
                  ? 'bg-[#0071E3] text-white shadow-xs' 
                  : 'bg-black/[0.04] text-[#86868B] hover:bg-black/[0.08]'
              }`}
            >
              My Enrolled ({myClubs.length})
            </button>
          </div>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search club name, domain or lead..."
              className="w-full pl-10 pr-4 py-2 bg-black/[0.02] border border-black/[0.06] rounded-full text-xs text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 outline-none transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-[#0071E3]/10 text-[#0071E3] font-semibold' 
                    : 'bg-black/[0.02] text-[#86868B] hover:bg-black/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Club Cards Catalog List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCatalog.map((club) => (
            <div 
              key={club.id}
              className={`p-5 rounded-[20px] border transition-all flex flex-col justify-between space-y-4 ${
                club.isEnrolled 
                  ? 'bg-[#0071E3]/[0.02] border-[#0071E3]/20 shadow-xs' 
                  : 'bg-white hover:bg-black/[0.01] border-black/[0.05]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#0071E3]/10 text-[#0071E3]">
                      {club.category}
                    </span>
                    <h3 className="text-base font-semibold text-[#1D1D1F] mt-2 leading-snug">{club.name}</h3>
                  </div>

                  {club.isEnrolled ? (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1 shrink-0">
                      <Check className="w-3.5 h-3.5" /> Enrolled
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleEnrollment(club.id)}
                      className="px-4 py-1.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium rounded-full transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Join
                    </button>
                  )}
                </div>

                <p className="text-xs text-[#86868B] leading-relaxed">{club.description}</p>

                {/* Key Metadata Info */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.03]">
                    <span className="text-[10px] font-semibold text-[#86868B] block uppercase">Lead / Contact</span>
                    <span className="font-semibold text-[#1D1D1F] block truncate">{club.leadName} ({club.leadRole})</span>
                  </div>
                  <div className="p-3 bg-black/[0.02] rounded-2xl border border-black/[0.03]">
                    <span className="text-[10px] font-semibold text-[#86868B] block uppercase">Members</span>
                    <span className="font-semibold text-[#0071E3] block">{club.membersCount} Active Members</span>
                  </div>
                </div>

                {/* Schedule & Location */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#86868B] pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#86868B]" /> {club.meetingTime}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#86868B]" /> {club.location}
                  </span>
                </div>

                {/* Upcoming Activity */}
                {club.upcomingEvent && (
                  <div className="p-3 bg-[#0071E3]/[0.04] rounded-2xl border border-[#0071E3]/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0071E3] shrink-0" />
                      <div>
                        <span className="text-[10px] font-semibold text-[#0071E3] uppercase block">Next Event</span>
                        <span className="font-semibold text-[#1D1D1F]">{club.upcomingEvent}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#1D1D1F] shrink-0">{club.eventDate}</span>
                  </div>
                )}
              </div>

              {/* Action Bar for enrolled clubs */}
              {club.isEnrolled && (
                <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between text-xs">
                  <span className="text-[#1D1D1F] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" /> Role: {club.myRole || 'Member'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleEnrollment(club.id)}
                    className="text-[#86868B] hover:text-red-600 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    Leave Club
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
