import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

const SYSTEM = `Você é o assistente de triagem do ProtegeFácil, um aplicativo brasileiro de segurança contra estelionato (golpes digitais). O usuário cola uma mensagem (SMS, WhatsApp, e-mail, link) ou envia um print que recebeu e suspeita ser golpe. Analise e classifique.

Considere os golpes mais comuns no Brasil, especialmente contra idosos: falso parente / WhatsApp clonado pedindo Pix, falso sequestro, golpe do Pix (falsa central, "devolução de valores"), falsa central de atendimento bancário, golpe do INSS / Meu INSS / prova de vida / consignado, phishing bancário com link falso, boleto clonado, golpe do romance, falso prêmio/brinde, malware em arquivo enviado no WhatsApp, clonagem de cartão.

Sinais de alerta: senso de urgência ou pressão; pedido de Pix/transferência; link encurtado ou domínio estranho; pedido de senha, token, código, CPF, foto de documento ou selfie; promessa boa demais; erros de português; número desconhecido se passando por banco, órgão público ou parente; sigilo ("não conta pra ninguém"); ameaça de bloqueio.

Responda APENAS com um objeto JSON válido, sem nenhum texto antes ou depois, sem markdown, sem crases. Formato exato:
{
"veredito":"PROVAVEL_GOLPE" ou "SUSPEITO" ou "PROVAVELMENTE_SEGURO",
"nivel_risco":"ALTO" ou "MEDIO" ou "BAIXO",
"score": número inteiro de 0 a 100 indicando o quão perigoso,
"tipo_golpe":"nome curto do tipo de golpe, ou 'Não identificado'",
"resumo":"1 ou 2 frases em linguagem simples explicando o veredito para uma pessoa idosa",
"sinais":["3 a 5 sinais curtos detectados"],
"exposicao_dados":"ALTO" ou "MEDIO" ou "BAIXO",
"exposicao_explicacao":"1 frase sobre o risco aos dados pessoais",
"acoes_prevencao":["3 a 5 ações curtas, no imperativo, do que fazer para NÃO cair"],
"ja_caiu_remediar":["3 a 4 ações do que fazer se a pessoa JÁ respondeu ou caiu"],
"recomenda_advogado": true ou false
}
Use linguagem simples e acolhedora. Seja direto.`;

type ImagePayload = { media_type: string; data: string };

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY não configurada no servidor." },
      { status: 500 }
    );
  }

  let body: { texto?: string; imagem?: ImagePayload };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const texto = (body.texto || "").trim();
  const imagem = body.imagem;

  if (!texto && !imagem) {
    return NextResponse.json(
      { error: "Envie uma mensagem ou um print para analisar." },
      { status: 400 }
    );
  }

  type Block =
    | { type: "text"; text: string }
    | {
        type: "image";
        source: {
          type: "base64";
          media_type: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
          data: string;
        };
      };

  const content: Block[] = [];
  if (imagem?.data) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: imagem.media_type as
          | "image/jpeg"
          | "image/png"
          | "image/gif"
          | "image/webp",
        data: imagem.data,
      },
    });
  }
  content.push({
    type: "text",
    text: texto
      ? `Analise esta mensagem que recebi e suspeito ser golpe:\n\n"""${texto}"""`
      : "Analise este print que recebi e suspeito ser golpe.",
  });

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1000,
      system: SYSTEM,
      messages: [{ role: "user", content }],
    });

    let raw = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("\n")
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end >= 0) raw = raw.slice(start, end + 1);

    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Erro na análise:", err);
    return NextResponse.json(
      { error: "Não foi possível concluir a análise agora." },
      { status: 502 }
    );
  }
}
