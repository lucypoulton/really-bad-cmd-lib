import {GreedyStringArgument} from '../src/argument/greedyString'
import {SingleWordArgument} from '../src/argument/singleWord'

describe('Arguments', () => {
	describe('Greedy string', () => {
		const arg = new GreedyStringArgument('name', 'desc', false)

		it('consumes the entire array', () => {
			const array = ['one', 'two', 'three']
			expect(arg.parse(array)).toEqual('one two three')
			expect(array).toEqual([])
		})

		it('returns null when given an empty array', () => {
			expect(arg.parse([])).toBeNull()
		})

		it('suggests its own name', () => {
			expect(arg.suggest([])).toEqual(['<name>'])
		})
	})

	describe('Single word', () => {
		const arg = new SingleWordArgument('name', 'desc', false)

		it('only consumes one word', () => {
			const array = ['one', 'two', 'three']
			expect(arg.parse(array)).toEqual('one')
			expect(array).toEqual(['two', 'three'])
		})

		it('returns null when given an empty array', () => {
			expect(arg.parse([])).toBeNull()
		})

		it('suggests its own name', () => {
			expect(arg.suggest([])).toEqual(['<name>'])
		})
	})
})