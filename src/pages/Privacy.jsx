import { motion } from "motion/react";
import { Shield, Lock, Eye, Users } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 rounded-lg shadow-lg p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-base-content mb-4">
              Privacy Policy
            </h1>
            <p className="text-base-content/70">
              Last updated: January 3, 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                Information We Collect
              </h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Account information (name, email, profile picture)</li>
                  <li>Event details you create or manage</li>
                  <li>Events you join or express interest in</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                How We Use Your Information
              </h2>
              <div className="text-base-content/80 space-y-3">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and manage event registrations</li>
                  <li>Send you notifications about events you're interested in</li>
                  <li>Respond to your questions and requests</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Information Sharing
              </h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Other users when you create or join events</li>
                  <li>Service providers who assist in operating our platform</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                <p className="mt-4">
                  Your profile information and event participation are visible to other users as part of the social features of our platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Data Security</h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  We implement industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Your Rights</h2>
              <div className="text-base-content/80 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of non-essential communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Contact Us</h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="font-semibold text-primary">
                  hello@socialevents.id
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
