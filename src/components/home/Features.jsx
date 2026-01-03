import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getUpcomingEvents } from "../../api/eventApi";
import EventCard from "../EventCard";

export default function Features() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        // Fetch 3 upcoming events as highlights, sorted by date
        const data = await getUpcomingEvents('', '', '', '', 'date', 1, 3);
        setEvents(data.events || []);
      } catch (error) {
        console.error("Failed to fetch event highlights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
            >
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
                Discover
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4 leading-tight">
                Upcoming Highlights
            </h2>
            <p className="text-xl text-base-content/70">
                Join these trending events and make a difference in your community today.
            </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <Link to="/upcoming" className="btn btn-outline btn-primary rounded-full px-6 group">
                    View All Events
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <EventCard key={i} skeleton={true} index={i} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard key={event._id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-base-200 rounded-2xl">
            <Calendar className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <p className="text-xl text-base-content/60">No upcoming events found at the moment.</p>
            <Link to="/create" className="btn btn-primary mt-6">Create the first event!</Link>
          </div>
        )}
      </div>
    </section>
  );
}