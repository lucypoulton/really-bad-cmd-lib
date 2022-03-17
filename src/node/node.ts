import {Condition} from '../condition.js'
import {Permissible} from '../permissible.js'
import {Argument} from '../argument/argument.js'

export interface CommandNode<T extends any[], U extends Permissible = Permissible> {
	name: string,
	condition?: Condition<Permissible, U>
	arguments: { readonly [K in keyof T]: Argument<T[K]> },

	execute(permissible: U, args: T): string
	next?(permissible: U, args: T): CommandNode<any, any> | undefined
}