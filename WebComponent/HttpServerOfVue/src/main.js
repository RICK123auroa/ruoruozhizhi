import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.provide('message', document._initMsg)
app.mount('#app')

export default app