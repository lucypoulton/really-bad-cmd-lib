import {AbstractArgument} from './argument.ts'

export default class SingleWordArgument extends AbstractArgument<string> {
	parse(input: string[]) {
		return input.shift() ?? null;
	}

	suggest(input: string[]): string[] {
		return [`<${this.name}>`];
	}

}