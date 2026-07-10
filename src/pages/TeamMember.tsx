import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { getTeamMember } from "@/data/team";
import { useLanguage } from "@/i18n/LanguageContext";

const TeamMember = () => {
  const { slug = "" } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const member = getTeamMember(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!member) return <NotFound />;

  const info = t.about.team[member.slug];

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/#equipa");
    requestAnimationFrame(() => {
      const el = document.getElementById("equipa");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 section-padding pt-32">
        <article className="container mx-auto max-w-4xl">
          <a
            href="/#equipa"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.about.backToTeam}
          </a>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[260px_1fr] gap-10 items-start"
          >
            <div className="w-52 h-52 md:w-64 md:h-64 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-card shadow-lg">
              <img
                src={member.image}
                alt={member.name}
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
                {member.name}
              </h1>
              <p className="text-base text-primary font-body font-medium mt-2">
                {info.role}
              </p>
              {info.specialty && (
                <p className="text-base text-muted-foreground font-body mt-1">
                  {info.specialty}
                </p>
              )}
              {(() => {
                const idx = info.summary.indexOf(". ");
                const first = idx >= 0 ? info.summary.slice(0, idx + 1) : info.summary;
                const second = idx >= 0 ? info.summary.slice(idx + 2) : "";
                return (
                  <div className="font-body text-muted-foreground leading-relaxed mt-6 text-base space-y-1">
                    <p>{first}</p>
                    {second && <p>{second}</p>}
                  </div>
                );
              })()}
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-14"
          >
            <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
              {t.about.biographyTitle}
            </h2>
            <div className="space-y-5 font-body text-muted-foreground leading-relaxed text-base">
              {info.bio.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              {info.linkedin && (
                <p>
                  <a
                    href={info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 0 1 4.126 0 2.062 2.062 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </p>
              )}
            </div>
          </motion.section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TeamMember;
