import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/login',
            name: 'login',
            meta:{requireAuth:false},
            component: () => import('@/views/login')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/register')
        },
        {
            path: '/search',
            name: 'search',
            meta:{requireAuth:false},
            component: () => import('@/views/search')
        },
        {
            path: '/article/:articleId',
            name: 'article',
            meta:{requireAuth:false},
            component: () => import('@/views/article'),
            props:true
        },
        {
            path: '/user/profile',
            name: 'userprofile',
            meta:{requireAuth:true},
            component: () => import('@/views/userprofile'),
            props:true
        },
        {
            path: '/userchat',
            name: 'userchat',
            meta:{requireAuth:false},
            component: () => import('@/views/userchat'),
            props:true
        },
        {
            path: '/',
            meta:{requireAuth:false},
            component: () => import('@/views/layout'),
            children: [{
                    path: '', //默认子路由
                    component: () => import('@/views/home')
                },
                {
                    path: '/video',
                    meta:{requireAuth:false},
                    component: () => import('@/views/video')
                },
                {
                    path: '/qa',
                    meta:{requireAuth:false},
                    component: () => import('@/views/qa')
                },
                {
                    path: '/my',
                    meta:{requireAuth:false},
                    component: () => import('@/views/my')
                }
            ]
        }
    ]
})

export default router;