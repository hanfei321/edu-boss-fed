import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore, setupTable } from '@/store/index'
import dayjs from 'dayjs'
// setupStore()
// setupTable()
createApp(App).use(store).use(router).mount('#app')
