import { create } from 'zustand';
import { fetchPizzas, fetchOrders, createOrder, updateOrderStatus, type ApiPizza, type ApiOrder } from '../api/api';
import { type ApiUser } from '../api/api';

interface PizzeriaState {
    menu: ApiPizza[];
    orders: ApiOrder[];
    cart: ApiPizza[];
    isLoading: boolean;
    loadMenu: () => Promise<void>;
    loadOrders: () => Promise<void>;
    addToCart: (pizza: ApiPizza) => void;
    removeFromCart: (pizzaId: string) => void;
    clearCart: () => void;
    createNewOrder: (user: ApiUser) => Promise<ApiOrder | null>;
    updateOrder: (orderId: string, status: ApiOrder['status']) => Promise<boolean>;
}

export const usePizzeriaStore = create<PizzeriaState>((set, get) => ({
    menu: [],
    orders: [],
    cart: [],
    isLoading: false,

    loadMenu: async () => {
        set({ isLoading: true });
        try {
            const menu = await fetchPizzas();
            set({ menu, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    loadOrders: async () => {
        set({ isLoading: true });
        try {
            const orders = await fetchOrders();
            set({ orders, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    addToCart: (pizza: ApiPizza) => {
        set((state) => ({ cart: [...state.cart, pizza] }));
    },

    removeFromCart: (pizzaId: string) => {
        set((state) => ({ cart: state.cart.filter(p => p.id !== pizzaId) }));
    },

    clearCart: () => {
        set({ cart: [] });
    },

    createNewOrder: async (user: ApiUser) => {
        const { cart } = get();
        if (cart.length === 0) return null;

        try {
            const newOrder = await createOrder({
                userId: user.id,
                pizzas: cart,
                status: 'pending',
                createdAt: new Date().toISOString(),
                readyAt: undefined
            });

            set((state) => ({
                orders: [...state.orders, newOrder],
                cart: []
            }));

            return newOrder;
        } catch (error) {
            return null;
        }
    },

    updateOrder: async (orderId: string, status: ApiOrder['status']): Promise<boolean> => {
        const state = get();
        const order = state.orders.find(o => o.id === orderId);
        if (!order) return false;
        const isSpecial = order.status === 'cooking' && status === 'ready';
        if (isSpecial && Math.random() >= 0.1) {
            return false;
        }
        try {
            const updated = await updateOrderStatus(orderId, status);
            set((state) => ({
                orders: state.orders.map(o => o.id === orderId ? updated : o)
            }));
            return true;
        } catch (error) {
            return false;
        }
    }
}));