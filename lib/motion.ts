"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let registrado = false;

export function registrarGsap() {
  if (registrado) return;
  gsap.registerPlugin(ScrollTrigger);
  registrado = true;
}

export function prefereMovimentoReduzido() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Celular: sem motion design (pedido do cliente, 2026-11-26) — nada de
// ScrollTrigger/pin/scrub nem rolagem suave do Lenis, só rolagem nativa e
// os estados finais estáticos. Mesmo breakpoint usado em Kits.tsx (lg).
export function ehMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1023px)").matches;
}

export function semMotion() {
  return prefereMovimentoReduzido() || ehMobile();
}

export function iniciarLenis() {
  if (typeof window === "undefined" || semMotion()) return undefined;

  const lenis = new Lenis({
    autoRaf: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export { gsap, ScrollTrigger };
