import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Edit2, Trash2 } from "lucide-react";
import { AuthContext } from "../providers/AuthContext";
import { getCreatorEvents, updateEvent, deleteEvent } from "../api/eventApi";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (user?.email) {
      fetchCreatorEvents();
    }
  }, [user?.email]);

  const fetchCreatorEvents = async () => {
    setLoading(true);
    try {
      const data = await getCreatorEvents(user.email);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setEditForm({
      ...event,
      eventDate: new Date(event.eventDate),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditForm((prev) => ({ ...prev, eventDate: date }));
  };

  const handleSave = async () => {
    try {
      const { _id, ...updateData } = {
        ...editForm,
        eventDate: editForm.eventDate.toISOString(),
        creatorEmail: user.email,
      };
      await updateEvent(editingId, updateData);
      Swal.fire("Success!", "Event updated successfully", "success");
      setEditingId(null);
      fetchCreatorEvents();
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to update event", "error");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = async (eventId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the event and all related joins!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(eventId);
        Swal.fire("Deleted!", "Event has been deleted.", "success");
        fetchCreatorEvents();
      } catch (error) {
        Swal.fire("Error", error.message || "Failed to delete event", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          Manage My Events
        </h1>

        {loading ? (
          <p className="text-center text-base-content/70">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-base-content/70 py-12">
            You haven't created any events yet
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
                className="bg-base-100 rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                {editingId === event._id ? (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="label-text font-semibold text-base-content">
                        Event Title
                      </span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g., Tree Plantation Drive"
                      value={editForm.title || ""}
                      onChange={handleChange}
                      className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
                      required
                    />

                    <label className="block mt-4">
                      <span className="label-text font-semibold text-base-content">
                        Description
                      </span>
                    </label>
                    <textarea
                      name="description"
                      placeholder="Tell people about your event"
                      value={editForm.description || ""}
                      onChange={handleChange}
                      rows="4"
                      className="textarea textarea-bordered w-full bg-base-100 text-base-content border-base-300"
                    />

                    <label className="block mt-4">
                      <span className="label-text font-semibold text-base-content">
                        Event Type
                      </span>
                    </label>
                    <select
                      name="eventType"
                      value={editForm.eventType || "Community"}
                      onChange={handleChange}
                      className="select select-bordered w-full bg-base-100 text-base-content border-base-300"
                    >
                      <option value="Community">Community</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Environment">Environment</option>
                    </select>

                    <label className="block mt-4">
                      <span className="label-text font-semibold text-base-content">
                        Location
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Event location"
                      value={editForm.location || ""}
                      onChange={handleChange}
                      className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
                      required
                    />

                    <label className="block mt-4">
                      <span className="label-text font-semibold text-base-content">
                        Event Date
                      </span>
                    </label>
                    <DatePicker
                      selected={editForm.eventDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
                      dateFormat="yyyy-MM-dd"
                    />

                    <label className="block mt-4">
                      <span className="label-text font-semibold text-base-content">
                        Thumbnail URL
                      </span>
                    </label>
                    <input
                      type="url"
                      name="thumbnail"
                      placeholder="https://example.com/image.jpg"
                      value={editForm.thumbnail || ""}
                      onChange={handleChange}
                      className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
                    />

                    <div className="flex gap-2 mt-6">
                      <button onClick={handleSave} className="btn btn-primary">
                        Update Event
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to={`/events/${event._id}`}>
                    <h3 className="text-xl font-bold text-base-content mb-2">
                      {event.title}
                    </h3>
                    <p className="text-base-content/70 mb-4">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-base-content mb-4">
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

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(event);
                        }}
                        className="btn btn-info"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(event._id);
                        }}
                        className="btn btn-error"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
