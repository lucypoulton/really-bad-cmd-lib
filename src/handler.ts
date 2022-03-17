import {CommandNode} from './node/node.ts'
import {Permissible} from './permissible.ts'

export class CommandHandler<T extends Permissible> {
	private commands: Map<string, CommandNode<any, any>> = new Map()

	public register<A extends any[], T extends Permissible>(node: CommandNode<A, T>) {
		if (this.commands.has(node.name)) throw new Error('Tried to register a duplicate node')
		this.commands.set(node.name, node)
	}

	private static execute<A extends any[], T extends Permissible>
	(node: CommandNode<A, T>, args: string[], permissible: Permissible): string | undefined {
		let checked = node.condition?.(permissible)
		if (checked === null) throw new Error('No permission')
		if (checked === undefined) checked = permissible as T
		const values = []
		for (const arg of node.arguments) {
			let parsed: string;
			try {
				parsed = arg.parse(args)
			} catch (e) {
				throw new Error(`Error parsing argument ${arg.name}: ${e}`)
			}
			if (!parsed && !arg.optional) throw new Error(`Missing argument ${arg.name}`)
			values.push(parsed)
		}
		const nextNode = node.next?.(checked, values as A)
		if (args.length > 0 && nextNode) return this.execute(nextNode, args, checked)
		return node.execute(checked, values as A)
	}

	public dispatch(command: string, permissible: Permissible) {
		const split = command.split(' ')
		const node = this.commands.get(split.shift()!)
		if (!node) throw new Error('No such command')

		return CommandHandler.execute(node, split, permissible)
	}
}