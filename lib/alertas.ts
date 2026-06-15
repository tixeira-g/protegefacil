export type NivelAlerta = "ALTO" | "MEDIO";

export interface Alerta {
  titulo: string;
  nivel: NivelAlerta;
  data: string;
  como: string;
  dica: string;
  fonte: string;
  url: string;
}

// Feed curado a partir de fontes oficiais e checadores.
// Para automatizar no futuro: ler os RSS dessas fontes via um cron na Vercel.
export const ALERTAS: Alerta[] = [
  {
    titulo: "Golpe do falso gerente por telefone",
    nivel: "ALTO",
    data: "Mar/2026",
    como: "O criminoso liga mascarando o número para parecer o do banco, diz que houve compra suspeita ou clonagem e pede senha, código ou que você faça uma transferência para 'resolver'.",
    dica: "Banco nunca liga pedindo senha ou pra você transferir dinheiro. Desligue e ligue você mesmo no número oficial do cartão.",
    fonte: "Febraban / Agência Brasil",
    url: "https://agenciabrasil.ebc.com.br/economia/noticia/2026-03/febraban-alerta-sobre-golpe-do-falso-gerente",
  },
  {
    titulo: "Falsa prova de vida do INSS pelo WhatsApp",
    nivel: "ALTO",
    data: "Dez/2025",
    como: "Mensagem dizendo que a prova de vida está 'pendente' e pedindo foto do RG e uma selfie segurando o documento por WhatsApp, sob ameaça de bloquear o benefício.",
    dica: "O INSS não pede documentos por WhatsApp. A prova de vida é feita pelo app Meu INSS ou no banco. Nunca envie selfie com documento.",
    fonte: "Aviso oficial — INSS / gov.br",
    url: "https://www.gov.br/inss/pt-br",
  },
  {
    titulo: "Golpe do falso parente (troquei de número)",
    nivel: "ALTO",
    data: "Recorrente",
    como: "Alguém manda mensagem fingindo ser um filho ou neto que 'trocou de número' e pede um Pix urgente, pedindo sigilo para você não desconfiar.",
    dica: "Antes de qualquer Pix, ligue para o número antigo do parente e confirme por voz. Desconfie de pressa e de 'não conta pra ninguém'.",
    fonte: "IDEC — Instituto de Defesa do Consumidor",
    url: "https://idec.org.br/dicas-e-direitos/10-principais-golpes-contra-pessoas-idosas",
  },
  {
    titulo: "Phishing bancário por SMS e e-mail",
    nivel: "ALTO",
    data: "Recorrente",
    como: "Mensagem com a marca do banco dizendo que há 'acesso suspeito' e um link para 'regularizar'. O link leva a um site falso idêntico ao do banco que rouba sua senha.",
    dica: "Não clique em links de SMS/e-mail. Acesse o banco apenas pelo app oficial ou digitando o site você mesmo.",
    fonte: "Febraban",
    url: "https://portal.febraban.org.br/",
  },
  {
    titulo: "Falsas indenizações do Banco Master / FGC",
    nivel: "MEDIO",
    data: "Jan/2026",
    como: "Criminosos usam o nome do FGC e de bancos para oferecer falsos 'ressarcimentos', pedindo dados e pagamentos de taxas para liberar o valor.",
    dica: "O FGC nunca cobra taxa para pagar indenização. Confira sempre nos canais oficiais do próprio FGC.",
    fonte: "FGC / Agência Brasil",
    url: "https://agenciabrasil.ebc.com.br/economia/noticia/2026-01/fgc-alerta-para-golpes-ligados-indenizacoes-do-banco-master",
  },
  {
    titulo: "Fraudes com cartão de crédito",
    nivel: "MEDIO",
    data: "2026",
    como: "Transações não autorizadas no cartão a partir de dados vazados, muitas vezes em compras e pagamentos online que a vítima não reconhece.",
    dica: "Acompanhe a fatura, ative as notificações de compra do app e conteste na hora qualquer cobrança que não for sua.",
    fonte: "Banco Central do Brasil",
    url: "https://www.bcb.gov.br/",
  },
];

export const FONTES: [string, string][] = [
  ["Banco Central", "https://www.bcb.gov.br/"],
  ["Febraban", "https://portal.febraban.org.br/"],
  ["gov.br", "https://www.gov.br/"],
  ["Procon-SP", "https://www.procon.sp.gov.br/"],
  ["IDEC", "https://idec.org.br/"],
  ["Agência Lupa", "https://lupa.uol.com.br/"],
];
