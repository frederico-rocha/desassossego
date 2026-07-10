import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, GraduationCap, Brain, Video, ClipboardCheck, Compass, Heart, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Baby, GraduationCap, Brain, Video, ClipboardCheck, Compass, Heart];

const ServicesSection = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const renderCard = (service: typeof t.services.items[number], i: number) => {
    const Icon = icons[i];
    const isOpen = !!expanded[i];
    return (
      <motion.div
        key={service.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
        className="bg-card rounded-xl p-8 border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group flex flex-col"
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
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                {service.expanded.map((para, idx) => (
                  <p
                    key={idx}
                    className="font-body text-muted-foreground leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => toggle(i)}
          aria-expanded={isOpen}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
        >
          {isOpen ? t.services.readLess : t.services.readMore}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </motion.div>
    );
  };

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

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
            {t.services.items.slice(0, 2).map((s, i) => renderCard(s, i))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
            {t.services.items.slice(2, 4).map((s, i) => renderCard(s, i + 2))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {t.services.items.slice(4, 7).map((s, i) => renderCard(s, i + 4))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
