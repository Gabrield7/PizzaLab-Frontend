import { useEffect, useState } from "react";
import { buscarProdutos } from "../../lib/api.js";
import CardProduto from "../product/CardProduto.jsx";

const FILTROS = ["Pizzas", "Bebidas", "Sobremesas"];

export default function ProdutosFiltrados({ filtroInicial = "Pizzas" }) {
  const [filtro, setFiltro] = useState(filtroInicial);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let cancelado = false;

    setCarregando(true);
    buscarProdutos()
      .then((dados) => {
        if (!cancelado) setProdutos(dados);
      })
      .catch((e) => {
        if (!cancelado) setErro(e.message);
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const produtosDoFiltro = produtos.filter((p) => p.categoria === filtro);

  return (
    <section className="flex w-full flex-col gap-4 bg-superficie-padrao">
      <div className="sticky top-0 z-10 flex h-16 items-center border-y border-superficie-borda bg-superficie-padrao px-4 sm:h-20 sm:px-8 lg:px-16 xl:px-[246px]">
        <div className="flex w-full items-start gap-1 overflow-x-auto py-2">
          {FILTROS.map((label) => {
            const ativo = filtro === label;

            return (
              <button
                key={label}
                type="button"
                onClick={() => setFiltro(label)}
                className={`flex shrink-0 cursor-pointer items-center justify-center rounded-xl px-3 py-2.5 text-base font-semibold leading-none transition-colors sm:text-lg lg:text-xl ${
                  ativo ? "bg-marca-primaria text-texto-corpo" : "text-texto-titulo"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 pb-12 sm:px-8 lg:px-16 xl:px-[246px]">
        {carregando && <p className="text-sm text-texto-suporte">Carregando cardápio...</p>}

        {erro && !carregando && (
          <p className="text-sm text-feedback-erro">Não foi possível carregar o cardápio: {erro}</p>
        )}

        {!carregando && !erro && produtosDoFiltro.length === 0 && (
          <p className="text-sm text-texto-suporte">Nenhum produto disponível em {filtro} no momento.</p>
        )}

        {!carregando && !erro && produtosDoFiltro.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {produtosDoFiltro.map((produto) => (
              <CardProduto key={produto.id} {...produto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}