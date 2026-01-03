import { motion } from "motion/react";
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";

export default function Terms() {
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
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-base-content mb-4">
              Terms of Service
            </h1>
            <p className="text-base-content/70">
              Last updated: January 3, 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Acceptance of Terms</h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  By accessing or using SocialEvents, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                User Responsibilities
              </h2>
              <div className="text-base-content/80 space-y-3">
                <p>As a user of SocialEvents, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Provide accurate and complete information when creating your account</li>
                  <li>Maintain the security of your account and password</li>
                  <li>Create events with truthful and appropriate content</li>
                  <li>Respect other users and their events</li>
                  <li>Follow all applicable laws and regulations</li>
                  <li>Not use the platform for any illegal or harmful purposes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Prohibited Activities
              </h2>
              <div className="text-base-content/80 space-y-3">
                <p>You may not:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Create events with false or misleading information</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Post inappropriate or offensive content</li>
                  <li>Impersonate any person or entity</li>
                  <li>Use automated tools to spam or disrupt the platform</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Event Guidelines
              </h2>
              <div className="text-base-content/80 space-y-3">
                <p>When creating or joining events, please note:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Event organizers are responsible for the accuracy of event information</li>
                  <li>Joining an event does not guarantee participation</li>
                  <li>Event details may change at the organizer's discretion</li>
                  <li>SocialEvents is not responsible for events organized by users</li>
                  <li>Attendees should verify event details before participating</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Content and Intellectual Property</h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  You retain ownership of the content you post on SocialEvents. By posting content, you grant us a license to use, display, and distribute it for the purpose of operating our platform.
                </p>
                <p className="mt-4">
                  SocialEvents and its logo are trademarks of our company. You may not use our trademarks without permission.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Account Suspension and Termination</h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  We reserve the right to suspend or terminate your account if you violate these Terms of Service or engage in harmful activities. You may also delete your account at any time through your profile settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Limitation of Liability</h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  SocialEvents is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform, including but not limited to indirect, incidental, or consequential damages.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Changes to Terms</h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  We may update these Terms of Service from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-base-content mb-4">Contact Us</h2>
              <div className="text-base-content/80 space-y-3">
                <p>
                  If you have questions about these Terms of Service, please contact us at:
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
