"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registrarGsap, semMotion } from "@/lib/motion";

const LINHA_1 = "POTE 500 ML";
const LINHA_2 = "VIDRO · TAMPA DE BAMBU · VEDAÇÃO DE SILICONE";

function Letras({ texto }: { texto: string }) {
  const palavras = texto.split(" ");
  return (
    <>
      {palavras.map((palavra, pi) => (
        <span key={pi} className="mr-[0.3em] inline-block last:mr-0">
          {[...palavra].map((letra, li) => (
            <span key={li} data-letra className="inline-block">
              {letra}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export function EtiquetaConfianca() {
  const etiquetaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (semMotion()) return;
    registrarGsap();

    const ctx = gsap.context(() => {
      const letras = etiquetaRef.current?.querySelectorAll("[data-letra]");
      if (!letras?.length) return;

      gsap.set(letras, { opacity: 0 });
      gsap.to(letras, {
        opacity: 1,
        duration: 0.02,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: etiquetaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, etiquetaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-creme py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="font-titulo text-4xl leading-[0.98] font-black text-terracota sm:text-5xl">
          A gente mostra o que tem em cada peça.
        </h2>
        <p className="mx-auto mt-5 max-w-lg font-texto text-lg text-cafe/90">
          Toda peça vem com a etiqueta de material. Se tem silicone na vedação, está escrito. Sem
          letra miúda.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-sm px-5">
        <div className="relative -rotate-2 drop-shadow-[0_16px_20px_rgba(59,36,24,0.22)]">
          {/* Barbante saindo do furo, como numa etiqueta pendurada de verdade. */}
          <svg
            viewBox="0 0 100 60"
            aria-hidden
            className="absolute top-[-34px] left-1/2 h-10 w-24 -translate-x-1/2"
          >
            <path
              d="M 30 58 C 20 20, 80 20, 70 58"
              fill="none"
              stroke="var(--color-terracota-escuro)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div
            ref={etiquetaRef}
            className="relative border-2 border-dashed border-terracota-escuro bg-creme-escuro px-9 py-12 text-center"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 14%, 100% 100%, 0% 100%, 0% 14%)",
            }}
          >
            <span className="absolute top-[18px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-terracota-escuro/60 bg-creme" />

            <p className="mt-4 font-titulo text-2xl font-black text-terracota sm:text-3xl">
              <Letras texto={LINHA_1} />
            </p>
            <p className="mt-3 font-texto text-sm tracking-[0.14em] text-terracota-escuro uppercase sm:text-base">
              <Letras texto={LINHA_2} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
