import { motion } from "motion/react";
import { Award, Briefcase, Globe, Shield, Star, Zap } from "lucide-react";

const partners = [
  { name: "EcoWorld", icon: Globe },
  { name: "TechGiant", icon: Zap },
  { name: "SafeGuard", icon: Shield },
  { name: "StarEvents", icon: Star },
  { name: "BuildCorp", icon: Briefcase },
  { name: "TopAward", icon: Award },
];

const Partners = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-base-content mb-12"
        >
          Trusted by Industry Leaders
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, color: "var(--color-primary)" }}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <partner.icon className="w-12 h-12 text-base-content group-hover:text-primary transition-colors" />
              <span className="font-semibold text-lg text-base-content group-hover:text-primary transition-colors">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
