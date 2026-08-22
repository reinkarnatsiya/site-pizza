import { useEffect } from 'react';
import { usePizzeriaStore } from '../store/Pizza';
import { useAuthStore } from '../store/Auth';
import { type ApiOrder } from '../api/api';
import styles from './Orders.module.css';

const Orders = () => {
    const { orders, loadOrders } = usePizzeriaStore();
    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    if (!isAuthenticated) {
        return (
            <div className={styles.ordersContainer}>
                <h1 className="page-title">Твои победы</h1>
                <div className={styles.noOrders}>
                    <p>Пожалуйста, <a href="/login">войдите</a>, чтобы видеть свои заказы.</p>
                </div>
            </div>
        );
    }

    const userOrders = orders.filter((order: ApiOrder) => order.userId === user?.id);

    const getStatusClass = (status: string) => {
        switch(status) {
            case 'pending': return styles.statusPending;
            case 'cooking': return styles.statusCooking;
            case 'ready': return styles.statusReady;
            case 'completed': return styles.statusCompleted;
            default: return '';
        }
    };

    const getStatusLabel = (status: string) => {
        switch(status) {
            case 'pending': return 'Ожидает';
            case 'cooking': return 'Готовится';
            case 'ready': return 'Готово к выдаче';
            case 'completed': return 'Получен';
            default: return status;
        }
    };

    return (
        <div className={styles.ordersContainer}>
            <h1 className="page-title">📋 Мои заказы</h1>

            {userOrders.length === 0 ? (
                <div className={styles.noOrders}>
                    <p>У вас пока нет заказов.</p>
                    <p>Перейдите в <a href="/menu">меню</a>, чтобы сделать первый заказ!</p>
                </div>
            ) : (
                userOrders.map((order: ApiOrder) => (
                    <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                            <span className={styles.orderId}>Заказ #{order.id.slice(0, 8)}</span>
                            <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
                        </div>

                        <div className={styles.orderInfo}>
                            <p><strong>Создан:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            {order.readyAt && <p><strong>Готов:</strong> {new Date(order.readyAt).toLocaleString()}</p>}
                        </div>

                        <div className={styles.pizzasList}>
                            <strong>Состав заказа:</strong>
                            {order.pizzas.map((pizza, idx) => (
                                <div key={idx} className={styles.pizzaItem}>
                                    <span>{pizza.name}</span>
                                    <span>{pizza.price} ₽</span>
                                </div>
                            ))}
                            <div className={styles.totalPrice}>
                                Итого: {order.pizzas.reduce((sum, p) => sum + p.price, 0)} ₽
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;