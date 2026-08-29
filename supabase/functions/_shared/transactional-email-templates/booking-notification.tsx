import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  service?: string
  location?: string
  schedule?: string
  message?: string
}

const BookingNotificationEmail = ({
  name,
  email,
  phone,
  service,
  location,
  schedule,
  message,
}: Props) => (
  <Html lang="pt" dir="ltr">
    <Head />
    <Preview>Novo pedido de consulta de {name || 'um visitante'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Novo pedido de consulta</Heading>
        <Section style={box}>
          <Text style={row}>
            <strong>Nome:</strong> {name || '—'}
          </Text>
          <Text style={row}>
            <strong>E-mail:</strong> {email || '—'}
          </Text>
          <Text style={row}>
            <strong>Telefone:</strong> {phone || '—'}
          </Text>
          <Text style={row}>
            <strong>Serviço:</strong> {service || '—'}
          </Text>
          <Text style={row}>
            <strong>Localização:</strong> {location || '—'}
          </Text>
          <Text style={row}>
            <strong>Horário preferido:</strong> {schedule || '—'}
          </Text>
        </Section>
        {message ? (
          <>
            <Text style={label}>Mensagem</Text>
            <Text style={messageText}>{message}</Text>
          </>
        ) : null}
        <Hr style={hr} />
        <Text style={footer}>
          Enviado automaticamente pelo formulário do site Desassossego.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: BookingNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Novo pedido de consulta — ${data?.name || 'Site'}`,
  displayName: 'Notificação de pedido de consulta (clínica)',
  to: 'geral@clinicadesassossego.pt',
  previewData: {
    name: 'Maria Silva',
    email: 'maria@exemplo.pt',
    phone: '+351 912 345 678',
    service: 'Psicoterapia Individual',
    location: 'Cascais',
    schedule: 'Manhã',
    message: 'Gostaria de marcar uma primeira consulta.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const heading = { color: '#004266', fontSize: '24px', fontWeight: '600' }
const box = {
  backgroundColor: '#F0F3F5',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '16px 0',
}
const row = { color: '#00283D', fontSize: '14px', margin: '4px 0' }
const label = {
  color: '#004266',
  fontSize: '14px',
  fontWeight: '700',
  margin: '16px 0 4px 0',
}
const messageText = {
  color: '#00283D',
  fontSize: '14px',
  lineHeight: '22px',
  whiteSpace: 'pre-wrap' as const,
}
const hr = { borderColor: '#DCE2E5', margin: '24px 0' }
const footer = { color: '#526C7A', fontSize: '12px' }
