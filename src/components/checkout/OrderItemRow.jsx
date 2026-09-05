import StatusIcon from "../status/StatusIcon";
import QuantityStepper from "../ui/QuantityStepper";

// Linha de item no card "Seu Pedido". `total` já vem formatado e
// multiplicado pela quantidade (valor em negrito, alinhado à direita);
// `unitPrice` é o valor unitário exibido pequeno embaixo do nome.
// Formatação de moeda fica por conta de quem monta a lista de items.
export default function OrderItemRow({
  image,
  name,
  unitPrice,
  total,
  quantity = 0,
  onQuantityChange,
  onRemove,
}) {
  return (
    <div className="flex items-start gap-4 py-4 first:pt-0">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-xl object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold text-texto-titulo">{name}</p>
          <p className="font-semibold text-texto-titulo whitespace-nowrap">
            {total}
          </p>
        </div>
        <p className="text-sm text-texto-suporte">{unitPrice}</p>

        <div className="flex items-center justify-between mt-2">
          <QuantityStepper value={quantity} onChange={onQuantityChange} />

          <button
            type="button"
            onClick={onRemove}
            aria-label="Remover item"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-feedback-erro transition-colors hover:bg-apoio-vermelho-transparente"
          >
            <StatusIcon icon="trash" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
