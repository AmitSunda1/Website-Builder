import Navbar from '@/components/organisms/Navbar';
import Hero from '@/components/organisms/Hero';
import LogoTicker from '@/components/organisms/LogoTicker';
import Features from '@/components/organisms/Features';
import Pricing from '@/components/organisms/Pricing';
import UseCases from '@/components/organisms/UseCases';
import PricingPlans from '@/components/organisms/PricingPlans';
import Integrations from '@/components/organisms/Integrations';
import FAQ from '@/components/organisms/FAQ';
import CTA from '@/components/organisms/CTA';
import Footer from '@/components/organisms/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Features />
        <Pricing />
        <UseCases />
        <PricingPlans />
        <Integrations />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
