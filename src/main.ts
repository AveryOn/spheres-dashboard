import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/nora';
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Tooltip from 'primevue/tooltip';
import { router } from './router';
import './styles/index.css'
import { ru } from './locales/ru';
import { createPinia } from 'pinia'


const app = createApp(App)
const pinia = createPinia()
app.directive('tooltip', Tooltip);
app
    .use(pinia)
    .use(router)
    .use(PrimeVue, {
        locale: ru,
        theme: {
            preset: Aura,
        }
    })
    .mount('#app')
