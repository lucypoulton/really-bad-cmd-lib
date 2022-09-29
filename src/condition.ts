import {Permissible} from './permissible.ts'

export interface Condition<I extends Permissible = Permissible, O extends I = I> {
	(input: I): O | null,
}

export const IDENTITY: Condition = (input: Permissible) => input
export const ALWAYS_FALSE: Condition = () => null

export function and<I extends Permissible, O extends I, U extends O>(
	first: Condition<I, O>, other: Condition<O, U>): Condition<I, U> {
	return (input: I) => {
		const one = first(input)
		return one ? other(one) : null
	}
}

export function or<I extends Permissible, O extends I>(
	first: Condition<I, O>, second: Condition<I, O>) {
	return (input: I) => first(input) || second(input)
}

export function hasPermission<T extends Permissible>(permission: string): Condition<T> {
	return (input: T) => input.hasPermission(permission) ? input : null
}
