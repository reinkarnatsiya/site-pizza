export const saveFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const extension = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
            const filePath = `/uploads/${fileName}`;

            const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
            savedFiles[filePath] = reader.result;
            localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));

            resolve(filePath);
        };

        reader.onerror = () => {
            reject(new Error('Ошибка при чтении файла'));
        };

        reader.readAsDataURL(file);
    });
};

export const getFileContent = (path: string): string | null => {
    const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
    return savedFiles[path] || null;
};