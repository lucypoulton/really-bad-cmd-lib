import {Permissible} from './permissible.ts'

/**
 * A function that attempts to validate the executor of a command of type I.
 * Conditions are transformative - that is, when they are applied, they may return a transformed value on the input.
 * This means it may have a different non-nullish output type O.
 *
 * Conditions are considered to either pass or fail when applied to an input:
 * - a condition has passed if it returns a value of type O
 * - a condition has failed if it returns null
 *
 * As a result of this, type O may not be nullish.
 */
export interface Condition<I extends Permissible = Permissible, O extends NonNullable<Permissible> = I> {
	(input: Readonly<I>): O | null,
}

/**
 * A condition that is the identity function - it does not transform the input or change types.
 */
export const IDENTITY: Condition = (input: Permissible) => input

/**
 * A condition that always returns `null` and therefore always fails.
 */
export const ALWAYS_FALSE: Condition = () => null

/**
 * Combines two conditions in such a way that both must pass in order to pass.
 * `first` will be applied first, then `other` to the output of `first`.
 * Should either condition fail, returns `null`.
 *
 * @param first the first condition to apply
 * @param other the second condition to apply
 */
export function and<I extends Permissible, O extends I, U extends O>(
	first: Condition<I, O>, other: Condition<O, U>): Condition<I, U> {
	return (input: I) => {
		const one = first(input)
		return one ? other(one) : null
	}
}

/**
 * Non-exclusively combines two conditions in such a way that either must pass in order to pass.
 * `first` will be applied first. `other` will be applied if `first` fails.
 * Should both conditions fail, returns `null`.
 *
 * @param first the first condition to apply
 * @param second the second condition to apply
 */
export function or<I extends Permissible, O extends I>(
	first: Condition<I, O>, second: Condition<I, O>) {
	return (input: I) => first(input) || second(input)
}

/**
 * Creates a new condition that passes if a permissible holds a certain permission.
 * This condition does not transform the input.
 *
 * @param permission the permission string to check for
 */
export function hasPermission<T extends Permissible>(permission: string): Condition<T> {
	return (input: T) => input.hasPermission(permission) ? input : null
}
