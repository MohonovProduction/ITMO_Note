import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

store.dispatch('loadNotes').then(() => {
    createApp(App)
        .use(store)
        .use(router)
        .mount('#app')
});
