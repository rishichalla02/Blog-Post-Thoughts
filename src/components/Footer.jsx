export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-lg">RC-Blog</span>
        <p className="text-sm text-ink/60 font-mono">
          © {new Date().getFullYear()} RC-Blog. Built with MERN.
        </p>
      </div>
    </footer>
  );
}
