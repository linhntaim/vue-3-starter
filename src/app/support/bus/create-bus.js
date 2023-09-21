import {registerPropertyFactory} from '../helpers'
import mitt from 'mitt'

export function createBus() {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$bus',
                () => mitt(),
            )
        },
    }
}
