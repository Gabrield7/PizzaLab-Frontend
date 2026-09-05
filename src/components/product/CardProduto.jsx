import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { formatarPreco } from "../../lib/formatarPreco";

export default function CardProduto({ id, nome, preco, descricao, imagem }) {
  const { adicionarItem } = useCart();
  const precoFormatado = formatarPreco(preco);

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-superficie-borda bg-superficie-padrao pb-6 shadow-sm">
      <div className="h-56 w-full overflow-hidden bg-superficie-fundo">
        <img src={imagem} alt={nome} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-4 px-4 pt-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight text-texto-titulo">{nome}</h3>
          <p className="shrink-0 text-lg font-bold text-marca-primaria">{precoFormatado}</p>
        </div>

        <p className="line-clamp-2 text-sm text-texto-suporte">{descricao}</p>

        <Button
          variant="primary"
          shape="rounded"
          icon="shopping-cart"
          className="w-full"
          onClick={() => adicionarItem({ id, nome, preco, imagem })}
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </article>
  );
}