import { useState } from 'react';

interface FileUploadProps {
    onFileSelected: (file: File, previewUrl: string) => void;
    currentImage?: string;
}

const FileUpload = ({ onFileSelected, currentImage }: FileUploadProps) => {
    const [preview, setPreview] = useState<string>(currentImage || '');
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError('Можно загружать только JPEG, PNG, JPG или WEBP');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('Размер файла не должен превышать 2MB');
            return;
        }

        setError('');
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        onFileSelected(file, previewUrl);
    };

    return (
        <div>
            <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleFileChange}
                style={{ marginBottom: '0.5rem' }}
            />
            {error && <p style={{ color: 'red', fontSize: '0.875rem', margin: '0.25rem 0' }}>{error}</p>}
            {preview && (
                <div>
                    <img src={preview} alt="Предпросмотр" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
            )}
        </div>
    );
};

export default FileUpload;