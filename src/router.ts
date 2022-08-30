/*
 * @Author: ZuoXichen
 * @Date: 2022-08-17 21:58:37
 * @LastEditTime: 2022-08-29 12:55:11
 * @LastEditors: ZuoXichen
 * @Description:
 */
import Index from "./components/Index.vue";
import Post from "./components/Post.vue";
import TimeLine from "./components/Timeline.vue";
import About from "./components/About.vue";
import Result404 from "./components/Result/404.vue";
import Category from './components/Category.vue'

import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "index", component: Index },
  { path: "/archive/:cid", name: "post", component: Post },
  { path: "/timeline", name: "timeline", component: TimeLine },
  { path: "/about", name: "about", component: About },
  { path: "/404", name: "404", component: Result404 },
  {path:"/category/:name", name:"category", component: Category}
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
