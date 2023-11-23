import {Drivers} from '../helpers'
import {CookieStorage} from './cookie-storage'
import {LocalStorage} from './local-storage'

export class StorageManager extends Drivers
{
    constructor(app) {
        super(app, 'storage', 'local')
    }

    encryptor(encryptionDriver) {
        return encryptionDriver
            ? this._app.$encryption.driver(encryptionDriver)
            : this._app.$encryptor
    }

    createLocal() {
        const options = this._options('local')
        return new LocalStorage(this.encryptor(options.encryptor), options)
    }

    createCookie() {
        const options = this._options('cookie')
        return new CookieStorage(this.encryptor(options.encryptor), options)
    }
}
