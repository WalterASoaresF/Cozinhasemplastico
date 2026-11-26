"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Botao } from "@/components/ui/Botao";
import { asset } from "@/lib/basePath";
import { gsap, registrarGsap, ScrollTrigger, semMotion } from "@/lib/motion";

const TITULO = "Uma cozinha que dura.";

export function HeroVideo() {
  const secaoRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressoAlvoRef = useRef(0);
  const progressoAtualRef = useRef(0);
  const ultimoTempoDesenhadoRef = useRef(-1);

  // Sem motion (celular ou prefers-reduced-motion): nem monta o <video>.
  // Celular de verdade tem travas que o Playwright não reproduz — modo de
  // economia de dados do Android bloqueia carregamento de vídeo, e o
  // Safari muitas vezes não pinta nenhum quadro de um <video> que nunca
  // chegou a tocar. Uma imagem estática de verdade não tem esse problema.
  const [usarVideo, setUsarVideo] = useState(false);

  useLayoutEffect(() => {
    // Lê matchMedia, só existe no navegador: precisa ser um efeito para
    // não quebrar a hidratação do servidor (que sempre mostra a imagem).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!semMotion()) setUsarVideo(true);
  }, []);

  // Rolagem: presa por ~300vh, controla o tempo do vídeo (0 a duration) e o zoom.
  // useLayoutEffect de propósito: precisa registrar o pin antes do refresh global
  // do ScrollTrigger (disparado pelo LenisProvider), senão as seções seguintes
  // calculam a posição sem contar com a altura do pin do Hero.
  useLayoutEffect(() => {
    if (!usarVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.pause();
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

      gsap.to(video, {
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

    let raf: number;
    function loop() {
      progressoAtualRef.current +=
        (progressoAlvoRef.current - progressoAtualRef.current) * 0.1;

      const duracao = video!.duration;
      if (duracao && !Number.isNaN(duracao)) {
        const alvo = progressoAtualRef.current * duracao;
        if (Math.abs(alvo - ultimoTempoDesenhadoRef.current) > 1 / 30) {
          video!.currentTime = alvo;
          ultimoTempoDesenhadoRef.current = alvo;
        }
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
    };
  }, [usarVideo]);

  return (
    <section ref={secaoRef} id="topo" className="relative h-screen w-full overflow-hidden bg-creme">
      {usarVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          aria-hidden
        >
          {/* Só monta em telas de desktop (ver usarVideo acima), então não
              precisa de uma variante mobile — MP4 primeiro porque tem
              decodificação por hardware mais confiável que VP9. */}
          <source src={asset("/video/hero.mp4")} type="video/mp4" />
          <source src={asset("/video/hero.webm")} type="video/webm" />
        </video>
      ) : (
        <Image
          src={asset("/img/hero-estatico.webp")}
          alt="Bancada de cozinha com potes de vidro, frigideira, colher e pano de linho"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      )}

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

        <div className="pointer-events-auto mt-2 flex flex-col items-center gap-3">
          <Botao href="#formulario">Quero entrar na lista</Botao>
          <p className="font-texto text-sm text-creme/80 drop-shadow-sm">
            Sem pagar nada agora. Avisamos no dia do lançamento.
          </p>
        </div>
      </div>
    </section>
  );
}
