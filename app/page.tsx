import Link from "next/link";
import { Shield } from "@/components/Shield";

export default function Welcome() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center px-6 py-10 text-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="grid h-[94px] w-[94px] place-items-center rounded-[26px] bg-gradient-to-b from-navy-soft to-navy-deep shadow-mark">
          <Shield className="h-12 w-12" />
        </span>
        <div className="mt-5 font-display text-[14px] font-extrabold uppercase tracking-[2px] text-navy-soft">
          ProtegeFácil
        </div>
        <h1 className="mt-2.5 font-display text-[30px] font-extrabold leading-tight tracking-tight text-navy-deep">
          Não caia em golpe.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
          Tecnologia + Direito num só app: verifique mensagens suspeitas,
          entenda o risco e saiba exatamente o que fazer.
        </p>
      </div>

      <div className="w-full">
        <Link
          href="/inicio"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-br from-navy-soft to-navy-deep px-5 py-4 font-display text-[15px] font-extrabold tracking-wide text-white transition hover:brightness-110 active:scale-[.99]"
        >
          Começar
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-[18px] w-[18px]">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        <Link href="/advogado" className="mt-3.5 inline-block text-[12.5px] font-semibold text-navy-soft hover:underline">
          Sou advogado · acessar painel
        </Link>
        <p className="mt-6 text-[11px] leading-relaxed text-muted">
          Tecnologia + Direito = Segurança para todos
        </p>
      </div>
    </main>
  );
}
