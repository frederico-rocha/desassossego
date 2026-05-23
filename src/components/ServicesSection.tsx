import { motion } from "framer-motion";
import { Brain, Heart, Users, Baby, Sparkles, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Brain, Users, Heart, Baby, Sparkles, Clock];

const ServicesSection = () => {
  const { t } = useLanguage();
  return (
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
            {t.services.title}
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
