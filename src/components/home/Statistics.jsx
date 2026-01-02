import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Users, Calendar, MapPin, Award } from "lucide-react";

const stats = [
    {
        icon: Users,
        value: 12500,
        label: "Active Volunteers",
        suffix: "+",
    },
    {
        icon: Calendar,
        value: 850,
        label: "Events Organized",
        suffix: "+",
    },
    {
        icon: MapPin,
        value: 45,
        label: "Cities Covered",
        suffix: "+",
    },
    {
        icon: Award,
        value: 98,
        label: "Success Rate",
        suffix: "%",
    },
];

const Counter = ({ value, suffix, inView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = value / steps;
            const stepDuration = duration / steps;

            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepDuration);

            return () => clearInterval(timer);
        }
    }, [inView, value]);

    return (
        <span className="text-3xl md:text-4xl font-bold text-primary whitespace-nowrap block">
            {count}
            {suffix}
        </span>
    );
};

export default function Statistics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Making a Real Impact
                    </h2>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                        Join a growing community of change-makers who are transforming lives
                        through meaningful social development initiatives.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center p-6 bg-base-200 rounded-2xl shadow-sm border border-base-content/5"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <stat.icon className="w-8 h-8 text-primary" />
                            </div>
                            <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
                            <p className="text-lg font-semibold text-base-content mt-2">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}