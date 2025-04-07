import axios from 'axios';

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
        if (error.response?.status === 401) {
            // Очищаем токен и перенаправляем на страницу авторизации
            localStorage.removeItem('token');
            window.location.href = '/generator';
        }
        return Promise.reject(error);
    }
);

export default api; 