export type Nivel = "ALTO" | "MEDIO" | "BAIXO";

export type Veredito =
  | "PROVAVEL_GOLPE"
  | "SUSPEITO"
  | "PROVAVELMENTE_SEGURO";

export interface Analise {
  veredito: Veredito;
  nivel_risco: Nivel;
  score: number;
  tipo_golpe: string;
  resumo: string;
  sinais: string[];
  exposicao_dados: Nivel;
  exposicao_explicacao: string;
  acoes_prevencao: string[];
  ja_caiu_remediar: string[];
  recomenda_advogado: boolean;
}
