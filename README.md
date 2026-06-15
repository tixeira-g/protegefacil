# ProtegeFácil

App de segurança digital contra estelionato. **Tecnologia + Direito = segurança para todos.**

Verifica mensagens/prints suspeitos com IA, classifica o risco, orienta sobre prevenção e remediação, e encaminha casos graves para apoio jurídico.

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **API route server-side** (`/api/analisar`) que chama a **API da Anthropic** — a chave nunca vai para o navegador.

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # e cole sua ANTHROPIC_API_KEY
npm run dev
```

Abra http://localhost:3000

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em https://vercel.com → **Add New → Project** → importe o repositório.
3. Em **Environment Variables**, adicione:
   - `ANTHROPIC_API_KEY` = sua chave
   - `ANTHROPIC_MODEL` = `claude-haiku-4-5-20251001` (opcional)
4. **Deploy**. Pronto — a Vercel detecta o Next.js automaticamente.

## Páginas

- `/` — home com as funções principais
- `/verificador` — verificador de golpe com IA (texto ou print)
- `/juridico` — Art. 171, Lei 14.155/2021 e passos de denúncia

## Segurança

A chave da Anthropic fica apenas no servidor (variável de ambiente). O frontend
só conversa com a própria API route. Nunca exponha a chave no cliente.

> Triagem automática por IA. Não substitui orientação jurídica formal.
