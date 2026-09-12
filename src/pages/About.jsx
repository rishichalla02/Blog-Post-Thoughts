import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";

export default function About() {
  return (
    <AnimatedPage>
      <SEO
        title="About"
        description="Who writes RC-Blog, what it's about, and how to get in touch."
      />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl font-700 mb-6"
        >
          About RC-Blog
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 text-ink/80 dark:text-paper/80 leading-relaxed text-lg"
        >
          <p>
            RC-Blog is written and maintained by Rishi Challa, an independent
            developer based in Gujarat, India. I recently graduated and now work
            as a freelance developer, building commercial Android applications
            with Expo and React Native, alongside full-stack web projects using
            the MERN stack.
          </p>

          <p>
            This site started as a hands-on way to learn and document the full
            MERN stack — React, Express, MongoDB, and Node — from the ground up,
            and has since become a running log of real engineering work:
            authentication systems, deployment pipelines, debugging sessions,
            and the architecture decisions behind them.
          </p>

          <p>
            Every post here comes out of something I actually built, broke,
            debugged, or shipped — real production issues, real bugs with their
            actual error messages, and the reasoning that led to each fix.
            Nothing here is auto-generated or filler; if a post exists, it's
            because I hit that exact problem and wanted to write down how I
            solved it, both for my own reference and for anyone else hitting the
            same wall.
          </p>

          <p>
            The focus is practical software engineering — mobile app
            development, full-stack web architecture, deployment and
            infrastructure, debugging real production issues, and occasional
            detours into UI design and developer tooling.
          </p>

          <p>
            I'm currently open to new freelance projects and full-time
            opportunities as a developer. If you're hiring, have a project in
            mind, or just want to talk shop about something I've written, I'd
            genuinely like to hear from you.
          </p>

          <div className="pt-6 border-t border-ink/10 dark:border-paper/10">
            <h2 className="font-display text-xl font-600 text-ink dark:text-paper mb-4">
              Get in touch
            </h2>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:rishichalla4@gmail.com"
                className="flex items-center gap-2.5 text-cobalt dark:text-mustard hover:underline w-fit"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                rishichalla4@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/rishi-challa-404955292"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cobalt dark:text-mustard hover:underline w-fit"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn — Rishi Challa
              </a>
              <a
                href="https://github.com/rishichalla02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cobalt dark:text-mustard hover:underline w-fit"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub — rishichalla02
              </a>
              <a
                href="https://portfolio-react-lyart-one.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cobalt dark:text-mustard hover:underline w-fit"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Portfolio — Portfolio-RC
              </a>
            </div>
          </div>
        </motion.div>

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
