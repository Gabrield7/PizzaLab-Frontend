import { formatarPreco } from "../../lib/formatarPreco";

export default function OrderReceiptSummary({ itens, observacoes, total }) {
  return (
    <div className="rounded-2xl border border-superficie-borda bg-superficie-padrao p-6">
      <h2 className="text-lg font-bold text-texto-titulo mb-4">Resumo do Pedido</h2>

      <div className="flex flex-col gap-2 text-sm text-texto-titulo">
        {itens.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <span>
              <span className="font-semibold">{item.quantidade}x</span> {item.nome}
            </span>
            <span>{formatarPreco(item.preco * item.quantidade)}</span>
          </div>
        ))}

        {observacoes && (
          <p className="text-texto-suporte">
            <span className="font-semibold text-texto-titulo">Obs.:</span> {observacoes}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-superficie-borda">
        <span className="text-lg font-bold text-texto-titulo">Total</span>
        <span className="text-lg font-bold text-marca-primaria">{formatarPreco(total)}</span>
      </div>
    </div>
  );
}
