export interface Argument<T> {
	readonly name: string,
	readonly description: string,
	readonly optional: boolean,

	parse(input: string[]): T | null,

	suggest(input: string[]): string[]
}

export abstract class AbstractArgument<T> implements Argument<T> {
	readonly description: string
	readonly name: string
	readonly optional: boolean

	protected constructor(name: string, description: string, optional: boolean) {
		this.name = name
		this.description = description
		this.optional = optional
	}

	abstract parse(input: string[]): T | null

	abstract suggest(input: string[]): string[]
}