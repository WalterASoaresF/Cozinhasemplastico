import "server-only";

const tentativasPorChave = new Map<string, number[]>();

const JANELA_MS = 10 * 60 * 1000;
const LIMITE = 5;

export function excedeuLimite(identificador: string): boolean {
  const agora = Date.now();
  const historico = (tentativasPorChave.get(identificador) ?? []).filter(
    (momento) => agora - momento < JANELA_MS,
  );
  historico.push(agora);
  tentativasPorChave.set(identificador, historico);
  return historico.length > LIMITE;
}
