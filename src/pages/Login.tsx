import { useState } from 'react';
import { useAuthStore } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm, LoginFormErrors } from '../utilits/validation';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [serverError, setServerError] = useState('');
    const { login, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateLoginForm({ email, password });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const success = await login(email, password);
        if (success) {
            navigate('/');
        } else {
            setServerError('Неверный email или пароль');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1 className="page-title">🔐 Входи, если устал от других</h1>

            <div className={styles.formCard}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: undefined });
                                setServerError('');
                            }}
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            placeholder="example@mail.ru"
                        />
                        {errors.email && <div className={styles.errorText}>{errors.email}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: undefined });
                                setServerError('');
                            }}
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            placeholder="••••••"
                        />
                        {errors.password && <div className={styles.errorText}>{errors.password}</div>}
                    </div>

                    {serverError && <div className={styles.serverError}>{serverError}</div>}

                    <button type="submit" disabled={isLoading} className={styles.submitBtn}>
                        {isLoading ? 'Вход...' : 'Войти'}
                    </button>
                </form>

                <div className={styles.registerLink}>
                    Нет аккаунта? <a href="/register">Зарегистрироваться</a>
                </div>
            </div>
        </div>
    );
};

export default Login;