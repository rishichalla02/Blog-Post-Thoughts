import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    vol: "Vol. 01",
    tagline: "Notes on building things",
    headline: "Stories worth reading, written by people who build.",
    sub: "A publication for engineers, makers, and the curious in between.",
  },
  {
    vol: "Vol. 02",
    tagline: "Ideas in progress",
    headline: "Thoughts that started as a comment on someone else's code.",
    sub: "Where half-finished ideas get written down before they disappear.",
  },
  {
    vol: "Vol. 03",
    tagline: "Field notes from the terminal",
    headline: "The bugs, the fixes, and everything in between.",
    sub: "Real problems, real solutions, written the way they actually happened.",
  },
  {
    vol: "Vol. 04",
    tagline: "Shipped and learned",
    headline: "What breaks in production teaches more than any tutorial.",
    sub: "Honest write-ups from people who hit the edge cases first.",
  },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 12000); // 12 seconds

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-10 overflow-hidden">
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-mustard/20 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 left-0 w-56 h-56 rounded-full bg-cobalt/10 blur-3xl"
        animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <p className="relative font-mono text-xs uppercase tracking-widest text-mustard mb-4">
            {current.vol} — {current.tagline}
          </p>

          <h1 className="relative font-display text-4xl sm:text-5xl md:text-6xl font-700 leading-[1.05] max-w-3xl">
            {current.headline}
          </h1>

          <p className="relative text-ink/60 dark:text-paper/60 mt-5 max-w-xl text-lg">
            {current.sub}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
