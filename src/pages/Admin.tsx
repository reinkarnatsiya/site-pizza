import { useEffect } from 'react';
import { usePizzeriaStore } from '../store/Pizza';
import { useAuthStore } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import { type ApiOrder } from '../api/api';
import styles from './Admin.module.css';

const Admin = () => {
    const { orders, updateOrder, loadOrders } = usePizzeriaStore();
    const { user, isAuthenticated } = useAuthStore();
    useNavigate();
    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    if (!isAuthenticated) {
        return <h1 className="page-title">Пожалуйста, войдите в систему</h1>;
    }

    if (user?.role !== 'admin') {
        return <h1 className="page-title">Доступ запрещён. Только для администраторов.</h1>;
    }

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
            case 'ready': return 'Готово';
            case 'completed': return 'Выдан';
            default: return status;
        }
    };

    return (
        <div className={styles.adminContainer}>
            <h1 className="page-title">Управляй пиццерией</h1>

            {orders.length === 0 ? (
                <div className={styles.noOrders}>
                    <p>Нет заказов</p>
                </div>
            ) : (
                orders.map((order: ApiOrder) => (
                    <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                            <span className={styles.orderId}>Заказ #{order.id.slice(0, 8)}</span>
                            <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
                        </div>

                        <div className={styles.orderInfo}>
                            <p><strong>Клиент:</strong> {order.userId}</p>
                            <p><strong>Создан:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            {order.readyAt && <p><strong>Готов:</strong> {new Date(order.readyAt).toLocaleString()}</p>}
                        </div>

                        <div className={styles.pizzasList}>
                            <strong>Пиццы:</strong>
                            <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                                {order.pizzas.map((pizza, idx) => (
                                    <li key={idx}>{pizza.name} — {pizza.price} ₽</li>
                                ))}
                            </ul>
                            <div className={styles.totalPrice}>
                                Итого: {order.pizzas.reduce((sum, p) => sum + p.price, 0)} ₽
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            {order.status === 'pending' && (
                                <button
                                    onClick={() => updateOrder(order.id, 'cooking')}
                                    className={`${styles.actionBtn} ${styles.cookingBtn}`}
                                >
                                    Начать готовку
                                </button>
                            )}
                            {order.status === 'cooking' && (
                                <button
                                    onClick={() => updateOrder(order.id, 'ready')}
                                    className={`${styles.actionBtn} ${styles.readyBtn}`}
                                >
                                    Отметить готовым
                                </button>
                            )}
                            {order.status === 'ready' && (
                                <button
                                    onClick={() => updateOrder(order.id, 'completed')}
                                    className={`${styles.actionBtn} ${styles.completeBtn}`}
                                >
                                    Выдать заказ
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Admin;