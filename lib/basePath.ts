export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(caminho: string) {
  return `${BASE_PATH}${caminho}`;
}
