<template>
  <div>
    index
    <button @click="handleParams">params</button>
    <button @click="handleQuery">query</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
/**
 * Hash 模式:URL 中会包含 # 符号，例如：http://example.com/#/routerPage
 *      利用 URL 中的 hash 部分来模拟完整的 URL，当 hash 改变时，页面不会重新加载
 *      兼容性好，支持所有浏览器, 不需要服务器配置支持
 * History 模式: 使用 HTML5 History API（pushState、replaceState）来实现 URL 管理
 *      需要服务器配置支持，以避免在直接访问路由时出现 404 错误
 *      在用户刷新页面时，服务器需要正确处理所有路由路径，通常需要配置回退到 index.html
 */
/**
 * router（路由器）定义：router 是路由管理器的实例，负责管理整个应用的路由配置和导航逻辑
 * route（路由信息）定义：route 代表当前激活的路由状态，包含当前路由的所有信息
 */
/**
//  * 配置占位符参数会带在url上，页面刷新不丢失
    不配置的话，刷新会丢失 vue-router@4 不支持了
 * {
    path: "/routerPage/routerPage1:name",
    name: "page1",
    component: () => import("@/views/routerPage/page1.vue"),
  },
 */
const handleParams = () => {
  router.push({
    name: "page1",
    params: {
      name: "张三",
    },
  });
};
const handleQuery = () => {
  router.push({
    path: "/routerPage/routerPage2",
    // name: "page2",
    query: {
      name: "张三",
    },
  });
};
</script>

<style></style>
<!-- page1.vue -->
<template>
    <div>
      page1
       <p>姓名: {{ name }}</p>
    </div>
</template>
  
<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
console.log(route.params)
const name = ref(route.params.name)
</script>
  
<style>
  
</style>
<!-- page2.vue -->
 <template>
  <div>
    page2
    <p>姓名: {{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
console.log(route.query);
const name = ref(route.query.name);
</script>

<style></style>

Vue Router 提供了多种路由守卫来控制路由的导航过程。以下是路由守卫的分类和执行顺序：

## 路由守卫分类

### 1. 全局守卫

- `beforeEach`: 全局前置守卫，在路由切换前调用
- `beforeResolve`: 全局解析守卫，在路由解析完成之后调用
- `afterEach`: 全局后置守卫，在路由切换完成后调用

### 2. 路由独享守卫

- `beforeEnter`: 在路由配置中定义的守卫

### 3. 组件内守卫

- `beforeRouteEnter`: 进入组件前调用
- `beforeRouteUpdate`: 当前路由改变但组件被复用时调用
- `beforeRouteLeave`: 离开组件前调用

## 路由守卫执行顺序

从当前页跳转到其他页时，路由守卫的执行顺序如下：

1. **导航触发**
2. **调用失活组件的** `beforeRouteLeave` **守卫**
3. **调用全局** `beforeEach` **守卫**
4. **调用路由独享的** `beforeEnter` **守卫**
5. **解析异步路由组件**
6. **调用激活组件的** `beforeRouteEnter` **守卫**
7. **调用全局** `beforeResolve` **守卫**
8. **导航被确认**
9. **调用全局** `afterEach` **守卫**
10. **触发 DOM 更新**
11. **调用** `beforeRouteEnter` **守卫中传给 next 的回调函数**（此时组件实例已创建）

这个执行顺序确保了在路由切换过程中可以进行权限验证、数据预加载、页面清理等各种操作。
