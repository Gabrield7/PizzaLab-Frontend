import OrderItemRow from "./OrderItemRow";

// Card "Seu Pedido": lista de itens + total. `items`: [{ id, image, name,
// unitPrice, total, quantity }], preços já formatados como string ("R$ ...")
// pra não acoplar formatação de moeda aqui dentro.
export default function OrderSummaryCard({
  items = [],
  total,
  onQuantityChange,
  onRemove,
}) {
  return (
    <div className="rounded-2xl border border-superficie-borda bg-superficie-padrao p-6">
      <h2 className="text-lg font-bold text-texto-titulo mb-2">Seu Pedido</h2>

      <div className="divide-y divide-superficie-borda">
        {items.map((item) => (
          <OrderItemRow
            key={item.id}
            image={item.image}
            name={item.name}
            unitPrice={item.unitPrice}
            total={item.total}
            quantity={item.quantity}
            onQuantityChange={(qty) => onQuantityChange?.(item.id, qty)}
            onRemove={() => onRemove?.(item.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 mt-2 border-t border-superficie-borda">
        <span className="text-lg font-bold text-texto-titulo">Total</span>
        <span className="text-lg font-bold text-marca-primaria">{total}</span>
      </div>
    </div>
  );
}
