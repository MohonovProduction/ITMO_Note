import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { marked } from 'marked'

// Инициализация marked
marked.setOptions({
    sanitize: true,
    breaks: true,
    gfm: true
})

// Инициализация приложения
async function initApp() {
    try {
        // Загружаем публичные заметки при старте
        await store.dispatch('notes/fetchPublicNotes')

        const app = createApp(App)

        // Глобальные свойства
        app.config.globalProperties.$marked = marked

        // Подключение плагинов
        app.use(store)
        app.use(router)

        app.mount('#app')
        console.log('App initialized successfully')
        console.log('API Base URL:', process.env.VUE_APP_API_BASE_URL)
    } catch (error) {
        console.error('Error initializing app:', error)
    }
}

initApp()