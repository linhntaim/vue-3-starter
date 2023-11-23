export class Timer
{
    constructor() {
        this._timeouts = {}
        this._intervals = {}
        this._animations = {}
    }

    registerTimeout(handler, timeout = null, ...args) {
        const id = window.setTimeout(handler, timeout, ...args)
        this._timeouts[id] = true
        return id
    }

    offTimeout(id = 0) {
        if (id) {
            if (id in this._timeouts) {
                window.clearTimeout(id)
                delete this._timeouts[id]
            }
            return this
        }
        return this.offAllTimeouts()
    }

    offAllTimeouts() {
        Object.keys(this._timeouts).forEach(id => {
            window.clearTimeout(Number(id))
            delete this._timeouts[id]
        })
        return this
    }

    registerInterval(handler, timeout = null, ...args) {
        const id = window.setInterval(handler, timeout, ...args)
        this._intervals[id] = true
        return id
    }

    offInterval(id = 0) {
        if (id) {
            if (id in this._intervals) {
                window.clearInterval(id)
                delete this._intervals[id]
            }
            return this
        }
        return this.offAllIntervals()
    }

    offAllIntervals() {
        Object.keys(this._intervals).forEach(id => {
            window.clearInterval(Number(id))
            delete this._intervals[id]
        })
        return this
    }

    registerAnimation(handler) {
        const id = window.requestAnimationFrame(handler)
        this._animations[id] = true
        return id
    }

    offAnimation(id = 0) {
        if (id) {
            if (id in this._animations) {
                window.cancelAnimationFrame(id)
                delete this._animations[id]
            }
            return this
        }
        return this.offAllTimeouts()
    }

    offAllAnimations() {
        Object.keys(this._animations).forEach(id => {
            window.cancelAnimationFrame(Number(id))
            delete this._animations[id]
        })
        return this
    }

    offAll() {
        return this.offAllTimeouts()
            .offAllIntervals()
            .offAllAnimations()
    }
}
