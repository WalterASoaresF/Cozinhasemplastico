const BLOCO_DE_ESTILO =
  "Warm editorial product photography, soft natural afternoon light from a window, cream #FBF0DC and terracotta #AC4922 color story, light wood and glass and brushed stainless steel and natural linen, Brazilian home kitchen, calm and cozy, premium but not luxurious, no plastic objects anywhere, no text, no logos, no people's faces.";

type PlaceholderImagemProps = {
  arquivo: string;
  prompt: string;
  className?: string;
};

export function PlaceholderImagem({ arquivo, prompt, className }: PlaceholderImagemProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-terracota-escuro/50 bg-creme-escuro/60 p-3 text-center ${className ?? ""}`}
      title={`${BLOCO_DE_ESTILO} ${prompt}`}
    >
      <span className="font-texto text-[11px] font-semibold uppercase tracking-wide text-terracota-escuro">
        {arquivo}
      </span>
      <span className="font-texto text-[10px] leading-snug text-cafe/70">{prompt}</span>
    </div>
  );
}
