import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "MediaTools - Free Desktop Tools",
  description = "Bộ công cụ desktop miễn phí cho Windows.",
  keywords = "media tools, windows tools, downloader",
}) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}