import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const slides = [
  {
    title: "Build Stronger Communities Together",
    subtitle: "Join thousands of volunteers making a real difference through social development events",
    bg: "from-green-600 via-green-500 to-teal-600",
    cta1: "Explore Events",
    cta2: "Create Event",
  },
  {
    title: "Empower Change Through Action",
    subtitle: "Connect with like-minded individuals and create lasting impact in your community",
    bg: "from-teal-600 via-blue-500 to-cyan-600",
    cta1: "Find Opportunities",
    cta2: "Start a Project",
  },
  {
    title: "Make Every Moment Count",
    subtitle: "Transform ideas into reality with events that inspire and unite people",
    bg: "from-cyan-600 via-teal-500 to-green-600",
    cta1: "Discover Events",
    cta2: "Organize Now",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className={`relative bg-linear-to-br ${slide.bg} text-white overflow-hidden`} style={{ minHeight: '75vh' }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl lg:text-2xl mb-8 text-green-50 leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/upcoming"
                  className="bg-base-100 text-primary hover:bg-base-200 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition shadow-lg hover:shadow-xl"
                >
                  {slide.cta1}
                </Link>
                <Link
                  to="/create"
                  className="bg-primary hover:bg-primary-focus text-primary-content font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition border-2 border-base-100"
                >
                  {slide.cta2}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce"
      >
        <Link
          to="#features"
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium">Discover More</span>
          <ChevronDown size={24} />
        </Link>
      </motion.div>
    </section>
  );
}
