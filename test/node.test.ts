import CommandHandler from '../src/handler.ts'
import {Permissible} from '../src/permissible.ts'
import SingleWordArgument from '../src/argument/singleWord.ts'
import { assertEquals, assertThrows } from "https://deno.land/std@0.130.0/testing/asserts.ts";

const god: Permissible = {
	hasPermission: () => true
}

Deno.test('Simple command nodes', async t => {
	const handler = new CommandHandler()
	handler.register({
		name: 'example1',
		arguments: [],
		execute: () => 'example 1'
	})
	handler.register({
		name: 'example2',
		arguments: [],
		execute: () => 'example 2'
	})

	await t.step('dispatches the correct command', () => {
		assertEquals(handler.dispatch('example1', god), 'example 1')
		assertEquals(handler.dispatch('example2', god), 'example 2')
	})


	await t.step('throws an error when a command that doesnt exist is dispatched', () => {
		assertThrows(() => handler.dispatch('thiscommanddoesnotexist', god))
	})

	handler.register<[string, string], Permissible>({
		name: 'witharg',
		arguments: [
			new SingleWordArgument('arg', 'arg', false),
			new SingleWordArgument('arg2', 'optional', true)
		],
		execute: (permissible, args) => args.join(' ').trim()
	})

	await t.step('correctly processes simple string arguments', () => {
		assertEquals(handler.dispatch('witharg hello world', god), 'hello world')
	})

	await t.step('throws an error when a required argument is missing', () => {
		assertThrows(() => handler.dispatch('witharg', god))
	})

	await t.step('does not throw when an optional argument is missing', () => {
		assertEquals(handler.dispatch('witharg hello', god), 'hello')
	})
})

interface PermissibleProMaxPlusExtremeXDR extends Permissible {
	isPermissiblePlus: true
}

function makePermissibleProMaxPlusExtremeXDR(normiePermissible: Permissible): PermissibleProMaxPlusExtremeXDR {
	return {...normiePermissible, isPermissiblePlus: true}
}

function failTransformation(): PermissibleProMaxPlusExtremeXDR | null {
	return null
}

Deno.test('Conditions', async t => {
	const handler = new CommandHandler()
	handler.register({
		name: 'test1',
		arguments: [],
		condition: makePermissibleProMaxPlusExtremeXDR,
		execute: (val) => val.isPermissiblePlus.toString()
	})
	handler.register({
		name: 'test2',
		arguments: [],
		condition: failTransformation,
		execute: (val) => val.isPermissiblePlus.toString()
	})
	await t.step('applies permission transformations correctly', () => {
		assertEquals(handler.dispatch('test1', god), 'true')
	})

	await t.step('throws an error when a permission transformation fails', () => {
		assertThrows(() => handler.dispatch('test2', god))
	})
})