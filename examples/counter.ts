/**
 * An example command that controls a counter.
 */
import {CommandNode, SubcommandNode} from '../src/node/index.ts'
import {CommandHandler} from '../src/handler.ts'
import {NumberArgument} from '../src/argument/index.ts'

let counter = 0;

const get: CommandNode = {
    name: 'get',
    arguments: [],
    execute: () => `Counter is ${counter.toString()}`
}

const add: CommandNode<[number]> = {
    name: 'add',
    arguments: [new NumberArgument('amount', 'The amount to add', false,
        NumberArgument.validators.notNaN,
        NumberArgument.validators.integer),
    ],
    execute: (_, args) => `Counter is now ${(counter += args[0])}`
}

const root = new SubcommandNode('counter', get, add)

const handler = new CommandHandler()
handler.register(root)

while (true) {
    const cmd = prompt('> ')
    if (!cmd) break
    // permissions are not used in this example
    try {
        console.log(handler.dispatch(cmd, {hasPermission: () => true}))
    } catch (e) {
        console.log(e.message ?? e)
    }
}
