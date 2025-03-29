import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: process.env.VUE_APP_API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor
api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized
        }
        return Promise.reject(error)
    }
)

export default api