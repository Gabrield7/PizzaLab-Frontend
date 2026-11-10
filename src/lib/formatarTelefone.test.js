import { describe, it, expect } from "vitest";
import { formatarTelefone } from "./formatarTelefone";

describe("formatarTelefone", () => {
  it("formata celular com 11 dígitos", () => {
    expect(formatarTelefone("84999998888")).toBe("(84) 99999-8888");
  });

  it("formata fixo com 10 dígitos", () => {
    expect(formatarTelefone("8433334444")).toBe("(84) 3333-4444");
  });

  it("aceita entrada já formatada", () => {
    expect(formatarTelefone("(84) 99999-8888")).toBe("(84) 99999-8888");
  });

  it("formata progressivamente enquanto o usuário digita", () => {
    expect(formatarTelefone("8")).toBe("(8");
    expect(formatarTelefone("84")).toBe("(84) ");
    expect(formatarTelefone("849")).toBe("(84) 9");
  });

  it("ignora letras e retorna vazio sem dígitos", () => {
    expect(formatarTelefone("abc")).toBe("");
    expect(formatarTelefone("")).toBe("");
  });

  it("limita a 11 dígitos", () => {
    expect(formatarTelefone("849999988889999")).toBe("(84) 99999-8888");
  });
});