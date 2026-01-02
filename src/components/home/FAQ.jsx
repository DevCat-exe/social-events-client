import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "How do I create an event?",
        answer: "Simply sign up for an account, click 'Create Event' in the navigation, and fill out the event details including title, description, date, location, and category. Your event will be published immediately.",
    },
    {
        question: "Is there a fee to use the platform?",
        answer: "No, our platform is completely free for both event organizers and volunteers. We believe in making social development accessible to everyone.",
    },
    {
        question: "How can I find events in my area?",
        answer: "Use our search and filter options on the Events page. You can filter by location, date, category, and more to find events that match your interests and availability.",
    },
    {
        question: "Can I volunteer for multiple events?",
        answer: "Absolutely! You can join as many events as you'd like. This allows you to contribute to multiple causes and make an even greater impact in your community.",
    },
    {
        question: "What types of events can I organize?",
        answer: "You can organize any social development event including environmental cleanups, community service, educational workshops, fundraising events, and more. We support all positive social impact initiatives.",
    },
    {
        question: "How do I contact event organizers?",
        answer: "Once you join an event, you'll have access to the organizer's contact information and any additional details about the event through your dashboard.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                        <HelpCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-base-content/70">
                        Everything you need to know about getting started
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-base-200 rounded-2xl border border-base-content/5 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-base-300/50 transition"
                            >
                                <span className="font-semibold text-lg text-base-content">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-base-content/60 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="px-6 pb-4"
                                >
                                    <p className="text-base-content/80 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}