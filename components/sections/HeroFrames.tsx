"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { Botao } from "@/components/ui/Botao";
import { asset } from "@/lib/basePath";
import { gsap, prefereMovimentoReduzido, registrarGsap, ScrollTrigger } from "@/lib/motion";

type HeroFramesProps = {
  totalFrames: number;
};

const TITULO = "Uma cozinha que dura.";

function caminhoFrame(indice: number) {
  return asset(`/frames/frame_${String(indice + 1).padStart(3, "0")}.webp`);
}

export function HeroFrames({ totalFrames }: HeroFramesProps) {
  const secaoRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagensRef = useRef<HTMLImageElement[]>([]);
  const progressoAlvoRef = useRef(0);
  const progressoAtualRef = useRef(0);
  const indiceDesenhadoRef = useRef(-1);
  const prontoRef = useRef(false);

  // Carrega os quadros e roda o loop de desenho (só redesenha quando o índice muda).
  useEffect(() => {
    if (totalFrames === 0) return;

    let montado = true;
    const reduzido = prefereMovimentoReduzido();

    function desenhar(indice: number) {
      const canvas = canvasRef.current;
      const img = imagensRef.current[indice];
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const pixelW = Math.round(cw * dpr);
      const pixelH = Math.round(ch * dpr);
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const escala = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * escala;
      const dh = img.naturalHeight * escala;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    const imagens: HTMLImageElement[] = new Array(totalFrames);
    let carregadas = 0;
    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      img.src = caminhoFrame(i);
      img.onload = () => {
        carregadas += 1;
        if (carregadas === totalFrames && montado) {
          prontoRef.current = true;
          desenhar(reduzido ? totalFrames - 1 : 0);
          indiceDesenhadoRef.current = reduzido ? totalFrames - 1 : 0;
        }
      };
      imagens[i] = img;
    }
    imagensRef.current = imagens;

    if (reduzido) {
      // Estado estático: só o quadro final (cozinha já montada).
      return () => {
        montado = false;
      };
    }

    let raf: number;
    function loop() {
      progressoAtualRef.current +=
        (progressoAlvoRef.current - progressoAtualRef.current) * 0.1;
      const indice = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(progressoAtualRef.current * (totalFrames - 1))),
      );
      if (indice !== indiceDesenhadoRef.current && prontoRef.current) {
        desenhar(indice);
        indiceDesenhadoRef.current = indice;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const aoRedimensionar = () => {
      indiceDesenhadoRef.current = -1;
    };
    window.addEventListener("resize", aoRedimensionar);

    return () => {
      montado = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [totalFrames]);

  // Rolagem: presa por ~300vh, controla o progresso (0 a 1) e o zoom do canvas.
  // useLayoutEffect de propósito: precisa registrar o pin antes do refresh global
  // do ScrollTrigger (disparado pelo LenisProvider), senão as seções seguintes
  // calculam a posição sem contar com a altura do pin do Hero.
  useLayoutEffect(() => {
    if (totalFrames === 0 || prefereMovimentoReduzido()) return;
    registrarGsap();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: secaoRef.current,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          progressoAlvoRef.current = self.progress;
        },
      });

      gsap.to(canvasRef.current, {
        scale: 1.08,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: secaoRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
        },
      });
    }, secaoRef);

    return () => ctx.revert();
  }, [totalFrames]);

  return (
    <section ref={secaoRef} id="topo" className="relative h-screen w-full overflow-hidden bg-creme">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cafe/55 via-cafe/10 to-transparent" />

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-5 px-5 text-center">
        <span className="rounded-full border border-creme/50 bg-cafe/30 px-4 py-1.5 font-texto text-xs font-semibold tracking-[0.12em] text-creme uppercase backdrop-blur-sm">
          Lista de espera aberta
        </span>

        <h1 className="max-w-xl font-titulo text-[2.75rem] leading-[0.98] font-black text-creme drop-shadow-sm sm:text-6xl">
          {TITULO}
        </h1>

        <p className="max-w-md font-texto text-lg text-creme/90 drop-shadow-sm">
          Potes de vidro, madeira, inox e linho. Kits bonitos para trocar o plástico da sua
          cozinha, de uma vez.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 pointer-events-auto">
          <Botao href="#formulario">Quero entrar na lista</Botao>
          <p className="font-texto text-sm text-creme/80 drop-shadow-sm">
            Sem pagar nada agora. Avisamos no dia do lançamento.
          </p>
        </div>
      </div>
    </section>
  );
}
