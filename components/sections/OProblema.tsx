"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
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
  const palcoRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefereMovimentoReduzido()) return;
    registrarGsap();

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const palco = palcoRef.current;
      if (!track || !palco) return;

      const distancia = track.scrollWidth - palco.clientWidth;
      if (distancia <= 0) return;

      gsap.to(track, {
        x: -distancia,
        ease: "none",
        scrollTrigger: {
          trigger: palco,
          start: "top top",
          end: () => `+=${distancia}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, palcoRef);

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

      <div ref={palcoRef} className="relative mt-16 h-[75vh] overflow-hidden">
        <div ref={trackRef} className="flex h-full items-center">
          {CARTOES.map((cartao) => (
            <div
              key={cartao.titulo}
              className="flex w-screen shrink-0 items-center justify-center px-5"
            >
              <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[1.75rem] border-2 border-terracota-escuro/25 shadow-[0_24px_40px_-16px_rgba(59,36,24,0.35)] sm:max-w-sm">
                <Image
                  src={`/img/${cartao.arquivo}`}
                  alt={cartao.alt}
                  fill
                  sizes="(min-width: 640px) 384px, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cafe/90 via-cafe/40 to-transparent px-6 pt-16 pb-6">
                  <p className="font-titulo text-2xl leading-tight font-black text-creme sm:text-3xl">
                    {cartao.titulo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
