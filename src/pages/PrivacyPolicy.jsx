import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <AnimatedPage>
      <SEO title="Privacy Policy" description="Privacy policy for RC-Blog." />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-700 mb-2">Privacy Policy</h1>
        <p className="text-sm text-ink/50 dark:text-paper/50 font-mono mb-10">
          Last updated: September 2026
        </p>

        <div className="space-y-8 text-ink/80 dark:text-paper/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Overview
            </h2>
            <p>
              RC-Blog ("we," "our," or "this site") is a personal blogging
              platform operated by Rishi Challa. This policy explains what
              information is collected when you use the site, how it's used, who
              it may be shared with, and the choices available to you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Information we collect
            </h2>
            <p className="mb-3">
              If you create an account on this site, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name and email address</li>
              <li>
                A securely hashed password — we never store or have access to
                your plain-text password
              </li>
              <li>
                Any bio or avatar image URL you choose to add to your profile
              </li>
              <li>
                Content you publish, including post titles, categories, tags,
                and body text
              </li>
              <li>Any comments you post on articles</li>
            </ul>
            <p className="mt-3">
              If you do not create an account, we do not collect any personal
              information beyond what is described in the Advertising and
              Analytics sections below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Cookies and local storage
            </h2>
            <p>
              This site stores a login session token in your browser's local
              storage to keep you signed in between visits. It also remembers
              your light/dark theme preference locally, on your device only.
              Neither of these are shared with us or any third party — they
              exist solely in your own browser.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Advertising
            </h2>
            <p>
              This site displays advertisements served by Google AdSense.
              Google, as a third-party vendor, uses cookies to serve ads based
              on your prior visits to this and other websites on the internet.
              Google's use of advertising cookies enables it and its partners to
              serve ads to you based on your visit to this site and/or other
              sites.
            </p>
            <p className="mt-3">
              You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cobalt dark:text-mustard hover:underline"
              >
                Google Ads Settings
              </a>
              . Third-party vendors, including Google, may also use cookies to
              serve ads based on a user's prior visits to this site. Users may
              opt out of the use of the DoubleClick cookie for interest-based
              advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cobalt dark:text-mustard hover:underline"
              >
                Google's Ads Settings
              </a>
              , or opt out of a third-party vendor's use of cookies for
              interest-based advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/choices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cobalt dark:text-mustard hover:underline"
              >
                aboutads.info
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              How we use your information
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To create and manage your account</li>
              <li>
                To display your published posts, comments, and author profile
                publicly on the site
              </li>
              <li>To authenticate you when you log in</li>
              <li>To respond to you if you contact us directly</li>
              <li>To maintain and improve the site's functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Data sharing
            </h2>
            <p>
              We do not sell your personal information to anyone. Data may be
              shared in the following limited circumstances: with Google
              AdSense, as part of standard ad-serving practices described above;
              and with the infrastructure providers that host this site —
              MongoDB Atlas (database hosting), Render (backend hosting), and
              Vercel (frontend hosting) — solely to operate the site. None of
              these providers use your data for their own independent purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Your rights and choices
            </h2>
            <p>
              You can view, edit, or delete your profile information at any time
              from your dashboard. You can edit or delete any post or comment
              you've authored at any time. To request full account deletion,
              including removal of your personal data from our database, contact
              us using the details below and we will process the request within
              a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Data security
            </h2>
            <p>
              Passwords are hashed using industry-standard encryption (bcrypt)
              before storage — we cannot view or recover your original password
              at any point. All traffic to this site is encrypted via HTTPS.
              While no system can guarantee absolute security, we take
              reasonable measures to protect your information from unauthorized
              access.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Children's privacy
            </h2>
            <p>
              This site is not directed at children under 13, and we do not
              knowingly collect personal information from children under 13. If
              you believe a child has provided us with personal information,
              please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Changes to this policy
            </h2>
            <p>
              This policy may be updated periodically to reflect changes in how
              the site operates or to comply with legal requirements. The "Last
              updated" date at the top of this page reflects the most recent
              revision. Continued use of the site after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Contact
            </h2>
            <p>
              For questions about this policy, your data, or anything else
              related to this site, contact us at{" "}
              <a
                href="mailto:rishichalla4@gmail.com"
                className="text-cobalt dark:text-mustard hover:underline"
              >
                rishichalla4@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-ink/10 dark:border-paper/10">
          <Link
            to="/"
            className="text-sm text-cobalt dark:text-mustard font-medium hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </AnimatedPage>
  );
}
