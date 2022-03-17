import {AbstractArgument} from './argument.ts'

export class GreedyStringArgument extends AbstractArgument<string> {

	parse(input: string[]): string | null {
		if (input.length == 0) return null
		const out = input.join(' ')
		input.length = 0
		return out;
	}

	suggest(_input: string[]): string[] {
		return [`<${this.name}>`];
	}
}