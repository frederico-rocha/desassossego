import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { teamMembers } from "@/data/team";

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
              <p className="text-4xl font-display font-bold text-primary mb-2">10+</p>
              <p className="text-sm text-muted-foreground font-body">{t.about.stats.years}</p>
            </div>
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <p className="text-4xl font-display font-bold text-primary mb-2">5</p>
              <p className="text-sm text-muted-foreground font-body">{t.about.stats.psychologists}</p>
            </div>
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <p className="text-4xl font-display font-bold text-primary mb-2">2</p>
              <p className="text-sm text-muted-foreground font-body">{t.about.stats.offices}</p>
            </div>
            <div className="bg-card rounded-xl p-8 text-center border border-border flex flex-col justify-center">
              <p className="text-sm text-primary font-display font-semibold">{t.about.stats.modality}</p>
            </div>
          </motion.div>
        </div>

        <div id="equipa" className="scroll-mt-24">
          <h3 className="text-2xl font-display font-semibold text-foreground mb-10 text-center">
            {t.about.teamTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-10 sm:gap-8">
            {teamMembers.map((member, i) => {
              const info = t.about.team[member.slug];
              return (
                <motion.div
                  key={member.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center group flex flex-col items-center w-[calc(50%-0.5rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.34rem)] lg:w-[calc(33.333%-1.34rem)] lg:max-w-[260px]"
                >
                  <Link
                    to={`/equipa/${member.slug}`}
                    aria-label={`${t.about.readMore} — ${member.name}`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary rounded-full"
                  >
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-5 rounded-full overflow-hidden border-4 border-card shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {member.name}
                  </h4>
                  <p className="text-sm text-primary font-body font-medium mt-1">
                    {info.role}
                  </p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mt-3 px-1">
                    {info.summary}
                  </p>
                  <Link
                    to={`/equipa/${member.slug}`}
                    className="inline-flex items-center gap-1 mt-4 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary rounded"
                  >
                    {t.about.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
