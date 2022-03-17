import {Condition} from '../src/condition'
import {Permissible} from '../src/permissible'

const god: Permissible = {
	hasPermission: () => true
}

const notGod: Permissible = {
	hasPermission: () => false
}

describe('Conditions', () => {
	it('correctly handles ANDing two conditions', () => {
		expect(Condition.and(Condition.IDENTITY, Condition.ALWAYS_FALSE)(god)).toBeNull()
		expect(Condition.and(Condition.IDENTITY, Condition.IDENTITY)(god)).toBeTruthy()
		expect(Condition.and(Condition.ALWAYS_FALSE, Condition.IDENTITY)(god)).toBeNull()
		expect(Condition.and(Condition.ALWAYS_FALSE, Condition.ALWAYS_FALSE)(god)).toBeNull()
	})

	it('correctly handles ORing two conditions', () => {
		expect(Condition.or(Condition.IDENTITY, Condition.ALWAYS_FALSE)(god)).toBeTruthy()
		expect(Condition.or(Condition.IDENTITY, Condition.IDENTITY)(god)).toBeTruthy()
		expect(Condition.or(Condition.ALWAYS_FALSE, Condition.IDENTITY)(god)).toBeTruthy()
		expect(Condition.or(Condition.ALWAYS_FALSE, Condition.ALWAYS_FALSE)(god)).toBeNull()
	})

	describe('#hasPermission', () => {
		it('includes permissions that are present', () => {
			expect(Condition.hasPermission('perm')(god)).toBeTruthy()
		})
		it('rejects permissions that are missing', () => {
			expect(Condition.hasPermission('perm')(notGod)).toBeNull()
		})
	})
})