import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden pb-16 md:pb-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold leading-tight text-primary-foreground mb-6 text-balance">
            {t.hero.titleA}
            <span className="italic">{t.hero.titleB}</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/85 font-body font-light leading-relaxed mb-10 max-w-2xl">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("#reservar")}
              className="bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity duration-300"
            >
              {t.hero.ctaBook}
            </button>
            <button
              onClick={() => scrollTo("#servicos")}
              className="border border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-lg font-medium text-base hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              {t.hero.ctaServices}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
