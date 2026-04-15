import { motion } from "framer-motion";
import { Brain, Heart, Users, Baby, Sparkles, Clock } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Psicologia Clínica",
    description:
      "Avaliação e intervenção psicológica individual para perturbações de ansiedade, depressão, stress e outras dificuldades emocionais.",
  },
  {
    icon: Users,
    title: "Terapia de Casal",
    description:
      "Apoio especializado para casais que desejam fortalecer a sua relação, melhorar a comunicação e ultrapassar crises.",
  },
  {
    icon: Heart,
    title: "Terapia Familiar",
    description:
      "Intervenção sistémica para famílias que enfrentam conflitos, transições ou dificuldades na dinâmica familiar.",
  },
  {
    icon: Baby,
    title: "Psicologia Infantojuvenil",
    description:
      "Acompanhamento de crianças e adolescentes com dificuldades emocionais, comportamentais ou de aprendizagem.",
  },
  {
    icon: Sparkles,
    title: "Desenvolvimento Pessoal",
    description:
      "Programas de coaching e autoconhecimento para quem procura crescimento pessoal e uma vida mais significativa.",
  },
  {
    icon: Clock,
    title: "Consultas Online",
    description:
      "Sessões de psicologia à distância com a mesma qualidade e confidencialidade das consultas presenciais.",
  },
];

const ServicesSection = () => (
  <section id="servicos" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
          Os Nossos Serviços
        </h2>
        <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
          Oferecemos um acompanhamento personalizado e baseado em evidência
          científica, adaptado às necessidades de cada pessoa.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-card rounded-xl p-8 border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group"
          >
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
              <service.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              {service.title}
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
