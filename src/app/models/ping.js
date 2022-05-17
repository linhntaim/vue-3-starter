import {app} from '@/bootstrap/app'
import {PingService, ServiceError} from '@/app/support/services'

export const ping = {
    namespaced: true,
    state: () => ({
        available: false,
        expiredAt: 0,
    }),
    mutations: {
        setAvailable(state, available) {
            state.available = available
            state.expiredAt = new Date().getTime() + app.$config.get('app.ping.expired_in', 60 * 1000)

            app.$cache.set('ping', {
                available: state.available,
                expiredAt: state.expiredAt,
            })
        },
        async setFromCache(state) {
            const ping = await app.$cache.get('ping')
            app.$log.info('model', 'ping.setFromCache', ping)
            if (ping) {
                state.available = ping.available
                state.expiredAt = ping.expiredAt
            }
        },
        reset(state) {
            state.available = false
            state.expiredAt = 0
            app.$cache.remove('ping')
        },
    },
    actions: {
        async ping(context) {
            if (context.getters.expired) {
                context.commit(
                    'setAvailable',
                    !((await app.$service(PingService).ping()) instanceof ServiceError),
                )
            }
            return context.getters.available
        },
    },
    getters: {
        available: state => state.available,
        expired: state => new Date().getTime() > state.expiredAt,
    },
}