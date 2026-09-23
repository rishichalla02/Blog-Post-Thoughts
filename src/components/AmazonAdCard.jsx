// Fallback ad data in case no product prop is passed
const DEFAULT_AMAZON_AD = {
  title: "Samsung Galaxy S26 Ultra 5G",
  productName:
    "Samsung Galaxy S26 Ultra 5G (Cobalt Violet, 12GB RAM, 256GB Storage) with Built-in Privacy Display, AI Phone, Photo Assist, Creative Studio, 200MP Camera, 5000mAh Battery and Snapdragon 8 Elite Gen 5",
  productImage: "https://m.media-amazon.com/images/I/41lljoZVf0L.jpg",
  affiliateUrl: "https://amzn.to/4ykZC2U",
  price: "Check on Amazon",
};

export default function AmazonAdCard({ product }) {
  const ad = product && product.affiliateUrl ? product : DEFAULT_AMAZON_AD;

  return (
    <div className="my-8 p-4 border border-ink/10 dark:border-paper/10 rounded-xl bg-paper/50 dark:bg-ink/50 max-w-md mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm">
      <img
        src={
          ad.productImage ||
          "https://m.media-amazon.com/images/I/41lljoZVf0L.jpg"
        }
        alt={ad.productName}
        className="w-24 h-28 sm:w-20 sm:h-24 object-contain rounded-md bg-white p-1 shrink-0"
      />
      <div className="flex-1 min-w-0 text-center sm:text-left w-full">
        <span className="text-[10px] font-mono uppercase tracking-wider text-cobalt font-semibold block mb-1">
          {ad.title || "Recommended Resource"}
        </span>
        <h4 className="text-sm font-semibold text-ink dark:text-paper line-clamp-2 sm:truncate">
          {ad.productName}
        </h4>
        <p className="text-xs text-ink/60 dark:text-paper/60 font-mono mt-0.5">
          {ad.price || "See on Amazon"}
        </p>
        <a
          href={ad.affiliateUrl}
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
