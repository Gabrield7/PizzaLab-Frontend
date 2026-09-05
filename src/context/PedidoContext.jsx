import { createContext, useContext, useEffect, useState } from "react";

const PEDIDO_STORAGE_KEY = "pizzalab:pedidoAtivo";

const PedidoContext = createContext(null);

function carregarPedido() {
  if (typeof window === "undefined") return null;
  try {
    const salvo = localStorage.getItem(PEDIDO_STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : null;
  } catch {
    return null;
  }
}

export function PedidoProvider({ children }) {
  const [pedidoAtivo, setPedidoAtivo] = useState(carregarPedido);

  useEffect(() => {
    if (pedidoAtivo) {
      localStorage.setItem(PEDIDO_STORAGE_KEY, JSON.stringify(pedidoAtivo));
    } else {
      localStorage.removeItem(PEDIDO_STORAGE_KEY);
    }
  }, [pedidoAtivo]);

  function definirPedidoAtivo(pedido) {
    setPedidoAtivo(pedido);
  }

  function limparPedidoAtivo() {
    setPedidoAtivo(null);
  }

  return (
    <PedidoContext.Provider value={{ pedidoAtivo, definirPedidoAtivo, limparPedidoAtivo }}>
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("usePedido precisa ser usado dentro de um <PedidoProvider>");
  }
  return context;
}