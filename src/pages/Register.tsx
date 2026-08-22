import { useState } from 'react';
import { useAuthStore } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm, RegisterFormErrors } from '../utilits/validation';
import styles from './Register.module.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const { register, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateRegisterForm({ name, email, password, confirmPassword });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const success = await register(name, email, password);
        if (success) {
            navigate('/');
        } else {
            setErrors({ email: 'Пользователь с таким email уже существует' });
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h1 className="page-title">📝 Стань частью семьи (без очередей)</h1>

            <div className={styles.formCard}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Имя</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrors({ ...errors, name: undefined });
                            }}
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                            placeholder="Ваше имя"
                        />
                        {errors.name && <div className={styles.errorText}>{errors.name}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: undefined });
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
                            }}
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            placeholder="минимум 4 символа"
                        />
                        {errors.password && <div className={styles.errorText}>{errors.password}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Подтвердите пароль</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrors({ ...errors, confirmPassword: undefined });
                            }}
                            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                            placeholder="повторите пароль"
                        />
                        {errors.confirmPassword && <div className={styles.errorText}>{errors.confirmPassword}</div>}
                    </div>

                    <button type="submit" disabled={isLoading} className={styles.submitBtn}>
                        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                </form>

                <div className={styles.loginLink}>
                    Уже есть аккаунт? <a href="/login">Войти</a>
                </div>
            </div>
        </div>
    );
};

export default Register;