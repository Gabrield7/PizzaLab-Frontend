// Card "Observações": textarea livre pro cliente (ex: "sem cebola", trocar
// borda etc). Controlado de fora — value/onChange igual a um input comum.
export default function ObservacoesCard({
  value,
  onChange,
  placeholder = "Borda Recheada; Sem cebola; Suco Natural de Limão,...",
}) {
  return (
    <div className="rounded-2xl border border-superficie-borda bg-superficie-padrao p-6">
      <h2 className="text-lg font-bold text-texto-titulo mb-4">Observações</h2>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-none rounded-lg border border-superficie-borda bg-superficie-fundo px-4 py-3 text-sm text-texto-titulo placeholder:text-texto-suporte outline-none transition-colors focus:border-marca-primaria"
      />
    </div>
  );
}
