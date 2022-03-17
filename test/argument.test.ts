import {GreedyStringArgument} from '../src/argument/greedyString.ts'
import {SingleWordArgument} from '../src/argument/singleWord.ts'
import {assertEquals, assertStrictEquals, AssertionError} from "https://deno.land/std@0.130.0/testing/asserts.ts";
import {NumberArgument} from '../src/argument/number.ts'

function assertThrowsAnything(fn: () => unknown) {
	try {
		fn()
	} catch (_) {
		return
	}
	throw new AssertionError('Expected to throw but did not')
}

Deno.test('Arguments', async (t) => {
	await t.step('Greedy string', async (t2) => {
		const arg = new GreedyStringArgument('name', 'desc', false)

		await t2.step('consumes the entire array', () => {
			const array = ['one', 'two', 'three']
			assertEquals(arg.parse(array), 'one two three')
			assertEquals(array, [])
		})

		await t2.step('returns null when given an empty array', () => {
			assertStrictEquals(arg.parse([]), null)
		})

		await t2.step('suggests its own name', () => {
			assertEquals(arg.suggest([]), ['<name>'])
		})
	})

	await t.step('Single word', async t2 => {
		const arg = new SingleWordArgument('name', 'desc', false)

		await t2.step('only consumes one word', () => {
			const array = ['one', 'two', 'three']
			assertEquals(arg.parse(array), 'one')
			assertEquals(array, ['two', 'three'])
		})

		await t2.step('returns null when given an empty array', () => {
			assertStrictEquals(arg.parse([]), null)
		})

		await t2.step('suggests its own name', () => {
			assertEquals(arg.suggest([]), ['<name>'])
		})
	})

	await t.step('Number', async t2 => {
		const arg = new NumberArgument('name', 'description', false, NumberArgument.integer)
		await t2.step('only consumes one number', () => {
			const array = ['123', 'two', 'three']
			assertEquals(arg.parse(array), 123)
			assertEquals(array, ['two', 'three'])
		})

		await t2.step('returns null when given an empty array', () => {
			assertStrictEquals(arg.parse([]), null)
		})

		await t2.step('suggests its own name', () => {
			assertEquals(arg.suggest([]), ['<name>'])
		})

		await t2.step('fails with non-integer input when specified', () =>
			assertThrowsAnything(() => arg.parse(['1.5']))
		)
	})
})