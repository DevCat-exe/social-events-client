import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

export default function Hero() {
  return (
    <section className="relative bg-linear-to-br from-green-600 via-green-500 to-teal-600 text-white py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Build Stronger Communities Together
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 text-green-50 leading-relaxed"
          >
            Join thousands of volunteers making a real difference through social
            development events
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/upcoming"
              className="bg-base-100 text-primary hover:bg-base-200 font-semibold px-8 py-4 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              Explore Events
            </Link>
            <Link
              to="/create"
              className="bg-primary hover:bg-primary-focus text-primary-content font-semibold px-8 py-4 rounded-lg transition border-2 border-base-100"
            >
              Create Event
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
