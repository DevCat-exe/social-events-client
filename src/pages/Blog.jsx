import { motion } from "motion/react";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "How to Start a Community Garden",
    excerpt:
      "Discover the step-by-step guide to bringing your neighbors together for a greener community. From soil preparation to harvesting, we cover it all.",
    date: "Jan 15, 2024",
    author: "Jane Doe",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "The Importance of Youth Mentorship",
    excerpt:
      "Why mentoring programs are the backbone of social development in urban areas. Learn how mentorship shapes the leaders of tomorrow.",
    date: "Jan 20, 2024",
    author: "John Smith",
    category: "Education",
    image: "https://images.unsplash.com/photo-1529390003868-6c640a22a301?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "10 Small Ways to Make a Big Difference",
    excerpt:
      "You don't need a massive budget to create positive change in your neighborhood. Here are simple actions with huge impact.",
    date: "Jan 25, 2024",
    author: "Alice Green",
    category: "Community",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Organizing a Successful Fundraiser",
    excerpt:
      "Tips and tricks for planning a charity event that not only meets its financial goals but also raises awareness effectively.",
    date: "Feb 02, 2024",
    author: "Michael Brown",
    category: "Fundraising",
    image: "https://images.unsplash.com/photo-1561489401-fc2876ced162?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "The Role of Technology in Social Impact",
    excerpt:
      "Exploring how digital tools and platforms are revolutionizing the way we connect, organize, and drive social change.",
    date: "Feb 10, 2024",
    author: "Sarah Lee",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Mental Health Awareness in Communities",
    excerpt:
      "Breaking the stigma and creating support systems for mental well-being within local neighborhoods.",
    date: "Feb 15, 2024",
    author: "Dr. Emily White",
    category: "Health",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  },
];

const categories = ["All", "Environment", "Education", "Community", "Fundraising", "Tech", "Health"];

export default function Blog() {
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
      {/* Hero / Header Section */}
      <div className="bg-base-100 border-b border-base-content/5 pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-base-content mb-4"
          >
            Our Blog & Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-base-content/60 max-w-2xl mx-auto mb-8"
          >
            Insights, updates, and stories from our community of change-makers.
          </motion.p>
          
          {/* Search & Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto"
          >
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="input input-bordered w-full pl-10 focus:input-primary transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  className={`btn btn-sm ${idx === 0 ? 'btn-primary' : 'btn-ghost bg-base-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-content/5"
            >
              <figure className="h-48 overflow-hidden relative group">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 badge badge-primary shadow-lg">{post.category}</div>
              </figure>
              <div className="card-body p-6">
                <div className="flex items-center gap-4 text-xs text-base-content/60 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h2 className="card-title text-xl font-bold text-base-content mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="card-actions justify-end mt-auto">
                  <button className="btn btn-link btn-sm text-primary no-underline hover:no-underline hover:opacity-80 p-0 flex items-center gap-1 group">
                    Read More 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
