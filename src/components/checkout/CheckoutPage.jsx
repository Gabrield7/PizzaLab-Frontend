import { useState } from "react";
import BackHeader from "../layout/BackHeader";
import OrderSummaryCard from "./OrderSummaryCard";
import ObservacoesCard from "./ObservacoesCard";
import AddressForm from "./AddressForm";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../context/CartContext";
import { usePedido } from "../../context/PedidoContext";
import { formatarPreco } from "../../lib/formatarPreco";
import { criarPedido } from "../../lib/api";

// Página "Finalizar Pedido". Itens e total vêm direto do CartContext — não
// recebe mais `items`/`total` por prop, pra não existir uma segunda "fonte
// da verdade" divergente do carrinho real (era esse o bug: editar aqui não
// refletia no ícone do Navbar nem no localStorage).
export function CheckoutPage({ onBack, onConfirm }) {
  const { itens, atualizarQuantidade, removerItem, limparCarrinho } = useCart();
  const { definirPedidoAtivo } = usePedido();
  const [observacoes, setObservacoes] = useState("");

  // Tradução do formato do carrinho (nome/preco/imagem/quantidade, preco
  // numérico) pro formato que OrderSummaryCard/OrderItemRow esperam
  // (name/unitPrice/total/quantity/image, já formatados em string).
  const items = itens.map((item) => ({
    id: item.id,
    image: item.imagem,
    name: item.nome,
    unitPrice: formatarPreco(item.preco),
    total: formatarPreco(item.preco * item.quantidade),
    quantity: item.quantidade,
  }));

  const totalGeral = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  const totalFormatado = formatarPreco(totalGeral);

  const handleConfirm = async (dadosEndereco) => {
    // Deixa o erro subir pro AddressForm (ele que trata/mostra a mensagem) —
    // por isso não tem try/catch aqui.
    const resposta = await criarPedido({ ...dadosEndereco, observacoes, itens });

    const pedido = {
      numeroPedido: resposta.id,
      tempoEstimado: "40-50 min",
      status: resposta.status,
      endereco: dadosEndereco,
      itens,
      observacoes,
      total: resposta.valor_total,
    };

    onConfirm?.(pedido);
    definirPedidoAtivo(pedido);
    limparCarrinho();
  };

  return (
    <div className="min-h-screen bg-superficie-fundo">
      <BackHeader onBack={onBack} />

      <main className="p-8">
        {itens.length === 0 ? (
          <EmptyCart onBack={onBack} />
        ) : (
          <>
            <h1 className="text-2xl font-bold text-texto-titulo mb-6">Finalizar Pedido</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-6">
                <OrderSummaryCard
                  items={items}
                  total={totalFormatado}
                  onQuantityChange={atualizarQuantidade}
                  onRemove={removerItem}
                />
                <ObservacoesCard value={observacoes} onChange={setObservacoes} />
              </div>

              <AddressForm total={totalFormatado} onSubmit={handleConfirm} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}