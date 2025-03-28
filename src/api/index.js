// api/index.js
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://your-api-url.com',
    timeout: 5000
})

// Добавьте интерсепторы при необходимости
api.interceptors.request.use(config => {
    // Можно добавить токен авторизации
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
}, error => {
    return Promise.reject(error)
})

api.interceptors.response.use(response => {
    return response
}, error => {
    // Обработка ошибок
    return Promise.reject(error)
})

export default api