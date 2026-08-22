import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Board from './pages/Board';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPizza from './pages/AddPizza';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container" style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/add-pizza" element={<AddPizza />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;