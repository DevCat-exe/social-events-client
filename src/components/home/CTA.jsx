import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-20 bg-linear-to-br from-primary to-secondary text-primary-content relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                        <Sparkles className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                        Join thousands of volunteers and organizers creating positive change
                        in communities worldwide. Your next meaningful contribution awaits.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        to="/register"
                        className="group bg-white text-primary hover:bg-gray-50 font-bold px-8 py-4 rounded-full transition shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                        Get Started Today
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </Link>
                    <Link
                        to="/upcoming"
                        className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-8 py-4 rounded-full transition flex items-center gap-2"
                    >
                        Explore Events
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-3xl font-bold mb-2">Free</div>
                        <div className="text-sm opacity-90">No registration fees</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-3xl font-bold mb-2">Global</div>
                        <div className="text-sm opacity-90">Connect worldwide</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-3xl font-bold mb-2">Impact</div>
                        <div className="text-sm opacity-90">Make real change</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}