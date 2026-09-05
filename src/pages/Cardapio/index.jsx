import Navbar from "../../components/layout/Navbar";
import Banner from "../../components/layout/Banner";
import ProdutosFiltrados from "../../components/layout/ProdutosFiltrados";

export function Cardapio() {
  return (
    <main className="min-h-screen bg-[#F9F8F0]">
      <Navbar />
      <Banner />
      <ProdutosFiltrados />
    </main>
  );
}
