import {CommandNode} from './node/node.ts'
import {Permissible} from './permissible.ts'

export default class CommandHandler<T extends Permissible> {
	private commands: Map<string, CommandNode> = new Map()

	public register<A extends unknown[], T extends Permissible>(node: CommandNode<A, T>) {
		if (this.commands.has(node.name)) throw new Error('Tried to register a duplicate node')
		this.commands.set(node.name, node)
	}

	private static execute<A extends unknown[], T extends Permissible>
	(node: CommandNode<A, T>, args: string[], permissible: Permissible): string | undefined {

		/*
		- if `node.condition` is not defined, it will short circuit and result in `undefined`
		- a result of `null` indicates no permission by contract
		- a not-nullish value indicates a success
		 */
		let checked = node.condition?.(permissible)
		if (checked === null) throw new Error('No permission')
		if (checked === undefined) checked = permissible as T

		const values = node.arguments.map(arg => {
			let parsed: unknown;
			try {
				parsed = arg.parse(args)
			} catch (e) {
				throw new Error(`Error parsing argument ${arg.name}: ${e}`)
			}
			if (!parsed && !arg.optional) throw new Error(`Missing argument ${arg.name}`)
			return parsed;
		}) as A; // tuple type info is lost during iteration - this is ensured by logic (and unit tested)

		const nextNode = node.next?.(checked, values)
		if (args.length > 0 && nextNode) return this.execute(nextNode, args, checked)
		return node.execute(checked, values)
	}

	public dispatch(command: string, permissible: Permissible) {
		const split = command.split(' ')
		const node = this.commands.get(split.shift()!)
		if (!node) throw new Error('No such command')

		return CommandHandler.execute(node, split, permissible)
	}
}
