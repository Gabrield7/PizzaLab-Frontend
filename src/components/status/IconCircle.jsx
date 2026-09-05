import StatusIcon from "./StatusIcon";
import { STATUS_CONFIG } from "./status/status.config";

/**
 * variant:
 *  - solid: fundo colorido forte, ícone branco (linha 1 do print)
 *  - soft: fundo suave, ícone na cor do status (linha 2 do print)
 *  - disabled: fundo/ícone neutros (linha 3 do print)
 */
export default function IconCircle({ status, variant = "solid", size = 40 }) {
  const cfg = STATUS_CONFIG[status];

  const stylesByVariant = {
    solid: { bg: cfg.solidBg, icon: "text-white" },
    soft: { bg: cfg.softBg, icon: cfg.text },
    disabled: { bg: "bg-superficie-borda", icon: "text-superficie-inativa" },
  };

  const { bg, icon } = stylesByVariant[variant];

  return (
    <div
      className={`flex items-center justify-center rounded-full ${bg}`}
      style={{ width: size, height: size }}
    >
      <StatusIcon icon={cfg.icon} size={size * 0.5} className={icon} />
    </div>
  );
}
