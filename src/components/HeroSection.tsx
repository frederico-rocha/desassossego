import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-primary-foreground mb-6 text-balance">
            O primeiro passo é
            <span className="italic"> permitir-se.</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 font-body font-light leading-relaxed mb-10 max-w-xl">
            A Clínica Desassossego é um espaço seguro de escuta, compreensão e
            transformação. Acompanhamos adultos e famílias no caminho do
            bem-estar emocional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("#reservar")}
              className="bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity duration-300"
            >
              Reservar Consulta
            </button>
            <button
              onClick={() => scrollTo("#servicos")}
              className="border border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-lg font-medium text-base hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              Conhecer os Serviços
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
