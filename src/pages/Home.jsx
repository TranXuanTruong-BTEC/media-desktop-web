import Hero from "../components/home/Hero";
import TrustSection from "../components/home/TrustSection";
import FeaturedTools from "../components/home/FeaturedTools";
import WhySection from "../components/home/WhySection";
import HowItWorks from "../components/home/HowItWorks";
import FAQ from "../components/home/FAQ";
import CTASection from "../components/shared/CTASection";
import SEO from "../components/shared/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="MediaTools - Free Desktop Tools for Windows"
        description="Bộ công cụ desktop miễn phí cho Windows. Nhanh, nhẹ, không quảng cáo."
      />

      <Hero />
      <TrustSection />
      <FeaturedTools />
      <WhySection />
      <HowItWorks />
      <FAQ />
      <CTASection />
    </>
  );
}