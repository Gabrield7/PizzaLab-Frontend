import { CartProvider } from "../../context/CartContext";
import CheckoutPage from "./CheckoutPage";

// Standalone só pra testar a página isolada — envolve com CartProvider aqui
// porque em produção esse provider já fica uma única vez no main.jsx, ao
// redor de <App />. Não simula mais itens: eles vêm de quem já foi
// adicionado via CardProduto antes de chegar no checkout.
export default function CheckoutDemo() {
  return (
    <CartProvider>
      <CheckoutPage
        onBack={() => console.log("voltar ao cardápio")}
        onConfirm={(dados) => console.log("pedido confirmado", dados)}
      />
    </CartProvider>
  );
}
