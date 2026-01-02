import { motion } from "motion/react";

const galleries = [
  {
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
    title: "Tree Plantation Drive",
    description: "500+ trees planted in urban areas",
    category: "Environment",
  },
  {
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    title: "Beach Cleanup Campaign",
    description: "2 tons of waste removed from coastlines",
    category: "Environment",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
    title: "Food Distribution Drive",
    description: "1000+ families supported with meals",
    category: "Social Welfare",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    title: "Education Support Program",
    description: "Books and supplies to rural schools",
    category: "Education",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    title: "Free Medical Camp",
    description: "300+ patients treated and counseled",
    category: "Healthcare",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    title: "Winter Clothing Drive",
    description: "Warm clothes distributed to needy families",
    category: "Social Welfare",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Recent Event Highlights
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            See the positive change our community has created through impactful social development events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-base-100 rounded-2xl shadow-sm border border-base-content/5 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={gallery.image}
                  alt={gallery.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-primary-content text-xs font-semibold rounded-full">
                    {gallery.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                  {gallery.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {gallery.description}
                </p>
                <div className="mt-4 pt-4 border-t border-base-content/5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-medium">View Details</span>
                    <span className="text-base-content/50">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="btn btn-primary btn-lg px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition">
            View All Events
          </button>
        </motion.div>
      </div>
    </section>
  );
}
