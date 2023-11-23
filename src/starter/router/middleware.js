import {Maker} from '../helpers/maker'

export class Middleware extends Maker
{
    beforeEach(to, from, next) {
        next()
    }

    beforeResolve(to, from, next) {
        next()
    }

    afterEach(to, from, next) {
        next()
    }
}
