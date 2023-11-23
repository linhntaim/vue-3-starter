import {Middleware} from '@/starter/router'

export class Fresh extends Middleware
{
    async beforeEach(to, from, next) {
        this._app.$log.debug('middleware', 'fresh.beforeEach')
        if (this._app.$start.isFresh()) {
            await this.restoreFromCache()
            await this.restoreFromCookie()
        }
        else {
            this._app.$timer.offAll()
        }
        next()
    }

    async restoreFromCache() {
        this._app.$log.debug('middleware', 'fresh.restoreFromCache')
        //
    }

    async restoreFromCookie() {
        this._app.$log.debug('middleware', 'fresh.restoreFromCookie')
        // settings
        await this._app.$settings
            .set(await this._app.$cookie.get('settings', {
                darkMode: this._app.$config.settings.darkMode.default,
                locale: this._app.$config.settings.locale.default,
            }))
            .apply()
        //
    }

    afterEach(to, from, next) {
        this._app.$log.debug('middleware', 'fresh.afterEach')
        this._app.$start.continue()
        next()
    }
}
