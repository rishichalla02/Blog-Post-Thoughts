// src/components/AmazonAdCard.jsx
export default function AmazonAdCard({ product }) {
  // If no product attached to the post, render nothing!
  if (!product || !product.affiliateUrl) return null;

  return (
    <div className="my-8 p-4 border border-ink/10 dark:border-paper/10 rounded-xl bg-paper/50 dark:bg-ink/50 max-w-md mx-auto flex items-center gap-4 shadow-sm">
      <img
        src={
          product.productImage ||
          "https://m.media-amazon.com/images/I/41lljoZVf0L.jpg"
        }
        alt={product.productName}
        className="w-20 h-24 object-contain rounded-md bg-white p-1"
      />
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-mono uppercase tracking-wider text-cobalt font-semibold block mb-1">
          {product.title || "Recommended Resource"}
        </span>
        <h4 className="text-sm font-semibold text-ink dark:text-paper truncate">
          {product.productName}
        </h4>
        <p className="text-xs text-ink/60 dark:text-paper/60 font-mono mt-0.5">
          {product.price || "See on Amazon"}
        </p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block mt-3 bg-[#FF9900] hover:bg-[#e88b00] text-black text-xs font-bold px-3 py-1.5 rounded-md transition-colors"
        >
          View on Amazon ↗
        </a>
      </div>
    </div>
  );
}
