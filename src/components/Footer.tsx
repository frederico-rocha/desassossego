import logo from "@/assets/logo.png";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.24-1.46 1.5-1.46H16.5V4.4c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.91v2.18H8v3h2.42V21h3.08z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


const Footer = () => (
  <footer className="bg-primary py-12 px-6">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <img
            src={logo}
            alt="Clínica Desassossego"
            className="h-14 md:h-16 w-auto object-contain"
          />
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
            <FacebookIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/desassossego_psicologia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors duration-300"
          >
            <InstagramIcon className="w-5 h-5" />
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
