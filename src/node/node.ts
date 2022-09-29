import {Condition} from '../condition.ts'
import {Permissible} from '../permissible.ts'
import {Argument} from '../argument/argument.ts'

/**
 * A command node.
 *
 * @param T a tuple type of the value types of arguments this command accepts.
 * For example, `CommandNode<[string, number]>` will accept two arguments - one a string, one a number.
 * These will be defined in the `arguments` field as `[Argument<string>, Argument<number>]`.
 */
export interface CommandNode<T extends unknown[] = unknown[], U extends Permissible = Permissible> {
	/**
	 * This node's name. This is used by SubcommandNode to select the correct argument.
	 */
	name: string,

	/**
	 * The condition to apply before executing this command.
	 * @see Condition
	 */
	condition?: Condition<Permissible, U>

	/**
	 * A list of arguments to process before executing the command.
	 * @see Argument
	 */
	arguments: { readonly [K in keyof T]: Argument<T[K]> },

	/**
	 * Executes the command, as defined by CommandHandler.
	 * @param permissible the permissible that dispatched this command
	 * @param args the parsed arguments
	 * @see CommandHandler
	 */
	execute(permissible: U, args: T): string

	/**
	 * Retrieves the next command node in the chain.
	 * @param permissible
	 * @param args
	 */
	next?(permissible: U, args: T): CommandNode | undefined
}
