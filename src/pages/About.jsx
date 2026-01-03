import { motion } from "motion/react";
import { Target, Eye, Users, Heart, Award, Globe } from "lucide-react";

const stats = [
  { label: "Community Members", value: "5k+", icon: Users },
  { label: "Events Organized", value: "120+", icon: Award },
  { label: "Cities Reached", value: "15", icon: Globe },
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
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-linear-to-b from-base-100 to-base-200">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
            About Community Events
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to fostering social development and connecting individuals 
            with meaningful opportunities to make a positive impact.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Target size={40} />
              </div>
              <h2 className="card-title text-2xl mb-2">Our Mission</h2>
              <p className="text-base-content/80">
                To build a platform that bridges the gap between intention and action, 
                empowering everyone to become a change-maker in their local community.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body items-center text-center">
              <div className="p-4 rounded-full bg-secondary/10 text-secondary mb-4">
                <Eye size={40} />
              </div>
              <h2 className="card-title text-2xl mb-2">Our Vision</h2>
              <p className="text-base-content/80">
                A world where every neighborhood is vibrant, connected, and resilient, 
                driven by the collective power of engaged citizens.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 border border-base-200 rounded-2xl bg-base-50/50">
                <stat.icon className="w-10 h-10 text-accent mb-4" />
                <span className="text-4xl font-bold text-base-content mb-2">{stat.value}</span>
                <span className="text-base-content/60 font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-base-content/60">The passionate people behind the platform.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center group">
              <div className="relative mb-4 overflow-hidden rounded-full w-32 h-32 ring-4 ring-base-100 shadow-xl">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-bold text-base-content">{member.name}</h3>
              <p className="text-sm text-primary font-medium">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
