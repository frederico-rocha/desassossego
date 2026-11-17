/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="pt" dir="ltr">
    <Head>
      <style>{darkModeCss}</style>
    </Head>
    <Preview>Confirme o seu email para aceder à área reservada da {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirme o seu email</Heading>
        <Text style={text}>
          Obrigado por criar uma conta na{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          !
        </Text>
        <Text style={text}>
          Para aceder à área reservada, confirme o seu endereço de email (
          <Link href={`mailto:${recipient}`} style={link}>
            {recipient}
          </Link>
          ) através do botão abaixo:
        </Text>
        <Button className="dm-btn" style={button} href={confirmationUrl}>
          Confirmar email
        </Button>
        <Text style={footer}>
          Se não criou esta conta, pode ignorar este email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#004266',
  margin: '0 0 20px',
}
const text = {
  fontSize: '14px',
  color: '#00283D',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const link = { color: 'inherit', textDecoration: 'underline' }
const button = {
  backgroundColor: '#004266',
  color: '#ffffff',
  fontSize: '14px',
  border: '1px solid #004266',
  borderRadius: '8px',
  padding: '12px 20px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#00283D', margin: '30px 0 0' }
// Rendered as a text child, which React may HTML-escape: keep this CSS free of >, &, and quotes.
const darkModeCss = `
  @media (prefers-color-scheme: dark) {
    .dm-btn { background-color: #ffffff !important; color: #000000 !important; }
  }
  [data-ogsc] .dm-btn { background-color: #ffffff !important; color: #000000 !important; }
  [data-ogsb] .dm-btn { background-color: #ffffff !important; color: #000000 !important; }
`
