import {str} from './constants'
import {Maker} from './maker'

export class Drivers extends Maker
{
    constructor(app, configKey, defaultDriver = null) {
        super(app)
        
        this._configKey = configKey
        this._drivers = {}
        this._extended = {}
        this._defaultDriver = defaultDriver
    }

    _config(key, def = null) {
        return this._app.$getConfig(`${this._configKey}.${key}`, def) || def
    }

    _options(driver) {
        return this._config(`drivers.${driver}`, {})
    }

    getDefaultDriver() {
        return this._config('default', this._defaultDriver)
    }

    extend(driver, callback) {
        switch (typeof driver) {
            case 'string':
                this._extended[driver] = callback
                break
            case 'object':
                Object.keys(driver).forEach(key => this._extended[key] = driver[key])
                break
        }
        return this
    }

    driver(driver = null) {
        if (driver == null) {
            driver = this.getDefaultDriver()
        }
        return driver in this._drivers
            ? this._drivers[driver]
            : (this._drivers[driver] = this.createDriver(driver))
    }

    createDriver(driver) {
        return this._createCustomDriver(driver)
            ?? (this._createExtendedDriver(driver)
                ?? this._createDefaultDriver())
    }

    _createCustomDriver(driver) {
        const method = 'create' + str.studly(driver)
        if (method in this) {
            return this[method]()
        }
        return null
    }

    _createExtendedDriver(driver) {
        return driver in this._extended ? this._extended[driver]() : null
    }

    /**
     *
     * @returns {*}
     */
    _createDefaultDriver() {
        throw new ReferenceError('Driver does not exist.')
    }
}
