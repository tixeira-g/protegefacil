"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Shield } from "@/components/Shield";

type Status = "novo" | "andamento" | "resolvido";
type Nivel = "ALTO" | "MEDIO" | "BAIXO";

interface Chamado {
  id: string;
  data: string;
  cliente: string;
  cidade: string;
  canal: "WhatsApp" | "Telefone" | "E-mail";
  tipo: string;
  nivel: Nivel;
  score: number;
  jaCaiu: boolean;
  prejuizo?: string;
  resumo: string;
  sinais: string[];
  exposicao: Nivel;
  status: Status;
}

const SEED: Chamado[] = [
  {
    id: "PF-4821",
    data: "há 25 min",
    cliente: "Maria S.",
    cidade: "Montes Claros, MG",
    canal: "WhatsApp",
    tipo: "Golpe do falso parente (PIX)",
    nivel: "ALTO",
    score: 92,
    jaCaiu: true,
    prejuizo: "R$ 870,00",
    resumo:
      "Recebeu mensagem de suposto filho que 'trocou de número' pedindo Pix urgente com pedido de sigilo. Realizou a transferência antes de confirmar.",
    sinais: ["Urgência e sigilo", "Número desconhecido", "Pedido de Pix imediato"],
    exposicao: "MEDIO",
    status: "novo",
  },
  {
    id: "PF-4822",
    data: "há 1 h",
    cliente: "João P.",
    cidade: "Montes Claros, MG",
    canal: "Telefone",
    tipo: "Phishing bancário",
    nivel: "ALTO",
    score: 84,
    jaCaiu: false,
    resumo:
      "SMS com a marca do banco e link para 'regularizar acesso suspeito'. Não clicou, mas quer orientação preventiva e saber se deve registrar denúncia.",
    sinais: ["Link encurtado suspeito", "Domínio falso do banco", "Tom de ameaça"],
    exposicao: "BAIXO",
    status: "novo",
  },
  {
    id: "PF-4815",
    data: "há 5 h",
    cliente: "Antônio R.",
    cidade: "Bocaiúva, MG",
    canal: "WhatsApp",
    tipo: "Golpe do consignado / Meu INSS",
    nivel: "ALTO",
    score: 95,
    jaCaiu: true,
    prejuizo: "Empréstimo de R$ 4.200 no nome",
    resumo:
      "Aposentado teve dados usados para contratar empréstimo consignado que não reconhece. Já recebeu cobrança das parcelas.",
    sinais: ["Empréstimo não reconhecido", "Dados de aposentado vazados", "Cobrança indevida"],
    exposicao: "ALTO",
    status: "andamento",
  },
  {
    id: "PF-4810",
    data: "ontem",
    cliente: "Cleusa M.",
    cidade: "Montes Claros, MG",
    canal: "E-mail",
    tipo: "Falsa central / falso gerente",
    nivel: "MEDIO",
    score: 58,
    jaCaiu: false,
    resumo:
      "Ligação se passando por gerente pedindo confirmação de dados. Desconfiou e desligou. Procura orientação sobre como proceder.",
    sinais: ["Número mascarado (spoofing)", "Pedido de dados por telefone"],
    exposicao: "BAIXO",
    status: "andamento",
  },
  {
    id: "PF-4799",
    data: "há 3 dias",
    cliente: "Pedro L.",
    cidade: "Janaúba, MG",
    canal: "WhatsApp",
    tipo: "Fraude com cartão de crédito",
    nivel: "MEDIO",
    score: 61,
    jaCaiu: true,
    prejuizo: "R$ 1.340 em compras",
    resumo:
      "Compras online não reconhecidas no cartão. Caso encaminhado, contestação junto ao banco em andamento e resolvida com ressarcimento.",
    sinais: ["Transações não reconhecidas", "Dados de cartão vazados"],
    exposicao: "MEDIO",
    status: "resolvido",
  },
  {
    id: "PF-4790",
    data: "há 5 dias",
    cliente: "Rosa F.",
    cidade: "Montes Claros, MG",
    canal: "Telefone",
    tipo: "Falso prêmio / brinde",
    nivel: "BAIXO",
    score: 22,
    jaCaiu: false,
    resumo:
      "Mensagem de falso sorteio pedindo dados para 'liberar prêmio'. Cliente orientada, sem prejuízo. Caso encerrado.",
    sinais: ["Promessa boa demais", "Pedido de dados pessoais"],
    exposicao: "BAIXO",
    status: "resolvido",
  },
];

const STATUS_META: Record<Status, { label: string; cls: string }> = {
  novo: { label: "Novo", cls: "bg-[#eaf2fd] text-brand-blue" },
  andamento: { label: "Em andamento", cls: "bg-[#fdf4e0] text-[#a06d09]" },
  resolvido: { label: "Resolvido", cls: "bg-[#e8f6ec] text-[#157a36]" },
};

const NIVEL_CLS: Record<Nivel, string> = {
  ALTO: "bg-[#fdecec] text-[#c0322f]",
  MEDIO: "bg-[#fdf4e0] text-[#a06d09]",
  BAIXO: "bg-[#e8f6ec] text-[#157a36]",
};

export default function Advogado() {
  const [chamados, setChamados] = useState<Chamado[]>(SEED);
  const [filtro, setFiltro] = useState<Status | "todos">("todos");
  const [aberto, setAberto] = useState<Chamado | null>(null);

  const stats = useMemo(
    () => ({
      novo: chamados.filter((c) => c.status === "novo").length,
      andamento: chamados.filter((c) => c.status === "andamento").length,
      resolvido: chamados.filter((c) => c.status === "resolvido").length,
    }),
    [chamados]
  );

  const lista = chamados.filter((c) => filtro === "todos" || c.status === filtro);

  function mover(id: string, status: Status) {
    setChamados((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    setAberto((a) => (a && a.id === id ? { ...a, status } : a));
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-16 pt-7">
      {/* header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-[13px] bg-gradient-to-b from-navy-soft to-navy-deep shadow-mark">
            <Shield className="h-[23px] w-[23px]" />
          </span>
          <div>
            <div className="font-display text-lg font-extrabold leading-none tracking-tight text-navy-deep">
              Painel do Advogado
            </div>
            <div className="text-[11.5px] text-muted">Aquino &amp; Associados Advocacia</div>
          </div>
        </div>
        <Link href="/" className="rounded-[10px] border border-line bg-white px-3 py-2 text-[12px] font-semibold text-navy-deep transition hover:bg-[#f7f9fc]">
          Sair
        </Link>
      </header>

      {/* stats */}
      <section className="mt-5 grid grid-cols-3 gap-3">
        {([
          ["novo", "Novos", stats.novo],
          ["andamento", "Em andamento", stats.andamento],
          ["resolvido", "Resolvidos", stats.resolvido],
        ] as [Status, string, number][]).map(([key, label, n]) => (
          <div key={key} className="rounded-[14px] border border-line bg-white p-3.5 shadow-soft">
            <div className="font-display text-[26px] font-extrabold leading-none text-navy-deep">{n}</div>
            <div className="mt-1 text-[11.5px] text-muted">{label}</div>
          </div>
        ))}
      </section>

      {/* filtros */}
      <section className="mt-5 flex flex-wrap gap-2">
        {([
          ["todos", "Todos"],
          ["novo", "Novos"],
          ["andamento", "Em andamento"],
          ["resolvido", "Resolvidos"],
        ] as [Status | "todos", string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFiltro(key)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
              filtro === key ? "bg-navy-deep text-white" : "border border-line bg-white text-muted hover:text-navy-deep"
            }`}
          >
            {label}
          </button>
        ))}
      </section>

      {/* lista */}
      <section className="mt-3 grid gap-3 md:grid-cols-2">
        {lista.map((c) => (
          <article key={c.id} className="flex flex-col rounded-[16px] border border-line bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-[11px] font-extrabold tracking-wide text-navy-soft">{c.id}</span>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_META[c.status].cls}`}>
                {STATUS_META[c.status].label}
              </span>
            </div>

            <div className="mt-2 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display text-[14.5px] font-bold leading-tight text-ink">{c.tipo}</h3>
                <div className="mt-1 text-[11.5px] text-muted">
                  {c.cliente} · {c.cidade} · {c.data}
                </div>
              </div>
              <span className={`flex-none rounded-full px-2.5 py-1 font-display text-[10px] font-extrabold ${NIVEL_CLS[c.nivel]}`}>
                {c.nivel}
              </span>
            </div>

            {c.jaCaiu && (
              <div className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-[8px] bg-[#fdecec] px-2.5 py-1 text-[11px] font-semibold text-[#c0322f]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-3.5 w-3.5"><path d="M12 9v4M12 17h.01" /><circle cx="12" cy="12" r="9" /></svg>
                Já caiu{c.prejuizo ? ` · ${c.prejuizo}` : ""}
              </div>
            )}

            <p className="mt-2.5 flex-1 text-[12px] leading-snug text-[#36425a]">{c.resumo}</p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setAberto(c)}
                className="flex-1 rounded-[10px] bg-navy-deep py-2.5 text-[12px] font-bold text-white transition hover:brightness-110"
              >
                Ver triagem da IA
              </button>
              {c.status === "novo" && (
                <button
                  onClick={() => mover(c.id, "andamento")}
                  className="rounded-[10px] border border-line bg-white px-3 py-2.5 text-[12px] font-semibold text-navy-deep transition hover:bg-[#f7f9fc]"
                >
                  Aceitar
                </button>
              )}
              {c.status === "andamento" && (
                <button
                  onClick={() => mover(c.id, "resolvido")}
                  className="rounded-[10px] border border-[#b6e1c2] bg-[#e8f6ec] px-3 py-2.5 text-[12px] font-semibold text-[#157a36] transition hover:brightness-95"
                >
                  Resolver
                </button>
              )}
            </div>
          </article>
        ))}
        {lista.length === 0 && (
          <div className="col-span-full rounded-[16px] border border-dashed border-line bg-white p-8 text-center text-[13px] text-muted">
            Nenhum chamado nesse status.
          </div>
        )}
      </section>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
        Demonstração · os chamados aparecem com a triagem da IA anexada, prontos para atendimento.
      </p>

      {/* modal triagem */}
      {aberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/55 p-4 backdrop-blur-sm"
          onClick={(ev) => ev.target === ev.currentTarget && setAberto(null)}
        >
          <div className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-[20px] bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-[11px] font-extrabold tracking-wide text-navy-soft">{aberto.id}</div>
                <h3 className="mt-0.5 font-display text-[17px] font-extrabold leading-tight text-ink">{aberto.tipo}</h3>
                <div className="mt-1 text-[12px] text-muted">{aberto.cliente} · {aberto.cidade}</div>
              </div>
              <button onClick={() => setAberto(null)} className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#f0f3f8] text-muted">×</button>
            </div>

            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1 font-display text-[11px] font-extrabold ${NIVEL_CLS[aberto.nivel]}`}>Risco {aberto.nivel}</span>
              <span className="rounded-full bg-[#f0f3f8] px-3 py-1 text-[11px] font-semibold text-navy-deep">Score {aberto.score}/100</span>
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${aberto.jaCaiu ? "bg-[#fdecec] text-[#c0322f]" : "bg-[#e8f6ec] text-[#157a36]"}`}>
                {aberto.jaCaiu ? "Já caiu no golpe" : "Não caiu"}
              </span>
            </div>

            {aberto.prejuizo && (
              <div className="mt-3 rounded-[12px] border border-[#f4c9c9] bg-[#fdecec] px-3.5 py-2.5 text-[12.5px] text-[#b3302d]">
                <b>Prejuízo informado:</b> {aberto.prejuizo}
              </div>
            )}

            <div className="mt-3 rounded-r-[10px] border-l-[3px] border-navy-soft bg-[#f7f9fc] px-3.5 py-3 text-[12.5px] leading-relaxed text-[#2c3850]">
              {aberto.resumo}
            </div>

            <div className="mt-3.5">
              <div className="mb-2 font-display text-[12.5px] font-bold">Sinais detectados pela IA</div>
              <ul className="space-y-1.5">
                {aberto.sinais.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px] leading-snug">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#e09a14" strokeWidth={2.5} className="mt-0.5 h-3.5 w-3.5 flex-none"><path d="M12 8v5M12 16h.01" /></svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3.5 flex items-center justify-between rounded-[12px] border border-line p-3 text-[12px]">
              <span className="text-muted"><b className="text-ink">Exposição de dados:</b></span>
              <span className={`rounded-full px-3 py-1 font-display text-[10px] font-extrabold ${NIVEL_CLS[aberto.exposicao]}`}>{aberto.exposicao}</span>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-[12px] bg-[#eaf2fd] px-3.5 py-2.5 text-[12px] text-navy-deep">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 flex-none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              Canal preferido do cliente: <b>{aberto.canal}</b>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {aberto.status === "novo" && (
                <button onClick={() => mover(aberto.id, "andamento")} className="flex-1 rounded-[11px] bg-navy-deep py-3 font-display text-[13px] font-bold text-white transition hover:brightness-110">
                  Aceitar caso
                </button>
              )}
              {aberto.status === "andamento" && (
                <button onClick={() => mover(aberto.id, "resolvido")} className="flex-1 rounded-[11px] bg-[#1fa24b] py-3 font-display text-[13px] font-bold text-white transition hover:brightness-110">
                  Marcar como resolvido
                </button>
              )}
              {aberto.status === "resolvido" && (
                <div className="flex-1 rounded-[11px] bg-[#e8f6ec] py-3 text-center font-display text-[13px] font-bold text-[#157a36]">
                  Caso resolvido
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
