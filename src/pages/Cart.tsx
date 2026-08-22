import { usePizzeriaStore } from '../store/Pizza';
import { useAuthStore } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
    const { cart, removeFromCart, clearCart, createNewOrder } = usePizzeriaStore();
    const { user, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((sum, pizza) => sum + Math.round(pizza.price), 0);

    const handleOrder = async () => {
        if (!isAuthenticated) {
            alert('Пожалуйста, войдите в систему');
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            alert('Корзина пуста. Добавьте пиццы в корзину перед оформлением заказа.');
            return;
        }

        if (user) {
            const order = await createNewOrder(user);
            if (order) {
                alert(`Заказ #${order.id.slice(0, 8)} создан!`);
                navigate('/orders');
            }
        }
    };

    if (cart.length === 0) {
        return (
            <div className={styles.cartContainer}>
                <h1 className="page-title">Другим такое не снилось</h1>
                <div className={styles.emptyCart}>
                    <p>Корзина пуста.</p>
                    <p>Перейдите в <a href="/menu">меню</a>, чтобы добавить пиццы</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartContainer}>
            <h1 className="page-title">Корзина</h1>

            <div>
                {cart.map((pizza, index) => (
                    <div key={index} className={styles.cartItem}>
                        <div className={styles.itemInfo}>
                            <div className={styles.itemName}>{pizza.name}</div>
                            <div className={styles.itemPrice}>{pizza.price} ₽</div>
                        </div>
                        <button onClick={() => removeFromCart(pizza.id)} className={styles.removeBtn}>
                            ✖
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div className={styles.total}>
                    Итого: <span>{totalPrice} ₽</span>
                </div>
                <div className={styles.buttons}>
                    <button onClick={handleOrder}>Оформить заказ</button>
                    <button onClick={clearCart} className={styles.clearBtn}>Очистить корзину</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;