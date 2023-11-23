import {mixins, providers} from '@/app/providers'
import {modify, time} from '@/app/support/helpers'
import {createStart} from '@/app/support/start'
import App from '@/resources/views/App.vue'
import {createApp} from 'vue'

export const vueStart = time()

export const app = modify(createApp(App), vApp => {
    // register mixins
    mixins.forEach(mixin => vApp.mixin(mixin))
    // register start plugin
    vApp.use(createStart(vueStart))
    // register plugins
    Object.keys(providers).forEach(key => vApp.use(providers[key]))

    return modify(vApp.mount('#app'), app => {
        // when built, `_instance` is always null (?) => must trick to proxy the app
        if (vApp._instance == null) {
            vApp._instance = app.$
        }
        return app.$.proxy
    })
})
