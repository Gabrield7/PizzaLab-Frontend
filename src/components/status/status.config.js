// Mapeamento único de status -> ícone (public/icons) e classes Tailwind.
// Alterar cor de um status aqui reflete em Badge, Banner, Timeline e IconCircle.

export const STATUS_CONFIG = {
  pendente: {
    label: "Pendente",
    icon: "clock",
    text: "text-apoio-amarelo",
    softBg: "bg-apoio-amarelo-suave",
    solidBg: "bg-apoio-amarelo",
    message: "Aguardando confirmação da pizzaria",
  },
  preparo: {
    label: "Em preparo",
    icon: "chef-hat",
    text: "text-apoio-laranja",
    softBg: "bg-apoio-laranja-suave",
    solidBg: "bg-apoio-laranja",
    message: "Seu pedido está sendo preparado com carinho",
  },
  pronto: {
    label: "Pronto",
    icon: "package",
    text: "text-apoio-azul",
    softBg: "bg-apoio-azul-suave",
    solidBg: "bg-apoio-azul",
    message: "Pedido pronto para envio. Aguardando entregador",
  },
  rota: {
    label: "Em rota",
    icon: "truck",
    text: "text-apoio-roxo",
    softBg: "bg-apoio-roxo-suave",
    solidBg: "bg-apoio-roxo",
    message: "Seu pedido está a caminho!",
  },
  entregue: {
    label: "Entregue",
    icon: "home",
    text: "text-feedback-sucesso",
    softBg: "bg-apoio-verde-suave",
    solidBg: "bg-feedback-sucesso",
    message: "Pedido entregue com sucesso!",
  },
  cancelado: {
    label: "Cancelado",
    icon: "ban",
    text: "text-feedback-erro",
    softBg: "bg-apoio-vermelho-suave",
    solidBg: "bg-feedback-erro",
    message: "Este pedido foi cancelado!",
  },
};

// Ícones esperados em /public/icons (SVG monocromático, fill único):
// clock.svg, chef-hat.svg, package.svg, truck.svg, home.svg, ban.svg, check.svg

// Nomes de status sincronizados com o enum `pedido_status` do backend
// (schema.prisma) — evita precisar de dicionário de tradução na integração.
export const PEDIDO_FLOW = ["pendente", "preparo", "pronto", "rota", "entregue"];