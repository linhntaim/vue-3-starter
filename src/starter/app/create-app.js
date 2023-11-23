import {createHead} from '@unhead/vue'
import {createApp as createVue, getCurrentInstance} from 'vue'
import {createCache} from '../cache'
import {createConfig} from '../config'
import {createEncryption} from '../encryption'
import {createEvent} from '../event'
import {createLog} from '../log'
import {createPageTitle} from '../page-title'
import {createPageVisibility} from '../page-visibility'
import {createRouter} from '../router'
import {createSettings} from '../settings'
import {createStart} from '../start'
import {createStorage} from '../storage'
import {createStore} from '../store'
import {createTimer} from '../timer'
import {createUrl} from '../url'

export function createApp(vueStart, config, plugins, rootComponent, rootContainer, routes) {
    const vue = createVue(rootComponent)

    vue.use(createStart(vueStart))
    vue.use(createConfig(config))
    vue.use(createEvent())
    vue.use(createLog())
    vue.use(createEncryption())
    vue.use(createStorage())
    vue.use(createCache())
    vue.use(createTimer())
    vue.use(
        createSettings(
            (handler => typeof handler === 'function' ? handler() : handler)(vue.config.globalProperties.$getConfig('settings.locale.handler')),
        ),
    )
    vue.use(createStore())
    vue.use(createRouter(vue.config.globalProperties.$getConfig('app.baseUrl', '/'), routes))
    vue.use(createUrl())
    vue.use(createPageVisibility())
    vue.use(createPageTitle(vue.config.globalProperties.$getConfig('pageTitle', {})))
    vue.use(createHead())

    Object.values(plugins).forEach(plugin => vue.use(plugin))

    return vue.mount(rootContainer).$.proxy
}

export function useApp() {
    return getCurrentInstance().proxy
}
