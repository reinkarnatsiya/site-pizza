export const validateEmail = (email: string): string | null => {
    if (!email) {
        return 'Email обязателен';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Введите корректный email (пример: name@domain.com)';
    }
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) {
        return 'Пароль обязателен';
    }
    if (password.length < 4) {
        return 'Пароль должен содержать минимум 4 символа';
    }
    return null;
};

export const validateName = (name: string): string | null => {
    if (!name) {
        return 'Имя обязательно';
    }
    if (name.length < 2) {
        return 'Имя должно содержать минимум 2 символа';
    }
    if (name.length > 50) {
        return 'Имя не должно превышать 50 символов';
    }
    return null;
};

export const validateConfirmPassword = (): null => {
    return null;
};

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterFormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export const validateRegisterForm = (data: RegisterFormData): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    const nameError = validateName(data.name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(data.password);
    if (passwordError) errors.password = passwordError;

    const confirmError = validateConfirmPassword();
    if (confirmError) errors.confirmPassword = confirmError;

    return errors;
};

export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
}

export const validateLoginForm = (data: LoginFormData): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    const emailError = validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(data.password);
    if (passwordError) errors.password = passwordError;

    return errors;
};