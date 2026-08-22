// @ts-ignore
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/Auth';
import { usePizzeriaStore } from '../store/Pizza';
import FileUpload from '../components/FileUpload';
import { saveFile } from '../utilits/fileUpload';

const AddPizza = () => {
    const { user, isAuthenticated } = useAuthStore();
    const { loadMenu } = usePizzeriaStore();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState('');

    if (!isAuthenticated) {
        return <h1>⛔ Пожалуйста, войдите в систему</h1>;
    }

    if (user?.role !== 'admin') {
        return <h1>⛔ Доступ запрещён. Только для администраторов.</h1>;
    }

    const handleFileSelected = (file: File, _previewUrl: string) => {
        setSelectedFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !price || !ingredients) {
            setError('Заполните все поля');
            return;
        }

        const priceNum = parseInt(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            setError('Цена должна быть положительным числом');
            return;
        }

        try {
            let imageUrl = '/default.png';

            if (selectedFile) {
                imageUrl = await saveFile(selectedFile);
            }

            const ingredientsList = ingredients.split(',').map(i => i.trim());

            const response = await fetch('/pizzas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: Date.now().toString(),
                    name,
                    price: priceNum,
                    ingredients: ingredientsList,
                    imageUrl
                })
            });

            if (response.ok) {
                await loadMenu();
                navigate('/menu');
            } else {
                setError('Ошибка при добавлении пиццы');
            }
        } catch {
            setError('Ошибка при загрузке файла');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h1>🍕 Новая легенда (копировать у Додо не будем)</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label>Название пиццы *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        required
                    />
                </div>

                <div>
                    <label>Цена (₽) *</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        required
                    />
                </div>

                <div>
                    <label>Ингредиенты (через запятую) *</label>
                    <input
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="сыр, томаты, базилик"
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        required
                    />
                </div>

                <div>
                    <label>Фото пиццы</label>
                    <FileUpload onFileSelected={handleFileSelected} />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" style={{ padding: '0.75rem', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Добавить пиццу
                </button>
            </form>
        </div>
    );
};

export default AddPizza;