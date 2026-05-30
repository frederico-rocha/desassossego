import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const prevTitle = document.title;
    document.title = "Página não encontrada — Desassossego";

    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute("content");
      el.setAttribute("content", content);
      return () => {
        if (prev === null) el?.remove();
        else el?.setAttribute("content", prev);
      };
    };

    const restoreDesc = setMeta(
      'meta[name="description"]',
      "name",
      "description",
      "A página que procura não existe. Volte à página inicial da Clínica Desassossego."
    );
    const restoreOgTitle = setMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      "Página não encontrada — Desassossego"
    );
    const restoreOgDesc = setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      "A página que procura não existe."
    );

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const createdRobots = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const prevRobots = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, follow");

    return () => {
      document.title = prevTitle;
      restoreDesc();
      restoreOgTitle();
      restoreOgDesc();
      if (createdRobots) robots?.remove();
      else if (prevRobots !== null) robots?.setAttribute("content", prevRobots);
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Página não encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar à página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
