import {Drivers} from '../helpers'
import {Base64Encryptor} from './base64-encryptor'

export class Encryption extends Drivers
{
    constructor(app) {
        super(app, 'encryption', 'base64')
    }

    createBase64() {
        return new Base64Encryptor(this._options('base64'))
    }
}
