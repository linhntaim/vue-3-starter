import {dataGet} from '../helpers'

export function createConfig(config) {
    return {
        install(vue) {
            vue.config.globalProperties.$config = config
            vue.config.globalProperties.$getConfig = (key, def = null) => dataGet(config, key, def)
        },
    }
}
