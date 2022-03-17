import {AbstractArgument, Argument} from './argument.js'

export class SingleWordArgument extends AbstractArgument<string> {
	parse(input: string[]) {
		return input.shift() ?? null;
	}

	suggest(input: string[]): string[] {
		return [`<${this.name}>`];
	}

}