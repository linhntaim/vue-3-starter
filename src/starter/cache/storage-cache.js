import {Cache} from './cache'

export class StorageCache extends Cache
{
    constructor(storage, options = {}) {
        super(options)

        this._storage = storage
    }

    async set(key, data, expiresIn = null) {
        const options = {}
        if (expiresIn) {
            options.expired = new Date().getTime() + expiresIn
        }
        await this._storage.put(key, data, options)
        return this
    }

    async get(key, def = null) {
        return await this._storage.get(key, def)
    }

    remove(key) {
        this._storage.remove(key)
        return this
    }
}
