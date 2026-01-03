import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { createEvent } from "../api/eventApi";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertTriangle, Plus, X } from "lucide-react";

const CreateEvent = () => {
  const { user, mongoUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "Community",
    location: "",
    eventDate: new Date(),
    images: [""],
  });
  const [loading, setLoading] = useState(false);

  const isBlocked = mongoUser?.role === "blocked";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, eventDate: date }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    if (form.images.length > 1) {
      const newImages = form.images.filter((_, i) => i !== index);
      setForm((prev) => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) {
      Swal.fire(
        "Access Denied",
        "Your account is blocked. You cannot create events.",
        "error"
      );
      return;
    }

    // Filter out empty image URLs
    const validImages = form.images.filter((img) => img && img.trim() !== "");

    if (validImages.length === 0) {
      Swal.fire("Error", "Please provide at least one image URL", "error");
      return;
    }

    setLoading(true);
    try {
      await createEvent({
        ...form,
        images: validImages,
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

        {isBlocked && (
          <div className="alert alert-error mb-6 shadow-lg">
            <AlertTriangle className="stroke-current shrink-0 h-6 w-6" />
            <div>
              <h3 className="font-bold">Account Restricted</h3>
              <div className="text-xs">
                Your account is blocked. You cannot create new events.
              </div>
            </div>
          </div>
        )}

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
              disabled={isBlocked}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300 disabled:opacity-60"
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
              disabled={isBlocked}
              rows="4"
              className="textarea textarea-bordered w-full bg-base-100 text-base-content border-base-300 disabled:opacity-60"
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
              disabled={isBlocked}
              className="select select-bordered w-full bg-base-100 text-base-content border-base-300 disabled:opacity-60"
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
              disabled={isBlocked}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300 disabled:opacity-60"
              required
            />

            <label className="block mt-4">
              <span className="label-text font-semibold text-base-content">
                Event Date
              </span>
            </label>
            <div className={isBlocked ? "opacity-60 pointer-events-none" : ""}>
              <DatePicker
                selected={form.eventDate}
                onChange={handleDateChange}
                minDate={new Date()}
                className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
                dateFormat="yyyy-MM-dd"
                disabled={isBlocked}
              />
            </div>

            <label className="block mt-4">
              <span className="label-text font-semibold text-base-content">
                Event Images (
                {form.images.filter((img) => img.trim() !== "").length} /{" "}
                {form.images.length})
              </span>
            </label>

            <div className="space-y-3">
              {form.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    placeholder={`Image URL ${index + 1}`}
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    disabled={isBlocked}
                    className="input input-bordered w-full bg-base-100 text-base-content border-base-300 disabled:opacity-60"
                  />
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      disabled={isBlocked}
                      className="btn btn-error btn-square disabled:opacity-60"
                      title="Remove image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addImageField}
                disabled={isBlocked || form.images.length >= 10}
                className="btn btn-outline btn-primary w-full disabled:opacity-60"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Another Image {form.images.length >= 10 && "(Max 10)"}
              </button>

              <p className="text-sm text-base-content/70 mt-2">
                Add up to 10 images. At least one image is required.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || isBlocked}
              className="btn btn-primary w-full mt-6"
            >
              {loading
                ? "Creating..."
                : isBlocked
                ? "Account Blocked"
                : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
