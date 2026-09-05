import StatusIcon from "../status/StatusIcon";
import { STATUS_CONFIG } from "../status/status.config";

export default function OrderStatusHeader({ pedido }) {
  const cfg = STATUS_CONFIG[pedido.status];

  return (
    <div className="overflow-hidden rounded-2xl border border-superficie-borda bg-superficie-padrao">
      <div className={`flex items-start gap-4 p-6 ${cfg.softBg}`}>
        <StatusIcon icon={cfg.icon} size={24} className={`${cfg.text} shrink-0`} />
        <div>
          <p className="text-sm text-texto-suporte">Pedido #{pedido.numeroPedido}</p>
          <h2 className={`text-xl font-bold ${cfg.text}`}>{cfg.label}</h2>
          <p className="text-sm text-texto-titulo">{cfg.message}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-6 py-4 text-sm">
        <StatusIcon icon="clock" size={16} className="text-texto-suporte" />
        <span className="text-texto-suporte">Tempo estimado:</span>
        <span className="ml-auto font-bold text-texto-titulo">{pedido.tempoEstimado}</span>
      </div>
    </div>
  );
}
