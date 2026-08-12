import { motion } from "framer-motion";

export default function HeroBanner() {
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

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative font-mono text-xs uppercase tracking-widest text-mustard mb-4"
      >
        Vol. 01 — Notes on building things
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative font-display text-4xl sm:text-5xl md:text-6xl font-700 leading-[1.05] max-w-3xl"
      >
        Stories worth reading, written by people who build.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative text-ink/60 mt-5 max-w-xl text-lg"
      >
        A publication for engineers, makers, and the curious in between.
      </motion.p>
    </section>
  );
}
