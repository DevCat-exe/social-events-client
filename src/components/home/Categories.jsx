import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUpcomingEvents } from "../../api/eventApi";
import {
    Heart,
    TreePine,
    GraduationCap,
    Users,
} from "lucide-react";

const initialCategories = [
    {
        name: "Community",
        icon: Users,
        description: "Help build stronger communities through service projects",
        color: "from-blue-500 to-indigo-500",
        events: 0,
    },
    {
        name: "Education",
        icon: GraduationCap,
        description: "Support learning and educational development initiatives",
        color: "from-purple-500 to-violet-500",
        events: 0,
    },
    {
        name: "Health",
        icon: Heart,
        description: "Promote health and wellness in our society",
        color: "from-red-500 to-pink-500",
        events: 0,
    },
    {
        name: "Environment",
        icon: TreePine,
        description: "Protect our planet through conservation and cleanup efforts",
        color: "from-green-500 to-teal-500",
        events: 0,
    },
];

export default function Categories() {
    const [categories, setCategories] = useState(initialCategories);

    useEffect(() => {
        const fetchCounts = async () => {
            const updatedCategories = await Promise.all(
                initialCategories.map(async (cat) => {
                    try {
                        // Fetching with limit 1 just to get the total count from metadata
                        const data = await getUpcomingEvents(cat.name, '', '', '', 'date', 1, 1);
                        // The API structure returns { events: [...], totalEvents: number, ... }
                        const count = data.totalEvents !== undefined ? data.totalEvents : 0;
                        return { ...cat, events: count };
                    } catch (error) {
                        console.error(`Failed to fetch count for ${cat.name}`, error);
                        return cat;
                    }
                })
            );
            setCategories(updatedCategories);
        };

        fetchCounts();
    }, []);

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
                        Find events that match your interests and passion.
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
                                to={`/upcoming?type=${category.name}`}
                                className="block group"
                            >
                                <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-content/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-linear-to-br ${category.color} rounded-xl mb-4 group-hover:scale-110 transition`}>
                                        <category.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold text-xl text-base-content mb-2 group-hover:text-primary transition">
                                        {category.name}
                                    </h3>
                                    <p className="text-base-content/70 mb-4 leading-relaxed line-clamp-2">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
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