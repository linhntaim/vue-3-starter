import {Drivers} from '../helpers'
import {StorageCache} from './storage-cache'

export class CacheManager extends Drivers
{
    constructor(app) {
        super(app, 'cache', 'storage')
    }

    storage(storageDriver) {
        return storageDriver
            ? this._app.$storageManager.driver(storageDriver)
            : this._app.$storage
    }

    createStorage() {
        const options = this._options('storage')
        return new StorageCache(this.storage(options.storage), options)
    }
}
