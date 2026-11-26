"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { asset } from "@/lib/basePath";
import { gsap, registrarGsap, semMotion } from "@/lib/motion";

// TEXTO/IMAGEM PROVISÓRIO: ângulo de microplásticos pedido pelo cliente em 2026-11-25,
// em conflito com a regra "sem promessas de saúde" do CLAUDE.md (seção "Regras de
// conteúdo") — risco assumido pelo cliente. Pedir revisão do Rios antes do lançamento:
// uma alegação de contaminação por microplástico também pode exigir comprovação técnica.
const ITENS = [
  {
    titulo: "Isso aqui não é tempero.",
    texto: "São partículas de plástico, não grãos de pimenta. Elas se soltam sozinhas, sem avisar.",
    arquivo: "problema-microplastico-agua.png",
    alt: "Tigela de arroz com partículas coloridas de microplástico misturadas nos grãos",
  },
  {
    titulo: "Quanto mais risca, mais solta.",
    texto: "Toda vez que a faca ou a esponja passa, uma lasquinha a mais sai da tábua de plástico.",
    arquivo: "problema-tabua-riscada.png",
    alt: "Tábua de plástico riscada soltando farelo e lascas na bancada",
  },
  {
    titulo: "De um lado dá pra confiar.",
    texto: "Pote de plástico manchado e riscado, do outro, vidro que lava e volta como novo.",
    arquivo: "problema-comparacao-plastico-vidro.png",
    alt: "Comparação lado a lado: pote de plástico manchado e riscado ao lado de um pote de vidro limpo",
  },
];

export function OProblema() {
  const listaRef = useRef<HTMLDivElement>(null);
  const linhaRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (semMotion()) return;
    registrarGsap();

    const ctx = gsap.context(() => {
      linhaRefs.current.forEach((linha) => {
        if (!linha) return;
        gsap.from(linha, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: linha,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, listaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-creme py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="font-titulo text-4xl leading-[0.98] font-black text-terracota sm:text-5xl">
          Seu arroz não pediu esse tempero.
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-texto text-lg text-cafe/90">
          Toda vez que a tábua risca ou o pote esquenta demais, uma lasquinha de plástico sai sem
          avisar — e vai direto pro seu prato. Dá pra ver. A gente parou de fingir que não via.
        </p>
      </div>

      <div ref={listaRef} className="mx-auto mt-14 flex max-w-4xl flex-col gap-14 px-5 sm:gap-20">
        {ITENS.map((item, indice) => (
          <div
            key={item.titulo}
            ref={(el) => {
              linhaRefs.current[indice] = el;
            }}
            className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-terracota-escuro/25">
              <Image
                src={asset(`/img/${item.arquivo}`)}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 440px, 90vw"
                className="object-cover"
              />
            </div>

            <div className="text-left">
              <p className="font-titulo text-2xl leading-tight font-black text-terracota sm:text-3xl">
                {item.titulo}
              </p>
              <p className="mt-3 font-texto text-base text-cafe/90">{item.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
