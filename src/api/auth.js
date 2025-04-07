import api from './axios';

/**
 * @typedef {Object} TelegramAuthRequest
 * @property {number} id - ID пользователя в Telegram
 * @property {string} firstName - Имя пользователя
 * @property {string} lastName - Фамилия пользователя
 * @property {string} username - Имя пользователя в Telegram
 * @property {number} authDate - Дата авторизации (timestamp)
 * @property {string} hash - Хеш для проверки подлинности
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token - JWT токен для аутентификации
 */

export const authApi = {
    /**
     * Аутентификация через Telegram
     * @param {TelegramAuthRequest} request - Данные для аутентификации
     * @returns {Promise<AuthResponse>}
     */
    authTelegram: (userData) => api.post('/users/auth/telegram', userData),

    // Сохранение токена
    setToken: (token) => {
        localStorage.setItem('token', token);
    },

    // Удаление токена
    removeToken: () => {
        localStorage.removeItem('token');
    },

    // Проверка наличия токена
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
}; 