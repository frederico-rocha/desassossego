import { motion } from "framer-motion";
import heroBg from "@/assets/imagem_hero.jpeg";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";

type GradientVariant = "original" | "none" | "top-bottom";

const gradientClasses: Record<GradientVariant, string> = {
  original: "bg-gradient-to-r from-primary/85 via-primary/70 to-primary/40",
  none: "",
  "top-bottom": "bg-gradient-to-b from-primary/85 via-primary/70 to-primary/40",
};

const HeroSection = () => {
  const { t } = useLanguage();
  const [gradient, setGradient] = useState<GradientVariant>("original");

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const cycleGradient = () => {
    setGradient((prev) => {
      if (prev === "original") return "none";
      if (prev === "none") return "top-bottom";
      return "original";
    });
  };

  const gradientLabel = {
    original: "Degradé atual",
    none: "Sem degradé",
    "top-bottom": "Degradé cima-baixo",
  }[gradient];

  return (
    <section className="relative min-h-[100svh] md:min-h-[760px] lg:min-h-screen flex items-start lg:items-end overflow-hidden pt-[calc(48vw+5rem)] sm:pt-[calc(54vw+5rem)] md:pt-[calc(35vw+5rem)] lg:pt-0 pb-8 md:pb-6 lg:pb-10">
      <div
        className="absolute inset-x-0 top-20 h-[48vw] sm:h-[54vw] md:h-[35vw] lg:inset-0 lg:top-0 lg:h-auto bg-cover bg-top sm:bg-contain md:bg-cover bg-no-repeat bg-secondary"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {gradient !== "none" && (
        <div className={`absolute inset-0 ${gradientClasses[gradient]}`} />
      )}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl lg:max-w-xl mt-8 md:mt-0"
        >
          <h1 className="sr-only">Desassossego — Clínica de Psicologia Clínica em Lisboa e Cascais</h1>
          <p className="text-lg md:text-3xl lg:text-[1.375rem] xl:text-[1.5rem] font-display font-semibold leading-tight text-primary-foreground mb-4 md:mb-6 lg:mb-3 text-balance">
            {t.hero.titleA}
            <span className="italic">{t.hero.titleB}</span>
          </p>
          <p className="text-sm md:text-lg lg:text-sm xl:text-base text-primary-foreground/85 font-body font-light leading-relaxed mb-3 md:mb-6 lg:mb-2 max-w-2xl">
            {t.hero.description}
          </p>
          <p className="text-base md:text-xl lg:text-base xl:text-lg text-primary-foreground/95 font-display italic mb-6 md:mb-8 lg:mb-4 max-w-2xl">
            {t.hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => scrollTo("#reservar")}
              className="bg-primary-foreground text-primary px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base shadow-sm hover:shadow-[0_8px_30px_rgba(255,255,255,0.18)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {t.hero.ctaBook}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#servicos")}
              className="border border-primary-foreground/40 text-primary-foreground px-8 py-3 md:py-4 rounded-lg font-medium text-sm md:text-base hover:bg-primary-foreground/15 hover:border-primary-foreground/70 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
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
