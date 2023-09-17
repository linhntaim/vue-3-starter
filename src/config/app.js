import {env} from './env'
import {str} from '@/app/support/helpers'

export const app = {
    id: env.VITE_ID || 'starter',
    name: env.VITE_NAME || 'Starter',
    url: window.location.origin + str.trim(env.BASE_URL, '/'),

    routes: {
        root: {
            name: 'root',
        },
    },
}
