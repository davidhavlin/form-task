import { createApp } from 'vue'
import App from './App.vue'
import Popper from 'vue3-popper'

const app = createApp(App)

app.use(Popper)

app.mount('#app')
