import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Mail, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";
import { useLanguage } from "@/i18n/LanguageContext";

type ClinicKey = "lisboa" | "cascais";

const CLINICS = {
  lisboa: {
    path: "/psicologia-lisboa",
    city: "Lisboa",
    street: "Av. António Serpa, 32, 8.º C",
    postal: "1050-027",
    mapQuery: "desasSossego - Psicologia Clínica, Lisboa",
    other: "cascais" as ClinicKey,
    pt: {
      title: "Psicólogo em Lisboa — Clínica desasSossego | Avenidas Novas",
      description:
        "Consultas de psicologia e psicoterapia psicanalítica em Lisboa, nas Avenidas Novas. Crianças, adolescentes, adultos e casais. Presencial e online.",
      h1: "Clínica de Psicologia em Lisboa",
      intro:
        "A nossa clínica em Lisboa fica na Av. António Serpa, nas Avenidas Novas, junto ao Campo Pequeno. Um espaço tranquilo para consultas de psicologia clínica e psicoterapia psicanalítica, ajustadas a cada fase da vida.",
      access:
        "Acessos: Metro Campo Pequeno (linha amarela) e Saldanha, várias carreiras da Carris e estacionamento na zona.",
    },
    en: {
      title: "Psychologist in Lisbon — desasSossego Clinic | Avenidas Novas",
      description:
        "Psychology and psychoanalytic psychotherapy in Lisbon (Avenidas Novas). Children, teenagers, adults and couples. In person and online, in English.",
      h1: "Psychology Clinic in Lisbon",
      intro:
        "Our Lisbon clinic is on Av. António Serpa, in Avenidas Novas, near Campo Pequeno. A calm space for clinical psychology and psychoanalytic psychotherapy, adjusted to every stage of life.",
      access:
        "Getting here: Campo Pequeno and Saldanha metro stations (yellow line), several bus routes and parking nearby.",
    },
  },
  cascais: {
    path: "/psicologia-cascais",
    city: "Cascais",
    street: "Av. 25 de Abril, Edif. Alvorada, 672, 5A, Sala 7",
    postal: "2750-512",
    mapQuery: "desasSossego - Psicologia Clínica, Cascais",
    other: "lisboa" as ClinicKey,
    pt: {
      title: "Psicólogo em Cascais — Clínica desasSossego",
      description:
        "Consultas de psicologia e psicoterapia psicanalítica em Cascais. Crianças, adolescentes, adultos e casais. Presencial e online, perto do centro de Cascais.",
      h1: "Clínica de Psicologia em Cascais",
      intro:
        "A nossa clínica em Cascais fica na Av. 25 de Abril, no Edifício Alvorada, perto do centro da vila. Acompanhamento psicológico e psicoterapia psicanalítica para quem vive na Linha de Cascais.",
      access:
        "Acessos: a poucos minutos a pé da estação de comboio de Cascais e do terminal de autocarros, com estacionamento na zona.",
    },
    en: {
      title: "Psychologist in Cascais — desasSossego Clinic",
      description:
        "Psychology and psychoanalytic psychotherapy in Cascais. Children, teenagers, adults and couples. In person and online, in English, near Cascais centre.",
      h1: "Psychology Clinic in Cascais",
      intro:
        "Our Cascais clinic is on Av. 25 de Abril, in the Alvorada building, close to the town centre. Psychological support and psychoanalytic psychotherapy for those living along the Cascais line.",
      access:
        "Getting here: a few minutes' walk from Cascais train station and bus terminal, with parking nearby.",
    },
  },
};

const COMMON = {
  pt: {
    back: "Voltar ao início",
    servicesTitle: "Consultas disponíveis",
    services: [
      "Psicoterapia psicanalítica para adultos",
      "Psicologia infantil e juvenil",
      "Terapia de casal e família",
      "Consultas online",
    ],
    infoTitle: "Morada e contactos",
    hours: "Seg–Sex 9h–20h · Sáb 9h–13h",
    book: "Marcar consulta",
    otherLabel: "Veja também a nossa clínica em",
  },
  en: {
    back: "Back to home",
    servicesTitle: "Available services",
    services: [
      "Psychoanalytic psychotherapy for adults",
      "Child and adolescent psychology",
      "Couple and family therapy",
      "Online sessions",
    ],
    infoTitle: "Address and contacts",
    hours: "Mon–Fri 9am–8pm · Sat 9am–1pm",
    book: "Book a session",
    otherLabel: "See also our clinic in",
  },
};

const Clinic = ({ clinic }: { clinic: ClinicKey }) => {
  const { lang } = useLanguage();
  const c = CLINICS[clinic];
  const copy = c[lang];
  const common = COMMON[lang];
  const url = `https://clinicadesassossego.pt${c.path}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.head
      .querySelectorAll('meta[name="description"]:not([data-rh])')
      .forEach((tag) => tag.parentNode?.removeChild(tag));
  }, [clinic]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `Clínica desasSossego — ${c.city}`,
    url,
    telephone: "+351 910 786 339",
    email: "geral@clinicadesassossego.pt",
    medicalSpecialty: "Psychiatric",
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      postalCode: c.postal,
      addressLocality: c.city,
      addressCountry: "PT",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
    ],
  };

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
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />
      <main className="flex-1 section-padding pt-32">
        <article className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {common.back}
            </Link>
            <a
              href="#reservar"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              {common.book}
            </a>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">{copy.h1}</h1>
            <p className="font-body text-muted-foreground leading-relaxed mt-6 text-base">{copy.intro}</p>
          </motion.div>

          <section className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{common.servicesTitle}</h2>
              <ul className="space-y-2 font-body text-muted-foreground">
                {common.services.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">{common.infoTitle}</h2>
              <ul className="space-y-3 font-body text-muted-foreground text-sm">
                <li className="flex gap-3"><MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{c.street}<br />{c.postal} {c.city}</span></li>
                <li className="flex gap-3"><Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" /><a href="tel:+351910786339" className="hover:text-primary">+351 910 786 339</a></li>
                <li className="flex gap-3"><Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" /><a href="mailto:geral@clinicadesassossego.pt" className="hover:text-primary break-all">geral@clinicadesassossego.pt</a></li>
                <li className="flex gap-3"><Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{common.hours}</span></li>
              </ul>
            </div>
          </section>

          <p className="font-body text-muted-foreground mt-6 text-sm">{copy.access}</p>

          <div className="rounded-xl overflow-hidden border border-border h-80 mt-8">
            <iframe
              title={`Clínica desasSossego — ${c.city}`}
              src={`https://maps.google.com/maps?f=q&hl=pt-PT&q=${encodeURIComponent(c.mapQuery)}&z=17&iwloc=B&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </article>
      </main>
      <BookingSection defaultLocation={clinic} />
      <Footer />
    </div>
  );
};

export default Clinic;
