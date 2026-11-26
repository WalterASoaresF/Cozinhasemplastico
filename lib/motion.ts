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

export function iniciarLenis() {
  if (typeof window === "undefined" || prefereMovimentoReduzido()) return undefined;

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
