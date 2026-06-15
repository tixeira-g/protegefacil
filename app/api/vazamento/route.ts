import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = (body.email || "").trim();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  try {
    // XposedOrNot — API pública e gratuita de checagem de vazamentos.
    const r = await fetch(
      `https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`,
      { headers: { Accept: "application/json" } }
    );

    // 404 = e-mail não encontrado em vazamentos (boa notícia)
    if (r.status === 404) {
      return NextResponse.json({ total: 0, vazamentos: [] });
    }
    if (!r.ok) throw new Error("upstream");

    const data = await r.json();
    let nomes: string[] = [];
    if (Array.isArray(data?.breaches)) {
      nomes = (data.breaches as unknown[])
        .flat(Infinity as 1)
        .filter((x): x is string => typeof x === "string");
    }
    return NextResponse.json({ total: nomes.length, vazamentos: nomes });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível checar agora." },
      { status: 502 }
    );
  }
}
