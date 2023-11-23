import {createRouter} from '@/app/support/router'
import {app as config} from '@/config'
import {routes} from '@/routes'

export const router = createRouter(config.baseUrl, {
    routes,
})
