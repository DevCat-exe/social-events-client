import { motion } from "motion/react";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "How to Start a Community Garden",
    excerpt:
      "Discover the step-by-step guide to bringing your neighbors together for a greener community. From soil preparation to harvesting, we cover it all.",
    date: "Jan 15, 2024",
    author: "Jane Doe",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "The Importance of Youth Mentorship",
    excerpt:
      "Why mentoring programs are the backbone of social development in urban areas. Learn how mentorship shapes the leaders of tomorrow.",
    date: "Jan 20, 2024",
    author: "John Smith",
    category: "Education",
    image: "https://images.unsplash.com/photo-1529390003868-6c640a22a301?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "10 Small Ways to Make a Big Difference",
    excerpt:
      "You don't need a massive budget to create positive change in your neighborhood. Here are simple actions with huge impact.",
    date: "Jan 25, 2024",
    author: "Alice Green",
    category: "Community",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Organizing a Successful Fundraiser",
    excerpt:
      "Tips and tricks for planning a charity event that not only meets its financial goals but also raises awareness effectively.",
    date: "Feb 02, 2024",
    author: "Michael Brown",
    category: "Fundraising",
    image: "https://images.unsplash.com/photo-1561489401-fc2876ced162?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "The Role of Technology in Social Impact",
    excerpt:
      "Exploring how digital tools and platforms are revolutionizing the way we connect, organize, and drive social change.",
    date: "Feb 10, 2024",
    author: "Sarah Lee",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
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
      <div className="bg-base-100 border-b border-base-content/5 py-24 px-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block"
          >
            Resources & Stories
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-base-content mb-6"
          >
            The Community Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-base-content/60 max-w-2xl mx-auto mb-10"
          >
            Insights, updates, and stories from our community of change-makers. 
            Learn how you can make a bigger impact.
          </motion.p>
          
          {/* Search & Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="relative w-full max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="input input-lg input-bordered w-full pl-12 rounded-full shadow-lg focus:input-primary transition bg-base-100/80 backdrop-blur"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  className={`btn btn-sm rounded-full px-4 ${
                    idx === 0 
                    ? 'btn-primary shadow-lg shadow-primary/25' 
                    : 'btn-ghost bg-base-100 hover:bg-base-200 border border-base-content/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-base-content/5 h-full"
            >
              <figure className="h-56 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 badge badge-primary font-medium shadow-md">
                  {post.category}
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </figure>
              
              <div className="card-body p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 text-xs font-medium text-base-content/50 mb-3">
                  <div className="flex items-center gap-1.5 bg-base-200/50 px-2 py-1 rounded">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-base-200/50 px-2 py-1 rounded">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h2 className="card-title text-xl font-bold text-base-content mb-3 leading-tight group-hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-base-content/70 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="pt-4 border-t border-base-content/10 flex justify-between items-center mt-auto">
                   <div className="flex gap-2">
                       {/* Tags or other meta could go here */}
                   </div>
                  <button className="btn btn-link btn-sm text-primary no-underline hover:no-underline hover:opacity-80 p-0 flex items-center gap-1 group/btn font-bold">
                    Read Article 
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
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