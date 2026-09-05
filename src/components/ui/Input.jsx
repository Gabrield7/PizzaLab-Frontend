export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="text-sm font-medium text-texto-titulo">{label}</span>}
      <input
        className={`rounded-lg border bg-superficie-fundo px-4 py-2.5 text-sm text-texto-titulo placeholder:text-texto-suporte outline-none transition-colors focus:border-marca-primaria ${
          error ? "border-feedback-erro" : "border-superficie-borda"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-feedback-erro">{error}</span>}
    </label>
  );
}