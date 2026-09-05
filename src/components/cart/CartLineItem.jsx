import IconButton from "../ui/IconButton";

export default function CartLineItem({
  image,
  name,
  price,
  quantity = 0,
  onQuantityChange,
  onRemove,
}) {
  const total = (price * quantity).toFixed(2).replace(".", ",");

  return (
    <div className="flex items-center gap-4 py-3">
      <img src={image} alt={name} className="w-16 h-16 rounded-lg object-cover" />

      <div className="flex-1">
        <p className="font-semibold text-texto-titulo">{name}</p>
        <p className="text-sm text-texto-suporte">R$ {price.toFixed(2).replace(".", ",")}</p>

        <div className="flex items-center gap-2 mt-1">
          <IconButton
            icon="minus"
            variant="subtle"
            size={28}
            onClick={() => onQuantityChange?.(quantity - 1)}
          />
          <span className="w-6 text-center font-medium text-texto-titulo">{quantity}</span>
          <IconButton
            icon="plus"
            variant="subtle"
            size={28}
            onClick={() => onQuantityChange?.(quantity + 1)}
          />
        </div>
      </div>

      <p className="font-semibold text-texto-titulo">R$ {total}</p>

      <IconButton
        icon="trash"
        variant="subtle"
        size={32}
        className="border-none bg-transparent"
        iconClassName="text-feedback-erro"
        onClick={onRemove}
      />
    </div>
  );
}
