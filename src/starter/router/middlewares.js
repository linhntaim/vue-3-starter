import {Maker} from '../helpers/maker'

export class Middlewares extends Maker
{
    reset() {
        this._middlewares = []
        this._middlewareInstances = new Map()
        return this
    }

    collect(to) {
        to.matched.forEach(route => {
            if ('middleware' in route.meta) {
                this._middlewares.push(...route.meta.middleware)
            }
        })
        return this
    }

    _captureMiddlewares() {
        return [...this._middlewares]
    }

    _resolveMiddleware(middleware) {
        if (!this._middlewareInstances.has(middleware)) {
            this._middlewareInstances.set(middleware, new middleware(this._app))
        }
        return this._middlewareInstances.get(middleware)
    }

    before(method, to, from, next) {
        const middlewares = this._captureMiddlewares()
        const handle = (location = null) => {
            if (location === null) {
                let middleware = middlewares.shift()
                if (middleware) {
                    middleware = this._resolveMiddleware(middleware)
                    if (method in middleware) {
                        middleware[method](to, from, handle)
                        return
                    }
                    handle()
                    return
                }
                next()
                return
            }
            next(location)
        }
        handle()
    }

    beforeEach(to, from, next) {
        this.before('beforeEach', to, from, next)
    }

    beforeResolve(to, from, next) {
        this.before('beforeResolve', to, from, next)
    }

    after(method, to, from) {
        const middlewares = this._captureMiddlewares()
        const handle = () => {
            let middleware = middlewares.pop()
            if (middleware) {
                middleware = this._resolveMiddleware(middleware)
                if (method in middleware) {
                    middleware[method](to, from, handle)
                    return
                }
                handle()
            }
        }
        handle()
    }

    afterEach(to, from) {
        this.after('afterEach', to, from)
    }
}
