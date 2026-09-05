/**
 * Renderiza um ícone de /public/icons/{icon}.svg usando CSS mask,
 * assim ele herda a cor via `currentColor` (className com text-*).
 * Requer SVGs monocromáticos (fill único).
 */
export default function StatusIcon({ icon, size = 20, className = "" }) {
  return (
    <span
      role="img"
      aria-label={icon}
      className={`inline-block bg-current shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(/icons/${icon}.svg)`,
        maskImage: `url(/icons/${icon}.svg)`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
