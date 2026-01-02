import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
    Heart,
    TreePine,
    GraduationCap,
    Users,
    Home,
    Shield,
    Palette,
    Utensils,
} from "lucide-react";

const categories = [
    {
        name: "Community Service",
        icon: Heart,
        description: "Help build stronger communities through service projects",
        color: "from-red-500 to-pink-500",
        events: 245,
    },
    {
        name: "Environmental",
        icon: TreePine,
        description: "Protect our planet through conservation and cleanup efforts",
        color: "from-green-500 to-teal-500",
        events: 189,
    },
    {
        name: "Education",
        icon: GraduationCap,
        description: "Support learning and educational development initiatives",
        color: "from-blue-500 to-indigo-500",
        events: 156,
    },
    {
        name: "Social Welfare",
        icon: Users,
        description: "Assist those in need and promote social welfare",
        color: "from-purple-500 to-violet-500",
        events: 134,
    },
    {
        name: "Housing & Shelter",
        icon: Home,
        description: "Help provide housing and shelter for those in need",
        color: "from-orange-500 to-red-500",
        events: 98,
    },
    {
        name: "Safety & Security",
        icon: Shield,
        description: "Promote community safety and security initiatives",
        color: "from-gray-600 to-gray-800",
        events: 87,
    },
    {
        name: "Arts & Culture",
        icon: Palette,
        description: "Celebrate diversity through arts and cultural events",
        color: "from-yellow-500 to-orange-500",
        events: 76,
    },
    {
        name: "Food & Nutrition",
        icon: Utensils,
        description: "Combat hunger and promote healthy nutrition",
        color: "from-emerald-500 to-green-500",
        events: 92,
    },
];

export default function Categories() {
    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Explore Event Categories
                    </h2>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                        Find events that match your interests and passion. Every category
                        offers unique opportunities to make a difference.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link
                                to={`/upcoming?type=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block group"
                            >
                                <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-content/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-linear-to-br ${category.color} rounded-xl mb-4 group-hover:scale-110 transition`}>
                                        <category.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold text-xl text-base-content mb-2 group-hover:text-primary transition">
                                        {category.name}
                                    </h3>
                                    <p className="text-base-content/70 mb-4 leading-relaxed">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-primary">
                                            {category.events} events
                                        </span>
                                        <span className="text-sm text-base-content/50 group-hover:text-primary transition">
                                            Explore →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/upcoming"
                        className="btn btn-primary btn-lg px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition"
                    >
                        View All Events
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}