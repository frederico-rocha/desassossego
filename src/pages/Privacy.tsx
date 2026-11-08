import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return <><Helmet><title>Privacidade e cookies — desasSossego</title><meta name="description" content="Informação sobre privacidade, cookies e medição de publicidade na Clínica desasSossego." /></Helmet><Header />
    <main className="container mx-auto px-6 pb-20 pt-32 max-w-3xl space-y-6">
      <h1 className="text-3xl">Privacidade e cookies</h1>
      <h2 className="text-xl">Medição de publicidade</h2>
      <p>O site utiliza o Google Ads e o Google Tag Manager para medir a eficácia da publicidade e otimizar anúncios para pedidos enviados. Após autorização nas regiões onde é exigida, o Google pode receber a página visitada, dados técnicos do dispositivo e navegador, endereço IP e identificadores de cookies e cliques publicitários. Estes dados permitem medir visitas provenientes de anúncios e a indicação de que um pedido foi enviado com sucesso, não a confirmação de uma consulta. Não enviamos nomes, emails, telefones, mensagens dos formulários, serviços escolhidos ou informação clínica para estas ferramentas. A personalização de anúncios está desativada nesta instalação.</p>
      <p>Pode aceitar ou recusar os cookies publicitários com a mesma facilidade. A recusa não impede o acesso ao site nem o pedido de consulta. Fora das regiões onde é necessário consentimento, a medição pode estar ativa, respeitando recusas e sinais de oposição do navegador.</p>
      <p>A escolha, a data, a região conhecida e a versão do aviso ficam guardadas neste navegador, incluindo o histórico de alterações. Pode retirar a autorização a qualquer momento através das Definições de cookies; a alteração impede novas medições neste navegador, mas não elimina dados anteriormente recebidos pelo Google.</p>
      <p>O destinatário dos dados de publicidade é o Google. Consulte a <a className="text-primary underline" href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">informação de privacidade do Google</a>, incluindo conservação e eventuais transferências internacionais.</p>
      <Button variant="outline" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>Definições de cookies</Button>
      <h2 className="text-xl">Pedidos de consulta e contactos</h2>
      <p>Os dados fornecidos num pedido de consulta são usados pela clínica para responder ao pedido e não são enviados ao Google por esta instalação. Para questões de privacidade ou exercício dos seus direitos, contacte <a className="text-primary underline" href="mailto:geral@clinicadesassossego.pt">geral@clinicadesassossego.pt</a>.</p>
    </main><Footer /></>;
}