import {Log} from './log'

export class ConsoleLog extends Log
{
    debug(namespace, message, ...data) {
        if (this.higherOrEqualTo('debug')) {
            console.debug(namespace + ':', message, ...data)
        }
    }

    info(namespace, message, ...data) {
        if (this.higherOrEqualTo('info')) {
            console.info(namespace + ':', message, ...data)
        }
    }

    notice(namespace, message, ...data) {
        if (this.higherOrEqualTo('notice')) {
            console.warn(namespace + ':', message, ...data)
        }
    }

    warning(namespace, message, ...data) {
        if (this.higherOrEqualTo('warning')) {
            console.warn(namespace + ':', message, ...data)
        }
    }

    error(namespace, message, ...data) {
        if (this.higherOrEqualTo('error')) {
            console.error(namespace + ':', message, ...data)
        }
    }

    critical(namespace, message, ...data) {
        if (this.higherOrEqualTo('critical')) {
            console.error(namespace + ':', message, ...data)
        }
    }

    alert(namespace, message, ...data) {
        if (this.higherOrEqualTo('alert')) {
            console.error(namespace + ':', message, ...data)
        }
    }

    emergency(namespace, message, ...data) {
        if (this.higherOrEqualTo('emergency')) {
            console.error(namespace + ':', message, ...data)
        }
    }
}
