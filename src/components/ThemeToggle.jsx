import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-ink/5 dark:bg-paper/10 hover:bg-ink/10 dark:hover:bg-paper/20 transition-colors duration-200"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </motion.button>
  );
}
