import Image from "next/image";
import Link from "next/link";

export function Rodape() {
  return (
    <footer className="bg-terracota-escuro py-14 text-creme">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center">
        <Image
          src="/img/logo-terracota.png"
          alt="Cozinha Sem Plástico"
          width={180}
          height={64}
          className="h-10 w-auto"
        />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-texto text-sm font-semibold">
          {/* TEXTO PROVISÓRIO: confirmar @ do TikTok e do Instagram (pendência do PROJETO.md, seção 11) */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="underline">
            TikTok
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="underline">
            Instagram
          </a>
          <Link href="/privacidade" className="underline">
            Política de privacidade
          </Link>
        </nav>

        <div className="font-texto text-xs text-creme/70">
          <p>Cozinha Sem Plástico. Salvador, Bahia.</p>
          <p>Imagens ilustrativas geradas por IA enquanto as fotos reais não chegam.</p>
        </div>
      </div>
    </footer>
  );
}
