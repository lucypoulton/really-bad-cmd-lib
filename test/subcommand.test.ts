import {SubcommandNode} from '../src/node/subcommand'
import {Permissible} from '../src/permissible.js'

const god: Permissible = { hasPermission: () => true }

describe('Subcommand nodes', () => {
	const node = new SubcommandNode('name',
		{
			name: 'test1',
			arguments: [],
			execute: () => 'test1'
		},
		{
			name: 'test2',
			arguments: [],
			execute: () => 'test2'
		}
	)

	it('returns the correct next node', () => {
		['test1', 'test2'].forEach(x => expect(node.next(god, [x])?.execute(god, [])).toEqual(x))
	})

	it('returns undefined for a missing node', () => {
		expect(node.next(god, ['invalid'])).toStrictEqual(undefined)
	})
})