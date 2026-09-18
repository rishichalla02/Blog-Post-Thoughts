import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const scrollToTop = () => {
    const startY = window.scrollY;
    const duration = 800; // ms — increase for slower, decrease for faster
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY * (1 - eased));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-cobalt dark:bg-mustard text-paper dark:text-ink shadow-lg hover:bg-cobalt/90 dark:hover:bg-mustard/90 transition-colors duration-200"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
