import StatusBadge from "./StatusBadge";
import StatusBanner from "./StatusBanner";
import StatusTimeline from "./StatusTimeline";
import IconCircle from "../IconCircle";
import { STATUS_CONFIG } from "./status.config";

export default function StatusDemo() {
  const allStatus = Object.keys(STATUS_CONFIG);

  return (
    <div className="p-8 space-y-10 bg-superficie-fundo">
      {/* Legenda */}
      <div className="flex flex-col gap-3 border border-dashed border-apoio-roxo p-6 rounded-lg w-fit">
        {allStatus.map((status) => (
          <StatusBadge key={status} status={status} />
        ))}
      </div>

      {/* Banners */}
      <div className="flex flex-col gap-4 max-w-md">
        {allStatus.map((status) => (
          <StatusBanner key={status} status={status} orderId="PZL205136" />
        ))}
      </div>

      {/* Timeline */}
      <div className="max-w-sm">
        <StatusTimeline
          steps={[
            { icon: "chef-hat", title: "Status", description: "Descrição", state: "done" },
            { icon: "check", title: "Status", description: "Descrição", state: "current" },
            { icon: "chef-hat", title: "Status", description: "Descrição", state: "pending" },
            { icon: "ban", title: "Status", description: "Descrição", state: "done" },
          ]}
        />
      </div>

      {/* Grade de ícones (3 estados) */}
      <div className="flex flex-col gap-3 border border-dashed border-apoio-roxo p-6 rounded-lg w-fit">
        {["solid", "soft", "disabled"].map((variant) => (
          <div key={variant} className="flex gap-3">
            {allStatus.map((status) => (
              <IconCircle key={status} status={status} variant={variant} size={40} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
