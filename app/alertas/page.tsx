import { Header } from "@/components/Header";
import { ALERTAS, FONTES } from "@/lib/alertas";

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
