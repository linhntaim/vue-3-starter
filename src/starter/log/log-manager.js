import {Drivers} from '../helpers'
import {ConsoleLog} from './console-log'

export class LogManager extends Drivers
{
    constructor(app) {
        super(app, 'log', 'console')
    }

    createConsole() {
        return new ConsoleLog(this._options('console'))
    }
}
