import {CommandNode} from './node.ts'
import SingleWordArgument from '../argument/singleWord.ts'
import {Permissible} from '../permissible.ts'

/**
 * A node that accepts a single word argument selects the next node based on name.
 * If executed directly (i.e., a suitable next node does not exist),
 * a help message will be generated based on the name and description of child nodes.
 */
export class SubcommandNode implements CommandNode<[string]> {
	readonly arguments = [new SingleWordArgument('arg', 'arg', false)] as const
	readonly name: string

	private nodes: CommandNode[]

	constructor(name: string, ...nodes: CommandNode[]) {
		this.name = name
		this.nodes = nodes
	}

	execute(_permissible: Permissible, _args: [string]) {
		// FIXME
		return 'TODO - help';
	}

	next(_permissible: Permissible, args: [string]) {
		return this.nodes.find(x => x.name == args[0])
	}
}
