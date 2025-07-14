import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 定义路由
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/index.vue'),
        meta: { title: '首页' },
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/Home/home.vue'),
                meta: { title: '聊天' }
            },
            {
                path: '/chat',
                name: 'Chat',
                component: () => import('@/views/Chat/chat.vue'),
                meta: { title: '聊天' }
            },
            {
                path: '/docs',
                name: 'docs',
                component: () => import('@/views/Docs/docs.vue'),
                meta: { title: '文件' }
            }
        ]
    },
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 路由切换时滚动行为
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 这里可以添加权限验证逻辑
    // const token = localStorage.getItem('token')
    // if (!token && to.name !== 'Login') {
    //   next({ name: 'Login' })
    // } else {
    //   next()
    // }

    next()
})

// 全局后置钩子
router.afterEach((to, from) => {
    // 路由切换完成后的逻辑

})

export default router