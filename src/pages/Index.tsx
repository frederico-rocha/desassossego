import { Helmet } from "react-helmet-async";
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
    <Helmet>
      <title>desasSossego — Clínica de Psicologia em Lisboa</title>
      <meta
        name="description"
        content="Clínica desasSossego — Psicologia Clínica em Lisboa. Acompanhamento psicológico para adultos e famílias."
      />
      <link rel="canonical" href="https://clinicadesassossego.pt/" />
      <meta property="og:title" content="desasSossego — Clínica de Psicologia" />
      <meta
        property="og:description"
        content="Acompanhamento psicológico para adultos e famílias em Lisboa e Cascais."
      />
      <meta property="og:url" content="https://clinicadesassossego.pt/" />
    </Helmet>
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
