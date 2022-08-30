/*
 * @Author: ZuoXichen
 * @Date: 2022-08-17 16:42:47
 * @LastEditTime: 2022-08-18 18:08:55
 * @LastEditors: ZuoXichen
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'vfonts/Lato.css'
import router from './router'
// 等宽字体
import 'vfonts/FiraCode.css'


createApp(App).use(router).mount('#app');

