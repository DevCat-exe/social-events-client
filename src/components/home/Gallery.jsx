import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const galleries = [
  {
    image:
      "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Tree Plantation Drive",
    description: "500+ trees planted",
  },
  {
    image:
      "https://images.pexels.com/photos/8088496/pexels-photo-8088496.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Beach Cleanup Campaign",
    description: "2 tons of waste removed",
  },
  {
    image:
      "https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Food Distribution Drive",
    description: "1000+ families supported",
  },
  {
    image:
      "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Education Support Program",
    description: "Books to rural schools",
  },
  {
    image:
      "https://images.pexels.com/photos/6647019/pexels-photo-6647019.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Free Medical Camp",
    description: "300+ patients treated",
  },
  {
    image:
      "https://images.pexels.com/photos/6647120/pexels-photo-6647120.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Winter Clothing Drive",
    description: "Warm clothes for needy",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Recent Event Highlights
          </h2>
          <p className="text-xl text-base-content/70">
            See the positive change our community has created
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleries.map((gallery, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-base-200 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img
                src={gallery.image}
                alt={gallery.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {gallery.title}
                  </h3>
                  <p className="text-green-200 text-sm">
                    {gallery.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
