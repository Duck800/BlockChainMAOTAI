import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'  // 重定向
        },
        {
            path: '/home',
            name: 'home',  // 首页
            component: () => import('@/views/home.vue'),
        },
        {
            path: '/producer',
            name: 'producer',  // 生产商界面
            component: () => import('@/views/Producer.vue'),
        },
        {
            path: '/carrier',
            name: 'carrier',  // 运输商界面
            component: () => import('@/views/Carrier.vue'),
        },
        {
            path: '/consumer',
            name: 'consumer',  // 运输商界面
            component: () => import('@/views/Consumer.vue'),
        },
    ]
})

export default router