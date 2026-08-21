import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";

export default function About() {
  return (
    <AnimatedPage>
      <SEO title="About" description="Who writes RC-Blog and why it exists." />
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
            developer based in Gujarat, India, building commercial Android
            applications with Expo and React Native.
          </p>

          <p>
            This site started as a hands-on way to learn and document the full
            MERN stack — React, Express, MongoDB, and Node — from the ground up.
            Every post here comes out of something actually built, broken,
            debugged, or shipped: real deployment issues, real auth bugs, real
            architecture decisions, and the reasoning behind them.
          </p>

          <p>
            The focus is practical software development — mobile app
            engineering, full-stack web development, debugging real production
            issues, and the occasional detour into UI design and developer
            tooling. No auto-generated content, no filler — everything published
            here is written from direct experience.
          </p>

          <p>
            If something on this blog helped you, or you spot something worth
            discussing, feel free to leave a comment on any post — or reach out
            directly.
          </p>

          <div className="pt-4">
            <a
              href="mailto:rishichalla4@gmail.com"
              className="text-cobalt dark:text-mustard font-medium hover:underline"
            >
              rishichalla4@gmail.com
            </a>
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
