"use client";

import { useRef, useState } from "react";
import { Header } from "@/components/Header";
import type { Analise, Nivel } from "@/lib/types";

const EXAMPLES: Record<string, string> = {
  parente:
    "Oi mãe, troquei de número, esse aqui é o novo, salva aí. Tô num aperto e preciso que você me faça um Pix urgente de R$ 870 nessa chave: 041.xxx.xxx-xx. Depois te explico, não conta pra ninguém 🙏",
  banco:
    "BANCO: Identificamos um acesso SUSPEITO na sua conta. Para nao ser bloqueada, regularize seus dados agora mesmo no link: http://seguranca-banco-br.verificar.click/acesso",
  inss:
    "INSS COMUNICA: sua Prova de Vida esta PENDENTE. Faca a validacao manual pelo WhatsApp enviando uma foto do seu RG e uma selfie segurando o documento para evitar o bloqueio do seu beneficio.",
  seguro:
    "Oi, tudo bem? Confirmando nosso almoço de domingo, 12h, lá no restaurante de sempre. Avisa se vai poder levar a sobremesa. Abraço!",
};

const VERDICT_LABEL: Record<string, string> = {
  PROVAVEL_GOLPE: "Provável golpe",
  SUSPEITO: "Mensagem suspeita",
  PROVAVELMENTE_SEGURO: "Provavelmente seguro",
};

function rk(n?: Nivel) {
  return n === "ALTO" ? "alto" : n === "BAIXO" ? "baixo" : "medio";
}

const TONE = {
  alto: { card: "from-[#fdecec] to-[#fbdede]", ico: "bg-brand-red", txt: "text-[#b3302d]", badge: "bg-[#fdecec] text-[#c0322f]", gv: "text-brand-red" },
  medio: { card: "from-[#fdf4e0] to-[#fbeccb]", ico: "bg-brand-amber", txt: "text-[#a06d09]", badge: "bg-[#fdf4e0] text-[#a06d09]", gv: "text-brand-amber" },
  baixo: { card: "from-[#e7f5ec] to-[#d6efde]", ico: "bg-brand-green", txt: "text-[#157a36]", badge: "bg-[#e7f5ec] text-[#157a36]", gv: "text-brand-green" },
};

export default function Verificador() {
  const [texto, setTexto] = useState("");
  const [imgData, setImgData] = useState<string | null>(null);
  const [imgMime, setImgMime] = useState<string | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Analise | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function clearImage() {
    setImgData(null);
    setImgMime(null);
    setImgPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setImgPreview(url);
      setImgData(url.split(",")[1]);
      setImgMime(f.type);
    };
    reader.readAsDataURL(f);
  }

  function reset() {
    setResult(null);
    setError(null);
    setTexto("");
    setTicket(null);
    clearImage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function analisar() {
    if (!texto.trim() && !imgData) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analisar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: texto.trim(),
          imagem: imgData ? { media_type: imgMime, data: imgData } : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha");
      setResult(data as Analise);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Não consegui concluir a análise agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const tone = result ? TONE[rk(result.nivel_risco)] : TONE.medio;
  const score = result
    ? Math.max(0, Math.min(100, Math.round(result.score)))
    : 0;
  const needleDeg = -90 + score * 1.8;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-16 pt-7">
      <Header subtitle="Verificador de Golpe · análise por IA" />

      <div className="mt-4 rounded-[20px] border border-line bg-white p-5 shadow-soft">
        {!result && !loading && (
          <>
            <h2 className="font-display text-base font-bold tracking-tight">
              Recebeu uma mensagem suspeita?
            </h2>
            <p className="mb-3.5 mt-1 text-[12.5px] leading-relaxed text-muted">
              Cole o texto de um SMS, WhatsApp, e-mail ou link — ou anexe o
              print. A IA analisa na hora e te diz o nível de risco.
            </p>

            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Cole aqui a mensagem que você recebeu..."
              className="min-h-[120px] w-full resize-y rounded-[13px] border border-line bg-[#fbfcfe] px-3.5 py-3 text-[13.5px] leading-relaxed outline-none transition focus:border-navy-soft focus:bg-white focus:ring-2 focus:ring-navy-soft/10"
            />

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-[10px] border border-dashed border-line bg-white px-3 py-2 text-[11.5px] font-semibold text-navy-deep transition hover:bg-[#f7f9fc]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                  <path d="M21.4 11.05 12.2 20.3a5 5 0 0 1-7.1-7.1l9.2-9.2a3 3 0 0 1 4.3 4.3l-9.2 9.2a1 1 0 0 1-1.5-1.5l8.5-8.5" />
                </svg>
                Anexar print
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
            </div>

            {imgPreview && (
              <div className="relative mt-3 inline-block">
                <button
                  onClick={clearImage}
                  className="absolute left-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-lg bg-navy-deep/80 text-white"
                >
                  ×
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgPreview} alt="print" className="max-h-36 rounded-[11px] border border-line" />
              </div>
            )}

            <p className="mb-2 mt-4 text-[10.5px] font-bold uppercase tracking-wide text-muted">
              Não tem uma agora? Teste com um exemplo:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                ["parente", "Falso parente (PIX)", "bg-[#fdecec] text-[#c0322f]"],
                ["banco", "Phishing do banco", "bg-[#fdecec] text-[#c0322f]"],
                ["inss", "Golpe do INSS", "bg-[#fdecec] text-[#c0322f]"],
                ["seguro", "Mensagem normal", "bg-[#e7f5ec] text-[#177a38]"],
              ].map(([key, label, cls]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTexto(EXAMPLES[key]);
                    clearImage();
                  }}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition hover:-translate-y-px ${cls}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-3.5 rounded-[13px] border border-[#f4c9c9] bg-[#fdecec] p-3.5 text-[13px] leading-relaxed text-[#b3302d]">
                {error}
              </div>
            )}

            <button
              onClick={analisar}
              disabled={!texto.trim() && !imgData}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-navy-soft to-navy-deep px-4 py-[15px] font-display text-[14.5px] font-extrabold tracking-wide text-white transition hover:brightness-110 active:scale-[.99] disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              Analisar mensagem
            </button>
          </>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="h-9 w-9 rounded-full border-[3px] border-line border-t-navy-soft animate-spin360" />
            <p className="text-[13px] text-muted">Analisando com inteligência artificial...</p>
          </div>
        )}

        {result && !loading && (
          <div>
            <div className={`mb-3.5 flex items-center gap-3.5 rounded-2xl bg-gradient-to-br p-4 ${tone.card}`}>
              <span className={`grid h-[50px] w-[50px] flex-none place-items-center rounded-[14px] text-white ${tone.ico}`}>
                {rk(result.nivel_risco) === "baixo" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-7 w-7"><path d="M20 6 9 17l-5-5" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-7 w-7"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>
                )}
              </span>
              <div>
                <div className={`font-display text-[17px] font-extrabold leading-tight ${tone.txt}`}>
                  {VERDICT_LABEL[result.veredito] ?? "Análise concluída"}
                </div>
                <div className="mt-0.5 text-[12px] text-muted">
                  {result.tipo_golpe && result.tipo_golpe !== "Não identificado"
                    ? `Tipo: ${result.tipo_golpe}`
                    : "Sem golpe específico identificado"}
                </div>
              </div>
            </div>

            <div className="mb-3.5 flex items-center gap-4 rounded-[14px] border border-line bg-[#fbfcfe] p-3.5">
              <svg viewBox="0 0 200 110" width={118} height={65} className="flex-none">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#1fa24b" />
                    <stop offset=".5" stopColor="#e09a14" />
                    <stop offset="1" stopColor="#df3b3b" />
                  </linearGradient>
                </defs>
                <path d="M16 92 A84 84 0 0 1 184 92" fill="none" stroke="#eef1f6" strokeWidth={15} strokeLinecap="round" />
                <path d="M16 92 A84 84 0 0 1 184 92" fill="none" stroke="url(#g)" strokeWidth={15} strokeLinecap="round" />
                <g style={{ transformOrigin: "100px 92px", transform: `rotate(${needleDeg}deg)`, transition: "transform 1.1s cubic-bezier(.34,1.4,.5,1)" }}>
                  <path d="M100 92 L100 26" stroke="#16203a" strokeWidth={4.5} strokeLinecap="round" />
                </g>
                <circle cx="100" cy="92" r="8" fill="#16203a" />
                <circle cx="100" cy="92" r="3.5" fill="#fff" />
              </svg>
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-wide text-muted">Nível de perigo</div>
                <div className={`mt-0.5 font-display text-[22px] font-extrabold leading-tight ${tone.gv}`}>{result.nivel_risco}</div>
                <div className="mt-0.5 text-[11.5px] text-muted">Pontuação de risco: {score}/100</div>
              </div>
            </div>

            <div className="mb-4 rounded-r-[10px] border-l-[3px] border-navy-soft bg-[#f7f9fc] px-3.5 py-3 text-[13px] leading-relaxed text-[#2c3850]">
              {result.resumo}
            </div>

            <div className="mb-4 flex items-center justify-between gap-2.5 rounded-[13px] border border-line p-3.5">
              <div className="flex-1 text-[12px] leading-snug text-muted">
                <b className="text-ink">Risco aos seus dados:</b> {result.exposicao_explicacao}
              </div>
              <span className={`flex-none rounded-full px-3 py-1.5 font-display text-[11px] font-extrabold tracking-wide ${TONE[rk(result.exposicao_dados)].badge}`}>
                Exposição {result.exposicao_dados}
              </span>
            </div>

            <Section title="Sinais que a IA detectou" color="#e09a14" items={result.sinais} variant="warn" />
            <Section title="Como se proteger agora" color="#1fa24b" items={result.acoes_prevencao} variant="check" />
            <Section title="Se você já respondeu ou caiu" color="#df3b3b" items={result.ja_caiu_remediar} variant="arrow" />

            {(result.recomenda_advogado || rk(result.nivel_risco) === "alto") && (
              <div className="rounded-2xl bg-gradient-to-br from-[#1d3f72] to-[#0d213f] p-[17px] text-white">
                <h4 className="font-display text-[15px] font-extrabold">Quer apoio jurídico?</h4>
                <p className="mb-3.5 mt-1 text-[12px] leading-relaxed opacity-85">
                  Esse caso tem risco alto. Podemos encaminhar para um escritório
                  parceiro, já com toda a análise da IA anexada — você não
                  precisa explicar tudo de novo.
                </p>
                <button
                  onClick={() => setTicket(`PF-${Math.floor(1000 + Math.random() * 9000)}`)}
                  className="flex w-full items-center justify-center gap-2 rounded-[11px] bg-white px-4 py-3 font-display text-[13.5px] font-bold text-navy-deep transition hover:brightness-95"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path d="M12 3v18M7 7h10M5 7l-2.5 6h5L5 7zm14 0l-2.5 6h5L19 7z" />
                  </svg>
                  Falar com um advogado
                </button>
              </div>
            )}

            <button
              onClick={reset}
              className="mt-3.5 w-full rounded-[12px] border border-line bg-white py-3 text-[13px] font-semibold text-navy-deep transition hover:bg-[#f7f9fc]"
            >
              Verificar outra mensagem
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] leading-relaxed text-muted">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 flex-none">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        Triagem automática por IA · não substitui orientação jurídica formal.
      </p>

      {ticket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/55 p-5 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setTicket(null)}
        >
          <div className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-3.5 grid h-[62px] w-[62px] place-items-center rounded-full bg-[#e7f0fc] text-navy-soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 className="mb-2 font-display text-lg font-extrabold">Chamado encaminhado!</h3>
            <p className="mb-4 text-[13px] leading-relaxed text-muted">
              Um escritório parceiro recebeu seu caso e entrará em contato. A
              análise da IA foi anexada automaticamente.
            </p>
            <div className="mb-4 rounded-[12px] border border-dashed border-[#c9d6ea] bg-[#f7f9fc] p-3 text-left text-[12px]">
              <div className="font-display text-[13px] font-extrabold text-navy">Chamado #{ticket}</div>
              <div className="mt-1.5"><b className="text-navy-deep">Status:</b> Aguardando advogado</div>
              <div><b className="text-navy-deep">Anexo:</b> Triagem ProtegeFácil (IA)</div>
            </div>
            <button
              onClick={() => setTicket(null)}
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

function Section({
  title,
  color,
  items,
  variant,
}: {
  title: string;
  color: string;
  items?: string[];
  variant: "warn" | "check" | "arrow";
}) {
  if (!items || items.length === 0) return null;
  const bullet =
    variant === "check" ? (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} className="h-[15px] w-[15px]"><path d="M5 12l5 5 9-11" /></svg>
    ) : variant === "arrow" ? (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} className="h-[15px] w-[15px]"><path d="M9 6l6 6-6 6" /></svg>
    ) : (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} className="h-[15px] w-[15px]"><path d="M12 8v5M12 16h.01" /></svg>
    );
  const headIcon =
    variant === "check" ? (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} className="h-4 w-4"><path d="M12 2l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
    ) : variant === "arrow" ? (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} className="h-4 w-4"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>
    ) : (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} className="h-4 w-4"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>
    );
  return (
    <div className="mb-4">
      <div className="mb-2.5 flex items-center gap-2 font-display text-[13px] font-bold">
        {headIcon}
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[12.5px] leading-snug">
            <span className="mt-0.5 flex-none">{bullet}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
