import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Search, Filter, SortAsc } from "lucide-react";
import { motion } from "motion/react";
import { getUpcomingEvents } from "../api/eventApi";
import EventCard from "../components/EventCard";

const Upcoming = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    fetchEvents();
  }, [type, search, location, dateRange, sortBy, currentPage]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getUpcomingEvents(type, search, location, dateRange, sortBy, currentPage, eventsPerPage);
      setEvents(data.events || data);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          Upcoming Events
        </h1>

        {/* Filters and Search */}
        <div className="mb-8 bg-base-100 p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-base-content bg-base-100"
              />
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-base-content bg-base-100"
            >
              <option value="">All Types</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Environment">Environment</option>
              <option value="Community">Community</option>
            </select>
            <input
              type="text"
              placeholder="Filter by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-base-content bg-base-100"
            />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-base-content bg-base-100"
            >
              <option value="">All Dates</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="nextMonth">Next Month</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <SortAsc className="w-4 h-4 text-base-content/70" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-base-content bg-base-100"
            >
              <option value="date">Sort by Date</option>
              <option value="newest">Newest First</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <EventCard key={idx} skeleton={true} index={idx} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-base-content/70 py-12">No events found</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, idx) => (
                <EventCard key={event._id} event={event} index={idx} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="join">
                  <button
                    className="join-item btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`join-item btn ${page === currentPage ? 'btn-active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="join-item btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
