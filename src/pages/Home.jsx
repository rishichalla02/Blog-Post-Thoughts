import { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import SearchFilter from "../components/SearchFilter";
import PostCard from "../components/PostCard";
import AnimatedPage from "../components/AnimatedPage";
import api from "../api/axios";
import SEO from "../components/SEO";
// import AdBanner from "../components/AdBanner";
import AAdsBanner from "../components/AAdsBanner";
import MyBidAds from "../components/MyBidAds";
import ClickAdiilaBanner from "../components/ClickAdiilaBanner";
import { getRandomAmazonAd } from "../data/amazonAds";
import AmazonAdCard from "../components/AmazonAdCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Selects an ad automatically
  const adProduct = getRandomAmazonAd();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchPosts = async () => {
        setLoading(true);
        setError("");
        try {
          const params = {};
          if (search) params.search = search;
          if (activeCategory !== "All") params.category = activeCategory;

          const { data } = await api.get("/blogs", { params });
          setPosts(data);
        } catch (err) {
          setError("Could not load posts. Is the backend running?");
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search, activeCategory]);

  const featuredAffiliateProduct = posts.find(
    (p) => p.affiliateProduct && p.affiliateProduct.affiliateUrl,
  )?.affiliateProduct;

  return (
    <AnimatedPage>
      <SEO
        title="Home"
        description="Stories worth reading, written by people who build."
      />
      <HeroBanner />
      <SearchFilter
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <section className="max-w-6xl mx-auto px-6 pb-20 min-h-[200px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-ink/40 dark:text-paper/40 font-mono">
              Waking up the server — this can take up to 30s on first load
            </p>
          </div>
        ) : error ? (
          <p className="text-red-600 font-mono text-sm">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-ink/50 dark:text-paper/50 font-mono text-sm">
            No articles match your search.
          </p>
        ) : (
          <>
            <p className="text-xs text-ink/40 dark:text-paper/40 font-mono uppercase tracking-wide mb-6">
              {posts.length} article{posts.length === 1 ? "" : "s"}
            </p>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div> */}

            {/* 1. First Group: Posts 1 to 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.slice(0, 3).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Amazon Ad Banner after 3 posts */}
            {posts.length > 3 && (
              <div className="my-8 flex justify-center">
                <AmazonAdCard product={adProduct} />
              </div>
            )}

            {/* 2. Second Group: Posts 4 to 6 */}
            {posts.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {posts.slice(3, 6).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            {/* AAds Banner after 6 posts */}
            {posts.length > 6 && (
              <div className="my-10 min-h-[100px] flex items-center justify-center">
                <AAdsBanner />
              </div>
            )}
            <MyBidAds />
            <ClickAdiilaBanner />

            {/* 3. Third Group: Posts 7 and beyond */}
            {posts.length > 6 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {posts.slice(6).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            {/* {posts.length > 6 && (
              <div className="my-10 min-h-[100px] flex items-center justify-center">
                <AdBanner slot="8907364131" />
              </div>
            )} */}

            {/* {posts.length > 6 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {posts.slice(6).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )} */}
          </>
        )}
      </section>
    </AnimatedPage>
  );
}
