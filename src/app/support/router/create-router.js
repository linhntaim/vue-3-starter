import {createRouter as baseCreateRouter, createWebHistory} from 'vue-router'
import {getApp, take} from '../helpers'
import {Middlewares} from './middlewares'

export function createRouter(env, options = {}) {
    return take(
        baseCreateRouter(
            Object.assign(
                {
                    history: createWebHistory(env.BASE_URL),
                },
                options || {},
            ),
        ),
        router => {
            const install = router.install
            router.install = function (vApp) {
                install.call(this, vApp)

                let middlewares = null
                let app = null

                this.beforeEach(
                    (to, from, next) => {
                        if (!app) {
                            app = getApp(vApp)
                        }
                        if (!middlewares) {
                            middlewares = new Middlewares(app)
                        }
                        app.$log.debug('router', 'beforeEach')
                        middlewares.collect(to).beforeEach(to, from, next)
                    },
                )
                this.beforeResolve(
                    (to, from, next) => {
                        app.$log.debug('router', 'beforeResolve')
                        middlewares.beforeResolve(to, from, next)
                    },
                )
                this.afterEach(
                    (to, from) => {
                        app.$log.debug('router', 'afterEach')
                        middlewares.afterEach(to, from)
                    },
                )
            }
        },
    )
}
