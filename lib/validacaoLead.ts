import { z } from "zod";

export const KITS_DISPONIVEIS = ["despensa", "pia", "fogao", "todos"] as const;

export const esquemaLead = z.object({
  nome: z.string().trim().min(2, "Confere seu nome?"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Confere o número do WhatsApp?"),
  email: z.union([z.string().trim().email("Confere o e-mail?"), z.literal("")]).optional(),
  kits: z.array(z.enum(KITS_DISPONIVEIS)).min(1, "Marca pelo menos um kit."),
  consentimento: z.literal(true, {
    message: "Precisamos do seu aceite para avisar você.",
  }),
  consentimentoTexto: z.string().min(1),
  honeypot: z.string().max(0).optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
});

export type DadosLead = z.infer<typeof esquemaLead>;
