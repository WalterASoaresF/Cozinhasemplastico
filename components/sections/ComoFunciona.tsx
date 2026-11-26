"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registrarGsap, semMotion } from "@/lib/motion";

const PASSOS = [
  {
    titulo: "Você entra na lista.",
    texto: "Leva 20 segundos e não custa nada.",
  },
  {
    titulo: "A gente lança.",
    texto: "No dia do lançamento, você recebe a mensagem primeiro.",
  },
  {
    titulo: "Primeiro lote.",
    texto: "O primeiro lote é pequeno. Quem está na lista escolhe antes.",
  },
];

export function ComoFunciona() {
  const listaRef = useRef<HTMLDivElement>(null);
  const passoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (semMotion()) return;
    registrarGsap();

    const ctx = gsap.context(() => {
      gsap.from(passoRefs.current, {
        y: 32,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, listaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-creme py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-center font-titulo text-4xl leading-[0.98] font-black text-terracota sm:text-5xl">
          Como vai funcionar
        </h2>

        <div ref={listaRef} className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {PASSOS.map((passo, indice) => (
            <div
              key={passo.titulo}
              ref={(el) => {
                passoRefs.current[indice] = el;
              }}
              className="rounded-2xl border border-terracota-escuro/25 bg-creme-escuro p-6"
            >
              <span className="font-titulo text-5xl font-black text-terracota">
                0{indice + 1}
              </span>
              <h3 className="mt-3 font-titulo text-xl font-bold text-cafe">{passo.titulo}</h3>
              <p className="mt-2 font-texto text-sm text-cafe/80">{passo.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
