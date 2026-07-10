import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactsSection = () => {
  const { t } = useLanguage();
  return (
    <section id="contactos" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            {t.contacts.title}
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            {t.contacts.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
          {[
            {
              icon: Phone,
              title: t.contacts.phone,
              lines: ["+351 910 786 339"],
            },
            {
              icon: Mail,
              title: t.contacts.email,
              lines: ["clinicadesassossego@gmail.com"],
            },
            {
              icon: Clock,
              title: t.contacts.hours,
              lines: [t.contacts.hoursWeek, t.contacts.hoursSat],
            },
            {
              icon: MapPin,
              title: "Lisboa",
              lines: ["Av. António Serpa, 32, 8.º C", "1050-027 Lisboa"],
            },
            {
              icon: MapPin,
              title: "Cascais",
              lines: [
                "Av. 25 de Abril, Edif. Alvorada,",
                "672, 5A, Sala 7",
                "2750-512 Cascais",
              ],
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-4 border border-border"
            >
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center mb-3">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-2">
                {item.title}
              </h4>
              {item.lines.map((line) => (
                <p key={line} className="text-xs text-muted-foreground font-body break-words">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>


        <div className="grid lg:grid-cols-2 gap-6 mt-12">

          {[
            {
              title: "Clínica Desassossego — Lisboa",
              query: "38.7432794,-9.1484744",
              url: "https://www.google.com/maps/place/desasSossego+-+Psicologia+Cl%C3%ADnica/@38.7432835,-9.1533453,17z/data=!3m1!4b1!4m6!3m5!1s0xd19330887997bb7:0xbc3a6fe36ac30408!8m2!3d38.7432794!4d-9.1484744!16s%2Fg%2F11c5_54sj3?entry=ttu&g_ep=EgoyMDI2MDcwNy4wIKXMDSoASAFQAw%3D%3D",
            },
            {
              title: "Clínica Desassossego — Cascais",
              query: "38.6996166,-9.4271256",
              url: "https://www.google.com/maps/place/desassossego+-+Psicologia+Cl%C3%ADnica/@38.6996208,-9.4297005,17z/data=!3m1!4b1!4m6!3m5!1s0xd1ec500738dbd51:0x5bd6f8895a1a2854!8m2!3d38.6996166!4d-9.4271256!16s%2Fg%2F11mdwv4mcv?entry=ttu&g_ep=EgoyMDI2MDcwNy4wIKXMDSoASAFQAw%3D%3D",
            },
          ].map((map, i) => (
            <div key={map.title} className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="rounded-xl overflow-hidden border border-border h-80"
              >
                <iframe
                  title={map.title}
                  src={`https://maps.google.com/maps?f=q&hl=pt-PT&q=${encodeURIComponent(map.query)}&z=17&iwloc=B&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
              <div className="text-center mt-4">
                <a
                  href={map.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {t.contacts.openMaps}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
