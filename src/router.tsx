import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Board from './pages/Board';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/menu',
        element: <Menu/>,
    },
    {
        path: '/cart',
        element: <Cart/>,
    },
    {
        path: '/orders',
        element: <Orders/>,
    },
    {
        path: '/board',
        element: <Board/>,
    },
    {
        path: '/admin',
        element: <Admin/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
]);