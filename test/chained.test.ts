import {CommandHandler} from '../src/handler'
import {SingleWordArgument} from '../src/argument/singleWord'
import {Permissible} from '../src/permissible.js'
import {CommandNode} from '../src/node/node.js'

const god: Permissible = {hasPermission: () => true}

describe('Chained command nodes', () => {
	const handler = new CommandHandler()
	handler.register({
		name: 'example',
		arguments: [],
		execute: () => 'first',
		next: (): CommandNode<[string], any> => ({
			name: 'second',
			arguments: [new SingleWordArgument('test', 'test', true)],
			execute: (permissible, args) => 'second ' + args[0]
		})
	})

	it('does not call the next node when there are no further arguments', () => {
		expect(handler.dispatch('example', god)).toEqual('first')
	})

	it('calls the next node when there are further arguments', () => {
		expect(handler.dispatch('example arg', god)).toEqual('second arg')
	})
})