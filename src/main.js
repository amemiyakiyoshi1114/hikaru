import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/reset.css";
import router from './router';


const app = createApp(App)

// // 全局注册el-icon
// for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(name, component);
// }
app.use(ElementPlus).use(router)
app.mount('#app')
