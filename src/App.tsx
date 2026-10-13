import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import About from './pages/About'
import Cart from './pages/Cart'
import Clients from './pages/Clients'
import Contact from './pages/Contact'
import ErgonomicChairs from './pages/ErgonomicChairs'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'
import Shop from './pages/Shop'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="ergonomic-chairs" element={<ErgonomicChairs />} />
            <Route path="cart" element={<Cart />} />
            <Route path="about" element={<About />} />
            <Route path="clients" element={<Clients />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
