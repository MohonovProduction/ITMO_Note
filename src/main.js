import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { marked } from 'marked'

// Функция для проверки JSON ответа
const checkJsonResponse = async (response) => {
    const text = await response.text()
    try {
        return JSON.parse(text)
    } catch (e) {
        console.error('Invalid JSON response:', text)
        throw new Error('Сервер вернул некорректный ответ. Пожалуйста, попробуйте позже.')
    }
}

// Настройка глобальной обработки ошибок
const setupGlobalErrorHandling = (app) => {
    app.config.errorHandler = (err, vm, info) => {
        console.error('Global Vue error:', err, info)
        // Можно добавить отправку ошибок в систему мониторинга
    }

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason)
        event.preventDefault()
    })
}

// Инициализация приложения
const initApp = async () => {
    try {
        // 1. Настройка marked
        marked.setOptions({
            sanitize: true,
            breaks: true,
            gfm: true
        })

        // 2. Проверка API перед загрузкой приложения
        try {
            const testResponse = await fetch('/api/GetNotes')
            if (!testResponse.ok) throw new Error(`API недоступен: ${testResponse.status}`)
            await checkJsonResponse(testResponse)
        } catch (apiError) {
            throw new Error(`Проблема с подключением к API: ${apiError.message}`)
        }

        // 3. Загрузка начальных данных
        await store.dispatch('fetchNotes')

        // 4. Создание и настройка приложения
        const app = createApp(App)

        setupGlobalErrorHandling(app)

        app.config.globalProperties.$marked = marked
        app.config.globalProperties.$api = {
            async safeFetch(url, options) {
                const response = await fetch(url, options)
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
                return checkJsonResponse(response)
            }
        }

        // 5. Подключение плагинов
        app.use(store)
        app.use(router)

        // 6. Монтирование
        app.mount('#app')

    } catch (error) {
        console.error('Initialization failed:', error)
        showErrorPage(error)
    }
}

// Показать страницу ошибки
const showErrorPage = (error) => {
    const appElement = document.getElementById('app') || document.createElement('div')
    appElement.id = 'app'
    appElement.innerHTML = `
    <div class="error-container">
      <h1>Ошибка при загрузке приложения</h1>
      <p>${error.message}</p>
      <p>Попробуйте:</p>
      <ul>
        <li>Обновить страницу</li>
        <li>Проверить интернет-соединение</li>
        <li>Вернуться позже</li>
      </ul>
      <button onclick="window.location.reload()">Обновить</button>
    </div>
  `
    document.body.appendChild(appElement)
}

// Запуск приложения
initApp()