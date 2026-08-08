export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-paper/10 mt-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-lg text-ink dark:text-paper">RC-Blog</span>
        <p className="text-sm text-ink/60 dark:text-paper/60 font-mono">
          © {new Date().getFullYear()} RC-Blog. Built with MERN.
        </p>
      </div>
    </footer>
  );
}