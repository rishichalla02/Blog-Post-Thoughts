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
          Last updated: August 2026
        </p>

        <div className="space-y-8 text-ink/80 dark:text-paper/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Overview
            </h2>
            <p>
              RC-Blog ("we," "our," or "this site") is a blogging platform. This
              policy explains what information is collected when you use the
              site, how it's used, and the choices available to you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Information we collect
            </h2>
            <p className="mb-3">When you create an account, we collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name and email address</li>
              <li>A securely hashed password (never stored in plain text)</li>
              <li>
                Any bio or avatar image URL you choose to add to your profile
              </li>
              <li>
                Content you publish, including post titles, categories, and body
                text
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Cookies and local storage
            </h2>
            <p>
              This site stores a login session token in your browser's local
              storage to keep you signed in. It also remembers your light/dark
              theme preference locally. These are not third-party tracking
              cookies set by us directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Advertising
            </h2>
            <p>
              This site may display advertisements served by third-party
              advertising companies, including Google AdSense. These providers
              may use cookies, web beacons, or similar technologies to serve ads
              based on your prior visits to this or other websites.
            </p>
            <p className="mt-3">
              Google's use of advertising cookies enables it and its partners to
              serve ads based on your visits to this site and/or other sites on
              the Internet. You can opt out of personalized advertising by
              visiting{" "}
              <a>
                href="https://adssettings.google.com" target="_blank"
                rel="noopener noreferrer" className="text-cobalt
                dark:text-mustard hover:underline" Google Ads Settings
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
                To display your published posts and author profile publicly
              </li>
              <li>To authenticate you when you log in</li>
              <li>To improve the site's functionality and content</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Data sharing
            </h2>
            <p>
              We do not sell your personal information. Data may be shared with
              third-party advertising partners (see the Advertising section
              above) as part of standard ad-serving practices, and with
              hosting/infrastructure providers (such as MongoDB Atlas, Render,
              and Vercel) solely to operate the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Your choices
            </h2>
            <p>
              You can edit or delete your profile information, and edit or
              delete any post you've authored, at any time from your dashboard.
              To request full account deletion, contact us using the details
              below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Children's privacy
            </h2>
            <p>
              This site is not directed at children under 13, and we do not
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Changes to this policy
            </h2>
            <p>
              This policy may be updated periodically. Continued use of the site
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-2">
              Contact
            </h2>
            <p>
              For questions about this policy or your data, reach out via the
              contact details on our{" "}
              <Link
                to="/"
                className="text-cobalt dark:text-mustard hover:underline"
              >
                homepage
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </AnimatedPage>
  );
}
