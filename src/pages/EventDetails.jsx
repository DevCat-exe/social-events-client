import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, User } from "lucide-react";
import { AuthContext } from "../providers/AuthContext";
import { getEventById, joinEvent } from "../api/eventApi";
import Swal from "sweetalert2";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (error) {
      Swal.fire("Error", "Event not found", "error");
      navigate("/upcoming");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user) {
      navigate("/login");
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

  if (loading)
    return <p className="text-center py-12 text-base-content">Loading...</p>;
  if (!event)
    return (
      <p className="text-center py-12 text-base-content">Event not found</p>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {event.thumbnail && (
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="bg-base-100 rounded-lg shadow-lg p-8">
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
              <span>{event.creatorEmail}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-4">About</h2>
            <p className="text-base-content leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="flex gap-4">
            {user ? (
              <button
                onClick={handleJoin}
                disabled={joining}
                className="btn btn-primary disabled:opacity-50"
              >
                {joining ? "Joining..." : "Join Event"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary"
              >
                Login to Join
              </button>
            )}
            <button
              onClick={() => navigate("/upcoming")}
              className="btn btn-neutral"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
