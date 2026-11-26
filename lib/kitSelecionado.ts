const CHAVE = "csp-kit-interesse";

export function marcarKitInteresse(kit: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(CHAVE, kit);
  } catch {
    // sessionStorage pode estar indisponível (modo privado); ignora.
  }
}

export function lerKitInteresse(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(CHAVE);
  } catch {
    return null;
  }
}
