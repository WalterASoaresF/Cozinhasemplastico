"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Botao } from "@/components/ui/Botao";
import { EtiquetaMaterial } from "@/components/ui/EtiquetaMaterial";
import { asset } from "@/lib/basePath";
import { marcarKitInteresse } from "@/lib/kitSelecionado";
import { gsap, prefereMovimentoReduzido, registrarGsap } from "@/lib/motion";

type Kit = {
  id: string;
  nome: string;
  imagem: string;
  itens: string[];
  materiais: string[];
  frase: string;
  emBreve?: boolean;
};

const KITS: Kit[] = [
  {
    id: "despensa",
    nome: "Kit Despensa",
    imagem: "kit-despensa.png",
    itens: ["4 potes de vidro com tampa de bambu", "1 colher de pau"],
    materiais: ["VIDRO", "BAMBU", "MADEIRA", "VEDAÇÃO DE SILICONE"],
    frase: "Do armário à mesa, sem trocar de pote.",
  },
  {
    id: "pia",
    nome: "Kit Pia",
    imagem: "kit-pia.png",
    itens: ["Bucha vegetal", "Escova de madeira ou bambu", "Panos de linho", "Sabão em barra"],
    materiais: ["FIBRA VEGETAL", "MADEIRA", "LINHO", "SABÃO EM BARRA"],
    frase: "Lavar a louça sem deixar plástico no ralo.",
  },
  {
    id: "fogao",
    nome: "Kit Fogão",
    imagem: "kit-fogao.png",
    itens: ["Frigideira de aço inox", "Caçarola pequena (material a confirmar)"],
    materiais: ["AÇO INOX", "CAÇAROLA: MATERIAL A CONFIRMAR"],
    frase: "Inox não gruda quando você aprende o truque. A gente ensina.",
    emBreve: true,
  },
];

export function Kits() {
  const palcoRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (prefereMovimentoReduzido()) return;
    registrarGsap();

    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 1023px)",
        desktop: "(min-width: 1024px)",
      },
      (contexto) => {
        const { mobile } = contexto.conditions as { mobile: boolean };

        if (mobile) {
          cardRefs.current.forEach((cartao) => {
            if (!cartao) return;
            gsap.from(cartao, {
              y: 40,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cartao,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          });
          return;
        }

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
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="bg-creme py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <h2 className="font-titulo text-4xl leading-[0.98] font-black text-terracota sm:text-5xl">
          Três kits. Uma cozinha inteira.
        </h2>
      </div>

      <div ref={palcoRef} className="relative mt-12 lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-5 sm:px-8 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:px-[8vw]"
        >
          {KITS.map((kit, indice) => (
            <div
              key={kit.id}
              ref={(el) => {
                cardRefs.current[indice] = el;
              }}
              className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-terracota-escuro/25 bg-creme-escuro lg:w-[360px] lg:shrink-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={asset(`/img/${kit.imagem}`)}
                  alt={kit.nome}
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {kit.emBreve && (
                  <span className="absolute top-3 right-3 rounded-full bg-terracota px-3 py-1 font-texto text-[11px] font-bold tracking-[0.1em] text-creme uppercase">
                    Em breve
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-titulo text-2xl font-black text-terracota">{kit.nome}</h3>

                <ul className="font-texto text-sm text-cafe/90">
                  {kit.itens.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="translate-y-2 transition-transform duration-300 ease-out group-hover:translate-y-0">
                  <EtiquetaMaterial materiais={kit.materiais} />
                </div>

                <p className="font-texto text-sm text-cafe/80 italic">{kit.frase}</p>

                <Botao
                  href="#formulario"
                  variante="secundario"
                  tamanho="compacto"
                  className="mt-auto"
                  onClick={() => marcarKitInteresse(kit.id)}
                >
                  Quero esse kit
                </Botao>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-center font-texto text-sm text-cafe/70">
        Preços anunciados no lançamento. Imagens ilustrativas.
      </p>
    </section>
  );
}
