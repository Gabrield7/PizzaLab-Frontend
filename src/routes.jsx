import { Routes, Route, Navigate } from 'react-router';
import { Cardapio } from './pages/Cardapio';
import { Carrinho } from './pages/Carrinho';
import { PedidoConfirmado } from './pages/PedidoConfirmado';
import { AcompanharPedido } from './pages/AcompanharPedido';

export const AppRoutes = () => {    
    return (
      <Routes>
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="*" element={<Navigate to="/cardapio" replace />} />

        <Route path="/carrinho" element={<Carrinho />} />

        <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />

        <Route path="/acompanhar-pedido" element={<AcompanharPedido />} />
      </Routes>
    );   
}