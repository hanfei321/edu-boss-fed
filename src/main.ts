import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from '@/store/index'

setupStore()
createApp(App).use(store).use(router).mount('#app')
