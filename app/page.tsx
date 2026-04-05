import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Coverage from "@/components/Coverage";
import Trades from "@/components/Trades";
import CompareTable from "@/components/CompareTable";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Coverage />
      <Trades />
      <CompareTable />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
      <ChatWidget />
    </>
  );
}
