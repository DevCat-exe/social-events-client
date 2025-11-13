import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { AuthContext } from "../providers/AuthContext";
import { getJoinedEvents } from "../api/eventApi";
import { motion } from "framer-motion";

const JoinedEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchJoinedEvents();
    }
  }, [user?.email]);

  const fetchJoinedEvents = async () => {
    setLoading(true);
    try {
      const data = await getJoinedEvents(user.email);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching joined events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          My Joined Events
        </h1>

        {loading ? (
          <p className="text-center text-base-content/70">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-base-content/70 py-12">
            You haven't joined any events yet
          </p>
        ) : (
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/events/${event._id}`}>
                  <div className="bg-base-100 rounded-lg shadow p-6 hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-base-content mb-2">
                      {event.title}
                    </h3>
                    <p className="text-base-content/70 mb-4">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-base-content">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.eventDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded text-xs font-semibold w-fit">
                        {event.eventType}
                      </span>
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

export default JoinedEvents;
