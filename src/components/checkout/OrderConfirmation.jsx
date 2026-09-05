import StatusIcon from "../status/StatusIcon";
import StatusBadge from "../status/StatusBadge";
import Button from "../ui/Button";
import BackHeader from "../layout/BackHeader";
import OrderReceiptSummary from "./OrderReceiptSummary";
import { STATUS_CONFIG } from "../status/status.config";

// `pedido`: { numeroPedido, tempoEstimado, status, endereco, itens,
// observacoes, total } — montado pelo CheckoutPage no momento da confirmação
// (os itens já não existem mais no carrinho nesse ponto, por isso a página
// depende de receber o objeto completo, não do useCart()).
export function OrderConfirmation({ pedido, onBack, onAcompanhar, onVoltarInicio }) {
  const cfg = STATUS_CONFIG[pedido.status];
  const { endereco } = pedido;

  return (
    <div className="min-h-screen bg-superficie-fundo">
      <BackHeader onBack={onBack} />

      <main className="flex flex-col items-center px-4 py-16">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-apoio-verde-suave">
          <StatusIcon icon="check" size={28} className="text-feedback-sucesso" />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-texto-titulo">Pedido Confirmado!</h1>
        <p className="mt-1 text-sm text-texto-suporte">
          Seu pedido foi recebido e está sendo processado
        </p>

        <div className="mt-8 grid w-full max-w-xl grid-cols-2 gap-4">
          <InfoStat
            icon="package"
            label="Número do pedido"
            value={`#${pedido.numeroPedido}`}
            bg="bg-apoio-vermelho-suave"
            iconColor="text-feedback-erro"
          />
          <InfoStat
            icon="clock"
            label="Tempo estimado"
            value={pedido.tempoEstimado}
            bg="bg-apoio-amarelo-suave"
            iconColor="text-apoio-amarelo"
          />
        </div>

        <div className="mt-4 w-full max-w-xl rounded-2xl border border-superficie-borda bg-superficie-padrao p-6">
          <StatusBadge status={pedido.status} />
          <p className="mt-1 text-sm text-texto-suporte">{cfg.message}</p>
        </div>

        <div className="mt-4 w-full max-w-xl">
          <OrderReceiptSummary
            itens={pedido.itens}
            observacoes={pedido.observacoes}
            total={pedido.total}
          />
        </div>

        <div className="mt-4 w-full max-w-xl rounded-2xl border border-superficie-borda bg-superficie-padrao p-6">
          <div className="flex items-start gap-2">
            <StatusIcon icon="map-pin" size={18} className="text-texto-titulo mt-0.5" />
            <div>
              <h2 className="font-bold text-texto-titulo">Endereço de Entrega</h2>
              <p className="mt-1 text-sm text-texto-suporte">
                {endereco.rua}, {endereco.numero}
              </p>
              {endereco.bairro && <p className="text-sm text-texto-suporte">{endereco.bairro}</p>}
              <p className="text-sm text-texto-suporte">
                {endereco.nome} • {endereco.telefone}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-6">
          <Button variant="primary" shape="rounded" onClick={onAcompanhar}>
            Acompanhar Pedido
          </Button>
          <Button variant="ghost" onClick={onVoltarInicio}>
            Voltar ao início
          </Button>
        </div>
      </main>
    </div>
  );
}

function InfoStat({ icon, label, value, bg, iconColor }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-superficie-borda bg-superficie-padrao p-4">
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${bg}`}>
        <StatusIcon icon={icon} size={18} className={iconColor} />
      </div>
      <div>
        <p className="text-xs text-texto-suporte">{label}</p>
        <p className="font-bold text-texto-titulo">{value}</p>
      </div>
    </div>
  );
}