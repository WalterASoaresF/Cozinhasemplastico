"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefereMovimentoReduzido, registrarGsap } from "@/lib/motion";
import { cores } from "@/lib/tokens";

// TEXTO PROVISÓRIO: troca pedida pelo cliente em 2026-11-25, em conflito com a regra
// "sem promessas de saúde" do CLAUDE.md (seção "Regras de conteúdo") e com a seção 10 do
// PROJETO.md ("Afirmações: só sobre material... Nada de saúde."). Risco assumido pelo
// cliente — pedir revisão do Rios (sócio responsável pela parte legal) antes do lançamento.
const TITULO = "Uma cozinha que se preocupa com sua saúde.";

export function AVirada() {
  const secaoRef = useRef<HTMLElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (prefereMovimentoReduzido()) return;
    registrarGsap();

    const ctx = gsap.context(() => {
      gsap.set(secaoRef.current, { backgroundColor: cores.creme });
      gsap.to(secaoRef.current, {
        backgroundColor: cores.terracotaEscuro,
        ease: "none",
        scrollTrigger: {
          trigger: secaoRef.current,
          start: "top 85%",
          end: "top 25%",
          scrub: true,
        },
      });

      const letras = tituloRef.current?.querySelectorAll("[data-letra]");
      if (letras?.length) {
        gsap.set(letras, { yPercent: 120, opacity: 0 });
        gsap.to(letras, {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tituloRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, secaoRef);

    return () => ctx.revert();
  }, []);

  const palavras = TITULO.split(" ");

  return (
    <section
      ref={secaoRef}
      className="bg-terracota-escuro px-5 py-28 text-center text-creme sm:py-36"
    >
      <h2
        ref={tituloRef}
        className="mx-auto max-w-2xl font-titulo text-4xl leading-[0.98] font-black sm:text-6xl"
      >
        {palavras.map((palavra, pi) => (
          <span key={`${palavra}-${pi}`} className="mr-[0.25em] inline-flex overflow-hidden pb-1 align-bottom last:mr-0">
            {[...palavra].map((letra, li) => (
              <span key={li} data-letra className="inline-block">
                {letra}
              </span>
            ))}
          </span>
        ))}
      </h2>

      <p className="mx-auto mt-6 max-w-md font-texto text-lg text-creme/85">
        Por isso a gente tirou o plástico da cozinha. Vidro, madeira, inox e linho: materiais que
        duram anos, ficam bonitos na bancada e não deixam pedaço no ralo.
      </p>
    </section>
  );
}
