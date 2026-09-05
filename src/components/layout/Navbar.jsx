import { useNavigate } from "react-router";
import StatusIcon from "../status/StatusIcon";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import { useCart } from "../../context/CartContext";
import { usePedido } from "../../context/PedidoContext";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();
  const { totalItens } = useCart();
  const { pedidoAtivo } = usePedido();
  const hasItems = totalItens > 0;

  return (
    <nav className="flex items-center gap-6 px-8 py-4 bg-superficie-padrao">
      <Logo />

      {/* Busca */}
      <div className="relative flex-1 max-w-xl">
        <StatusIcon
          icon="search"
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-texto-suporte"
        />
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="w-full rounded-full bg-superficie-fundo pl-9 pr-4 py-2 text-sm text-texto-titulo placeholder-texto-suporte outline-none focus:ring-2 focus:ring-marca-primaria/30"
        />
      </div>

      {/* Ações */}
      <div className="flex items-center gap-6 ml-auto shrink-0">
        {pedidoAtivo && (
          <Button
            variant="ghost"
            size="sm"
            icon="map-pin"
            onClick={() => navigate("/acompanhar-pedido")}
          >
            Acompanhar pedido
          </Button>
        )}
        <IconButton
          icon="shopping-cart"
          variant={hasItems ? "solid" : "subtle"}
          badge={hasItems ? totalItens : undefined}
          size={36}
          aria-label="Carrinho"
          onClick={() => navigate("/carrinho")}
        />
      </div>
    </nav>
  );
}