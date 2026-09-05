export function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  const ddd = digitos.slice(0, 2);
  const numeroCompleto = digitos.length > 10;
  const parte1 = numeroCompleto ? digitos.slice(2, 7) : digitos.slice(2, 6);
  const parte2 = numeroCompleto ? digitos.slice(7) : digitos.slice(6);

  let formatado = "";
  if (ddd) formatado += `(${ddd}`;
  if (ddd.length === 2) formatado += ") ";
  if (parte1) formatado += parte1;
  if (parte2) formatado += `-${parte2}`;

  return formatado;
}
