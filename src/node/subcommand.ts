import {CommandNode} from './node.js'
import {SingleWordArgument} from '../argument/singleWord'
import {Permissible} from '../types/permissible.js'

export class SubcommandNode implements CommandNode<[string]> {
	readonly arguments = [new SingleWordArgument('arg', 'arg', false)] as const
	readonly name: string

	private nodes: CommandNode<any, any>[]

	constructor(name: string, ...nodes: CommandNode<any, any>[]) {
		this.name = name
		this.nodes = nodes
	}

	execute(permissible: Permissible, args: any) {
		return 'TODO - help';
	}

	next(permissible: Permissible, args: [string]) {
		return this.nodes.find(x => x.name == args[0])
	}
}