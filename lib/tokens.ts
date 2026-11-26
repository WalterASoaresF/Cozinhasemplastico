export const cores = {
  terracota: "#AC4922",
  terracotaEscuro: "#8A3A1C",
  creme: "#FBF0DC",
  cremeEscuro: "#F1E2C6",
  cafe: "#3B2418",
  oliva: "#4A5240",
} as const;

export type CorToken = keyof typeof cores;
