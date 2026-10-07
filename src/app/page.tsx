import { Hero } from "@/components/Hero";
import { FlavorsSection } from "@/components/FlavorsSection";
import { QualitySection } from "@/components/QualitySection";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { Testimonials } from "@/components/Testimonials";
import { OrderCTA } from "@/components/OrderCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FlavorsSection />
      <QualitySection />
      <BenefitsGrid />
      <Testimonials />
      <OrderCTA />
    </>
  );
}
