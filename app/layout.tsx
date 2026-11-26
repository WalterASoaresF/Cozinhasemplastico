import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Cozinha Sem Plástico — lista de espera",
  description:
    "Potes de vidro, madeira, inox e linho. Kits bonitos para trocar o plástico da sua cozinha, de uma vez. Entre na lista de espera.",
  icons: {
    icon: "/img/simbolo-colher.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-creme text-cafe">{children}</body>
    </html>
  );
}
