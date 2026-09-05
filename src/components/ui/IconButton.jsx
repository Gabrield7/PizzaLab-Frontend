import StatusIcon from "../status/StatusIcon";

const VARIANT_CLASSES = {
  subtle:
    "group bg-superficie-padrao border border-superficie-borda hover:bg-marca-primaria hover:border-marca-primaria",
  solid: "bg-marca-primaria hover:bg-marca-primaria-hover",
};

export default function IconButton({
  icon,
  variant = "subtle",
  size = 40,
  badge,
  iconClassName,
  className = "",
  ...props
}) {
  const defaultIconColor =
    variant === "solid" ? "text-white" : "text-texto-titulo group-hover:text-white";

  return (
    <button
      className={`relative flex items-center cursor-pointer justify-center rounded-lg transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      style={{ width: size, height: size }}
      {...props}
    >
      <StatusIcon icon={icon} size={size * 0.45} className={iconClassName ?? defaultIconColor} />

      {badge != null && (
        <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-marca-secundaria text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
