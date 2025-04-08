import axios from 'axios';
import authApi from '../store/modules/auth';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем интерсептор для автоматической вставки токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
    response => response.data,
    error => {
      console.log('error here', error);
        if (error.response?.status === 401) {
          console.log('error', 'try to auth');
          const userData = localStorage.getItem('user');
            if (userData) {
                try {
                    const user = JSON.parse(userData);
                    return authApi.authTelegram(user)
                        .then(response => {
                            localStorage.setItem('token', response.token);
                            // Повторяем оригинальный запрос с новым токеном
                            const config = error.config;
                            config.headers.Authorization = `Bearer ${response.token}`;
                            return api(config);
                        })
                        .catch(() => {
                            localStorage.removeItem('token');
                            return Promise.reject(error);
                        });
                } catch (e) {
                    localStorage.removeItem('token');
                    return Promise.reject(error);
                }
            }
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api; 