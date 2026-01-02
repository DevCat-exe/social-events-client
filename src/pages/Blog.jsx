import { motion } from "motion/react";

const posts = [
  {
    title: "How to Start a Community Garden",
    excerpt:
      "Discover the step-by-step guide to bringing your neighbors together for a greener community.",
    date: "Jan 15, 2024",
    author: "Jane Doe",
    category: "Environment",
  },
  {
    title: "The Importance of Youth Mentorship",
    excerpt:
      "Why mentoring programs are the backbone of social development in urban areas.",
    date: "Jan 20, 2024",
    author: "John Smith",
    category: "Education",
  },
  {
    title: "10 Small Ways to Make a Big Difference",
    excerpt:
      "You don't need a massive budget to create positive change in your neighborhood.",
    date: "Jan 25, 2024",
    author: "Alice Green",
    category: "Community",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-base-content mb-12"
        >
          Our Blog & Stories
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
            >
              <div className="card-body">
                <div className="badge badge-primary">{post.category}</div>
                <h2 className="card-title text-base-content mt-2">
                  {post.title}
                </h2>
                <p className="text-base-content/70">{post.excerpt}</p>
                <div className="card-actions justify-between items-center mt-4 border-t pt-4">
                  <span className="text-sm font-medium">{post.author}</span>
                  <span className="text-xs text-base-content/50">
                    {post.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
