import { Pizza } from './Pizza';
import { User } from './User';

export type OrderStatus = 'получен' | 'готовится' | 'готов' | 'выполнен';

export class Order {
    public id: string;
    public user: User;
    public pizzas: Pizza[];
    public status: OrderStatus;
    public createdAt: Date;
    public readyAt?: Date;

    constructor(user: User, pizzas: Pizza[]) {
        this.id = crypto.randomUUID();
        this.user = user;
        this.pizzas = pizzas;
        this.status = 'получен';
        this.createdAt = new Date();
    }

    setStatus(status: OrderStatus): void {
        this.status = status;
        if (status === 'готов') {
            this.readyAt = new Date();
        }
    }

    isReady(): boolean {
        return this.status === 'готов';
    }

    getTotalPrice(): number {
        return this.pizzas.reduce((sum, pizza) => sum + pizza.price, 0);
    }
}