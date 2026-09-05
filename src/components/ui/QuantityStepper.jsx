import IconButton from "./IconButton";

export default function QuantityStepper({ value = 0, onChange, min = 0, size = 28 }) {
  return (
    <div className="flex items-center gap-2">
      <IconButton
        icon="minus"
        variant="subtle"
        size={size}
        onClick={() => onChange?.(Math.max(min, value - 1))}
      />
      <span className="w-6 text-center font-medium text-texto-titulo">{value}</span>
      <IconButton icon="plus" variant="subtle" size={size} onClick={() => onChange?.(value + 1)} />
    </div>
  );
}
