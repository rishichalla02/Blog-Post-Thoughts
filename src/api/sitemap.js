export default async function handler(req, res) {
  try {
    const apiUrl =
      process.env.VITE_API_URL || "https://blog-post-thoughts.onrender.com/api";
    const response = await fetch(`${apiUrl}/blogs`);
    const posts = await response.json();

    const siteUrl = "https://blog-post-thoughts.vercel.app";

    const staticUrls = [
      { loc: `${siteUrl}/`, priority: "1.0" },
      { loc: `${siteUrl}/login`, priority: "0.3" },
      { loc: `${siteUrl}/register`, priority: "0.3" },
      { loc: `${siteUrl}/privacy-policy`, priority: "0.2" },
    ];

    const postUrls = Array.isArray(posts)
      ? posts.map((post) => ({
          loc: `${siteUrl}/blog/${post._id}`,
          lastmod: new Date(post.updatedAt || post.createdAt).toISOString(),
          priority: "0.8",
        }))
      : [];

    const allUrls = [...staticUrls, ...postUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send("Could not generate sitemap");
  }
}
