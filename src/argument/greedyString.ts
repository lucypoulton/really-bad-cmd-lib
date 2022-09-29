import {AbstractArgument} from './argument.ts'

/**
 * An argument that concatenates the entire available input to a string, fully consuming it.
 */
export default class GreedyStringArgument extends AbstractArgument<string> {

	parse(input: string[]): string | null {
		if (input.length == 0) return null
		const out = input.join(' ')
		input.length = 0
		return out;
	}
}
