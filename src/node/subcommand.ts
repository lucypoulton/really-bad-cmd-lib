import {CommandNode} from './node.ts'
import SingleWordArgument from '../argument/singleWord.ts'
import {Permissible} from '../permissible.ts'

export class SubcommandNode implements CommandNode<[string]> {
	readonly arguments = [new SingleWordArgument('arg', 'arg', false)] as const
	readonly name: string

	private nodes: CommandNode<unknown[]>[]

	constructor(name: string, ...nodes: CommandNode<unknown[]>[]) {
		this.name = name
		this.nodes = nodes
	}

	execute(permissible: Permissible, args: [string]) {
		return 'TODO - help';
	}

	next(permissible: Permissible, args: [string]) {
		return this.nodes.find(x => x.name == args[0])
	}
}