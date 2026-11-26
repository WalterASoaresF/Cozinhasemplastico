"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";

type ItemAcordeao = {
  pergunta: string;
  resposta: string;
};

export function Acordeao({ itens }: { itens: ItemAcordeao[] }) {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="divide-y divide-terracota-escuro/20 rounded-2xl border border-terracota-escuro/25 bg-creme-escuro">
        {itens.map((item, indice) => {
          const estaAberto = aberto === indice;
          return (
            <div key={item.pergunta}>
              <button
                type="button"
                onClick={() => setAberto(estaAberto ? null : indice)}
                aria-expanded={estaAberto}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-texto text-base font-semibold text-cafe">
                  {item.pergunta}
                </span>
                <span
                  aria-hidden
                  className={`shrink-0 font-titulo text-2xl text-terracota transition-transform duration-300 ${
                    estaAberto ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {estaAberto && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 font-texto text-sm text-cafe/80">{item.resposta}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </MotionConfig>
  );
}
