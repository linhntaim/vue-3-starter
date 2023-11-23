import {str} from '@/starter/helpers'
import {_env} from './_env'

export const app = {
    env: _env.MODE, // 'production' | 'development'

    id: _env('VITE_ID', 'starter'),
    name: _env('VITE_NAME', 'Starter'),
    baseUrl: _env('BASE_URL'),
    url: window.location.origin + str.trim(_env('BASE_URL'), '/'),

    routes: {
        root: {
            name: 'root',
        },
        notFound: {
            name: 'not_found',
        },
    },
}
