import { Route, Routes } from 'react-router-dom'
import { Pedidos } from './pages/Pedidos'
import { Mesas } from './pages/Mesas'
import { Comandas } from './pages/Comandas'
import { Itens } from './pages/Itens'
import { Cozinhas } from './pages/Cozinhas'
import { Pop } from './pages/Modal'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Mesas />} />
      <Route path="/mesas" element={<Mesas />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/comandas" element={<Comandas />} />
      <Route path="/itens" element={<Itens />} />
      <Route path="/cozinhas" element={<Cozinhas />} />
      <Route path="/modal" element={<Pop />} />
    </Routes>
  )
}

export default App
