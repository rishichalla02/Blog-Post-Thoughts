import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-paper/10 mt-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-lg text-ink dark:text-paper">
          RC-Blog
        </span>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-ink/60 dark:text-paper/60">
          <a
            href="mailto:rishichalla4@gmail.com"
            className="flex items-center gap-1.5 hover:text-cobalt dark:hover:text-mustard transition-colors duration-200"
          >
            <Mail size={14} />
            rishichalla4@gmail.com
          </a>
          <a
            href="/privacy-policy"
            className="hover:text-cobalt dark:hover:text-mustard transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <p className="font-mono">
            © {new Date().getFullYear()} RC-Blog. Built with MERN.
          </p>
        </div>
      </div>
    </footer>
  );
}
