export type Lang = "pt" | "en";

const pt = {
  nav: {
    services: "Serviços",
    about: "Quem Somos",
    protocols: "Protocolos",
    contacts: "Contactos",
    book: "Reservar Consulta",
  },
  hero: {
    titleA: "O primeiro passo é",
    titleB: " permitir-se.",
    description:
      "A Clínica Desassossego é um espaço seguro de escuta, compreensão e transformação. Acompanhamos adultos e famílias no caminho do bem-estar emocional.",
    ctaBook: "Reservar Consulta",
    ctaServices: "Conhecer os Serviços",
  },
  services: {
    title: "Os Nossos Serviços",
    subtitle:
      "Oferecemos um acompanhamento personalizado e baseado em evidência científica, adaptado às necessidades de cada pessoa.",
    items: [
      {
        title: "Psicologia Clínica",
        description:
          "Avaliação e intervenção psicológica individual para perturbações de ansiedade, depressão, stress e outras dificuldades emocionais.",
      },
      {
        title: "Terapia de Casal",
        description:
          "Apoio especializado para casais que desejam fortalecer a sua relação, melhorar a comunicação e ultrapassar crises.",
      },
      {
        title: "Terapia Familiar",
        description:
          "Intervenção sistémica para famílias que enfrentam conflitos, transições ou dificuldades na dinâmica familiar.",
      },
      {
        title: "Psicologia Infantojuvenil",
        description:
          "Acompanhamento de crianças e adolescentes com dificuldades emocionais, comportamentais ou de aprendizagem.",
      },
      {
        title: "Desenvolvimento Pessoal",
        description:
          "Programas de coaching e autoconhecimento para quem procura crescimento pessoal e uma vida mais significativa.",
      },
      {
        title: "Consultas Online",
        description:
          "Sessões de psicologia à distância com a mesma qualidade e confidencialidade das consultas presenciais.",
      },
    ],
  },
  about: {
    title: "Quem Somos",
    p1: "A Clínica Desassossego nasceu da convicção de que cuidar da saúde mental é um ato de coragem e de amor próprio. Fundada em 2018, oferecemos um espaço acolhedor e confidencial onde cada pessoa é recebida sem julgamento.",
    p2: "A nossa equipa é composta por psicólogos clínicos com formação especializada e experiência comprovada. Trabalhamos com abordagens integradas e baseadas em evidência, garantindo um acompanhamento rigoroso e humanizado.",
    p3: "Acreditamos que o desassossego — aquela inquietação interior que nos leva a procurar ajuda — é, na verdade, o primeiro passo para uma mudança genuína e duradoura.",
    stats: {
      years: "Anos de experiência",
      psychologists: "Psicólogos especializados",
      patients: "Pacientes acompanhados",
      satisfaction: "Satisfação dos pacientes",
    },
    teamTitle: "A Nossa Equipa",
    team: [
      {
        role: "Psicóloga Clínica · Diretora",
        specialty: "Especialista em Ansiedade e Depressão",
      },
      {
        role: "Psicóloga Clínica · Diretora",
        specialty: "Psicologia Infantojuvenil",
      },
      {
        role: "Psicólogo Clínico",
        specialty: "Terapia de Casal e Família",
      },
    ],
  },
  protocols: {
    title: "Protocolos e Parcerias",
    subtitle:
      "Trabalhamos com as principais seguradoras e subsistemas de saúde para facilitar o acesso aos nossos serviços.",
    footer:
      "Contacte-nos para confirmar a cobertura do seu seguro ou subsistema de saúde.",
  },
  booking: {
    title: "Reservar Consulta",
    subtitle:
      "Preencha o formulário e entraremos em contacto consigo em menos de 24 horas.",
    name: "Nome completo",
    namePlaceholder: "O seu nome",
    email: "Email",
    phone: "Telefone",
    service: "Serviço pretendido",
    select: "Selecionar...",
    clinic: "Clínica preferida",
    selectClinic: "Selecionar clínica...",
    clinicLisboa: "Lisboa — Av. António Serpa, 32",
    clinicCascais: "Cascais — Av. 25 de Abril, 672",
    message: "Mensagem (opcional)",
    messagePlaceholder: "Descreva brevemente o motivo da consulta...",
    submit: "Enviar Pedido de Consulta",
    rgpd:
      "Os seus dados são tratados com total confidencialidade, em conformidade com o RGPD.",
    sentTitle: "Pedido Enviado",
    sentBody:
      "Obrigado pelo seu contacto. A nossa equipa entrará em contacto consigo brevemente.",
  },
  contacts: {
    title: "Contactos",
    subtitle: "Estamos disponíveis para esclarecer qualquer dúvida.",
    phone: "Telefone",
    email: "Email",
    hours: "Horário",
    hoursWeek: "Seg–Sex: 09h00 – 20h00",
    hoursSat: "Sáb: 09h00 – 14h00",
  },
  footer: {
    rights:
      "© 2026 Clínica Desassossego. Todos os direitos reservados. Cédula Profissional n.º XXXXX da Ordem dos Psicólogos Portugueses.",
    designedBy: "Designed by",
  },
};

const en: typeof pt = {
  nav: {
    services: "Services",
    about: "About Us",
    protocols: "Partners",
    contacts: "Contact",
    book: "Book a Session",
  },
  hero: {
    titleA: "The first step is",
    titleB: " allowing yourself.",
    description:
      "Clínica Desassossego is a safe space for listening, understanding and transformation. We support adults and families on the path to emotional well-being.",
    ctaBook: "Book a Session",
    ctaServices: "Explore our Services",
  },
  services: {
    title: "Our Services",
    subtitle:
      "We offer personalised, evidence-based care adapted to the needs of each person.",
    items: [
      {
        title: "Clinical Psychology",
        description:
          "Individual psychological assessment and intervention for anxiety, depression, stress and other emotional difficulties.",
      },
      {
        title: "Couples Therapy",
        description:
          "Specialised support for couples who wish to strengthen their relationship, improve communication and overcome crises.",
      },
      {
        title: "Family Therapy",
        description:
          "Systemic intervention for families facing conflicts, transitions or difficulties in their dynamics.",
      },
      {
        title: "Child & Adolescent Psychology",
        description:
          "Support for children and adolescents with emotional, behavioural or learning difficulties.",
      },
      {
        title: "Personal Development",
        description:
          "Coaching and self-awareness programmes for those seeking personal growth and a more meaningful life.",
      },
      {
        title: "Online Sessions",
        description:
          "Remote psychology sessions with the same quality and confidentiality as in-person consultations.",
      },
    ],
  },
  about: {
    title: "About Us",
    p1: "Clínica Desassossego was founded on the belief that caring for mental health is an act of courage and self-love. Established in 2018, we offer a welcoming and confidential space where every person is received without judgement.",
    p2: "Our team is made up of clinical psychologists with specialised training and proven experience. We work with integrated, evidence-based approaches, ensuring rigorous and humane care.",
    p3: "We believe that desassossego — that inner restlessness that leads us to seek help — is, in fact, the first step toward genuine and lasting change.",
    stats: {
      years: "Years of experience",
      psychologists: "Specialised psychologists",
      patients: "Patients supported",
      satisfaction: "Patient satisfaction",
    },
    teamTitle: "Our Team",
    team: [
      {
        role: "Clinical Psychologist · Director",
        specialty: "Specialist in Anxiety and Depression",
      },
      {
        role: "Clinical Psychologist · Director",
        specialty: "Child & Adolescent Psychology",
      },
      {
        role: "Clinical Psychologist",
        specialty: "Couples and Family Therapy",
      },
    ],
  },
  protocols: {
    title: "Partners & Insurers",
    subtitle:
      "We work with the main insurers and health subsystems to make access to our services easier.",
    footer:
      "Contact us to confirm coverage with your insurer or health subsystem.",
  },
  booking: {
    title: "Book a Session",
    subtitle:
      "Fill out the form and we will get back to you within 24 hours.",
    name: "Full name",
    namePlaceholder: "Your name",
    email: "Email",
    phone: "Phone",
    service: "Service",
    select: "Select...",
    clinic: "Preferred clinic",
    selectClinic: "Select clinic...",
    clinicLisboa: "Lisbon — Av. António Serpa, 32",
    clinicCascais: "Cascais — Av. 25 de Abril, 672",
    message: "Message (optional)",
    messagePlaceholder: "Briefly describe the reason for the consultation...",
    submit: "Send Booking Request",
    rgpd:
      "Your data is treated with full confidentiality, in compliance with GDPR.",
    sentTitle: "Request Sent",
    sentBody:
      "Thank you for getting in touch. Our team will contact you shortly.",
  },
  contacts: {
    title: "Contact",
    subtitle: "We are available to answer any questions.",
    phone: "Phone",
    email: "Email",
    hours: "Hours",
    hoursWeek: "Mon–Fri: 9:00 – 20:00",
    hoursSat: "Sat: 9:00 – 14:00",
  },
  footer: {
    rights:
      "© 2026 Clínica Desassossego. All rights reserved. Professional License No. XXXXX of the Portuguese Psychologists Association.",
    designedBy: "Designed by",
  },
};

export type TranslationKeys = typeof pt;
export const translations: Record<Lang, TranslationKeys> = { pt, en };
