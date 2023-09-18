import {registerPropertyFactory} from '../helpers'
import {Timer} from './timer'

export function createTimer() {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$timer',
                () => new Timer(),
            )
        },
    }
}
