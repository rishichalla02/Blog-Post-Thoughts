// src/components/AmazonAdCard.jsx
import React from "react";

export default function AmazonAdCard({
  title = "Recommended Reading for Developers",
  productName = "JavaScript: The Good Parts",
  productImage = "https://m.media-amazon.com/images/I/81kqrwS1nNL._AC_UF1000,1000_QL80_.jpg",
  affiliateUrl = "https://amzn.to/47bi1Dr",
  price = "$29.99"
}) {
  return (
    <div className="my-8 p-4 border border-ink/10 dark:border-paper/10 rounded-xl bg-paper/50 dark:bg-ink/50 max-w-md mx-auto flex items-center gap-4 shadow-sm">
      <img
        src={productImage}
        alt={productName}
        className="w-20 h-24 object-contain rounded-md bg-white p-1"
      />
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-mono uppercase tracking-wider text-cobalt font-semibold block mb-1">
          {title}
        </span>
        <h4 className="text-sm font-semibold text-ink dark:text-paper truncate">
          {productName}
        </h4>
        {price && (
          <p className="text-xs text-ink/60 dark:text-paper/60 font-mono mt-0.5">
            {price}
          </p>
        )}
        <a
          href={affiliateUrl}
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