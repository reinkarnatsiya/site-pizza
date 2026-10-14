// src/api/api.ts

const API_URL = 'https://site-pizza-defu.onrender.com';

export interface ApiUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}

export interface ApiPizza {
    id: string;
    name: string;
    price: number;
    ingredients: string[];
    imageUrl: string;
}

export interface ApiOrder {
    id: string;
    userId: string;
    pizzas: ApiPizza[];
    status: 'pending' | 'cooking' | 'ready' | 'completed';
    createdAt: string;
    readyAt?: string;
}

// Пользователи
export const fetchUsers = async (): Promise<ApiUser[]> => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
};

export const fetchUserByEmail = async (email: string): Promise<ApiUser | undefined> => {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    const users = await res.json();
    return users[0];
};

export const createUser = async (user: Omit<ApiUser, 'id'>): Promise<ApiUser> => {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, id: crypto.randomUUID() })
    });
    return res.json();
};

// Пиццы
export const fetchPizzas = async (): Promise<ApiPizza[]> => {
    const res = await fetch(`${API_URL}/pizzas`);
    return res.json();
};

export const createPizza = async (pizza: Omit<ApiPizza, 'id'>): Promise<ApiPizza> => {
    const res = await fetch(`${API_URL}/pizzas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pizza, id: Date.now().toString() })
    });
    return res.json();
};

// Заказы
export const fetchOrders = async (): Promise<ApiOrder[]> => {
    const res = await fetch(`${API_URL}/orders`);
    return res.json();
};

export const createOrder = async (order: Omit<ApiOrder, 'id'>): Promise<ApiOrder> => {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, id: crypto.randomUUID() })
    });
    return res.json();
};

export const updateOrderStatus = async (orderId: string, status: ApiOrder['status']): Promise<ApiOrder> => {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    return res.json();
};
