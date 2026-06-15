"use client";

import { useEffect, useState } from "react";

const HABITOS = [
  "Ativei a verificação em duas etapas (2FA) nas minhas contas",
  "Uso uma senha forte e diferente para o banco",
  "Sei que banco e INSS nunca pedem senha por telefone ou WhatsApp",
  "Confiro o remetente antes de clicar em qualquer link",
  "Confirmo por ligação antes de fazer Pix pedido por mensagem",
];

type Nivel = { label: string; cls: string; bar: string };

function nivelDe(score: number): Nivel {
  if (score >= 4) return { label: "Boa", cls: "text-[#157a36]", bar: "bg-brand-green" };
  if (score >= 2) return { label: "Atenção", cls: "text-[#a06d09]", bar: "bg-brand-amber" };
  return { label: "Frágil", cls: "text-[#c0322f]", bar: "bg-brand-red" };
}

interface Vazamento {
  status: "idle" | "loading" | "ok" | "erro";
  total?: number;
  nomes?: string[];
  msg?: string;
}

export function StatusSeguranca() {
  const [respostas, setRespostas] = useState<boolean[]>(Array(HABITOS.length).fill(false));
  const [aberto, setAberto] = useState(false);
  const [email, setEmail] = useState("");
  const [vaz, setVaz] = useState<Vazamento>({ status: "idle" });
  const [pronto, setPronto] = useState(false);

  // carrega/salva as respostas localmente (persiste entre visitas)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pf_seguranca");
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length === HABITOS.length) setRespostas(arr);
      }
    } catch {}
    setPronto(true);
  }, []);

  useEffect(() => {
    if (pronto) {
      try {
        localStorage.setItem("pf_seguranca", JSON.stringify(respostas));
      } catch {}
    }
  }, [respostas, pronto]);

  const score = respostas.filter(Boolean).length;
  const nivel = nivelDe(score);
  const pct = (score / HABITOS.length) * 100;

  function toggle(i: number) {
    setRespostas((r) => r.map((v, idx) => (idx === i ? !v : v)));
  }

  async function checarEmail() {
    if (!email.includes("@")) return;
    setVaz({ status: "loading" });
    try {
      const res = await fetch("/api/vazamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setVaz({ status: "ok", total: data.total, nomes: data.vazamentos });
    } catch {
      setVaz({ status: "erro", msg: "Não foi possível checar agora. Tente novamente." });
    }
  }

  return (
    <section className="rounded-[18px] border border-line bg-white p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-[14px] bg-gradient-to-b from-navy-soft to-navy-deep">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path d="M12 2l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3z" fill="#fff" opacity="0.96" />
            <path d="M9 12l2 2 4-4" stroke="#15315c" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-[13px] font-bold text-ink">Sua segurança</span>
            <span className={`font-display text-[15px] font-extrabold ${nivel.cls}`}>{nivel.label}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#eef1f6]">
            <div className={`h-full rounded-full transition-all duration-500 ${nivel.bar}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-1.5 text-[11px] text-muted">{score} de {HABITOS.length} hábitos seguros ativados</div>
        </div>
      </div>

      <button
        onClick={() => setAberto((a) => !a)}
        className="mt-3 flex w-full items-center justify-between rounded-[11px] bg-[#f7f9fc] px-3.5 py-2.5 text-[12.5px] font-semibold text-navy-deep transition hover:bg-[#eef2f8]"
      >
        {aberto ? "Ocultar checklist" : "Melhorar minha segurança"}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`h-4 w-4 transition-transform ${aberto ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {aberto && (
        <div className="mt-3 space-y-2">
          {HABITOS.map((h, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`flex w-full items-start gap-2.5 rounded-[11px] border p-3 text-left transition ${
                respostas[i] ? "border-[#b6e1c2] bg-[#e8f6ec]" : "border-line bg-white hover:bg-[#f7f9fc]"
              }`}
            >
              <span className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-md border-2 ${respostas[i] ? "border-brand-green bg-brand-green" : "border-[#c3cfe2] bg-white"}`}>
                {respostas[i] && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.5} className="h-3 w-3"><path d="M5 12l5 5 9-11" /></svg>
                )}
              </span>
              <span className="text-[12px] leading-snug text-ink">{h}</span>
            </button>
          ))}

          {/* checagem de e-mail */}
          <div className="mt-3 rounded-[12px] border border-line bg-[#fbfcfe] p-3.5">
            <div className="mb-1 font-display text-[12.5px] font-bold text-ink">Seu e-mail já vazou?</div>
            <p className="mb-2.5 text-[11px] leading-snug text-muted">
              Checamos seu e-mail em bases públicas de vazamentos. Só verificamos quando você pede.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="min-w-0 flex-1 rounded-[10px] border border-line bg-white px-3 py-2.5 text-[12.5px] outline-none focus:border-navy-soft"
              />
              <button
                onClick={checarEmail}
                disabled={!email.includes("@") || vaz.status === "loading"}
                className="flex-none rounded-[10px] bg-navy-deep px-4 py-2.5 text-[12.5px] font-bold text-white transition hover:brightness-110 disabled:opacity-50"
              >
                {vaz.status === "loading" ? "..." : "Verificar"}
              </button>
            </div>

            {vaz.status === "ok" && vaz.total !== undefined && (
              <div className={`mt-2.5 rounded-[10px] p-3 text-[12px] leading-snug ${vaz.total > 0 ? "bg-[#fdecec] text-[#b3302d]" : "bg-[#e8f6ec] text-[#1c5230]"}`}>
                {vaz.total > 0 ? (
                  <>
                    <b>Seu e-mail apareceu em {vaz.total} vazamento{vaz.total > 1 ? "s" : ""}.</b>{" "}
                    {vaz.nomes && vaz.nomes.length > 0 && (
                      <span>({vaz.nomes.slice(0, 6).join(", ")}{vaz.nomes.length > 6 ? ` e mais ${vaz.nomes.length - 6}` : ""}). </span>
                    )}
                    Troque as senhas dessas contas e ative a verificação em duas etapas.
                  </>
                ) : (
                  <><b>Boa notícia:</b> não encontramos seu e-mail em vazamentos conhecidos. Continue atento.</>
                )}
              </div>
            )}
            {vaz.status === "erro" && (
              <div className="mt-2.5 rounded-[10px] bg-[#fdecec] p-3 text-[12px] text-[#b3302d]">{vaz.msg}</div>
            )}
          </div>
        </div>
      )}

      <p className="mt-3 text-center text-[10.5px] leading-snug text-muted">
        Baseado nas suas respostas e no que você pede para checar. Não monitoramos seus dados sem sua permissão.
      </p>
    </section>
  );
}
