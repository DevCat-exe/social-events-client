import { motion } from "motion/react";
import { Target, Eye, Users, Heart, Award, Globe, ArrowRight } from "lucide-react";

const stats = [
  { label: "Community Members", value: "5k+", icon: Users, color: "text-primary" },
  { label: "Events Organized", value: "120+", icon: Award, color: "text-secondary" },
  { label: "Cities Reached", value: "15", icon: Globe, color: "text-accent" },
];

const team = [
  { name: "Sarah Johnson", role: "Founder & CEO", img: "https://i.pravatar.cc/150?u=sarah" },
  { name: "David Chen", role: "Community Lead", img: "https://i.pravatar.cc/150?u=david" },
  { name: "Maria Garcia", role: "Event Coordinator", img: "https://i.pravatar.cc/150?u=maria" },
  { name: "James Wilson", role: "Tech Lead", img: "https://i.pravatar.cc/150?u=james" },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-base-200 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-base-100 border border-base-content/10 text-sm font-medium text-base-content/60 mb-6 shadow-sm">
            Empowering Communities Since 2023
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Connecting People.<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">
              Inspiring Change.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-10">
            We are dedicated to fostering social development and connecting individuals
            with meaningful opportunities to make a positive impact in their local neighborhoods.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 lg:gap-16"
          >
            <motion.div variants={itemVariants} className="group relative">
              <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative card bg-base-100 h-full p-8 md:p-12 rounded-xl border border-base-content/5">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Target size={32} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-base-content/70 leading-relaxed">
                  To build a platform that bridges the gap between intention and action,
                  empowering everyone to become a change-maker in their local community through accessible events and collaboration.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group relative">
              <div className="absolute -inset-1 bg-linear-to-r from-secondary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative card bg-base-100 h-full p-8 md:p-12 rounded-xl border border-base-content/5">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Eye size={32} className="text-secondary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-base-content/70 leading-relaxed">
                  A world where every neighborhood is vibrant, connected, and resilient,
                  driven by the collective power of engaged citizens working together for the greater good.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-base-100 relative">
        <div className="absolute inset-0 bg-base-200/50 skew-y-3 transform origin-bottom-left -z-10 h-full w-full"></div>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 rounded-3xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <stat.icon className={`w-12 h-12 ${stat.color} mb-6`} />
                <span className="text-5xl font-black text-base-content mb-3">{stat.value}</span>
                <span className="text-lg text-base-content/60 font-medium uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet The Team</h2>
          <p className="text-xl text-base-content/60 max-w-2xl mx-auto">The passionate individuals working behind the scenes to make this platform a reality.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {team.map((member, idx) => (
            <motion.div key={idx} variants={itemVariants} className="group text-center">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors duration-500"></div>
                <img
                  src={member.img}
                  alt={member.name}
                  className="relative w-40 h-40 object-cover rounded-full border-4 border-base-100 shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>

              {/* Social placeholders could go here */}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto bg-primary text-primary-content rounded-3xl p-12 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to join our community?</h2>
          <p className="text-lg text-primary-content/80 mb-8 max-w-xl mx-auto relative z-10">
            Start your journey today by discovering events or creating your own to gather people for a cause.
          </p>
          <button className="btn btn-lg bg-base-100 text-base-content border-none hover:bg-base-200 relative z-10 rounded-full px-8 shadow-lg">
            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}