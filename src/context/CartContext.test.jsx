import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

const pizza = { id: "a1", nome: "Margherita", preco: 30 };
const bebida = { id: "b2", nome: "Guaraná", preco: 8 };

function renderCarrinho() {
  return renderHook(() => useCart(), { wrapper: CartProvider });
}

describe("CartContext", () => {
  // limpa o localStorage para um teste não afetar o outro
  beforeEach(() => localStorage.clear());

  it("começa vazio", () => {
    const { result } = renderCarrinho();
    expect(result.current.itens).toEqual([]);
    expect(result.current.totalItens).toBe(0);
  });

  it("adiciona um produto novo com quantidade 1", () => {
    const { result } = renderCarrinho();
    act(() => result.current.adicionarItem(pizza));
    expect(result.current.itens).toEqual([{ ...pizza, quantidade: 1 }]);
  });

  it("soma a quantidade ao adicionar o mesmo produto", () => {
    const { result } = renderCarrinho();
    act(() => result.current.adicionarItem(pizza));
    act(() => result.current.adicionarItem(pizza));
    expect(result.current.itens).toHaveLength(1);
    expect(result.current.itens[0].quantidade).toBe(2);
  });

  it("calcula o total de itens somando as quantidades", () => {
    const { result } = renderCarrinho();
    act(() => result.current.adicionarItem(pizza));
    act(() => result.current.adicionarItem(pizza));
    act(() => result.current.adicionarItem(bebida));
    expect(result.current.totalItens).toBe(3);
  });

  it("atualiza a quantidade e remove o item quando ela chega a 0", () => {
    const { result } = renderCarrinho();
    act(() => result.current.adicionarItem(pizza));
    act(() => result.current.atualizarQuantidade("a1", 5));
    expect(result.current.itens[0].quantidade).toBe(5);

    act(() => result.current.atualizarQuantidade("a1", 0));
    expect(result.current.itens).toEqual([]);
  });

  it("remove um item e limpa o carrinho", () => {
    const { result } = renderCarrinho();
    act(() => result.current.adicionarItem(pizza));
    act(() => result.current.adicionarItem(bebida));
    act(() => result.current.removerItem("a1"));
    expect(result.current.itens.map((i) => i.id)).toEqual(["b2"]);

    act(() => result.current.limparCarrinho());
    expect(result.current.itens).toEqual([]);
  });

  it("persiste o carrinho no localStorage", () => {
    const { result } = renderCarrinho();
    act(() => result.current.adicionarItem(pizza));
    const salvo = JSON.parse(localStorage.getItem("pizzalab:carrinho"));
    expect(salvo).toEqual([{ ...pizza, quantidade: 1 }]);
  });

  it("lança erro se useCart for usado fora do CartProvider", () => {
    // silencia o console.error que o React imprime ao lançar o erro
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow(/CartProvider/);
  });
});