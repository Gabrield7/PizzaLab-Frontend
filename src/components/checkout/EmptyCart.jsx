import StatusIcon from "../status/StatusIcon";
import Button from "../ui/Button";

export default function EmptyCart({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <StatusIcon icon="shopping-cart" size={56} className="text-superficie-inativa" />

      <div>
        <h2 className="text-xl font-bold text-texto-titulo">Seu carrinho está vazio</h2>
        <p className="mt-1 text-sm text-texto-suporte">
          Adicione itens deliciosos do nosso catálogo
        </p>
      </div>

      <Button variant="primary" shape="pill" onClick={onBack}>
        Ver Cardápio
      </Button>
    </div>
  );
}
