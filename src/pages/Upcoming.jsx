import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { getUpcomingEvents } from "../api/eventApi";

const Upcoming = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [type, search]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getUpcomingEvents(type, search);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          Upcoming Events
        </h1>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-base-content"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-base-content"
          >
            <option value="">All Types</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Environment">Environment</option>
            <option value="Community">Community</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-base-content/70">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-base-content/70">No events found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, idx) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/events/${event._id}`}>
                  <div className="bg-base-100 rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
                    {event.thumbnail && (
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-base-content mb-2">
                        {event.title}
                      </h3>
                      <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm text-base-content">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.eventDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded text-xs font-semibold">
                          {event.eventType}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
