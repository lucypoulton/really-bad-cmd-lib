import CommandHandler from '../src/handler.ts'
import SingleWordArgument from '../src/argument/singleWord.ts'
import {Permissible} from '../src/permissible.ts'
import {CommandNode} from '../src/node/node.ts'
import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";

const god: Permissible = {hasPermission: () => true}

Deno.test('Chained command nodes', async t => {
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

	await t.step('does not call the next node when there are no further arguments', () => {
		assertEquals(handler.dispatch('example', god), 'first')
	})

	await t.step('calls the next node when there are further arguments', () => {
		assertEquals(handler.dispatch('example arg', god), 'second arg')
	})
})