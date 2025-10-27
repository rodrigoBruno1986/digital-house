import { LoginFormData, RegisterFormData } from '@/schemas/auth';

export const authService = {
    login: async (data: LoginFormData) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error);
        }
        return result.user;
    },

    register: async (data: RegisterFormData) => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error);
        }
        return result.user;
    }
};
