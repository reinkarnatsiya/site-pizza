import { useEffect } from 'react';
import { usePizzeriaStore } from '../store/Pizza';
import styles from './Board.module.css';

const Board = () => {
    const { orders, loadOrders } = usePizzeriaStore();

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const readyOrders = orders.filter(order => order.status === 'ready');

    return (
        <div className={styles.boardContainer}>
            <h1 className="page-title">Забери, пока не украли рецепт</h1>

            {readyOrders.length === 0 ? (
                <div className={styles.noOrders}>
                    <p>Нет готовых заказов</p>
                    <p>Скоро здесь появятся пиццы, готовые к выдаче!</p>
                </div>
            ) : (
                readyOrders.map((order) => (
                    <div key={order.id} className={styles.readyCard}>
                        <div className={styles.orderNumber}>
                            <span>Заказ #{order.id.slice(0, 8)}</span>
                        </div>
                        <div className={styles.message}>
                            🍕 {order.userId}, ваша пицца готова!
                        </div>
                        <div className={styles.emoji}>
                            🔔 🔔 🔔
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Board;