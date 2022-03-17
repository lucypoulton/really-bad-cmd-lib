import {AbstractArgument} from './argument.ts'

export class NumberArgument extends AbstractArgument<number> {

	validators: NumberArgument.Validator[]

	constructor(name: string, description: string, optional: boolean, ...validators: NumberArgument.Validator[]) {
		super(name, description, optional)
		this.validators = validators
	}

	parse(input: string[]): number | null {
		if (input.length == 0) return null
		const parsed = parseFloat(input.shift() ?? '')
		this.validators.forEach(x => x(parsed))
		return parsed;
	}

	suggest(input: string[]): string[] {
		return [`<${this.name}>`];
	}
}

export namespace NumberArgument {
	export type Validator = (arg: number) => void

	export const integer: Validator = (num) => {
		if (Number.isInteger(num)) return
		throw 'Expected an integer'
	}

	export function between(lower: number, upper: number): Validator {
		return num => {
			if (num >= lower && num <= upper) return
			throw `Expected a number between ${lower} and ${upper}`
		}
	}
}