import {Middleware} from '@/app/support/router'

export class Fresh extends Middleware
{
    async beforeEach(to, from, next) {
        this.app.$log.debug('middleware', 'fresh.beforeEach')
        if (this.app.$start.isFresh()) {
            await this.restoreFromCache()
            await this.restoreFromCookie()
        }
        else {
            this.app.$timer.offAll()
        }
        next()
    }

    async restoreFromCache() {
        this.app.$log.debug('middleware', 'fresh.restoreFromCache')
        //
    }

    async restoreFromCookie() {
        this.app.$log.debug('middleware', 'fresh.restoreFromCookie')
        // settings
        await this.app.$settings
            .set(await this.app.$cookie.get('settings', {
                darkMode: this.app.$config.settings.darkMode,
                locale: this.app.$config.settings.locale.default,
            }))
            .apply()
        //
    }

    afterEach(to, from, next) {
        this.app.$log.debug('middleware', 'fresh.afterEach')
        this.app.$start.continue()
        next()
    }
}
