import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { usePedido } from "../../context/PedidoContext";
import { PEDIDO_FLOW } from "../../components/status/status.config";
import OrderTracking from "../../components/checkout/OrderTracking";

const INTERVALO_SIMULACAO_MS = 5000;

export function AcompanharPedido() {
  const navigate = useNavigate();
  const { pedidoAtivo, definirPedidoAtivo } = usePedido();

  // Simulação client-side do avanço de status (sem backend por enquanto).
  // Agenda o próximo passo com setTimeout; o efeito reagenda sozinho porque
  // `pedidoAtivo` muda a cada avanço. Para em "entregue" ou "cancelado".
  useEffect(() => {
    if (!pedidoAtivo) return;

    const indiceAtual = PEDIDO_FLOW.indexOf(pedidoAtivo.status);
    const chegouAoFim = indiceAtual === -1 || indiceAtual === PEDIDO_FLOW.length - 1;
    if (chegouAoFim) return;

    const timer = setTimeout(() => {
      definirPedidoAtivo({ ...pedidoAtivo, status: PEDIDO_FLOW[indiceAtual + 1] });
    }, INTERVALO_SIMULACAO_MS);

    return () => clearTimeout(timer);
  }, [pedidoAtivo, definirPedidoAtivo]);

  if (!pedidoAtivo) {
    return <Navigate to="/cardapio" replace />;
  }

  return (
    <OrderTracking
      pedido={pedidoAtivo}
      onBack={() => navigate("/cardapio")}
      onCancelar={() => definirPedidoAtivo({ ...pedidoAtivo, status: "cancelado" })}
    />
  );
}
