import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProtocolsSection from "@/components/ProtocolsSection";
import BookingSection from "@/components/BookingSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <HeroSection />
    <ServicesSection />
    <AboutSection />
    <ProtocolsSection />
    <BookingSection />
    <ContactsSection />
    <Footer />
  </div>
);

export default Index;
