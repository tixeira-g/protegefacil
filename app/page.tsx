import Link from "next/link";
import { Header } from "@/components/Header";
import { Shield } from "@/components/Shield";
import { StatusSeguranca } from "@/components/StatusSeguranca";

const features = [
  {
    href: "/verificador",
    title: "Verificador de golpe",
    desc: "Cole uma mensagem ou print suspeito. A IA analisa na hora e te diz o risco.",
    cls: "bg-[#eaf2fd] text-brand-blue hover:border-[#bcd6f7]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    href: "/alertas",
    title: "Alertas de fraude",
    desc: "Avisos em tempo real sobre golpes circulando contra você.",
    cls: "bg-[#e8f6ec] text-brand-green hover:border-[#b6e1c2]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
  },
  {
    href: "/juridico",
    title: "Ajuda jurídica",
    desc: "Orientação com base na lei e no Art. 171 do Código Penal.",
    cls: "bg-[#f1ebf8] text-brand-purple hover:border-[#d4c2ec]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <path d="M12 3v18M7 7h10M5 7l-2.5 6h5L5 7zm14 0l-2.5 6h5L19 7z" />
      </svg>
    ),
  },
  {
    href: "/denunciar",
    title: "Denunciar golpe",
    desc: "Registre a ocorrência e seja encaminhado para apoio especializado.",
    cls: "bg-[#fdecec] text-brand-red hover:border-[#f4bcbc]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-16 pt-7">
      <Header />

      <section className="mt-10 text-center">
        <span className="mx-auto grid h-[78px] w-[78px] place-items-center rounded-[22px] bg-gradient-to-b from-navy-soft to-navy-deep shadow-mark">
          <Shield className="h-10 w-10" />
        </span>
        <h1 className="mt-4 font-display text-[28px] font-extrabold tracking-tight text-navy-deep">
          Não caia em golpe.
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
          Tecnologia + Direito num só app: verifique mensagens suspeitas, entenda
          o risco e saiba exatamente o que fazer.
        </p>

        <Link
          href="/verificador"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-br from-navy-soft to-navy-deep px-5 py-4 font-display text-[15px] font-extrabold tracking-wide text-white transition hover:brightness-110 active:scale-[.99]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          Verificar uma mensagem agora
        </Link>
      </section>

      <div className="mt-6">
        <StatusSeguranca />
      </div>

      <section className="mt-6 space-y-3">
        {features.map((f, i) => (
          <Link
            key={i}
            href={f.href}
            className={`flex items-center gap-3 rounded-[15px] border border-transparent p-[14px] transition hover:translate-x-[2px] ${f.cls}`}
          >
            <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px] bg-white/70">
              {f.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-bold tracking-wide text-ink">
                {f.title}
              </span>
              <span className="text-[11.5px] leading-snug text-muted">
                {f.desc}
              </span>
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="#b7c0d0" strokeWidth={2.2} className="h-4 w-4 flex-none">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        ))}
      </section>

      <footer className="mt-auto pt-10 text-center text-[11px] leading-relaxed text-muted">
        ProtegeFácil · Tecnologia + Direito = Segurança para todos
        <br />
        <Link href="/advogado" className="mt-1.5 inline-block font-semibold text-navy-soft hover:underline">
          Sou advogado · acessar painel
        </Link>
      </footer>
    </main>
  );
}
