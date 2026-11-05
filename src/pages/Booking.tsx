import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";
import { useLanguage } from "@/i18n/LanguageContext";

// ?local= lets other pages (clinic pages, social bios) open the form with the
// location already chosen. Anything else is ignored and the field stays empty.
const LOCATIONS = ["lisboa", "cascais", "online"];

const Booking = () => {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const copy = t.bookingPage;
  const requested = params.get("local") ?? "";
  const defaultLocation = LOCATIONS.includes(requested) ? requested : "";
  const url = "https://clinicadesassossego.pt/marcar-consulta";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    // The static tags in index.html are not managed by Helmet, so they would
    // ship next to this page's own ones (and win, being first in the head).
    // Drop them while this page is open, put them back on leaving.
    const staticTags = document.head.querySelectorAll(
      'meta[name="description"]:not([data-rh]), meta[property^="og:"]:not([data-rh])'
    );
    const removed: Element[] = [];
    staticTags.forEach((tag) => {
      removed.push(tag);
      tag.parentNode?.removeChild(tag);
    });
    return () => removed.forEach((tag) => document.head.appendChild(tag));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={url} />
      </Helmet>
      <Header />
      <main className="flex-1 pt-20">
        <h1 className="sr-only">{copy.h1}</h1>
        <BookingSection defaultLocation={defaultLocation} />
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
