import { motion } from "framer-motion";
import team1 from "@/assets/team-1.png";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const team = [
  {
    name: "Dra. Vera Botelho da Costa",
    role: "Psicóloga Clínica · Diretora",
    specialty: "Especialista em Ansiedade e Depressão",
    image: team1,
  },
  {
    name: "Dra. Débora Macedo",
    role: "Psicóloga Clínica · Diretora",
    specialty: "Psicologia Infantojuvenil",
    image: team3,
  },
  {
    name: "Dr. Tomás Almeida",
    role: "Psicólogo Clínico",
    specialty: "Terapia de Casal e Família",
    image: team2,
  },
];

const AboutSection = () => (
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
            Quem Somos
          </h2>
          <div className="space-y-5 font-body text-muted-foreground leading-relaxed text-base">
            <p>
              A Clínica Desassossego nasceu da convicção de que cuidar da saúde
              mental é um ato de coragem e de amor próprio. Fundada em 2018,
              oferecemos um espaço acolhedor e confidencial onde cada pessoa é
              recebida sem julgamento.
            </p>
            <p>
              A nossa equipa é composta por psicólogos clínicos com formação
              especializada e experiência comprovada. Trabalhamos com abordagens
              integradas e baseadas em evidência, garantindo um acompanhamento
              rigoroso e humanizado.
            </p>
            <p>
              Acreditamos que o desassossego — aquela inquietação interior que
              nos leva a procurar ajuda — é, na verdade, o primeiro passo para
              uma mudança genuína e duradoura.
            </p>
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
            <p className="text-sm text-muted-foreground font-body">Anos de experiência</p>
          </div>
          <div className="bg-card rounded-xl p-8 text-center border border-border">
            <p className="text-4xl font-display font-bold text-primary mb-2">3</p>
            <p className="text-sm text-muted-foreground font-body">Psicólogos especializados</p>
          </div>
          <div className="bg-card rounded-xl p-8 text-center border border-border">
            <p className="text-4xl font-display font-bold text-primary mb-2">1500+</p>
            <p className="text-sm text-muted-foreground font-body">Pacientes acompanhados</p>
          </div>
          <div className="bg-card rounded-xl p-8 text-center border border-border">
            <p className="text-4xl font-display font-bold text-primary mb-2">98%</p>
            <p className="text-sm text-muted-foreground font-body">Satisfação dos pacientes</p>
          </div>
        </motion.div>
      </div>

      <div>
        <h3 className="text-2xl font-display font-semibold text-foreground mb-10 text-center">
          A Nossa Equipa
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden border-4 border-card shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground">
                {member.name}
              </h4>
              <p className="text-sm text-primary font-body font-medium mt-1">
                {member.role}
              </p>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {member.specialty}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
