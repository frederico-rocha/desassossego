import { motion } from "framer-motion";
import heroBg from "@/assets/imagem_hero.jpeg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[760px] lg:min-h-screen flex items-start lg:items-end overflow-hidden pt-[calc(50vw+6rem)] sm:pt-[calc(68vw+5rem)] md:pt-[calc(35vw+5rem)] lg:pt-0 pb-10 md:pb-6 lg:pb-24">
      <div
        className="absolute inset-x-0 top-20 h-[50vw] sm:h-[68vw] md:h-[35vw] lg:inset-0 lg:top-0 lg:h-auto bg-cover bg-top sm:bg-contain md:bg-cover bg-no-repeat bg-secondary"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/40" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl lg:max-w-xl"
        >
          <h1 className="sr-only">Desassossego — Clínica de Psicologia Clínica em Lisboa e Cascais</h1>
          <p className="text-2xl md:text-3xl lg:text-[1.5rem] xl:text-[1.625rem] font-display font-semibold leading-tight text-primary-foreground mb-6 text-balance">
            {t.hero.titleA}
            <span className="italic">{t.hero.titleB}</span>
          </p>
          <p className="text-base md:text-lg text-primary-foreground/85 font-body font-light leading-relaxed mb-6 max-w-2xl">
            {t.hero.description}
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/95 font-display italic mb-8 max-w-2xl">
            {t.hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => scrollTo("#reservar")}
              className="bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold text-base shadow-sm hover:shadow-[0_8px_30px_rgba(255,255,255,0.18)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {t.hero.ctaBook}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#servicos")}
              className="border border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-lg font-medium text-base hover:bg-primary-foreground/15 hover:border-primary-foreground/70 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
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
