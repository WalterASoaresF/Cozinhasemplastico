import "server-only";
import { readdirSync } from "node:fs";
import path from "node:path";

const PADRAO_FRAME = /^frame_\d+\.webp$/i;

export function contarFramesHero(): number {
  const dir = path.join(process.cwd(), "public", "frames");
  try {
    return readdirSync(dir).filter((arquivo) => PADRAO_FRAME.test(arquivo)).length;
  } catch {
    return 0;
  }
}
