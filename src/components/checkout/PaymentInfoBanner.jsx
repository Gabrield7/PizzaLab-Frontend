import StatusIcon from "../status/StatusIcon";

// Aviso fixo de forma de pagamento. Por enquanto só existe "na entrega" —
// se entrar mais de uma opção no futuro isso vira um Dropdown/grupo de
// radio em vez de banner estático.
export default function PaymentInfoBanner({
  title = "Pagamento na entrega",
  description = "O pagamento será realizado presencialmente no momento da entrega",
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-superficie-fundo p-4">
      <StatusIcon
        icon="credit-card"
        size={20}
        className="text-texto-titulo mt-0.5"
      />
      <div>
        <p className="font-semibold text-texto-titulo text-sm">{title}</p>
        <p className="text-sm text-texto-suporte">{description}</p>
      </div>
    </div>
  );
}
