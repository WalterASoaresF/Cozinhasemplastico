type EtiquetaMaterialProps = {
  titulo?: string;
  materiais: string[];
  className?: string;
};

export function EtiquetaMaterial({ titulo, materiais, className }: EtiquetaMaterialProps) {
  return (
    <div
      className={`inline-flex flex-col gap-0.5 rounded-md border border-terracota-escuro/30 bg-creme px-3 py-2 ${className ?? ""}`}
    >
      {titulo && (
        <span className="font-texto text-[11px] font-bold tracking-[0.12em] text-cafe uppercase">
          {titulo}
        </span>
      )}
      <span className="font-texto text-[11px] tracking-[0.12em] text-terracota-escuro uppercase">
        {materiais.join(" · ")}
      </span>
    </div>
  );
}
