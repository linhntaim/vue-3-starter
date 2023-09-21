import {Middleware} from '@/app/support/router'

export class Fresh extends Middleware
{
    async beforeEach(to, from, next) {
        const fresh = this.app.$start.isFresh()
        this.app.$start.continue()
        if (fresh) {
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
                locale: this.app.$config.localization.locale.default,
            }))
            .apply()
    }
}
