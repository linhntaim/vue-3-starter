import mitt from 'mitt'
import {registerPropertyFactory} from '../helpers'

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
