import {Condition} from '../condition.ts'
import {Permissible} from '../permissible.ts'
import {Argument} from '../argument/argument.ts'

export interface CommandNode<T extends unknown[], U extends Permissible = Permissible> {
	name: string,
	condition?: Condition<Permissible, U>
	arguments: { readonly [K in keyof T]: Argument<T[K]> },

	execute(permissible: U, args: T): string
	next?(permissible: U, args: T): CommandNode<unknown[], Permissible> | undefined
}