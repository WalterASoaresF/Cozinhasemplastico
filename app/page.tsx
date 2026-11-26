import { LenisProvider } from "@/components/LenisProvider";
import { AVirada } from "@/components/sections/AVirada";
import { BarraSuperior } from "@/components/sections/BarraSuperior";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { EtiquetaConfianca } from "@/components/sections/EtiquetaConfianca";
import { FAQ } from "@/components/sections/FAQ";
import { Formulario } from "@/components/sections/Formulario";
import { Hero } from "@/components/sections/Hero";
import { Kits } from "@/components/sections/Kits";
import { OProblema } from "@/components/sections/OProblema";
import { Rodape } from "@/components/sections/Rodape";

export default function Home() {
  return (
    <>
      <LenisProvider />
      <BarraSuperior />
      <main>
        <Hero />
        <OProblema />
        <AVirada />
        <Kits />
        <EtiquetaConfianca />
        <ComoFunciona />
        <FAQ />
        <Formulario />
      </main>
      <Rodape />
    </>
  );
}
