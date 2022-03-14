import {CommandHandler} from '../src/handler'
import {Permissible} from '../src/types/permissible'
import {SingleWordArgument} from '../src/argument/singleWord'

const god: Permissible = {
	hasPermission: () => true
}

describe('Simple command nodes', () => {
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

	it('dispatches the correct command', () => {
		expect(handler.dispatch('example1', god)).toEqual('example 1')
		expect(handler.dispatch('example2', god)).toEqual('example 2')
	})


	it('throws an error when a command that doesnt exist is dispatched', () => {
		expect(() => handler.dispatch('thiscommanddoesnotexist', god)).toThrow()
	})

	handler.register<[string], Permissible>({
		name: 'witharg',
		arguments: [new SingleWordArgument('arg', 'arg', false)],
		execute: (permissible, args) => args[0]
	})

	it('correctly processes simple string arguments', () => {
		expect(handler.dispatch('witharg hello', god)).toEqual('hello')
	})

	it('throws an error when a required argument is missing', () => {
		expect(() => handler.dispatch('witharg', god)).toThrow()
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

describe('Conditions', () => {
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
	it('applies permission transformations correctly', () => {
		expect(handler.dispatch('test1', god)).toEqual('true')
	})

	it('throws an error when a permission transformation fails', () => {
		expect(() => handler.dispatch('test2', god)).toThrow()
	})
})