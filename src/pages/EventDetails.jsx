import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, User, FileText, Users, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { AuthContext } from "../providers/AuthContext";
import { getEventById, joinEvent, getUpcomingEvents, getJoinedEvents, getUserByEmail } from "../api/eventApi";
import Swal from "sweetalert2";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, mongoUser } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [creator, setCreator] = useState(null);

  const isBlocked = mongoUser?.role === 'blocked';

  useEffect(() => {
    fetchEvent();
    if (user) {
      checkIfJoined();
    }
  }, [id, user]);

  const fetchEvent = async () => {
    try {
      const data = await getEventById(id);
      setEvent(data);
      // Fetch creator info
      try {
        const creatorData = await getUserByEmail(data.creatorEmail);
        setCreator(creatorData);
      } catch (error) {
        console.error("Failed to fetch creator:", error);
      }
      // Fetch related events of same type
      if (data.eventType) {
        const related = await getUpcomingEvents(data.eventType, '', '', '', 'date', 1, 3);
        setRelatedEvents(related.events?.filter(e => e._id !== id) || []);
      }
    } catch (error) {
      Swal.fire("Error", "Event not found", "error");
      navigate("/upcoming");
    } finally {
      setLoading(false);
    }
  };

  const checkIfJoined = async () => {
    try {
      const joinedEvents = await getJoinedEvents(user.email);
      const isJoined = joinedEvents.some(joinedEvent => joinedEvent._id === id);
      setHasJoined(isJoined);
    } catch (error) {
      console.error("Failed to check join status:", error);
    }
  };

  const handleJoin = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (isBlocked) {
      Swal.fire("Access Denied", "Your account is blocked. You cannot join events.", "error");
      return;
    }

    setJoining(true);
    try {
      await joinEvent(id, user.email);
      Swal.fire("Success!", "Joined event successfully", "success");
      navigate("/joined");
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to join event", "error");
    } finally {
      setJoining(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  if (loading)
    return <p className="text-center py-12 text-base-content">Loading...</p>;
  if (!event)
    return (
      <p className="text-center py-12 text-base-content">Event not found</p>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isBlocked && (
          <div className="alert alert-error mb-8 shadow-lg">
            <AlertTriangle className="stroke-current shrink-0 h-6 w-6" />
            <div>
              <h3 className="font-bold">Account Restricted</h3>
              <div className="text-xs">Your account is blocked. You cannot join this event.</div>
            </div>
          </div>
        )}

        {/* Event Image */}
        {event.thumbnail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-hidden rounded-lg shadow-lg"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-base-100 rounded-lg shadow-lg p-8 mb-8"
            >
              <h1 className="text-4xl font-bold text-base-content mb-4">
                {event.title}
              </h1>

              <div className="space-y-4 mb-8 text-base-content">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <div className="flex items-center gap-3">
                    <img
                      src={creator?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator?.displayName || event.creatorEmail)}&size=32`}
                      alt={creator?.displayName || event.creatorEmail}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-medium text-base-content">{creator?.displayName || event.creatorEmail}</span>
                      <p className="text-sm text-base-content/70">{event.creatorEmail}</p>
                    </div>
                  </div>
                </div>
                <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded text-sm font-semibold">
                  {event.eventType}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-base-content mb-4">About</h2>
                <p className="text-base-content leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Rules & Requirements */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Rules & Requirements
                </h2>
                <ul className="list-disc list-inside text-base-content space-y-2">
                  <li>Participants must arrive 15 minutes before the event starts</li>
                  <li>Bring valid ID for verification</li>
                  <li>Respect other participants and follow event guidelines</li>
                  <li>No outside food or beverages allowed</li>
                  <li>Photography may be restricted in certain areas</li>
                </ul>
              </div>

              <div className="flex gap-4">
                {user ? (
                  event.creatorEmail === user.email ? (
                    <button
                      disabled
                      className="btn btn-neutral disabled:opacity-50 cursor-not-allowed"
                    >
                      Your Event
                    </button>
                  ) : isBlocked ? (
                    <button
                      disabled
                      className="btn btn-error disabled:opacity-50 cursor-not-allowed"
                    >
                      Account Blocked
                    </button>
                  ) : hasJoined ? (
                    <button
                      disabled
                      className="btn btn-success disabled:opacity-50 cursor-not-allowed"
                    >
                      Already Joined
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleJoin}
                      disabled={joining}
                      className="btn btn-primary disabled:opacity-50"
                    >
                      {joining ? "Joining..." : "Join Event"}
                    </motion.button>
                  )
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/login")}
                    className="btn btn-primary"
                  >
                    Login to Join
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/upcoming")}
                  className="btn btn-neutral"
                >
                  Back
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-base-100 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Related Events
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {relatedEvents.map((relatedEvent, idx) => (
                    <motion.div
                      key={relatedEvent._id}
                      variants={itemVariants}
                      className="border-b border-base-300 pb-4 last:border-b-0"
                    >
                      <h4 className="font-semibold text-base-content mb-2 line-clamp-1">
                        {relatedEvent.title}
                      </h4>
                      <p className="text-sm text-base-content/70 mb-2 line-clamp-2">
                        {relatedEvent.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-base-content/60">
                        <Calendar className="w-3 h-3" />
                        {new Date(relatedEvent.eventDate).toLocaleDateString()}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/events/${relatedEvent._id}`)}
                        className="btn btn-sm btn-primary mt-2"
                      >
                        View Details
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
