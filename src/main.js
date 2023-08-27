import './components/core-style/style.js'
import './components/core-style/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

app.use(createPinia())
app.use(VueSweetalert2)
app.use(store)
app.use(router)
app.mount('#app')
