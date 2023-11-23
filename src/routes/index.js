import {middlewares} from '@/app/middlewares'
import Base from '@/resources/views/master/Base.vue'
import BaseBlank from '@/resources/views/master/BaseBlank.vue'
import {loadNotFoundView, makeFallbackRoute} from './helpers'

export const routes = [
    {
        path: '/',
        component: Base,
        meta: {
            middleware: middlewares,
        },
        children: [
            {
                path: 'clear-site-data',
                name: 'clear_site_data',
                component: () => import('@/resources/views/pages/ClearSiteData.vue'),
            },
            {
                path: 'error',
                component: BaseBlank,
                children: [
                    {
                        path: '404',
                        name: 'not_found',
                        component: loadNotFoundView,
                    },
                    //
                    ...makeFallbackRoute(true),
                ],
            },
            {
                path: '/',
                name: 'root',
                component: () => import('@/resources/views/pages/Home.vue'),
            },
            //
            {
                path: 'about',
                name: 'about',
                component: () => import('@/resources/views/pages/About.vue'),
            },
            //
            makeFallbackRoute(false),
        ],
    },
]
