"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Botao } from "@/components/ui/Botao";
import { asset } from "@/lib/basePath";

export function BarraSuperior() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 80);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        rolou ? "bg-creme shadow-[0_2px_12px_rgba(59,36,24,0.12)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#topo" className="flex items-center" aria-label="Cozinha Sem Plástico">
          <Image
            src={asset("/img/logo-creme.png")}
            alt="Cozinha Sem Plástico"
            width={160}
            height={56}
            className="h-9 w-auto"
            priority
          />
        </a>
        <Botao href="#formulario" variante="primario" tamanho="compacto">
          Entrar na lista
        </Botao>
      </div>
    </header>
  );
}
