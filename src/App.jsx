import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { CartProvider } from "./context/CartContext";
import { PedidoProvider } from "./context/PedidoContext";

export default function App() {
  return (
    <CartProvider>
      <PedidoProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PedidoProvider>
    </CartProvider>
  );
}
