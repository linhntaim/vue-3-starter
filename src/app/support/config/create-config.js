import {registerPropertyFactory} from '../helpers'
import {Config} from './config'

export function createConfig(configs) {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$config',
                () => new Config(configs),
            )
        },
    }
}
