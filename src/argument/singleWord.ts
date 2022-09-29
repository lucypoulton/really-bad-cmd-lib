import {AbstractArgument} from './argument.ts'

/**
 * An argument that consumes and returns the first input string, if one exists.
 */
export default class SingleWordArgument extends AbstractArgument<string> {
	parse(input: string[]) {
		return input.shift() ?? null;
	}
}
