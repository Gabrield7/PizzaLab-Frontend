import Button from "./Button";

export default function ConfirmDialog({
  open,
  title,
  description,
  cancelLabel = "Cancelar",
  confirmLabel = "Confirmar",
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-texto-titulo/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-superficie-padrao p-6">
        <h2 className="text-lg font-bold text-texto-titulo">{title}</h2>
        <p className="mt-2 text-sm text-texto-suporte">{description}</p>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" shape="rounded" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}