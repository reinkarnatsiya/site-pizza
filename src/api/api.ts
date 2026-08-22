// src/api/api.ts

export interface ApiPizza {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    ingredients: string[];
}

export interface ApiOrder {
    id: string;
    userId: string;
    pizzas: ApiPizza[];
    status: 'pending' | 'cooking' | 'ready' | 'delivered';
    createdAt: string;
    readyAt?: string;
}

export interface ApiUser {
    id: string;
    name: string;
    email: string;
}

// Базовый URL — пустая строка, чтобы запросы шли на тот же домен
const API_BASE = '';

export const fetchPizzas = async (): Promise<ApiPizza[]> => {
    const response = await fetch(`${API_BASE}/pizzas`);
    if (!response.ok) throw new Error('Failed to fetch pizzas');
    return response.json();
};

export const fetchOrders = async (): Promise<ApiOrder[]> => {
    const response = await fetch(`${API_BASE}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
};

export const createOrder = async (orderData: Omit<ApiOrder, 'id'>): Promise<ApiOrder> => {
    const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
};

export const updateOrderStatus = async (orderId: string, status: ApiOrder['status']): Promise<ApiOrder> => {
    const response = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
};