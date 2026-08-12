import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, image, url }) {
  const fullTitle = title
    ? `${title} | RC-Blog`
    : "RC-Blog — Stories worth reading";
  const desc =
    description ||
    "A publication for engineers, makers, and the curious in between.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="article" />
    </Helmet>
  );
}
