import { Route, Routes } from 'react-router-dom'
import { Pedidos } from './pages/Pedidos'
import { Mesas } from './pages/Mesas'
import { Comandas } from './pages/Comandas'
import { Itens } from './pages/Itens'
import { Cozinhas } from './pages/Cozinhas'
import { CadastroMesa } from './pages/Mesas/cadastro'
import { CadastroItem } from './pages/Itens/cadastro'
import { Categorias } from './pages/Categorias'
import { CadastroCategorias } from './pages/Categorias/cadastro'
import { CadastroPedido } from './pages/Pedidos/cadastro'
import { VisualizarComanda } from './pages/Comandas/visualizar'
import { AlterarItem } from './pages/Itens/Alterar'
import {VisualizarPedido} from './pages/Pedidos/visualizar'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Mesas />} />
      <Route path="/mesas" element={<Mesas />} />
      <Route path="/mesas/cadastro" element={<CadastroMesa />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/pedidos/:id" element={<VisualizarPedido />} />
      <Route path="/pedidos/cadastro" element={<CadastroPedido />} />
      <Route path="/pedidos/cadastro/:id" element={<CadastroPedido />} />
      <Route path="/comandas" element={<Comandas />} />
      <Route path="/comandas/:id" element={<VisualizarComanda />} />
      <Route path="/itens" element={<Itens />} />
      <Route path="/itens/cadastro" element={<CadastroItem />} />
      <Route path="/itens/alterar/:id" element={<AlterarItem />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/categorias/cadastro" element={<CadastroCategorias />} />
      <Route path="/cozinhas" element={<Cozinhas />} />
    </Routes>
  )
}

export default App
