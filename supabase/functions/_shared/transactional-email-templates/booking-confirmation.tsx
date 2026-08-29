import * as React from "npm:react@18.3.1";
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "npm:@react-email/components@0.0.22";
import type { TemplateEntry } from "./registry.ts";

interface Props {
  lang?: "pt" | "en";
  name?: string;
  service?: string;
  location?: string;
  schedule?: string;
}

const strings = {
  pt: {
    preview: "Recebemos o seu pedido de consulta — Desassossego",
    title: "Pedido recebido",
    greeting: (name?: string) => (name ? `Olá ${name},` : "Olá,"),
    body: "Obrigado pelo seu pedido de consulta. Recebemos a sua mensagem e a nossa equipa irá responder o mais brevemente possível.",
    summaryTitle: "Resumo do pedido",
    service: "Serviço",
    location: "Localização",
    schedule: "Horário preferido",
    closing: "Se precisar de alterar algum dado, responda diretamente a este e-mail.",
    signature: "Com os melhores cumprimentos,",
    team: "Equipa Desassossego",
  },
  en: {
    preview: "We received your consultation request — Desassossego",
    title: "Request received",
    greeting: (name?: string) => (name ? `Hello ${name},` : "Hello,"),
    body: "Thank you for your consultation request. We have received your message and our team will get back to you as soon as possible.",
    summaryTitle: "Request summary",
    service: "Service",
    location: "Location",
    schedule: "Preferred time",
    closing: "If you need to change any details, simply reply to this email.",
    signature: "Best regards,",
    team: "Desassossego Team",
  },
};

const BookingConfirmationEmail = ({ lang, name, service, location, schedule }: Props) => {
  const s = strings[lang === "en" ? "en" : "pt"];
  return (
    <Html lang={lang === "en" ? "en" : "pt"} dir="ltr">
      <Head />
      <Preview>{s.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{s.title}</Heading>
          <Text style={text}>{s.greeting(name)}</Text>
          <Text style={text}>{s.body}</Text>
          <Section style={summaryBox}>
            <Text style={summaryHeading}>{s.summaryTitle}</Text>
            {service ? (
              <Text style={summaryRow}>
                <strong>{s.service}:</strong> {service}
              </Text>
            ) : null}
            {location ? (
              <Text style={summaryRow}>
                <strong>{s.location}:</strong> {location}
              </Text>
            ) : null}
            {schedule ? (
              <Text style={summaryRow}>
                <strong>{s.schedule}:</strong> {schedule}
              </Text>
            ) : null}
          </Section>
          <Text style={text}>{s.closing}</Text>
          <Hr style={hr} />
          <Text style={text}>
            {s.signature}
            <br />
            {s.team}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: BookingConfirmationEmail,
  subject: (data: Record<string, any>) =>
    data?.lang === "en" ? "We received your consultation request" : "Recebemos o teu pedido de consulta",
  displayName: "Confirmação de pedido de consulta",
  previewData: {
    lang: "pt",
    name: "Maria",
    service: "Psicoterapia Individual",
    location: "Cascais",
    schedule: "Manhã",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" };
const container = { padding: "24px 28px", maxWidth: "560px" };
const heading = { color: "#004266", fontSize: "24px", fontWeight: "600" };
const text = { color: "#00283D", fontSize: "15px", lineHeight: "24px" };
const summaryBox = {
  backgroundColor: "#F0F3F5",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "16px 0",
};
const summaryHeading = {
  color: "#004266",
  fontSize: "14px",
  fontWeight: "700",
  margin: "0 0 8px 0",
};
const summaryRow = { color: "#00283D", fontSize: "14px", margin: "4px 0" };
const hr = { borderColor: "#DCE2E5", margin: "24px 0" };
