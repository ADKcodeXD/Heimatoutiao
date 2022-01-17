import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/login',
            name: 'login',
            component: () => import('@/views/login')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/register')
        },
        {
            path: '/',
            component: () => import('@/views/layout'),
            children: [{
                    path: '', //默认子路由
                    component: () => import('@/views/home')
                },
                {
                    path: '/video',
                    component: () => import('@/views/video')
                },
                {
                    path: '/qa',
                    component: () => import('@/views/qa')
                },
                {
                    path: '/my',
                    component: () => import('@/views/my')
                }
            ]
        }
    ]
})
export default router;