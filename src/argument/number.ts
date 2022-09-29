import {AbstractArgument} from './argument.ts'

/**
 * A validator function.
 * @throws a string error message if the given value is not successfully validated.
 */
export type Validator = (arg: number) => void

/**
 * An argument that consumes a single input string and outputs a number,
 * which can be constrained by passing in validator functions.
 *
 * @see Validator
 */
export class NumberArgument extends AbstractArgument<number> {

	readonly validators: Validator[]

	/**
	 * Creates a new NumberArgument.
	 *
	 * @param name this argument's name
	 * @param description this argument's description
	 * @param optional whether this argument is optional
	 * @param validators an array of validator functions to check the value with.
	 *
	 * @see AbstractArgument constructor
	 */
	constructor(name: string, description: string, optional: boolean, ...validators: Validator[]) {
		super(name, description, optional)
		this.validators = validators
	}

	parse(input: string[]): number | null {
		if (input.length == 0) return null
		const parsed = parseFloat(input.shift() ?? '')
		this.validators.forEach(x => x(parsed))
		return parsed;
	}

	suggest(_: string[]): string[] {
		return [`<${this.name}>`];
	}

	/**
	 * Predefined validators.
	 */
	static validators = {
		/**
		 * Validates numbers that are not NaN.
		 * @throws `Expected a number` if the value is NaN
		 */
		notNaN(num: number) {
			if (Number.isNaN(num)) return
			throw 'Expected a number'
		},

		/**
		 * Validates numbers that are integers.
		 * @throws `Expected an integer` if the value is not an integer
		 */
		integer(num: number) {
			if (Number.isInteger(num)) return
			throw 'Expected an integer'
		},

		/**
		 * Validates numbers where `lower <= n <= upper`.
		 * @throws `Expected a number between <lower> and <upper>` if the value is not in range
		 */
		between(lower: number, upper: number): Validator {
			return num => {
				if (num >= lower && num <= upper) return
				throw `Expected a number between ${lower} and ${upper}`
			}
		}
	}
}
