export class PageTitle
{
    constructor({separator = '-', asc = true, defaults = []}) {
        this._asc = asc
        this._separator = separator
        this._defaults = defaults

        this._titles = []
    }

    placeholder(...titles) {
        this._titles.push(titles)
        return this._titles.length - 1
    }

    set(placeholder, ...titles) {
        if (this._titles.length > 0 && placeholder < this._titles.length) {
            this._titles[placeholder] = titles
        }
        return this
    }

    push(placeholder, ...titles) {
        if (this._titles.length > 0 && placeholder < this._titles.length) {
            this._titles[placeholder].push(...titles)
        }
        return this
    }

    remove(placeholder) {
        if (this._titles.length > 0) {
            this._titles.splice(placeholder)
        }
        return this
    }

    toString() {
        const titles = [...this._defaults]
        this._titles.forEach(ts => titles.push(...ts))
        return (this._asc ? titles : titles.reverse()).join(` ${this._separator} `)
    }
}
