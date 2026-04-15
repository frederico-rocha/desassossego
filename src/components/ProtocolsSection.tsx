import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import adse from "@/assets/adse.png";
import multicare from "@/assets/multicare.png";
import advancecare from "@/assets/advancecare.png";
import medis from "@/assets/medis.png";
import allianz from "@/assets/allianz.png";
import fidelidade from "@/assets/fidelidade.png";
import ageas from "@/assets/ageas.jpeg";
import medicare from "@/assets/medicare.png";

interface Protocol {
  name: string;
  logo?: string;
}

const protocols: Protocol[] = [
  { name: "ADSE", logo: adse },
  { name: "Multicare", logo: multicare },
  { name: "AdvanceCare", logo: advancecare },
  { name: "Médis", logo: medis },
  { name: "Allianz", logo: allianz },
  { name: "Fidelidade", logo: fidelidade },
  { name: "Ageas", logo: ageas },
  { name: "Medicare", logo: medicare },
];

const ProtocolsSection = () => (
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
          Protocolos e Parcerias
        </h2>
        <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
          Trabalhamos com as principais seguradoras e subsistemas de saúde para
          facilitar o acesso aos nossos serviços.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {protocols.map((protocol, i) => (
          <motion.div
            key={protocol.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-card rounded-xl p-6 border border-border flex items-center gap-4 hover:shadow-md transition-shadow duration-300"
          >
            {protocol.logo ? (
              <img src={protocol.logo} alt={protocol.name} className="h-8 w-auto object-contain flex-shrink-0" />
            ) : (
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            )}
            <span className="font-body font-medium text-foreground">{protocol.name}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground font-body mt-8">
        Contacte-nos para confirmar a cobertura do seu seguro ou subsistema de saúde.
      </p>
    </div>
  </section>
);

export default ProtocolsSection;
