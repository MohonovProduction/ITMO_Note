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

const initApp = async () => {
    try {
        console.log(process.env.VUE_APP_API_BASE_URL);

        // Загрузка начальных данных
        await store.dispatch('notes/fetchAllNotes')

        const app = createApp(App)

        // Глобальные свойства
        app.config.globalProperties.$marked = marked

        // Подключение плагинов
        app.use(store)
        app.use(router)

        app.mount('#app')
    } catch (error) {
        console.error('Application initialization failed:', error)
        // Показать fallback UI
    }
}

initApp()