import { useNavigate } from "react-router";
import { CheckoutPage } from "../../components/checkout/CheckoutPage";

export function Carrinho() {
  const navigate = useNavigate();

  return (
    <CheckoutPage
      onBack={() => navigate("/cardapio")}
      onConfirm={(pedido) => navigate("/pedido-confirmado", { state: pedido })}
    />
  );
}