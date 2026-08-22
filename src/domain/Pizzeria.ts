import { Order } from './Order';
import { User } from './User';
import { Pizza } from './Pizza';

export class Pizzeria {
    public name: string;
    private orders: Order[];
    private menu: Pizza[];

    constructor(name: string) {
        this.name = name;
        this.orders = [];
        this.menu = [];
    }

    addToMenu(pizza: Pizza): void {
        this.menu.push(pizza);
    }

    getMenu(): Pizza[] {
        return [...this.menu];
    }

    createOrder(user: User, pizzas: Pizza[]): Order {
        const order = new Order(user, pizzas);
        this.orders.push(order);
        return order;
    }

    updateOrderStatus(orderId: string, status: Order['status']): boolean {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.setStatus(status);
            return true;
        }
        return false;
    }

    getReadyOrders(): Order[] {
        return this.orders.filter(o => o.status === 'готов');
    }

    getAllOrders(): Order[] {
        return [...this.orders];
    }
}