const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  if (!API_URL) {
    throw new Error(
      "VITE_API_URL não está definida — crie um .env na raiz do frontend com VITE_API_URL=<url do backend> e reinicie o servidor."
    );
  }

  const resposta = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const textoResposta = await resposta.text();
  let dados = null;
  try {
    dados = textoResposta ? JSON.parse(textoResposta) : null;
  } catch {
    throw new Error(
      `A API não devolveu JSON (recebido: "${textoResposta.slice(0, 80)}"). Confira se VITE_API_URL aponta pro backend certo.`
    );
  }

  if (!resposta.ok) {
    const erro = new Error(dados?.error ?? dados?.message ?? `Erro ${resposta.status} ao acessar a API`);
    erro.status = resposta.status;
    throw erro;
  }

  return dados;
}

// Traduz o produto do formato do backend (preco_unitario, imagem_url,
// categoria singular) pro formato que os componentes já esperam.
const CATEGORIA_PARA_FILTRO = {
  pizza: "Pizzas",
  bebida: "Bebidas",
  sobremesa: "Sobremesas",
};

function mapearProduto(produto) {
  return {
    id: produto.id,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: Number(produto.preco_unitario),
    imagem: produto.imagem_url,
    categoria: CATEGORIA_PARA_FILTRO[produto.categoria] ?? produto.categoria,
  };
}

export async function buscarProdutos() {
  try {
    const { produtos } = await request("/produtos");
    return produtos.map(mapearProduto);
  } catch (erro) {
    // Catálogo vazio não é uma falha de verdade — a API responde 404 nesse
    // caso, mas pra quem lista produtos isso é só "nenhum produto ainda".
    if (erro.status === 404) return [];
    throw erro;
  }
}

// `itens`: itens do carrinho no formato do CartContext (nome/preco/imagem em
// português) — aqui é onde viram o payload que o backend espera.
export async function criarPedido({ nome, telefone, logradouro, numero, bairro, complemento, observacoes, itens }) {
  const { pedido } = await request("/pedidos", {
    method: "POST",
    body: JSON.stringify({
      nome,
      telefone,
      logradouro,
      numero,
      bairro,
      complemento,
      observacoes,
      itens: itens.map((item) => ({
        produto_id: item.id,
        quantidade: item.quantidade,
      })),
    }),
  });

  // Prisma serializa campos Decimal (valor_total, taxa_entrega) como string
  // no JSON — convertendo aqui pra quem usa a resposta não precisar saber
  // disso.
  return {
    ...pedido,
    valor_total: Number(pedido.valor_total),
    taxa_entrega: Number(pedido.taxa_entrega),
  };
}