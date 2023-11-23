import {plugins} from '@/app/plugins'
import * as config from '@/config'
import App from '@/resources/views/App.vue'
import {routes} from '@/routes'
import {createApp} from '@/starter/app'
import {time} from '@/starter/helpers'

export const VUE_START = time()

export const app = createApp(VUE_START, config, plugins, App, '#app', routes)
