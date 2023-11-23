import {createRouter as baseCreateRouter, createWebHistory} from 'vue-router'
import {Middlewares} from './middlewares'

export function createRouter(baseUrl, routes) {
    const router = baseCreateRouter({
        history: createWebHistory(baseUrl),
        scrollBehavior(to, from, savedPosition) {
            return savedPosition || to.hash
                ? new Promise(resolve => {
                    setTimeout(() => {
                        if (savedPosition) {
                            savedPosition.behavior = 'smooth'
                            return resolve(savedPosition)
                        }
                        return resolve({
                            el: to.hash,
                            behavior: 'smooth',
                        })
                    }, 500)
                })
                : {
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                }
        },
        routes,
    })

    const install = router.install

    router.install = function (vue) {
        install.call(router, vue)

        const $log = vue.config.globalProperties.$log
        const middlewares = new Middlewares(vue.config.globalProperties)

        this.beforeEach((to, from, next) => {
            $log.debug('router', 'beforeEach')
            middlewares.reset().collect(to).beforeEach(to, from, next)
        })
        this.beforeResolve((to, from, next) => {
            $log.debug('router', 'beforeResolve')
            middlewares.beforeResolve(to, from, next)
        })
        this.afterEach((to, from) => {
            $log.debug('router', 'afterEach')
            middlewares.afterEach(to, from)
        })
    }
    return router
}
