import { useState } from "react";
import StatusTimeline from "../status/StatusTimeline";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import BackHeader from "../layout/BackHeader";
import OrderStatusHeader from "./OrderStatusHeader";
import OrderReceiptSummary from "./OrderReceiptSummary";
import { PEDIDO_FLOW, STATUS_CONFIG } from "../status/status.config";

// Só faz sentido cancelar antes do pedido sair pra entrega.
const STATUS_CANCELAVEIS = ["pendente", "preparo"];

export default function OrderTracking({ pedido, onBack, onCancelar }) {
  const [confirmandoCancelamento, setConfirmandoCancelamento] = useState(false);
  const indiceAtual = PEDIDO_FLOW.indexOf(pedido.status);

  const steps = PEDIDO_FLOW.map((status, index) => {
    const cfg = STATUS_CONFIG[status];
    const state = index < indiceAtual ? "done" : index === indiceAtual ? "current" : "pending";

    return { icon: cfg.icon, title: cfg.label, description: cfg.message, state };
  });

  return (
    <div className="min-h-screen bg-superficie-fundo">
      <BackHeader onBack={onBack} />

      <main className="flex flex-col items-center gap-4 px-4 py-10">
        <div className="w-full max-w-xl">
          <OrderStatusHeader pedido={pedido} />
        </div>

        <div className="w-full max-w-xl rounded-2xl border border-superficie-borda bg-superficie-padrao p-6">
          <h2 className="text-lg font-bold text-texto-titulo mb-4">Acompanhamento</h2>
          <StatusTimeline steps={steps} />
        </div>

        <div className="w-full max-w-xl">
          <OrderReceiptSummary
            itens={pedido.itens}
            observacoes={pedido.observacoes}
            total={pedido.total}
          />
        </div>

        {STATUS_CANCELAVEIS.includes(pedido.status) && (
          <Button
            variant="primary"
            shape="rounded"
            className="w-full max-w-xl"
            onClick={() => setConfirmandoCancelamento(true)}
          >
            Cancelar Pedido
          </Button>
        )}
      </main>

      <ConfirmDialog
        open={confirmandoCancelamento}
        title="Cancelar Pedido"
        description="Tem certeza que deseja cancelar este pedido? Esta ação é irreversível"
        confirmLabel="Confirmar"
        onCancel={() => setConfirmandoCancelamento(false)}
        onConfirm={() => {
          setConfirmandoCancelamento(false);
          onCancelar?.();
        }}
      />
    </div>
  );
}