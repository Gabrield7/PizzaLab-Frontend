import StatusIcon from "../status/StatusIcon";

export default function Checkbox({ checked = false, onChange, ...props }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`flex items-center justify-center w-6 h-6 rounded-md border-2 transition-colors ${
        checked
          ? "bg-marca-primaria border-marca-primaria"
          : "bg-transparent border-superficie-borda hover:border-marca-primaria"
      }`}
      {...props}
    >
      {checked && <StatusIcon icon="check" size={14} className="text-white" />}
    </button>
  );
}
