import { NextRequest, NextResponse } from "next/server";
import { excedeuLimite } from "@/lib/limitadorTaxa";
import { supabaseServidor } from "@/lib/supabaseServidor";
import { esquemaLead } from "@/lib/validacaoLead";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";

  if (excedeuLimite(ip)) {
    return NextResponse.json(
      { erro: "Muitas tentativas. Espera um pouco e tenta de novo." },
      { status: 429 },
    );
  }

  const corpo = await req.json().catch(() => null);
  if (!corpo) {
    return NextResponse.json({ erro: "Não entendemos o envio. Tenta de novo?" }, { status: 400 });
  }

  const resultado = esquemaLead.safeParse(corpo);
  if (!resultado.success) {
    const primeiraMensagem =
      resultado.error.issues[0]?.message ?? "Confere os dados e tenta de novo.";
    return NextResponse.json({ erro: primeiraMensagem }, { status: 400 });
  }

  const dados = resultado.data;

  if (dados.honeypot) {
    return NextResponse.json({ ok: true });
  }

  let supabase: ReturnType<typeof supabaseServidor>;
  try {
    supabase = supabaseServidor();
  } catch {
    return NextResponse.json(
      { erro: "O formulário ainda não está conectado. Avisa o time." },
      { status: 500 },
    );
  }

  const { data: existente } = await supabase
    .from("leads")
    .select("id")
    .eq("whatsapp", dados.whatsapp)
    .maybeSingle();

  if (existente) {
    return NextResponse.json({ ok: true, duplicado: true });
  }

  const { error } = await supabase.from("leads").insert({
    nome: dados.nome,
    whatsapp: dados.whatsapp,
    email: dados.email || null,
    kits: dados.kits,
    consentimento: dados.consentimento,
    consentimento_texto: dados.consentimentoTexto,
    utm_source: dados.utmSource ?? null,
    utm_medium: dados.utmMedium ?? null,
    utm_campaign: dados.utmCampaign ?? null,
    utm_content: dados.utmContent ?? null,
    user_agent: req.headers.get("user-agent") ?? null,
  });

  if (error) {
    console.error("Erro ao gravar lead", error);
    return NextResponse.json(
      { erro: "Não conseguimos salvar agora. Tenta de novo em instantes?" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
