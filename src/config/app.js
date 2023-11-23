import {str} from '@/app/support/helpers'
import {_env} from './_env'

export const app = {
    id: _env.VITE_ID || 'starter',
    name: _env.VITE_NAME || 'Starter',
    baseUrl: _env.BASE_URL,
    url: window.location.origin + str.trim(_env.BASE_URL, '/'),

    routes: {
        root: {
            name: 'root',
        },
    },
}
