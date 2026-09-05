import { createContext, useContext, useEffect, useState } from "react";

const CART_STORAGE_KEY = "pizzalab:carrinho";

const CartContext = createContext(null);

function carregarCarrinho() {
  if (typeof window === "undefined") return [];
  try {
    const salvo = localStorage.getItem(CART_STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [itens, setItens] = useState(carregarCarrinho);

  // Persiste a cada mudança. Quando o backend existir, isso vira apenas
  // um cache local — as 3 funções abaixo é que vão passar a chamar a API.
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itens));
  }, [itens]);

  function adicionarItem(produto) {
    if (produto.id == null) {
      console.warn(
        "[carrinho] adicionarItem recebeu um produto sem `id` — todos os itens sem id vão se " +
          "misturar em uma única entrada. Verifique se o CardProduto está recebendo um `id` único.",
        produto
      );
    }

    setItens((atual) => {
      const existente = atual.find((item) => item.id === produto.id);
      if (existente) {
        return atual.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...atual, { ...produto, quantidade: 1 }];
    });
  }

  function atualizarQuantidade(id, quantidade) {
    if (quantidade <= 0) {
      removerItem(id);
      return;
    }
    setItens((atual) => atual.map((item) => (item.id === id ? { ...item, quantidade } : item)));
  }

  function removerItem(id) {
    setItens((atual) => atual.filter((item) => item.id !== id));
  }

  function limparCarrinho() {
    setItens([]);
  }

  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{ itens, totalItens, adicionarItem, atualizarQuantidade, removerItem, limparCarrinho }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart precisa ser usado dentro de um <CartProvider>");
  }
  return context;
}
