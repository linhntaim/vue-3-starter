import {getApp, registerPropertyFactory} from '../helpers'
import {UrlGenerator} from './url-generator'

export function createUrl() {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$url',
                () => new UrlGenerator(getApp(vApp)),
            )
        },
    }
}
