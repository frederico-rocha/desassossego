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
    navigate("/");
    requestAnimationFrame(() => {
      const el = document.getElementById("quem-somos");
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 section-padding pt-32">
        <article className="container mx-auto max-w-4xl">
          <a
            href="/#quem-somos"
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
              <p className="font-body text-muted-foreground leading-relaxed mt-6 text-base">
                {info.summary}
              </p>
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
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TeamMember;
