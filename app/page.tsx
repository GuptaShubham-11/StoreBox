import CallToAction from "@/components/landingPage/CallToActionSection";
import FAQSection from "@/components/landingPage/FAQSSection";
import FeaturesSection from "@/components/landingPage/FeaturesSection";
import Footer from "@/components/landingPage/FooterSection";
import Header from "@/components/landingPage/Header";
import HeroSection from "@/components/landingPage/HeroSection";
import HowItWorksSection from "@/components/landingPage/HowItWorkSection";
import NewsletterSignup from "@/components/landingPage/NewsLetterSignUpSection";
import Pricing from "@/components/landingPage/PricingSection";
import TestimonialsSection from "@/components/landingPage/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToAction />
      <Pricing />
      <NewsletterSignup />
      <FAQSection />
      <Footer />
    </>
  );
}
