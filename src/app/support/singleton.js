import {Factory} from './factories'

export class Singleton extends Factory
{
    create(classname) {
        return typeof this.registered[classname] === 'function'
            ? (this.registered[classname] = super.create(classname))
            : this.registered[classname]
    }
}
