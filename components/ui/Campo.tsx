import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

type CampoProps = {
  label: string;
  erro?: string;
} & ComponentPropsWithoutRef<"input">;

export const Campo = forwardRef<HTMLInputElement, CampoProps>(function Campo(
  { label, erro, id, name, className, ...props },
  ref,
) {
  const campoId = id ?? name;
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={campoId} className="font-texto text-sm font-semibold text-cafe">
        {label}
      </label>
      <input
        ref={ref}
        id={campoId}
        name={name}
        className={`rounded-xl border bg-creme px-4 py-3 font-texto text-base text-cafe outline-none transition-colors focus:border-terracota-escuro ${
          erro ? "border-red-700/60" : "border-terracota-escuro/30"
        } ${className ?? ""}`}
        {...props}
      />
      {erro && <p className="font-texto text-sm text-red-700">{erro}</p>}
    </div>
  );
});
