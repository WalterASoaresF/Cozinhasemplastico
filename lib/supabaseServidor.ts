import "server-only";
import { createClient } from "@supabase/supabase-js";

type LeadRow = {
  id: string;
  created_at: string;
  nome: string;
  whatsapp: string;
  email: string | null;
  kits: string[];
  consentimento: boolean;
  consentimento_texto: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  user_agent: string | null;
};

type Database = {
  __InternalSupabase: {
    PostgrestVersion: string;
  };
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: Omit<LeadRow, "id" | "created_at">;
        Update: Partial<Omit<LeadRow, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let cliente: ReturnType<typeof createClient<Database>> | null = null;

export function supabaseServidor() {
  if (cliente) return cliente;

  const url = process.env.SUPABASE_URL;
  const chaveServico = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !chaveServico) {
    throw new Error(
      "SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam estar definidos em .env.local",
    );
  }

  cliente = createClient<Database>(url, chaveServico, {
    auth: { persistSession: false },
  });

  return cliente;
}
