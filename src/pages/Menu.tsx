import { useEffect, useState } from 'react';
import { usePizzeriaStore } from '../store/Pizza';
import styles from './Menu.module.css';

const Menu = () => {
    const { menu, loadMenu, addToCart } = usePizzeriaStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);


    useEffect(() => {
        loadMenu();
    }, [loadMenu]);

    const filteredAndSorted = menu
        .filter(pizza => {
            const matchesSearch = pizza.name.includes(searchTerm);
            const wholePrice = Math.floor(pizza.price);
            let matchesPrice = true;
            switch (priceRange) {
                case 'all':
                    break;
                case '0-399':
                    matchesPrice = wholePrice <= 399;
                    break;
                case '400-599':
                    matchesPrice = wholePrice >= 300 && wholePrice <= 599;
                    break;
                case '600+':
                    matchesPrice = wholePrice >= 600;
                    break;
                default:
                    break;
            }
            return matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.price - b.price;
            if (sortOrder === 'desc') return b.price - a.price;
            return 0;
        });

    return (
        <div>
            <h1 className="page-title">🍕 То, чего нет у других</h1>

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Поиск пиццы..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className={styles.priceSelect}
                >
                    <option value="all">Все цены</option>
                    <option value="0-399">до 399</option>
                    <option value="400-599">400 – 599</option>
                    <option value="600+">от 600</option>
                </select>
                <div className={styles.filterButtons}>
                    <button
                        className={`${styles.filterButton} ${sortOrder === 'asc' ? styles.activeFilter : ''}`}
                        onClick={() => setSortOrder(sortOrder === 'asc' ? null : 'asc')}
                    >
                        ⬆ По убыванию цены
                    </button>
                    <button
                        className={`${styles.filterButton} ${sortOrder === 'desc' ? styles.activeFilter : ''}`}
                        onClick={() => setSortOrder(sortOrder === 'asc' ? null : 'asc')}
                    >
                        ⬇ По возрастанию цены
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                {filteredAndSorted.map((pizza) => (
                    <div key={pizza.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            {pizza.imageUrl && pizza.imageUrl !== 'default.png' ? (
                                <img
                                    src={pizza.imageUrl}
                                    alt={pizza.name}
                                    className={styles.image}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).nextElementSibling?.classList.add(styles.show);
                                    }}
                                />
                            ) : null}
                            <div
                                className={styles.noImage}
                                style={{
                                    display:
                                        pizza.imageUrl && pizza.imageUrl !== '/default.png'
                                            ? 'none'
                                            : 'flex'
                                }}
                            >
                                🍕
                                <span>нет фото</span>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{pizza.name}</h3>
                            <p className={styles.ingredients}>{pizza.ingredients.join(', ')}</p>
                            <div className={styles.priceSection}>
                                <span className={styles.price}>{pizza.price} ₽</span>
                                <button
                                    onClick={() => addToCart(pizza)}
                                    className={styles.addButton}
                                >
                                    🛒 В корзину
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;