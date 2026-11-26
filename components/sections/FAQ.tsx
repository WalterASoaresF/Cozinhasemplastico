import { Acordeao } from "@/components/ui/Acordeao";

const PERGUNTAS = [
  {
    pergunta: "Quanto vai custar?",
    resposta:
      "Ainda estamos fechando com os fornecedores. O preço sai no lançamento, e quem está na lista sabe primeiro.",
  },
  {
    pergunta: "Preciso pagar algo agora?",
    resposta: "Não. A lista é só para avisar você.",
  },
  {
    pergunta: "Quando é o lançamento?",
    resposta: "A previsão é janeiro de 2027. Vamos avisar a data por mensagem.",
  },
  {
    pergunta: "Tem plástico em alguma peça?",
    resposta:
      "Algumas tampas de vidro têm vedação de silicone para fechar bem. Isso aparece na etiqueta de material de cada item.",
  },
  {
    pergunta: "Entregam no Brasil todo?",
    resposta: "Essa é a ideia. Vamos confirmar os prazos e os fretes antes do lançamento.",
  },
  {
    pergunta: "Inox gruda?",
    resposta: "Gruda se a panela não estiver quente o suficiente. A gente vai ensinar o truque em vídeo.",
  },
  {
    pergunta: "Posso sair da lista?",
    resposta: "Pode, quando quiser. Basta responder a mensagem.",
  },
];

export function FAQ() {
  return (
    <section className="bg-creme py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-center font-titulo text-4xl leading-[0.98] font-black text-terracota sm:text-5xl">
          Perguntas frequentes
        </h2>
        <div className="mt-10">
          <Acordeao itens={PERGUNTAS} />
        </div>
      </div>
    </section>
  );
}
