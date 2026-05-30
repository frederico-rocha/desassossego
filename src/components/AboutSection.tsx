import { motion } from "framer-motion";
import teamVera from "@/assets/team-vera.jpg";
import teamDebora from "@/assets/team-debora.jpg";
import teamInes from "@/assets/team-ines.jpg";
import teamLeonor from "@/assets/team-leonor.jpg";
import teamFrancis from "@/assets/team-francis.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const teamMembers: { name: string; image: string | null }[] = [
  { name: "Dra. Vera Botelho da Costa", image: teamVera },
  { name: "Dra. Débora Macedo", image: teamDebora },
  { name: "Dra. Inês", image: teamInes },
  { name: "Dra. Leonor", image: teamLeonor },
  { name: "Dra. Francis", image: teamFrancis },
];

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section id="quem-somos" className="section-padding bg-secondary">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-6">
              {t.about.title}
            </h2>
            <div className="space-y-5 font-body text-muted-foreground leading-relaxed text-base">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <p className="text-4xl font-display font-bold text-primary mb-2">6+</p>
              <p className="text-sm text-muted-foreground font-body">{t.about.stats.years}</p>
            </div>
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <p className="text-4xl font-display font-bold text-primary mb-2">3</p>
              <p className="text-sm text-muted-foreground font-body">{t.about.stats.psychologists}</p>
            </div>
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <p className="text-4xl font-display font-bold text-primary mb-2">1500+</p>
              <p className="text-sm text-muted-foreground font-body">{t.about.stats.patients}</p>
            </div>
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <p className="text-4xl font-display font-bold text-primary mb-2">98%</p>
              <p className="text-sm text-muted-foreground font-body">{t.about.stats.satisfaction}</p>
            </div>
          </motion.div>
        </div>

        <div>
          <h3 className="text-2xl font-display font-semibold text-foreground mb-10 text-center">
            {t.about.teamTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, i) => {
              const isPlaceholder = !member.image;
              const teamInfo = t.about.team[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className={`w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-4 border-card shadow-lg ${isPlaceholder ? "bg-muted flex items-center justify-center" : ""}`}>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-muted-foreground font-display text-sm">{t.about.comingSoon}</span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {isPlaceholder ? t.about.comingSoon : member.name}
                  </h4>
                  {teamInfo && (
                    <>
                      <p className="text-sm text-primary font-body font-medium mt-1">
                        {teamInfo.role}
                      </p>
                      <p className="text-sm text-muted-foreground font-body mt-1">
                        {teamInfo.specialty}
                      </p>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
