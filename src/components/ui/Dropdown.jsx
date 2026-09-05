import { useState } from "react";
import StatusIcon from "../status/StatusIcon";

export default function Dropdown({ label, icon, options = [], value, onChange, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex items-center gap-2 text-sm font-medium text-texto-titulo transition-colors hover:text-marca-primaria"
      >
        {icon && (
          <StatusIcon
            icon={icon}
            size={16}
            className="text-texto-titulo transition-colors group-hover:text-marca-primaria"
          />
        )}
        {value ?? label}
        <StatusIcon
          icon="chevron-down"
          size={14}
          className="text-texto-titulo transition-colors group-hover:text-marca-primaria"
        />
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 min-w-[7rem] rounded-lg border border-superficie-borda bg-superficie-padrao py-1 shadow-sm">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange?.(opt);
                  setOpen(false);
                }}
                className="w-full px-3 py-1.5 text-left text-sm text-texto-titulo hover:bg-superficie-fundo"
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
