export function time() {
    return new Date().getTime()
}

export function only(data, keys) {
    const d = {}
    keys.forEach(key => key in data && (d[key] = data[key]))
    return d
}

export function tap(value, callback = null) {
    callback && callback(value)
    return value
}

export function pass(value, callback = null) {
    return callback ? callback(value) : value
}

export function dataGet(data, key, def = null) {
    const keys = key.split('.')
    let k
    while ((k = keys.shift())) {
        if (!(k in data)) {
            return def
        }
        data = data[k]
    }
    return data
}
