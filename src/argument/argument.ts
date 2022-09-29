/**
 * An argument.
 *
 * Arguments are responsible for parsing and processing raw string inputs into something more useful,
 * which may be of any arbitrary type T.
 *
 * @param T this argument's output type
 */
export interface Argument<T> {
	/**
	 * This argument's name. This is used for help tooltips and error messages.
	 */
	readonly name: string,

	/**
	 * This argument's description. This is used for help tooltips and error messages.
	 */
	readonly description: string,

	/**
	 * Whether this argument is optional. If true, and `this.parse()` returns `null`, the command that this argument
	 * belongs to will fail.
	 */
	readonly optional: boolean,

	/**
	 * Parses the input, removing elements from the front of the provided input array as needed as if it were a queue.
	 * Use of `Array#shift()` is recommended for this purpose.
	 *
	 * @param input an array of space-delimited input parameters given as part of the command.
	 * Items in this array will not have been parsed by other arguments previously.
	 */
	parse(input: string[]): T | null,

	/**
	 * Given a presumably partial input (i.e., while the end user is still typing out a command),
	 * provides suggestions as to complete the input of this argument.
	 * If calculating values in this manner is not appropriate for the argument,
	 * a suggested implementation is to return the argument's name as a singleton array.
	 * @param input input parameters as defined in `#parse`
	 */
	suggest(input: string[]): string[]
}

/**
 * A simple base argument, encapsulating the `name`, `description` and `optional` fields.
 */
export abstract class AbstractArgument<T> implements Argument<T> {
	readonly name: string
	readonly description: string
	readonly optional: boolean

	constructor(name: string, description: string, optional: boolean) {
		this.name = name
		this.description = description
		this.optional = optional
	}

	/**
	 * @inheritDoc
	 */
	abstract parse(input: string[]): T | null

	/**
	 * The default implementation for this method is to return a singleton array of the argument's name.
	 * This is intended to be overridden as needed.
	 */
	suggest(input: string[]): string[] {
		return [`<${this.name}>`];
	}
}
