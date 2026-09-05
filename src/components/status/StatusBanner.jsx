import IconCircle from "../IconCircle";
import { STATUS_CONFIG } from "./status.config";

export default function StatusBanner({ status, orderId, message }) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div className={`flex items-start gap-4 rounded-xl p-6 ${cfg.softBg}`}>
      <IconCircle status={status} variant="solid" size={40} />
      <div>
        <p className="text-sm text-texto-suporte">Pedido #{orderId}</p>
        <h3 className={`text-xl font-bold ${cfg.text}`}>{cfg.label}</h3>
        <p className="text-sm text-texto-titulo">{message ?? cfg.message}</p>
      </div>
    </div>
  );
}
