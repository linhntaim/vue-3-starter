import {createRouter as baseCreateRouter, createWebHistory} from 'vue-router'
import {getApp, take} from '../helpers'
import {Middlewares} from './middlewares'

export function createRouter(baseUrl, options = {}) {
    return take(
        baseCreateRouter(
            Object.assign(
                {
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
                },
                options || {},
            ),
        ),
        router => {
            const install = router.install
            router.install = function (vApp) {
                install.call(this, vApp)

                let app = null
                let middlewares = null

                this.beforeEach((to, from, next) => {
                    if (!app) {
                        app = getApp(vApp)
                    }
                    if (!middlewares) {
                        middlewares = new Middlewares(app)
                    }
                    app.$log.debug('router', 'beforeEach')
                    middlewares.collect(to).beforeEach(to, from, next)
                })
                this.beforeResolve((to, from, next) => {
                    app.$log.debug('router', 'beforeResolve')
                    middlewares.beforeResolve(to, from, next)
                })
                this.afterEach((to, from) => {
                    app.$log.debug('router', 'afterEach')
                    middlewares.afterEach(to, from)
                })
            }
        },
    )
}
