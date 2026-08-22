import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Home.module.css';
import {showToast} from "../utilits/toast.ts";

const Home = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (value: string) => {
        const re = /^[^\s]+@[^\s]+$/i;
        return re.test(value.trim());
    };

    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedEmail = email.trim();

        if (!validateEmail(trimmedEmail)) {
            showToast('Введите корректный email');
            return;
        }
        setEmailError('');
        setIsSubmitting(true);
        showToast('Подписка успешно оформлена!');
        setTimeout(() => {
            setEmail('');
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.hero}>
                <h1>Пицца</h1>
                <p>Лучше, чем у других!</p>
            </div>

            <div className={styles.features}>
                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>🍕</div>
                    <div className={styles.featureTitle}>Свежее, чем у других</div>
                    <div className={styles.featureText}>У них тесто вчерашнее, у нас — сегодняшнее</div>
                </div>
                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>⚡</div>
                    <div className={styles.featureTitle}>Быстрее их курьера</div>
                    <div className={styles.featureText}>Пока они едут — мы уже съели</div>
                </div>
                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>😋</div>
                    <div className={styles.featureTitle}>Другие и рядом не стоят</div>
                    <div className={styles.featureText}>Их шеф-повар уволился к нам</div>
                </div>
            </div>

            <div className={styles.cta}>
                <h2>Мы (не) говорим, что другие хуже...</h2>
                <p>Но когда попробуешь нашу — поймёшь, насколько</p>
                <button onClick={() => navigate('/menu')}>Сравнить и пожалеть о других</button>
            </div>

            <div className={styles.cta}>
                <h2>Оставайся в курсе</h2>
                <p>Подпишись на обновления и тогда точно будешь знать о новых вкусах быстрее остальных.</p>
                <form onSubmit={handleSubscribe}>
                    <input
                        className={styles.inputshort}
                        type="email"
                        placeholder="Ваш email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError('');
                        }}
                        required
                        disabled={isSubmitting}
                    />
                    {emailError && <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>{emailError}</div>}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка...' : 'Подписаться'}
                    </button>
                </form>
                <h4>Все материалы используются исключительно в учебных целях. Права на товарные знаки, изображения и прочие объекты интеллектуальной собственности принадлежат соответствующим правообладателям.</h4>
            </div>
        </div>
    );
};

export default Home;