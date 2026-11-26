import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type BotaoProps = {
  variante?: "primario" | "secundario";
  tamanho?: "normal" | "compacto";
} & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href">)
  | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
);

const BASE =
  "inline-flex items-center justify-center rounded-2xl font-texto font-semibold tracking-tight transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota-escuro";

const VARIANTES = {
  primario: "bg-terracota text-creme hover:bg-terracota-escuro border border-terracota-escuro",
  secundario:
    "bg-transparent text-terracota-escuro border border-terracota-escuro hover:bg-creme-escuro",
};

const TAMANHOS = {
  normal: "px-7 py-3.5 text-base",
  compacto: "px-5 py-2.5 text-sm",
};

export function Botao({
  variante = "primario",
  tamanho = "normal",
  className,
  ...props
}: BotaoProps) {
  const classes = `${BASE} ${VARIANTES[variante]} ${TAMANHOS[tamanho]} ${className ?? ""}`;

  if (props.href) {
    const { href, ...rest } = props as { href: string } & ComponentPropsWithoutRef<typeof Link>;
    return <Link href={href} className={classes} {...rest} />;
  }

  const { ...rest } = props as ComponentPropsWithoutRef<"button">;
  return <button className={classes} {...rest} />;
}
