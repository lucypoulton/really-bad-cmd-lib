import {SubcommandNode} from '../src/node/subcommand.ts'
import {Permissible} from '../src/permissible.ts'
import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";

const god: Permissible = { hasPermission: () => true }

Deno.test('Subcommand nodes', async t => {
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

	await t.step('returns the correct next node', () => {
		['test1', 'test2'].forEach(x => assertEquals(node.next(god, [x])?.execute(god, []), x))
	})

	await t.step('returns undefined for a missing node', () => {
		assertStrictEquals(node.next(god, ['invalid']), undefined)
	})
})