import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-teal-600 text-white">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-green-200" />
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
          Stay Updated
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl text-green-50 mb-8 leading-relaxed"
        >
          Subscribe to our newsletter and get updates on upcoming events and
          ways to make a difference
        </motion.p>

        <motion.form
          variants={itemVariants}
          onSubmit={handleNewsletterSubmit}
          className="max-w-md mx-auto"
        >
          <div className="join w-full">
            <label className="input input-bordered join-item w-full bg-white text-gray-900">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="grow bg-transparent"
                required
              />
            </label>
            <button type="submit" className="btn btn-neutral join-item">
              Subscribe
            </button>
          </div>
        </motion.form>

        <motion.p
          variants={itemVariants}
          className="text-green-100 text-sm mt-4"
        >
          Join 5,000+ community members already subscribed
        </motion.p>
      </motion.div>
    </section>
  );
}
