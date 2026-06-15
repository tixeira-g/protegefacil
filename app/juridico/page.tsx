import Link from "next/link";
import { Header } from "@/components/Header";

const passos = [
  {
    t: "Reúna as provas",
    d: "Salve prints das mensagens, comprovantes de Pix, números de telefone e links recebidos. Não apague nada.",
  },
  {
    t: "Avise o banco imediatamente",
    d: "Se houve transferência, ligue para o banco pelo número oficial e conteste a transação. Quanto mais rápido, maior a chance de bloqueio.",
  },
  {
    t: "Troque senhas e ative o 2FA",
    d: "Altere as senhas das contas envolvidas e ative a verificação em duas etapas em tudo que for possível.",
  },
  {
    t: "Registre o boletim de ocorrência",
    d: "Faça o B.O. na delegacia eletrônica do seu estado. É gratuito e formaliza o crime.",
  },
  {
    t: "Busque orientação jurídica",
    d: "Em casos de prejuízo, um advogado pode orientar sobre ressarcimento e responsabilização. O ProtegeFácil encaminha seu caso com a triagem já pronta.",
  },
];

export default function Juridico() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-16 pt-7">
      <Header subtitle="Ajuda jurídica · seus direitos" />

      <section className="mt-5 rounded-[20px] border border-line bg-white p-5 shadow-soft">
        <span className="grid h-[58px] w-[58px] place-items-center rounded-[18px] bg-[#f1ebf8] text-brand-purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
            <path d="M12 3v18M7 7h10M5 7l-2.5 6h5L5 7zm14 0l-2.5 6h5L19 7z" />
          </svg>
        </span>
        <h2 className="mt-3 font-display text-lg font-extrabold tracking-tight">
          O estelionato é crime
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          Aplicar um golpe para obter vantagem em cima de outra pessoa é crime
          previsto no <b className="text-ink">Art. 171 do Código Penal</b>. Desde
          a <b className="text-ink">Lei 14.155/2021</b>, a pena é maior quando a
          fraude acontece por meio eletrônico (internet, apps, redes sociais).
        </p>

        <div className="mt-4 rounded-[12px] border border-dashed border-[#c9b9e2] bg-canvas p-3.5">
          <div className="mb-1.5 text-center font-display text-[12px] font-extrabold text-brand-purple">
            Art. 171 — Código Penal
          </div>
          <p className="text-[11.5px] leading-relaxed text-muted">
            Obter, para si ou para outrem, vantagem ilícita, em prejuízo alheio,
            induzindo ou mantendo alguém em erro, mediante artifício, ardil ou
            qualquer outro meio fraudulento.
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-line bg-white p-5 shadow-soft">
        <h3 className="font-display text-base font-bold tracking-tight">
          Caiu num golpe? Faça nesta ordem
        </h3>
        <ol className="mt-3.5 space-y-3.5">
          {passos.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-navy-deep font-display text-[13px] font-extrabold text-white">
                {i + 1}
              </span>
              <div>
                <div className="text-[13.5px] font-bold text-ink">{p.t}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-muted">{p.d}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Link
        href="/verificador"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-br from-navy-soft to-navy-deep px-5 py-4 font-display text-[14.5px] font-extrabold tracking-wide text-white transition hover:brightness-110"
      >
        Verificar uma mensagem suspeita
      </Link>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
        Conteúdo informativo · não substitui a orientação de um advogado.
      </p>
    </main>
  );
}
