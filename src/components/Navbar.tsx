import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/Auth';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user, logout } = useAuthStore();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Логотип слева */}
                <div className={styles.logo}>
                    <Link to="/">
                        🍕 Пицца
                        <span className={styles.slogan}>лучше остальных</span>
                    </Link>
                </div>

                {/* Ссылки по центру */}
                <div className={styles.navLinks}>
                    <Link to="/">Главная</Link>
                    <Link to="/menu">Меню</Link>
                    <Link to="/cart">Корзина</Link>
                    <Link to="/orders">Заказы</Link>
                    <Link to="/board">Табло</Link>
                    {user?.role === 'admin' && (
                        <>
                            <Link to="/admin">Панель</Link>
                        </>
                    )}
                </div>

                {/* Правая часть */}
                <div className={styles.rightSection}>
                    {user ? (
                        <div className={styles.userInfo}>
                            <span>👤</span>
                            <span className={styles.userName}>{user.name}</span>
                            <span className={styles.role}>
                ({user.role === 'admin' ? 'админ' : 'юзер'})
              </span>
                            <button onClick={logout} className={styles.logoutBtn}>
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <div className={styles.authLinks}>
                            <Link to="/login" className={styles.authLink}>Вход</Link>
                            <Link to="/register" className={styles.authLink}>Регистрация</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;