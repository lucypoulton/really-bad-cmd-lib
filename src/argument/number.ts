import {AbstractArgument} from './argument.js'

export class NumberArgument extends AbstractArgument<number> {

	validators: NumberArgument.Validator[]

	constructor(name: string, description: string, optional: boolean, ...validators: NumberArgument.Validator[]) {
		super(name, description, optional)
		this.validators = validators
	}

	parse(input: string[]): number {
		parseFloat(input.shift() ?? '')
		return 0;
	}

	suggest(input: string[]): string[] {
		return [];
	}
}

export namespace NumberArgument {
	export type Validator = (arg: number) => boolean

	export const integer: Validator = (num) => {
		if (Number.isInteger(num)) return true
		throw 'Expected an integer'
	}

	export function between(lower: number, upper: number): Validator {
		return num => {
			if (num >= lower && num <= upper) return true
			throw `Expected a number between ${lower} and ${upper}`
		}
	}
}