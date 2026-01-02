import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-base-content mb-12"
        >
          Get in Touch
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card bg-base-100 shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-base-content/80">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Mail size={24} />
                  </div>
                  <span>support@communityevents.com</span>
                </div>
                <div className="flex items-center gap-4 text-base-content/80">
                  <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                    <Phone size={24} />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4 text-base-content/80">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <MapPin size={24} />
                  </div>
                  <span>123 Social Ave, Impact City</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card bg-base-100 shadow-xl p-8">
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button type="button" className="btn btn-primary w-full mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
