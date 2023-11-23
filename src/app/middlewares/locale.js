import {Middleware} from '@/starter/router'

export class Locale extends Middleware
{
    async beforeEach(to, from, next) {
        this._app.$log.debug('middleware', 'locale.beforeEach')
        const locale = 'locale' in to.query
            ? to.query.locale
            : ('lang' in to.query ? to.query.lang : null)
        if (locale) {
            await this._app.$setLocale(locale)
        }
        next()
    }
}
