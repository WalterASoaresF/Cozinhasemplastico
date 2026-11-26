"use client";

import { useLayoutEffect, useRef } from "react";
import { Botao } from "@/components/ui/Botao";
import { asset } from "@/lib/basePath";
import { gsap, prefereMovimentoReduzido, registrarGsap, ScrollTrigger } from "@/lib/motion";

const TITULO = "Uma cozinha que dura.";

export function HeroVideo() {
  const secaoRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressoAlvoRef = useRef(0);
  const progressoAtualRef = useRef(0);
  const ultimoTempoDesenhadoRef = useRef(-1);

  // Rolagem: presa por ~300vh, controla o tempo do vídeo (0 a duration) e o zoom.
  // useLayoutEffect de propósito: precisa registrar o pin antes do refresh global
  // do ScrollTrigger (disparado pelo LenisProvider), senão as seções seguintes
  // calculam a posição sem contar com a altura do pin do Hero.
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduzido = prefereMovimentoReduzido();
    video.pause();

    if (reduzido) {
      const aoCarregarMetadados = () => {
        video.currentTime = Math.max(video.duration - 0.05, 0);
      };
      video.addEventListener("loadedmetadata", aoCarregarMetadados);
      return () => video.removeEventListener("loadedmetadata", aoCarregarMetadados);
    }

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
  }, []);

  return (
    <section ref={secaoRef} id="topo" className="relative h-screen w-full overflow-hidden bg-creme">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        {/*
          MP4/H.264 primeiro de propósito: tem decodificação por hardware em
          quase todo celular. O WebM/VP9 costuma só ter decodificação por
          hardware em desktop — em celular (principalmente Android
          intermediário) ele decodifica por software, e isso que travava a
          rolagem ao arrastar o vídeo. O navegador usa o primeiro <source>
          que conseguir tocar, então a ordem aqui importa.
        */}
        <source
          src={asset("/video/hero-mobile.mp4")}
          type="video/mp4"
          media="(max-width: 768px)"
        />
        <source src={asset("/video/hero.mp4")} type="video/mp4" />
        <source src={asset("/video/hero.webm")} type="video/webm" />
      </video>

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
