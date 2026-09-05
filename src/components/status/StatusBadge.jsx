import { STATUS_CONFIG } from "./status.config";

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-2 h-2 rounded-full ${cfg.solidBg}`} />
      <span className="text-texto-titulo">Status:</span>
      <span className={`font-semibold ${cfg.text}`}>{cfg.label}</span>
    </div>
  );
}
