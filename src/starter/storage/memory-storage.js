import {Storage} from './storage'

export class MemoryStorage extends Storage
{
    constructor(encryptor) {
        super(encryptor)

        this._data = {}
    }

    // eslint-disable-next-line no-unused-vars
    putRaw(rawKey, rawValue, options = {}) {
        this._data[rawKey] = rawValue
        return this
    }

    hasRaw(rawKey) {
        return rawKey in this._data
    }

    getRaw(rawKey) {
        return this._data[rawKey]
    }

    removeRaw(rawKey) {
        delete this._data[rawKey]
        return this
    }
}
