import { Facebook, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary py-12 px-6">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-xl font-semibold text-primary-foreground">
            desassossego
          </p>
          <p className="text-sm text-primary-foreground/60 font-body mt-1">
            Clínica de Psicologia
          </p>
        </div>

        <div className="flex gap-8">
          {["Serviços", "Quem Somos", "Protocolos", "Contactos"].map((item) => (
            <button
              key={item}
              onClick={() =>
                document
                  .querySelector(`#${item.toLowerCase().replace(/ /g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground font-body transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/desasSossegoLisboa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors duration-300"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/desassossego_psicologia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 mt-8 pt-8 text-center">
        <p className="text-xs text-primary-foreground/50 font-body">
          © 2026 Clínica Desassossego. Todos os direitos reservados. Cédula Profissional n.º XXXXX da Ordem dos Psicólogos Portugueses.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
