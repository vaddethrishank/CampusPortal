import React, { useState } from 'react';
import { CampusEvent, EventCategory } from '../../types';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  X,
  Building2,
  Tag
} from 'lucide-react';

interface EventsModuleProps {
  events: CampusEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CampusEvent[]>>;
}

export const EventsModule: React.FC<EventsModuleProps> = ({ events, setEvents }) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailEvent, setDetailEvent] = useState<CampusEvent | null>(null);

  const categories: EventCategory[] = [
    'All',
    'Technical Clubs',
    'Coding Club',
    'Robotics',
    'AI Club',
    'Dance',
    'Music',
    'Sports',
    'Cultural',
    'Photography',
    'Entrepreneurship',
    'NSS',
    'NCC',
    'College Events'
  ];

  const handleRegisterEvent = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const nextRegState = !ev.isRegistered;
        return {
          ...ev,
          isRegistered: nextRegState,
          attendeesCount: nextRegState ? ev.attendeesCount + 1 : ev.attendeesCount - 1
        };
      }
      return ev;
    }));
  };

  const filteredEvents = events.filter(ev => {
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvent = events.find(e => e.featured) || events[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Featured Event Banner */}
      {featuredEvent && (
        <div className="relative rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-[#1D1D1F] text-white border border-black/[0.04]">
          <img 
            src={featuredEvent.posterUrl} 
            alt={featuredEvent.title}
            className="w-full h-64 sm:h-80 object-cover opacity-40 hover:opacity-50 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#0071E3] text-white font-semibold text-[10px] rounded-full uppercase tracking-wider">
                  Featured Spotlight
                </span>
                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold rounded-full">
                  {featuredEvent.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {featuredEvent.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
                {featuredEvent.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-2">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-[#0071E3]" /> {featuredEvent.date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-white/70" /> {featuredEvent.location}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4 text-white/70" /> {featuredEvent.attendeesCount} Registered</span>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRegisterEvent(featuredEvent.id)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                    featuredEvent.isRegistered
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#0071E3] hover:bg-[#0071E3]/90 text-white'
                  }`}
                >
                  {featuredEvent.isRegistered ? '✓ Registered' : 'Register Now'}
                </button>

                <button
                  type="button"
                  onClick={() => setDetailEvent(featuredEvent)}
                  className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs sm:text-sm rounded-full transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3" />
            <input
              type="text"
              id="event-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search club events, hackathons, sports..."
              className="w-full pl-10 pr-4 py-2 bg-black/[0.02] border border-black/[0.06] rounded-full text-xs text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] outline-none"
            />
          </div>

          <div className="text-xs text-[#86868B] font-semibold self-end sm:self-center">
            Showing {filteredEvents.length} Events
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              id={`event-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer
                ${selectedCategory === cat
                  ? 'bg-[#0071E3] text-white shadow-xs'
                  : 'bg-black/[0.03] hover:bg-black/[0.06] text-[#1D1D1F]'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div 
            key={event.id}
            className="bg-white rounded-[20px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-200 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Poster Header */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={event.posterUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-[#0071E3] text-white rounded-full shadow-2xs">
                    {event.category}
                  </span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
                    event.status === 'Live' ? 'bg-rose-500 text-white' : event.status === 'Completed' ? 'bg-black/60 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Event Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-semibold text-[#1D1D1F] leading-snug line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-xs text-[#86868B] line-clamp-2">{event.description}</p>

                <div className="space-y-1.5 pt-2 text-xs text-[#86868B] border-t border-black/[0.04]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#86868B] shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#86868B] shrink-0" />
                    <span className="text-[#86868B]">{event.organizer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRegisterEvent(event.id)}
                className={`flex-1 py-2 px-3 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  event.isRegistered
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100'
                    : 'bg-[#0071E3] hover:bg-[#0071E3]/90 text-white shadow-xs'
                }`}
              >
                {event.isRegistered ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Registered</span>
                  </>
                ) : (
                  <span>Register Event</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setDetailEvent(event)}
                className="p-2 text-[#86868B] hover:text-[#0071E3] hover:bg-black/[0.03] rounded-full transition-colors"
                title="View Full Details"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {detailEvent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-xl w-full p-6 shadow-2xl border border-black/[0.04] relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setDetailEvent(null)}
              className="absolute top-4 right-4 p-2 text-[#86868B] hover:text-[#1D1D1F] bg-black/[0.03] rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <img src={detailEvent.posterUrl} alt={detailEvent.title} className="w-full h-48 object-cover rounded-2xl" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-[#0071E3]/10 text-[#0071E3] rounded-full">
                  {detailEvent.category}
                </span>
                <span className="text-xs text-[#86868B]">{detailEvent.organizer}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1D1D1F]">{detailEvent.title}</h3>
              <p className="text-xs text-[#86868B] leading-relaxed mt-2">{detailEvent.description}</p>
            </div>

            <div className="p-4 bg-black/[0.02] rounded-2xl space-y-2 text-xs text-[#1D1D1F]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0071E3]" />
                <span>Date & Time: <strong>{detailEvent.date} ({detailEvent.time})</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#86868B]" />
                <span>Venue: <strong>{detailEvent.location}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#86868B]" />
                <span>Registered Students: <strong>{detailEvent.attendeesCount}</strong></span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDetailEvent(null)}
                className="px-5 py-2 bg-black/[0.03] text-[#1D1D1F] rounded-full text-xs font-medium"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRegisterEvent(detailEvent.id);
                  setDetailEvent(null);
                }}
                className={`px-6 py-2 rounded-full font-semibold text-xs text-white ${
                  detailEvent.isRegistered ? 'bg-emerald-600' : 'bg-[#0071E3]'
                }`}
              >
                {detailEvent.isRegistered ? '✓ Registered' : 'Confirm Registration'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
