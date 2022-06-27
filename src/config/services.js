import {trim} from 'locutus/php/strings'
import {env} from './env'

export const services = {
    request: {
        default: 'starter',
        drivers: {
            starter: {
                baseURL: (() => {
                    let serviceUrl = env.VUE_APP_STARTER_SERVICE_URL || (window.location.origin + '/api')
                    if (/^https?:\/\//.test(serviceUrl)) {
                        return serviceUrl
                    }
                    serviceUrl = trim(serviceUrl, '/')
                    return window.location.origin + (serviceUrl ? '/' + serviceUrl : '')
                })(),
                headers: (() => {
                    const headers = {}
                    headers['X-Client'] = env.VUE_APP_STARTER_SERVICE_CLIENT || 'default'
                    return headers
                })(),
            },
        },
    },
}
