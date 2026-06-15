import Link from "next/link";
import { Header } from "@/components/Header";

interface Canal {
  titulo: string;
  desc: string;
  acao: string;
  url?: string;
  href?: string;
  cor: string;
  icon: React.ReactNode;
}

const CANAIS: Canal[] = [
  {
    titulo: "Delegacia Eletrônica",
    desc: "Registre o boletim de ocorrência online, sem sair de casa. Procure a delegacia eletrônica do seu estado.",
    acao: "Registrar B.O. online",
    url: "https://www.gov.br/pt-br/servicos/registrar-boletim-de-ocorrencia",
    cor: "bg-[#fdecec] text-brand-red",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M9 13h6M9 17h6" /></svg>
    ),
  },
  {
    titulo: "Consumidor.gov.br",
    desc: "Reclame diretamente contra empresas e bancos. Plataforma oficial do governo para resolução de conflitos.",
    acao: "Abrir reclamação",
    url: "https://www.consumidor.gov.br/",
    cor: "bg-[#eaf2fd] text-brand-blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    ),
  },
  {
    titulo: "Banco Central — Fale com o BC",
    desc: "Registre reclamação contra instituições financeiras por cobranças, contas ou empréstimos que você não reconhece.",
    acao: "Registrar no BC",
    url: "https://www.bcb.gov.br/cidadaniafinanceira/registrarreclamacao",
    cor: "bg-[#e8f6ec] text-brand-green",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" /></svg>
    ),
  },
  {
    titulo: "Travar o CPF (Registrato)",
    desc: "Veja contas e empréstimos abertos no seu nome e bloqueie novas aberturas. Acesso com a conta gov.br.",
    acao: "Acessar Registrato",
    url: "https://www.bcb.gov.br/cidadaniafinanceira/registrato",
    cor: "bg-[#f1ebf8] text-brand-purple",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
    ),
  },
  {
    titulo: "Procon",
    desc: "Órgão de defesa do consumidor para problemas com empresas, cobranças indevidas e serviços não contratados.",
    acao: "Encontrar o Procon",
    url: "https://www.gov.br/pt-br/servicos/reclamar-no-procon",
    cor: "bg-[#fdf4e0] text-brand-amber",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>
    ),
  },
  {
    titulo: "SaferNet — crimes na internet",
    desc: "Denuncie crimes cibernéticos e receba orientação. Canal de apoio com parceria do Ministério Público Federal.",
    acao: "Denunciar online",
    url: "https://new.safernet.org.br/denuncie",
    cor: "bg-[#eaf2fd] text-brand-blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
    ),
  },
];

export default function Denunciar() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-16 pt-7">
      <Header subtitle="Denunciar golpe · canais oficiais" />

      <section className="mt-5">
        <div className="flex items-start gap-3 rounded-[14px] border border-line bg-white p-4 shadow-soft">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-[11px] bg-[#fdecec] text-brand-red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>
          </span>
          <div>
            <h2 className="font-display text-[15px] font-extrabold tracking-tight text-navy-deep">
              Caiu num golpe? Aja rápido.
            </h2>
            <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
              Quanto antes você denunciar e avisar o banco, maior a chance de
              bloquear valores. Use os canais oficiais abaixo.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 space-y-3">
        {CANAIS.map((c, i) => (
          <article key={i} className="rounded-[15px] border border-line bg-white p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 flex-none place-items-center rounded-[11px] ${c.cor}`}>
                {c.icon}
              </span>
              <h3 className="font-display text-[14px] font-bold text-ink">{c.titulo}</h3>
            </div>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#36425a]">{c.desc}</p>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[11px] border border-line bg-[#f7f9fc] py-2.5 font-display text-[12.5px] font-bold text-navy-deep transition hover:bg-white hover:border-[#c3cfe2]"
            >
              {c.acao}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </a>
          </article>
        ))}
      </section>

      <Link
        href="/juridico"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-br from-navy-soft to-navy-deep px-5 py-4 font-display text-[14.5px] font-extrabold tracking-wide text-white transition hover:brightness-110"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]"><path d="M12 3v18M7 7h10M5 7l-2.5 6h5L5 7zm14 0l-2.5 6h5L19 7z" /></svg>
        Falar com um advogado
      </Link>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
        Em caso de risco à sua integridade, ligue para a Polícia Militar no 190.
      </p>
    </main>
  );
}
