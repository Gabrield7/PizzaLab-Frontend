import { describe, it, expect } from "vitest";
import { formatarPreco } from "./formatarPreco";

// o Intl usa espaço não separável após "R$"; normalizamos para comparar
const normaliza = (texto) => texto.replace(/\s/g, " ");

describe("formatarPreco", () => {
  it("formata um valor inteiro em reais", () => {
    expect(normaliza(formatarPreco(35))).toBe("R$ 35,00");
  });

  it("usa vírgula nos centavos e ponto nos milhares", () => {
    expect(normaliza(formatarPreco(1234.5))).toBe("R$ 1.234,50");
  });

  it("formata zero", () => {
    expect(normaliza(formatarPreco(0))).toBe("R$ 0,00");
  });
});