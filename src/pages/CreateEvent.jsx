import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { createEvent } from "../api/eventApi";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "Community",
    location: "",
    eventDate: new Date(),
    thumbnail: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, eventDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEvent({
        ...form,
        eventDate: form.eventDate.toISOString(),
        creatorEmail: user.email,
      });
      Swal.fire("Success!", "Event created successfully", "success");
      navigate("/upcoming");
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to create event", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          Create Event
        </h1>

        <div className="bg-base-100 border border-base-300 rounded-2xl w-full p-8">
          <h2 className="text-2xl font-bold text-base-content mb-6">
            Event Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="label-text font-semibold text-base-content">
                Event Title
              </span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Tree Plantation Drive"
              value={form.title}
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
              value={form.description}
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
              value={form.eventType}
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
              value={form.location}
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
              selected={form.eventDate}
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
              value={form.thumbnail}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-6"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
