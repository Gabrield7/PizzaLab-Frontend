import StatusIcon from "../status/StatusIcon";

// primary/secondary já partem preenchidos: hover só escurece a cor.
// ghost parte sem preenchimento: hover é quem preenche (mesmo padrão do
// IconButton "subtle" -> "solid") — por isso o texto/ícone também precisam
// virar brancos no hover, via group-hover.
const VARIANT_CLASSES = {
  primary: "bg-marca-primaria hover:bg-marca-primaria-hover text-white",
  secondary: "bg-marca-secundaria hover:brightness-90 text-white",
  ghost: "group bg-transparent text-texto-titulo hover:bg-marca-primaria hover:text-white",
};

const ICON_CLASSES = {
  primary: "text-white",
  secondary: "text-white",
  ghost: "text-texto-titulo transition-colors group-hover:text-white",
};

// pill: botões "Label" isolados (ver Botões.png). rounded: CTAs em largura
// total, tipo "Adicionar ao carrinho" no card de produto.
const SHAPE_CLASSES = {
  pill: "rounded-full",
  rounded: "rounded-xl",
};

// sm: uso inline, tipo link de ação no Navbar. md: botão padrão.
const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-2.5",
};

export default function Button({
  variant = "primary",
  shape = "pill",
  size = "md",
  icon,
  loading = false,
  disabled = false,
  children,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  const stateClasses = disabled
    ? "bg-superficie-inativa text-superficie-padrao cursor-not-allowed"
    : `${VARIANT_CLASSES[variant]}${loading ? " cursor-wait" : ""}`;

  const iconColor = disabled ? "text-superficie-padrao" : ICON_CLASSES[variant];

  return (
    <button
      disabled={isDisabled}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-colors ${SHAPE_CLASSES[shape]} ${SIZE_CLASSES[size]} ${stateClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <Spinner className={iconColor} />
      ) : (
        icon && <StatusIcon icon={icon} size={16} className={iconColor} />
      )}
      {children}
    </button>
  );
}

function Spinner({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 animate-spin ${className}`}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

