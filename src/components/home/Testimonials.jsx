import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Community Organizer",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        content: "This platform has transformed how we organize community events. The reach and engagement we've achieved is incredible.",
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Volunteer Coordinator",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        content: "Finding volunteers for our environmental cleanup drives has never been easier. The platform connects us with passionate individuals.",
        rating: 5,
    },
    {
        name: "Emma Rodriguez",
        role: "Social Worker",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        content: "The impact we've made in our community through these events is measurable. Lives are being changed, and it's all thanks to this platform.",
        rating: 5,
    },
];

export default function Testimonials() {
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
                        What Our Community Says
                    </h2>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                        Hear from organizers and volunteers who are making a difference
                        through our platform.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-base-100 p-8 rounded-2xl shadow-sm border border-base-content/5 relative"
                        >
                            <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-lg text-base-content">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-base-content/60">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-base-content/80 leading-relaxed">
                                "{testimonial.content}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}