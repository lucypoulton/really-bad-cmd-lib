import {Argument} from './argument.js'

export class SingleWordArgument implements Argument<string> {
	readonly description: string
	readonly name: string
	readonly optional: boolean

	constructor(name: string, description: string, optional: boolean) {
		this.name = name
		this.description = description
		this.optional = optional
	}

	parse(input: string[]) {
		return input.shift() ?? null;
	}

	suggest(input: string[]): string[] {
		return [];
	}

}