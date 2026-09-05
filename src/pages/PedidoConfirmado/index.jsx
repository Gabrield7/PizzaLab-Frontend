import { useLocation, useNavigate, Navigate } from "react-router";
import { OrderConfirmation } from "../../components/checkout/OrderConfirmation";

export function PedidoConfirmado() {
  const location = useLocation();
  const navigate = useNavigate();
  const pedido = location.state;

  // Acesso direto pela URL (sem vir do checkout) não tem pedido pra mostrar.
  if (!pedido) {
    return <Navigate to="/cardapio" replace />;
  }

  return (
    <OrderConfirmation
      pedido={pedido}
      onBack={() => navigate("/cardapio")}
      onVoltarInicio={() => navigate("/cardapio")}
      onAcompanhar={() => navigate("/acompanhar-pedido")}
    />
  );
}
