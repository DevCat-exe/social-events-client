import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";

const EventCard = ({ event, index = 0, skeleton = false }) => {
    if (skeleton) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-base-100 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
                <div className="w-full h-48 bg-base-300 animate-pulse"></div>
                <div className="p-4">
                    <div className="h-6 bg-base-300 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-base-300 rounded animate-pulse mb-4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-base-300 rounded animate-pulse"></div>
                        <div className="h-4 bg-base-300 rounded animate-pulse"></div>
                        <div className="h-4 bg-base-300 rounded animate-pulse w-1/2"></div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <Link to={`/events/${event._id}`}>
                <div className="bg-base-100 rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer h-full">
                    {event.thumbnail && (
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                        />
                    )}
                    <div className="p-4 flex flex-col grow">
                        <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-1">
                            {event.title}
                        </h3>
                        <p className="text-base-content/70 text-sm mb-4 line-clamp-2 grow">
                            {event.description}
                        </p>

                        <div className="space-y-2 text-sm text-base-content mt-auto">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 shrink-0" />
                                <span className="truncate">{new Date(event.eventDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span className="truncate">{event.location}</span>
                            </div>
                            <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded text-xs font-semibold w-fit">
                                {event.eventType}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default EventCard;
