import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Have questions about an event or need support? We're here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              <div className="card-body p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <MessageSquare className="text-primary" />
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content">Email Us</h3>
                      <p className="text-base-content/70">support@communityevents.com</p>
                      <p className="text-base-content/70">partners@communityevents.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                    <div className="p-3 bg-secondary/10 text-secondary rounded-lg shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content">Call Us</h3>
                      <p className="text-base-content/70">+1 (555) 123-4567</p>
                      <p className="text-sm text-base-content/50 mt-1">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                    <div className="p-3 bg-accent/10 text-accent rounded-lg shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content">Visit Us</h3>
                      <p className="text-base-content/70">123 Social Ave, Impact City</p>
                      <p className="text-base-content/70">State 12345, Country</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="card bg-base-100 shadow-xl overflow-hidden h-64 relative group">
              <div className="absolute inset-0 bg-base-300 flex items-center justify-center group-hover:bg-base-300/80 transition-colors">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto text-base-content/30 mb-2" />
                  <span className="text-base-content/50 font-medium">Interactive Map Placeholder</span>
                </div>
              </div>
              {/* Optional: Add an actual iframe map here if you have a URL */}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-base-100 shadow-xl h-fit"
          >
            <div className="card-body p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Your Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered focus:input-primary transition-all bg-base-200/30 focus:bg-base-100"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Your Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered focus:input-primary transition-all bg-base-200/30 focus:bg-base-100"
                    />
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Subject</span>
                  </label>
                  <select className="select select-bordered focus:select-primary transition-all bg-base-200/30 focus:bg-base-100">
                    <option disabled selected>Select a topic</option>
                    <option>General Inquiry</option>
                    <option>Event Support</option>
                    <option>Partnership</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-40 focus:textarea-primary transition-all bg-base-200/30 focus:bg-base-100 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button" 
                  className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
