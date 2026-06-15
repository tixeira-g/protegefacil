"use client";

import { useState } from "react";
import { Header } from "@/components/Header";

interface Escritorio {
  nome: string;
  cidade: string;
  distanciaKm: number;
  nota: number;
  avaliacoes: number;
  atuacao: string;
  horario: string;
  online: boolean;
  whatsapp: string; // só dígitos, formato internacional
  email: string;
  telefone: string;
}

// Dados de exemplo — substitua pelos escritórios reais cadastrados na plataforma.
const ESCRITORIOS: Escritorio[] = [
  {
    nome: "Aquino & Associados Advocacia",
    cidade: "Montes Claros, MG",
    distanciaKm: 2.4,
    nota: 4.9,
    avaliacoes: 128,
    atuacao: "Direito do consumidor e crimes digitais",
    horario: "Seg a Sex, 8h às 18h",
    online: true,
    whatsapp: "5538900000001",
    email: "contato@aquinoadv.com.br",
    telefone: "+553830000001",
  },
  {
    nome: "Silva Jurídico Digital",
    cidade: "Montes Claros, MG",
    distanciaKm: 4.1,
    nota: 4.7,
    avaliacoes: 86,
    atuacao: "Estelionato e recuperação de valores",
    horario: "Seg a Sex, 9h às 17h",
    online: true,
    whatsapp: "5538900000002",
    email: "atendimento@silvadigital.adv.br",
    telefone: "+553830000002",
  },
  {
    nome: "Defesa Cidadã Advogados",
    cidade: "Belo Horizonte, MG",
    distanciaKm: 421,
    nota: 4.8,
    avaliacoes: 203,
    atuacao: "Direito bancário e fraudes financeiras",
    horario: "Seg a Sáb, 8h às 20h",
    online: true,
    whatsapp: "5531900000003",
    email: "contato@defesacidada.adv.br",
    telefone: "+553130000003",
  },
];

type Ordem = "proximos" | "avaliados";

export default function Juridico() {
  const [ordem, setOrdem] = useState<Ordem>("proximos");
  const [contato, setContato] = useState<string | null>(null);

  const lista = [...ESCRITORIOS].sort((a, b) =>
    ordem === "proximos" ? a.distanciaKm - b.distanciaKm : b.nota - a.nota
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-16 pt-7">
      <Header subtitle="Ajuda jurídica · escritórios parceiros" />

      <section className="mt-5 rounded-[16px] border border-line bg-white p-4 shadow-soft">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-[#f1ebf8] text-brand-purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]"><path d="M12 3v18M7 7h10M5 7l-2.5 6h5L5 7zm14 0l-2.5 6h5L19 7z" /></svg>
          </span>
          <h2 className="font-display text-[15px] font-extrabold tracking-tight text-navy-deep">
            Seus direitos
          </h2>
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
          O estelionato é crime (<b className="text-ink">Art. 171 do Código
          Penal</b>) e, desde a <b className="text-ink">Lei 14.155/2021</b>, a
          pena é maior quando o golpe é por meio eletrônico. Você tem direito a
          orientação e, em casos de prejuízo, a buscar ressarcimento.
        </p>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold tracking-tight text-navy-deep">
            Escritórios perto de você
          </h3>
        </div>
        <div className="mt-2.5 inline-flex rounded-[11px] border border-line bg-white p-1">
          {([
            ["proximos", "Mais próximos"],
            ["avaliados", "Melhor avaliados"],
          ] as [Ordem, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setOrdem(key)}
              className={`rounded-[8px] px-3 py-1.5 text-[11.5px] font-semibold transition ${
                ordem === key
                  ? "bg-navy-deep text-white"
                  : "text-muted hover:text-navy-deep"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-3 space-y-3">
        {lista.map((e, i) => (
          <article key={i} className="rounded-[16px] border border-line bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="font-display text-[14.5px] font-bold leading-tight text-ink">
                  {e.nome}
                </h4>
                <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                    {e.cidade} · {e.distanciaKm < 50 ? `${e.distanciaKm} km` : "atende à distância"}
                  </span>
                </div>
              </div>
              <span className="flex flex-none items-center gap-1 rounded-full bg-[#fff7e6] px-2.5 py-1 text-[11px] font-bold text-[#a06d09]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" /></svg>
                {e.nota.toFixed(1)}
              </span>
            </div>

            <p className="mt-2.5 text-[12.5px] leading-snug text-[#36425a]">{e.atuacao}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-muted">
              <span className="inline-flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                {e.horario}
              </span>
              {e.online && (
                <span className="inline-flex items-center gap-1 font-semibold text-brand-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5"><path d="M5 12l5 5 9-11" /></svg>
                  Atende online
                </span>
              )}
              <span>· {e.avaliacoes} avaliações</span>
            </div>

            <div className="mt-3.5 grid grid-cols-3 gap-2">
              <a href={`https://wa.me/${e.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-[10px] bg-[#e8f6ec] py-2.5 text-[11.5px] font-bold text-[#157a36] transition hover:brightness-95">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.1.1.3 0 .5l-.4.5c-.2.2-.3.4-.2.6.2.4.8 1.3 1.6 2 .9.8 1.7 1 2 1.2.2.1.4.1.5-.1l.6-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1z" /></svg>
                WhatsApp
              </a>
              <a href={`tel:${e.telefone}`} className="flex items-center justify-center gap-1.5 rounded-[10px] bg-[#eaf2fd] py-2.5 text-[11.5px] font-bold text-brand-blue transition hover:brightness-95">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2H7a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z" /></svg>
                Ligar
              </a>
              <a href={`mailto:${e.email}`} className="flex items-center justify-center gap-1.5 rounded-[10px] bg-[#f1ebf8] py-2.5 text-[11.5px] font-bold text-brand-purple transition hover:brightness-95">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                E-mail
              </a>
            </div>

            <button
              onClick={() => setContato(e.nome)}
              className="mt-2 w-full rounded-[10px] border border-line bg-white py-2.5 text-[12px] font-semibold text-navy-deep transition hover:bg-[#f7f9fc]"
            >
              Solicitar contato pela plataforma
            </button>
          </article>
        ))}
      </section>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
        Escritórios cadastrados na plataforma. Conteúdo informativo, não substitui consulta jurídica.
      </p>

      {contato && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/55 p-5 backdrop-blur-sm"
          onClick={(ev) => ev.target === ev.currentTarget && setContato(null)}
        >
          <div className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-3.5 grid h-[62px] w-[62px] place-items-center rounded-full bg-[#e7f0fc] text-navy-soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 className="mb-2 font-display text-lg font-extrabold">Solicitação enviada!</h3>
            <p className="mb-4 text-[13px] leading-relaxed text-muted">
              O escritório <b className="text-ink">{contato}</b> recebeu seu
              pedido de contato e retornará em breve pelo canal que você preferir.
            </p>
            <button
              onClick={() => setContato(null)}
              className="w-full rounded-[12px] bg-navy-deep py-3 font-display text-[13.5px] font-bold text-white"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
