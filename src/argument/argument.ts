export interface Argument<T> {
	readonly name: string,
	readonly description: string,
	readonly optional: boolean,

	parse(input: string[]): T | null,

	suggest(input: string[]): string[]
}