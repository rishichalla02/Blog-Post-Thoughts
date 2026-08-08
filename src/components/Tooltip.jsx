import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 whitespace-nowrap text-xs font-medium px-2.5 py-1.5 rounded-md bg-ink text-paper dark:bg-paper dark:text-ink shadow-lg z-50"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
