import {createApp} from 'vue'
import {createStart} from '@/app/support/start'
import {mixins, providers} from '@/app/providers'
import {modify, take, time} from '@/app/support/helpers'
import App from '@/resources/views/App'

export const vueStart = time()

export const app = modify(createApp(App), vApp => {
    // register mixins
    mixins.forEach(mixin => vApp.mixin(mixin))
    // register start plugin
    vApp.use(createStart(vueStart))
    // register plugins
    Object.keys(providers).forEach(key => vApp.use(providers[key]))

    return take(vApp.mount('#app'), app => {
        // when built, `_instance` is always null (?) => must trick to proxy the app
        if (vApp._instance == null) {
            vApp._instance = {
                proxy: app,
            }
        }
    })
})
