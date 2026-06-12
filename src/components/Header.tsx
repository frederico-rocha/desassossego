import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { label: t.nav.services, href: "#servicos" },
    { label: t.nav.about, href: "#quem-somos" },
    { label: t.nav.protocols, href: "#protocolos" },
    { label: t.nav.contacts, href: "#contactos" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveId("");
      return;
    }
    const ids = ["servicos", "quem-somos", "protocolos", "reservar", "contactos"];
    const computeActive = () => {
      const offset = 100;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = id;
      }
      // bottom of page → last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActiveId(current);
    };
    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, [isHome]);


  const handleClick = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  };

  const LangSwitcher = ({ inverted = false }: { inverted?: boolean }) => {
    const base = inverted
      ? "text-primary-foreground/70 hover:text-primary-foreground"
      : "text-muted-foreground hover:text-primary";
    const active = inverted ? "text-primary-foreground" : "text-primary";
    return (
      <div className={`flex items-center gap-1 text-xs font-body font-medium`}>
        <button
          onClick={() => setLang("pt")}
          className={`uppercase transition-colors ${lang === "pt" ? active : base}`}
          aria-label="Português"
        >
          PT
        </button>
        <span className={inverted ? "text-primary-foreground/40" : "text-muted-foreground/40"}>/</span>
        <button
          onClick={() => setLang("en")}
          className={`uppercase transition-colors ${lang === "en" ? active : base}`}
          aria-label="English"
        >
          EN
        </button>
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <a href="#" className="flex items-center">
          <div
            aria-label="desassossego"
            role="img"
            className={`h-12 md:h-14 w-40 md:w-48 transition-colors duration-300 ${scrolled ? "bg-primary" : "bg-primary-foreground"}`}
            style={{
              WebkitMaskImage: `url(${logo})`,
              maskImage: `url(${logo})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeId === id;
            const base = scrolled
              ? "text-muted-foreground hover:text-primary"
              : "text-primary-foreground/80 hover:text-primary-foreground";
            const active = scrolled ? "text-primary" : "text-primary-foreground";
            return (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative font-body text-sm font-medium transition-colors duration-300 ${isActive ? active : base}`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full ${scrolled ? "bg-primary" : "bg-primary-foreground"}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          <LangSwitcher inverted={!scrolled} />
          <button
            onClick={() => handleClick("#reservar")}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-300"
          >
            {t.nav.book}
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <LangSwitcher inverted={!scrolled} />
          <button
            className={scrolled ? "text-primary" : "text-primary-foreground"}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => {
                const id = item.href.slice(1);
                const isActive = activeId === id;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleClick(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-left font-body text-base transition-colors ${isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => handleClick("#reservar")}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold mt-2"
              >
                {t.nav.book}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
