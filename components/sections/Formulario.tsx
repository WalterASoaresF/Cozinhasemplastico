"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { Botao } from "@/components/ui/Botao";
import { Campo } from "@/components/ui/Campo";
import { lerKitInteresse } from "@/lib/kitSelecionado";
import { esquemaLead } from "@/lib/validacaoLead";

const CHIPS = [
  { id: "despensa", rotulo: "Despensa" },
  { id: "pia", rotulo: "Pia" },
  { id: "fogao", rotulo: "Fogão" },
  { id: "todos", rotulo: "Todos" },
];

const TEXTO_CONSENTIMENTO =
  "Aceito receber mensagens da Cozinha Sem Plástico sobre o lançamento. Li a política de privacidade.";

function mascararWhatsapp(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  const ddd = digitos.slice(0, 2);
  const resto = digitos.slice(2);
  if (digitos.length === 0) return "";
  if (digitos.length <= 2) return `(${ddd}`;
  if (resto.length <= 5) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`;
}

export function Formulario() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [kits, setKits] = useState<string[]>([]);
  const [consentimento, setConsentimento] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    // Lê o kit marcado na seção Kits (sessionStorage), só existe no navegador:
    // precisa ser um efeito para não quebrar a hidratação do servidor.
    const kitSalvo = lerKitInteresse();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (kitSalvo) setKits([kitSalvo]);
  }, []);

  function alternarKit(id: string) {
    setKits((atual) => (atual.includes(id) ? atual.filter((k) => k !== id) : [...atual, id]));
  }

  async function aoEnviar(evento: FormEvent) {
    evento.preventDefault();
    setErros({});
    setErroGeral(null);

    const form = evento.currentTarget as HTMLFormElement;
    const honeypot = (form.elements.namedItem("site-url") as HTMLInputElement | null)?.value ?? "";
    const params = new URLSearchParams(window.location.search);

    const payload = {
      nome,
      whatsapp,
      email,
      kits,
      consentimento,
      consentimentoTexto: TEXTO_CONSENTIMENTO,
      honeypot,
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      utmContent: params.get("utm_content") ?? undefined,
    };

    const resultado = esquemaLead.safeParse(payload);
    if (!resultado.success) {
      const novosErros: Record<string, string> = {};
      resultado.error.issues.forEach((issue) => {
        const campo = String(issue.path[0]);
        if (!novosErros[campo]) novosErros[campo] = issue.message;
      });
      setErros(novosErros);
      return;
    }

    setEnviando(true);
    try {
      const resposta = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultado.data),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        setErroGeral(dados.erro ?? "Algo deu errado. Tenta de novo?");
        return;
      }
      setEnviado(true);
    } catch {
      setErroGeral("Sem conexão agora. Confere a internet e tenta de novo.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return <TelaSucesso />;
  }

  return (
    <section id="formulario" className="bg-creme-escuro py-20 sm:py-28">
      <div className="mx-auto max-w-lg px-5">
        <h2 className="text-center font-titulo text-4xl leading-[0.98] font-black text-terracota sm:text-5xl">
          Entre na lista.
        </h2>
        <p className="mt-3 text-center font-texto text-lg text-cafe/90">
          Avisamos você primeiro no dia do lançamento.
        </p>

        <form onSubmit={aoEnviar} noValidate className="mt-10 flex flex-col gap-5">
          <Campo
            label="Nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            erro={erros.nome}
            autoComplete="name"
          />
          <Campo
            label="WhatsApp"
            name="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(mascararWhatsapp(e.target.value))}
            erro={erros.whatsapp}
            inputMode="numeric"
            placeholder="(00) 00000-0000"
            autoComplete="tel"
          />
          <Campo
            label="E-mail (opcional)"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            erro={erros.email}
            autoComplete="email"
          />

          <div>
            <span className="font-texto text-sm font-semibold text-cafe">
              Qual kit te interessa?
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {CHIPS.map((chip) => {
                const ativo = kits.includes(chip.id);
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => alternarKit(chip.id)}
                    className={`rounded-full border px-4 py-2 font-texto text-sm font-semibold transition-colors duration-200 ${
                      ativo
                        ? "border-terracota-escuro bg-terracota text-creme"
                        : "border-terracota-escuro/30 bg-creme text-cafe"
                    }`}
                  >
                    {chip.rotulo}
                  </button>
                );
              })}
            </div>
            {erros.kits && <p className="mt-1 font-texto text-sm text-red-700">{erros.kits}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 font-texto text-sm text-cafe/90">
              <input
                type="checkbox"
                checked={consentimento}
                onChange={(e) => setConsentimento(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-terracota"
              />
              <span>
                Aceito receber mensagens da Cozinha Sem Plástico sobre o lançamento. Li a{" "}
                <Link href="/privacidade" className="underline">
                  política de privacidade
                </Link>
                .
              </span>
            </label>
            {erros.consentimento && (
              <p className="mt-1 font-texto text-sm text-red-700">{erros.consentimento}</p>
            )}
          </div>

          <div className="hidden" aria-hidden>
            <label htmlFor="site-url">Não preencha este campo</label>
            <input id="site-url" name="site-url" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {erroGeral && <p className="font-texto text-sm text-red-700">{erroGeral}</p>}

          <Botao type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Entrar na lista"}
          </Botao>
        </form>
      </div>
    </section>
  );
}

function TelaSucesso() {
  const origem = typeof window !== "undefined" ? window.location.origin : "";
  const linkCompartilhar = `https://wa.me/?text=${encodeURIComponent(
    `Manda para quem vive perdendo tampa: ${origem}`,
  )}`;

  return (
    <section id="formulario" className="bg-creme-escuro py-20 sm:py-28">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-5 text-center">
        <div className="relative h-32 w-32">
          <Image
            src="/img/hero-pote-1.png"
            alt=""
            fill
            aria-hidden
            className="object-contain opacity-90"
          />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: [0, -18, 14, -10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          >
            <Image src="/img/hero-colher.png" alt="" fill aria-hidden className="object-contain" />
          </motion.div>
        </div>

        <h2 className="font-titulo text-3xl leading-[0.98] font-black text-terracota sm:text-4xl">
          Pronto, você está na lista.
        </h2>
        <p className="font-texto text-lg text-cafe/90">
          Enquanto isso, acompanhe a gente no TikTok e no Instagram.
        </p>

        <div className="flex gap-6 font-texto text-sm font-semibold text-terracota-escuro">
          {/* TEXTO PROVISÓRIO: confirmar @ do TikTok e do Instagram (pendência do PROJETO.md) */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="underline">
            TikTok
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="underline">
            Instagram
          </a>
        </div>

        <Botao href={linkCompartilhar} variante="secundario" target="_blank" rel="noopener noreferrer">
          Manda para quem vive perdendo tampa
        </Botao>
      </div>
    </section>
  );
}
