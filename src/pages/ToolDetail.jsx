import { useParams, Navigate } from "react-router-dom";
import { tools } from "../data/tools";

import ToolHero from "../components/tool/ToolHero";
import FeatureGrid from "../components/tool/FeatureGrid";
import ScreenshotSection from "../components/tool/ScreenshotSection";
import SystemInfo from "../components/tool/SystemInfo";
import FAQMini from "../components/tool/FAQMini";
import CTASection from "../components/shared/CTASection";
import SEO from "../components/shared/SEO";

export default function ToolDetail() {
  const { slug } = useParams();
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <SEO
        title={`${tool.name} - Free Download`}
        description={tool.description}
      />

      <ToolHero tool={tool} />
      <FeatureGrid features={tool.features} />
      <ScreenshotSection screenshots={tool.screenshots} />
      <SystemInfo requirements={tool.requirements} />
      <FAQMini faqs={tool.faqs} />
      <CTASection />
    </>
  );
}