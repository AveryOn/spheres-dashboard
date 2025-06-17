import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/nora';
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Tooltip from 'primevue/tooltip';

const app = createApp(App)
app.directive('tooltip', Tooltip);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app')
