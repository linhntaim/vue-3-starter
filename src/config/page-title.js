import {_env} from './_env'
import {app} from './app'

export const pageTitle = {
    defaults: [app.name],
    separator: _env('VITE_PAGE_TITLE_SEPARATOR', '|'),
    asc: _env('VITE_PAGE_TITLE_DIRECTION', 'desc') === 'asc',
}
