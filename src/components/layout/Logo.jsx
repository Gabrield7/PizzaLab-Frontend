import StatusIcon from "../status/StatusIcon";

export default function Logo({ subtitle }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-marca-primaria shrink-0">
        <StatusIcon icon="pizza-slice" size={18} className="text-white" />
      </div>
      <div>
        <span className="block text-lg font-bold leading-tight text-texto-titulo">PizzaLab</span>
        {subtitle && (
          <span className="block text-xs leading-tight text-texto-suporte">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
