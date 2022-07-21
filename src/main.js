import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)

// 统一注册el-icon图标
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}    

installElementPlus(app)

app.use(router)
.mount('#app')