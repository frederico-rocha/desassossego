import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactsSection = () => (
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
          Contactos
        </h2>
        <p className="text-muted-foreground font-body text-lg">
          Estamos disponíveis para esclarecer qualquer dúvida.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
        {[
          {
            icon: Phone,
            title: "Telefone",
            lines: ["+351 21 234 5678", "+351 912 345 678"],
          },
          {
            icon: Mail,
            title: "Email",
            lines: ["geral@desassossego.pt", "consultas@desassossego.pt"],
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
          {
            icon: Clock,
            title: "Horário",
            lines: ["Seg–Sex: 09h00 – 20h00", "Sáb: 09h00 – 14h00"],
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-display text-base font-semibold text-foreground mb-2">
              {item.title}
            </h4>
            {item.lines.map((line) => (
              <p key={line} className="text-sm text-muted-foreground font-body">
                {line}
              </p>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {[
          {
            title: "Clínica Desassossego — Lisboa",
            query: "Avenida António Serpa 32, 1050-027 Lisboa",
          },
          {
            title: "Clínica Desassossego — Cascais",
            query:
              "Avenida 25 de Abril 672, Edifício Alvorada, 2750-512 Cascais",
          },
        ].map((map, i) => (
          <motion.div
            key={map.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            className="rounded-xl overflow-hidden border border-border h-80"
          >
            <iframe
              title={map.title}
              src={`https://www.google.com/maps?q=${encodeURIComponent(map.query)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ContactsSection;
