import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProtegeFácil — Segurança digital contra estelionato",
  description:
    "Verifique mensagens suspeitas com IA, receba orientação jurídica e denuncie golpes. Tecnologia + Direito = segurança para todos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
