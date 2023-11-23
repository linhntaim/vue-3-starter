import {Maker} from '../helpers/maker'

export class UrlGenerator extends Maker
{
    constructor(app) {
        super(app)

        this._url = this._app.$getConfig('app.url', window.location.origin)
        this._router = this._app.$router
    }

    concat(...args) {
        args.unshift(this._url)
        return args.join('/')
    }

    to(path = '') {
        return this.concat(path)
    }

    route(location) {
        return this.concat(this._router.resolve(location).path.slice(1))
    }
}
