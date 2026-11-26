"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { asset } from "@/lib/basePath";
import { gsap, prefereMovimentoReduzido, registrarGsap } from "@/lib/motion";

// TEXTO/IMAGEM PROVISÓRIO: ângulo de microplásticos pedido pelo cliente em 2026-11-25,
// em conflito com a regra "sem promessas de saúde" do CLAUDE.md (seção "Regras de
// conteúdo") — risco assumido pelo cliente. Pedir revisão do Rios antes do lançamento:
// uma alegação de contaminação por microplástico também pode exigir comprovação técnica.
const CARTOES = [
  {
    titulo: "Isso aqui não é tempero.",
    arquivo: "problema-microplastico-agua.png",
    alt: "Tigela de arroz com partículas coloridas de microplástico misturadas nos grãos",
  },
  {
    titulo: "Quanto mais risca, mais solta.",
    arquivo: "problema-tabua-riscada.png",
    alt: "Tábua de plástico riscada soltando farelo e lascas na bancada",
  },
  {
    titulo: "De um lado dá pra confiar.",
    arquivo: "problema-comparacao-plastico-vidro.png",
    alt: "Comparação lado a lado: pote de plástico manchado e riscado ao lado de um pote de vidro limpo",
  },
];

export function OProblema() {
  const listaRef = useRef<HTMLDivElement>(null);
  const cartaoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (prefereMovimentoReduzido()) return;
    registrarGsap();

    const ctx = gsap.context(() => {
      cartaoRefs.current.forEach((cartao) => {
        if (!cartao) return;
        gsap.from(cartao, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cartao,
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

      <div ref={listaRef} className="mx-auto mt-14 grid max-w-5xl gap-6 px-5 sm:grid-cols-3">
        {CARTOES.map((cartao, indice) => (
          <div
            key={cartao.titulo}
            ref={(el) => {
              cartaoRefs.current[indice] = el;
            }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border-2 border-terracota-escuro/25 shadow-[0_24px_40px_-16px_rgba(59,36,24,0.35)]"
          >
            <Image
              src={asset(`/img/${cartao.arquivo}`)}
              alt={cartao.alt}
              fill
              sizes="(min-width: 640px) 33vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cafe/90 via-cafe/40 to-transparent px-6 pt-16 pb-6">
              <p className="font-titulo text-2xl leading-tight font-black text-creme sm:text-3xl">
                {cartao.titulo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
