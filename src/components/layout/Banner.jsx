import StatusIcon from "../status/StatusIcon";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-marca-primaria px-4 py-12 text-center sm:px-8 sm:py-16">
      {/* Ícones decorativos de fundo */}
      <StatusIcon
        icon="pizza-slice"
        size={140}
        className="absolute -left-6 -top-6 text-white/10 rotate-[-15deg]"
      />
      <StatusIcon
        icon="pizza-slice"
        size={140}
        className="absolute -right-6 -bottom-10 text-white/10 rotate-[20deg]"
      />

      {/* Tag */}
      <div className="relative flex items-center justify-center gap-2 text-sm font-medium text-marca-secundaria">
        <StatusIcon icon="flame" size={16} className="text-marca-secundaria" />
        Saindo do forno
        <StatusIcon icon="flame" size={16} className="text-marca-secundaria" />
      </div>

      {/* Título */}
      <h1 className="relative mt-3 text-2xl font-extrabold leading-tight text-texto-corpo sm:text-3xl lg:text-4xl">
        A melhor pizza da cidade,
        <br />
        direto na sua casa
      </h1>

      {/* Subtítulo */}
      <p className="relative mt-3 text-sm text-texto-corpo/80">
        Ingredientes frescos, massa artesanal e sabor incomparável
      </p>
    </section>
  );
}
