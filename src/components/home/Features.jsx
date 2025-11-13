import { motion } from "framer-motion";
import { Calendar, Users, Target } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const features = [
  {
    icon: Calendar,
    title: "Easy Event Creation",
    description:
      "Create and manage community events in minutes with our intuitive platform designed for organizers",
    bg: "from-green-50 to-teal-50",
    color: "bg-green-600",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Connect with like-minded volunteers and organizations working towards positive social change",
    bg: "from-blue-50 to-cyan-50",
    color: "bg-blue-600",
  },
  {
    icon: Target,
    title: "Track Your Impact",
    description:
      "Monitor your contributions and see the collective impact of community events you've participated in",
    bg: "from-teal-50 to-green-50",
    color: "bg-teal-600",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Why Join Our Platform?
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Discover features designed to make social impact simple and
            effective
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-base-200 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div
                  className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-3">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
