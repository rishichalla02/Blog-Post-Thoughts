import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Github, Globe, Mail } from "lucide-react";
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
                <Mail size={18} />
                rishichalla4@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/rishi-challa-404955292"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cobalt dark:text-mustard hover:underline w-fit"
              >
                <Linkedin size={18} />
                LinkedIn — Rishi Challa
              </a>
              <a
                href="https://github.com/rishichalla02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cobalt dark:text-mustard hover:underline w-fit"
              >
                <Github size={18} />
                GitHub — rishichalla02
              </a>
              <a
                href="https://portfolio-react-lyart-one.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cobalt dark:text-mustard hover:underline w-fit"
              >
                <Globe size={18} />
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
