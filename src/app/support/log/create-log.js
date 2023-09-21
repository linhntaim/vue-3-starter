import {getApp, registerPropertyFactory} from '../helpers'
import {LogManager} from './log-manager'

export function createLog(extend = {}) {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$logManager',
                () => new LogManager(getApp(vApp)).extend(extend),
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$log',
                globalProps => globalProps.$logManager.driver(),
            )
        },
    }
}
