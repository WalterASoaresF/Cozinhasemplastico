import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidade — Cozinha Sem Plástico",
};

export default function Privacidade() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
      <Link href="/" className="font-texto text-sm text-terracota-escuro underline">
        Voltar para a página inicial
      </Link>

      <h1 className="mt-6 font-titulo text-3xl font-black text-terracota sm:text-4xl">
        Política de privacidade
      </h1>

      {/* TEXTO PROVISÓRIO: revisão final pendente do Rios (seção 10 e 11 do PROJETO.md) */}
      <div className="mt-8 flex flex-col gap-5 font-texto text-base text-cafe/90">
        <p>
          A Cozinha Sem Plástico coleta seu nome, WhatsApp e, se você quiser, seu e-mail, só para
          uma finalidade: avisar você quando a loja for lançada.
        </p>
        <p>Não vendemos nem compartilhamos esses dados com ninguém.</p>
        <p>
          Você pode sair da lista quando quiser. Basta responder a mensagem que a gente manda no
          WhatsApp.
        </p>
        <p>
          Esta página é uma versão provisória, em revisão. A versão final será publicada antes do
          lançamento.
        </p>
      </div>
    </main>
  );
}
