import {bus} from './bus'
import {cache} from './cache'
import {config} from './config'
import {encryption} from './encryption'
import {factory} from './factory'
import {head, headMixin} from './head'
import {log} from './log'
import {pageVisibility} from './page-visibility'
import {router} from './router'
import {service} from './service'
import {i18n, settings} from './settings'
import {storage} from './storage'
import {store} from './store'
import {timer} from './timer'
import {url} from './url'

export const mixins = [
    headMixin,
]

// Should be maintained in order
export const providers = {
    factory,
    config,
    log,
    service,
    encryption,
    storage,
    cache,
    i18n,
    settings,
    store,
    router,
    url,
    bus,
    pageVisibility,
    timer,
    head,
}
