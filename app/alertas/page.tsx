import { Header } from "@/components/Header";

type Nivel = "ALTO" | "MEDIO";

interface Alerta {
  titulo: string;
  nivel: Nivel;
  data: string;
  como: string;
  dica: string;
  fonte: string;
  url: string;
}

// Feed curado a partir de fontes oficiais e checadores.
// Para automatizar no futuro: ler os RSS dessas fontes via um cron na Vercel.
const ALERTAS: Alerta[] = [
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

const FONTES = [
  ["Banco Central", "https://www.bcb.gov.br/"],
  ["Febraban", "https://portal.febraban.org.br/"],
  ["gov.br", "https://www.gov.br/"],
  ["Procon-SP", "https://www.procon.sp.gov.br/"],
  ["IDEC", "https://idec.org.br/"],
  ["Agência Lupa", "https://lupa.uol.com.br/"],
];

export default function Alertas() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-16 pt-7">
      <Header subtitle="Alertas de fraude · golpes em circulação" />

      <section className="mt-5">
        <h2 className="font-display text-lg font-extrabold tracking-tight text-navy-deep">
          Golpes em circulação
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          Atualizado a partir de fontes oficiais e checadores. Saiba como cada
          golpe funciona — e o que fazer para não cair.
        </p>
      </section>

      <section className="mt-4 space-y-3">
        {ALERTAS.map((a, i) => (
          <article
            key={i}
            className="rounded-[16px] border border-line bg-white p-4 shadow-soft"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3 className="font-display text-[14.5px] font-bold leading-tight text-ink">
                {a.titulo}
              </h3>
              <span
                className={`flex-none rounded-full px-2.5 py-1 font-display text-[10px] font-extrabold tracking-wide ${
                  a.nivel === "ALTO"
                    ? "bg-[#fdecec] text-[#c0322f]"
                    : "bg-[#fdf4e0] text-[#a06d09]"
                }`}
              >
                {a.nivel === "ALTO" ? "RISCO ALTO" : "ATENÇÃO"}
              </span>
            </div>

            <p className="text-[12.5px] leading-relaxed text-[#36425a]">
              {a.como}
            </p>

            <div className="mt-3 flex items-start gap-2 rounded-[11px] bg-[#e8f6ec] px-3 py-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#157a36" strokeWidth={2.5} className="mt-0.5 h-4 w-4 flex-none">
                <path d="M12 2l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-[12px] leading-snug text-[#1c5230]">
                <b>O que fazer:</b> {a.dica}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-muted">
              <span>{a.data}</span>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-navy-soft hover:underline"
              >
                Fonte: {a.fonte}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-5 rounded-[16px] border border-line bg-white p-4 shadow-soft">
        <div className="mb-2.5 font-display text-[12.5px] font-bold text-ink">
          Acompanhe os canais oficiais
        </div>
        <div className="flex flex-wrap gap-2">
          {FONTES.map(([nome, url]) => (
            <a
              key={nome}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-3 py-1.5 text-[11.5px] font-semibold text-navy-deep transition hover:bg-[#f7f9fc]"
            >
              {nome}
            </a>
          ))}
        </div>
      </section>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
        Informações de caráter educativo, com base em alertas públicos das fontes citadas.
      </p>
    </main>
  );
}
