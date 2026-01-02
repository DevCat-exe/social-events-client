import { motion } from "motion/react";

export default function About() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-base-content mb-8"
        >
          About Community Events
        </motion.h1>
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 space-y-6 text-base-content/80 lg:text-lg">
          <p>
            Community Events is a platform dedicated to fostering social
            development and community engagement through organized events. Our
            mission is to connect individuals with meaningful opportunities to
            make a positive impact in their neighborhoods.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">
                Our Vision
              </h2>
              <p>
                A world where everyone has the tools and connections to drive
                social change locally.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-secondary">
                Our Values
              </h2>
              <ul className="list-disc list-inside">
                <li>Inclusivity and Respect</li>
                <li>Sustainable Impact</li>
                <li>Empowerment through Action</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
