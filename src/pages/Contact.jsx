import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-base-200 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-primary/10 to-transparent -z-10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10 opacity-50" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Contact Us</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-base-content mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto leading-relaxed">
            Have questions about an event, need support, or just want to say hello?
            We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="card bg-base-100/80 backdrop-blur-md shadow-xl border border-base-content/5">
              <div className="card-body p-8">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="text-primary w-6 h-6" />
                  </div>
                  Contact Information
                </h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="p-4 bg-base-200 rounded-2xl group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300 shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-base-content mb-1">Email Us</h3>
                      <a href="mailto:support@communityevents.com" className="block text-base-content/70 hover:text-primary transition-colors cursor-pointer">support@communityevents.com</a>
                      <a href="mailto:partners@communityevents.com" className="block text-base-content/70 hover:text-primary transition-colors cursor-pointer">partners@communityevents.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="p-4 bg-base-200 rounded-2xl group-hover:bg-secondary/20 group-hover:text-secondary transition-colors duration-300 shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-base-content mb-1">Call Us</h3>
                      <a href="tel:+15551234567" className="block text-base-content/70 hover:text-primary transition-colors cursor-pointer">+1 (555) 123-4567</a>
                      <p className="text-sm text-base-content/50 mt-1">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="p-4 bg-base-200 rounded-2xl group-hover:bg-accent/20 group-hover:text-accent transition-colors duration-300 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-base-content mb-1">Visit Us</h3>
                      <p className="text-base-content/70">123 Social Ave, Impact City</p>
                      <p className="text-base-content/70">State 12345, Country</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              className="card bg-base-100 shadow-xl overflow-hidden h-80 relative group border border-base-content/5"
              role="img"
              aria-label="Map showing location of Community Events office"
            >
              <div className="absolute inset-0 bg-base-300/50 flex items-center justify-center group-hover:bg-base-300/30 transition-all duration-500 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale group-hover:grayscale-0">
                <div className="absolute inset-0 bg-base-900/10 group-hover:bg-transparent transition-colors"></div>
                <div className="bg-base-100/90 backdrop-blur px-6 py-4 rounded-full shadow-lg flex items-center gap-3 transform group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="text-primary w-5 h-5" />
                  <span className="font-bold text-base-content">Find us on Maps</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="card bg-base-100 shadow-2xl border border-base-content/5"
          >
            <div className="card-body p-8 lg:p-10">
              <h2 className="text-3xl font-bold mb-8 text-base-content">Send Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control w-full">
                    <label htmlFor="fullName" className="label pl-1 mb-1">
                      <span className="label-text font-semibold text-base-content/80 text-sm uppercase tracking-wide">Full Name</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full h-12 bg-base-200/50 focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 rounded-xl"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label htmlFor="email" className="label pl-1 mb-1">
                      <span className="label-text font-semibold text-base-content/80 text-sm uppercase tracking-wide">Email Address</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered w-full h-12 bg-base-200/50 focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label htmlFor="subject" className="label pl-1 mb-1">
                    <span className="label-text font-semibold text-base-content/80 text-sm uppercase tracking-wide">Subject</span>
                  </label>
                  <select
                    id="subject"
                    className="select select-bordered w-full h-12 bg-base-200/50 focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 rounded-xl text-base-content"
                    defaultValue="Select a topic"
                  >
                    <option disabled className="text-base-content/50">Select a topic</option>
                    <option className="bg-base-100 text-base-content py-2">General Inquiry</option>
                    <option className="bg-base-100 text-base-content py-2">Event Support</option>
                    <option className="bg-base-100 text-base-content py-2">Partnership Opportunities</option>
                    <option className="bg-base-100 text-base-content py-2">Feedback</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label htmlFor="message" className="label pl-1 mb-1">
                    <span className="label-text font-semibold text-base-content/80 text-sm uppercase tracking-wide">Message</span>
                  </label>
                  <textarea
                    id="message"
                    className="textarea textarea-bordered h-48 bg-base-200/50 focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 rounded-xl resize-none text-base leading-relaxed p-4"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="btn btn-primary w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 mt-6 rounded-xl normal-case tracking-wide"
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
