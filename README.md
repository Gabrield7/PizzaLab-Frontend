# 🍕 PizzaLab: Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-testes-6E9F18?logo=vitest&logoColor=white)
![CI](https://github.com/Gabrield7/PizzaLab-Frontend/actions/workflows/ci.yml/badge.svg)

Interface web do cliente do PizzaLab, um sistema para pizzaria. Permite navegar pelo cardápio, montar o carrinho, finalizar o pedido sem login e acompanhar o andamento.

Consome a [PizzaLab-API](https://github.com/Gabrield7/PizzaLab-API)

---

## Demonstração

| Modalidade | Frontend | API |
| ---------- | -------- | --- |
| **PaaS** (Vercel + Render + TiDB) | [pizzalab-frontend-liart.vercel.app](https://pizzalab-frontend-liart.vercel.app) | [pizzalab-api-bvmp.onrender.com](https://pizzalab-api-bvmp.onrender.com) |
| **IaaS** (AWS EC2) | [http://54.20.100.52](http://54.20.100.52) | `http://54.20.100.52:3000` |

> No plano gratuito do Render, a API "dorme" após um período sem uso. A primeira requisição pode levar cerca de 25 segundos.

- Repositório da API: **[PizzaLab-API](https://github.com/Gabrield7/PizzaLab-API)**
- O frontend consome apenas **produtos** e **pedidos**. Os demais módulos da API (estoque, funcionários, painel) não têm interface neste momento.

---

## Funcionalidades

- **Cardápio** com filtro por categoria (Pizzas, Bebidas, Sobremesas), carregado da API.
- **Carrinho** com ajuste de quantidade e remoção de itens, persistido no `localStorage`.
- **Checkout sem login**: endereço, telefone (com máscara) e observações.
- **Confirmação do pedido** com resumo.
- **Acompanhamento** do status do pedido (simulado, veja [Limitações](#decisões-e-limitações-conhecidas)).

Rotas:

| Rota | Tela |
| ---- | ---- |
| `/cardapio` | Cardápio (rota padrão) |
| `/carrinho` | Carrinho e checkout |
| `/pedido-confirmado` | Confirmação do pedido |
| `/acompanhar-pedido` | Acompanhamento do status |

---

## Tecnologias

- **React 19**
- **Vite 7**
- **Tailwind CSS 4**
- **React Router 7**
- **Vitest** + **React Testing Library** + **jsdom**: testes automatizados

---

## Pré-requisitos

| Ferramenta | Versão mínima |
| ---------- | ------------- |
| Node.js    | 20.19 (exigência do Vite 7) |
| npm        | 9.x |
| Git        | qualquer |

Também é preciso ter a [PizzaLab-API](https://github.com/Gabrield7/PizzaLab-API) acessível, localmente ou em uma das implantações acima.

---

## Executando localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Gabrield7/PizzaLab-Frontend.git
cd PizzaLab-Frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a variável de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL="http://localhost:3000"
```

| Variável       | Obrigatória | Descrição |
| -------------- | ----------- | --------- |
| `VITE_API_URL` | Sim | URL base da API, **sem barra no final**. |

> O Vite incorpora as variáveis `VITE_*` no momento do build. Se você mudar o valor, precisa reiniciar o servidor de desenvolvimento ou refazer o build.

> O CORS da API só libera as origens configuradas nela. Em desenvolvimento, `http://localhost:5173` já é permitido. Para outras origens, defina `FRONTEND_URL` na API.

### 4. Inicie a aplicação

```bash
npm run dev
```

O frontend estará disponível em **http://localhost:5173**.

---

## Scripts

| Comando | O que faz |
| ------- | --------- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve o build localmente para conferência |
| `npm test` | Executa os testes uma vez (Vitest) |

---

## Testes automatizados

```bash
npm test
```

Os testes ficam ao lado do código que validam:

| Arquivo | O que valida |
| ------- | ------------ |
| `src/lib/formatarPreco.test.js` | Formatação de valores em reais (inteiros, milhares, zero) |
| `src/lib/formatarTelefone.test.js` | Máscara de telefone: celular, fixo, digitação progressiva, entrada com letras e limite de 11 dígitos |
| `src/context/CartContext.test.jsx` | Carrinho: adicionar, somar quantidade do mesmo item, total de itens, atualizar e remover, limpar, persistência no `localStorage` e erro fora do `CartProvider` |

São 17 testes no total, executados em ambiente `jsdom`, sem depender da API.

### Integração contínua

O workflow `.github/workflows/ci.yml` roda `npm ci` e `npm test` a cada push e pull request na `main`. Ele apenas verifica os testes. O deploy do frontend é feito pela integração Git da Vercel.

O pipeline completo, com deploy automático condicionado aos testes, está no repositório da [PizzaLab-API](https://github.com/Gabrield7/PizzaLab-API).

---

## Estrutura do projeto

```
PizzaLab-Frontend/
├── public/
│   ├── images/             # Imagens dos produtos
│   └── icons/              # Ícones SVG
├── src/
│   ├── main.jsx            # Ponto de entrada
│   ├── App.jsx             # Providers e roteamento
│   ├── routes.jsx          # Definição das rotas
│   ├── pages/              # Telas (Cardápio, Carrinho, Pedido confirmado, Acompanhar pedido)
│   ├── components/         # Componentes (ui, layout, checkout, status, cart, product)
│   ├── context/            # CartContext e PedidoContext (+ testes)
│   ├── lib/                # api.js, formatadores (+ testes)
│   └── style/              # Tokens de estilo
├── vercel.json             # Reescrita de rotas para o React Router
└── vite.config.js          # Vite, Tailwind e configuração do Vitest
```

---

## Integração com a API

O acesso à API está concentrado em `src/lib/api.js`.

| Função | Requisição | Observação |
| ------ | ---------- | ---------- |
| `buscarProdutos()` | `GET /produtos` | Lista pública. A API responde 404 quando o cardápio está vazio, e o frontend trata isso como lista vazia. |
| `criarPedido()` | `POST /pedidos` | Pública. Envia dados do cliente, endereço e itens (`produto_id`, `quantidade`). |

Adaptações feitas no frontend:

- O produto da API é traduzido para o formato usado nos componentes: `preco_unitario` vira `preco` (convertido para número), `imagem_url` vira `imagem` e a categoria (`pizza`, `bebida`, `sobremesa`) vira o rótulo do filtro (Pizzas, Bebidas, Sobremesas).
- Os campos `valor_total` e `taxa_entrega` chegam como string no JSON (tipo `Decimal` do Prisma) e são convertidos para número.
- As imagens dos produtos são caminhos relativos (`/images/...`) servidos pela pasta `public` do próprio frontend.

---

## Implantação

O mesmo projeto foi publicado de duas formas, cada uma com seu próprio backend e banco de dados.

**PaaS**
- Hospedado na **Vercel**, com `vercel.json` redirecionando todas as rotas para `index.html` (necessário para o React Router).
- Variável `VITE_API_URL` configurada no painel da Vercel, apontando para a API no Render.

**IaaS**
- Instância AWS EC2 (Ubuntu 24.04 LTS, `t2.micro`).
- Build gerado com `npm run build` e servido pelo **Nginx** na porta 80, com `try_files` apontando para `index.html`.
- `VITE_API_URL=http://54.20.100.52:3000` definida antes do build.
- O build do Vite exigiu 2 GB de swap, porque a instância tem apenas 1 GB de RAM.

Os passos completos de cada implantação estão descritos no relatório da atividade.

---

## Decisões e limitações conhecidas

- **Acompanhamento simulado.** A API não tem rota pública para o cliente consultar o status do pedido. A tela de acompanhamento avança o status sozinha a cada 5 segundos. O status real só é alterado por funcionários, via `PATCH /pedidos/:id/status` na API.
- **Frete grátis provisório.** A taxa de entrega retornada pela API é sempre `0`.
- **Sem login de cliente.** O checkout é feito sem autenticação, e os dados do cliente são enviados junto com o pedido.
- **Carrinho e pedido ativo no navegador.** Ficam no `localStorage` (`pizzalab:carrinho` e `pizzalab:pedidoAtivo`), então não acompanham o usuário entre dispositivos.
- **CI apenas de testes.** O deploy automático condicionado aos testes foi implementado na API.

---

## Autor

**Gabriel Dantas**: [@Gabrield7](https://github.com/Gabrield7)
