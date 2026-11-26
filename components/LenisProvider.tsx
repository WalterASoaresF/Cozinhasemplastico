"use client";

import { useEffect } from "react";
import { iniciarLenis, ScrollTrigger } from "@/lib/motion";

export function LenisProvider() {
  useEffect(() => {
    const lenis = iniciarLenis();

    // Cada seção registra seu próprio ScrollTrigger/pin de forma independente;
    // um refresh depois que tudo montou evita posições de início/fim desatualizadas.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
