import StatusIcon from "./StatusIcon";

/**
 * steps: Array<{
 *   icon: string,               // nome do arquivo em /public/icons
 *   title: string,
 *   description: string,
 *   state: "done" | "current" | "pending",
 * }>
 */
export default function StatusTimeline({ steps }) {
  return (
    <div>
      {steps.map((step, i) => (
        <TimelineStep key={i} {...step} isLast={i === steps.length - 1} />
      ))}
    </div>
  );
}

function TimelineStep({ icon, title, description, state, isLast }) {
  const isPending = state === "pending";

  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      {!isLast && (
        <span
          className={`absolute left-5 top-10 bottom-0 w-0.5 ${
            isPending ? "bg-superficie-borda" : "bg-marca-primaria"
          }`}
        />
      )}

      <div
        className={`z-10 flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
          isPending ? "bg-superficie-borda" : "bg-marca-primaria"
        }`}
      >
        <StatusIcon
          icon={icon}
          size={18}
          className={isPending ? "text-superficie-inativa" : "text-white"}
        />
      </div>

      <div>
        <p
          className={`font-semibold ${
            isPending ? "text-superficie-inativa" : "text-marca-primaria"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-sm ${
            isPending ? "text-superficie-inativa" : "text-texto-suporte"
          }`}
        >
          {description}
        </p>

        {state === "current" && (
          <div className="flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-marca-primaria" />
            <span className="text-xs text-marca-primaria">Status atual</span>
          </div>
        )}
      </div>
    </div>
  );
}
