import { categories } from "../data/mockData";

export default function SearchFilter({
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between pb-10">
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 px-4 py-2 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-colors duration-200"
      />
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === cat
                ? "bg-cobalt dark:bg-mustard text-paper dark:text-ink"
                : "bg-ink/5 dark:bg-paper/10 text-ink/70 dark:text-paper/70 hover:bg-ink/10 dark:hover:bg-paper/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
