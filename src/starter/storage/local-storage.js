import {Storage} from './storage'

export class LocalStorage extends Storage
{
    // eslint-disable-next-line no-unused-vars
    putRaw(rawKey, rawValue, options = {}) {
        window.localStorage.setItem(rawKey, rawValue)
        return this
    }

    hasRaw(rawKey) {
        return rawKey in window.localStorage
    }

    getRaw(rawKey) {
        return window.localStorage.getItem(rawKey)
    }

    removeRaw(rawKey) {
        window.localStorage.removeItem(rawKey)
        return this
    }
}
