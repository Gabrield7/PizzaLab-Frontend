import StatusIcon from "../status/StatusIcon";

export default function BackHeader({ onBack, label = "Voltar ao cardápio" }) {
  return (
    <header className="border-b border-superficie-borda bg-superficie-padrao">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 px-8 py-5 font-semibold text-texto-titulo transition-colors hover:text-marca-primaria"
      >
        <StatusIcon icon="arrow-left" size={18} />
        {label}
      </button>
    </header>
  );
}
     
