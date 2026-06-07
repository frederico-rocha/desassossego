import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import acp from "@/assets/acp.jpg.asset.json";
import olisipo from "@/assets/olisipo.png.asset.json";
import cofre from "@/assets/cofre.png.asset.json";
import { useLanguage } from "@/i18n/LanguageContext";

interface Protocol {
  name: string;
  logo?: string;
}

const protocols: Protocol[] = [
  { name: "Automóvel Club de Portugal", logo: acp.url },
  { name: "Olisipo", logo: olisipo.url },
  { name: "COFRE de Previdência", logo: cofre.url },
];

const ProtocolsSection = () => {
  const { t } = useLanguage();
  return (
    <section id="protocolos" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            {t.protocols.title}
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            {t.protocols.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {protocols.map((protocol, i) => (
            <motion.div
              key={protocol.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card rounded-xl p-6 md:p-8 border border-border flex items-center justify-center hover:shadow-md transition-shadow duration-300"
            >
              {protocol.logo ? (
                <img src={protocol.logo} alt={protocol.name} className="h-10 md:h-12 w-full max-w-[160px] object-contain" />
              ) : (
                <Shield className="w-6 h-6 text-primary" />
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground font-body mt-8">
          {t.protocols.footer}
        </p>
      </div>
    </section>
  );
};

export default ProtocolsSection;
