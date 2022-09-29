import * as Condition from '../src/condition.ts'
import {Permissible} from '../src/permissible.ts'
import { assertStrictEquals, assertExists } from "https://deno.land/std@0.130.0/testing/asserts.ts";

const god: Permissible = {
	hasPermission: () => true
}

const notGod: Permissible = {
	hasPermission: () => false
}

Deno.test('Conditions', async t => {
	await t.step('correctly handles ANDing two conditions', () => {
		assertStrictEquals(Condition.and(Condition.IDENTITY, Condition.ALWAYS_FALSE)(god), null)
		assertExists(Condition.and(Condition.IDENTITY, Condition.IDENTITY)(god))
		assertStrictEquals(Condition.and(Condition.ALWAYS_FALSE, Condition.IDENTITY)(god), null)
		assertStrictEquals(Condition.and(Condition.ALWAYS_FALSE, Condition.ALWAYS_FALSE)(god), null)
	})

	await t.step('correctly handles ORing two conditions', () => {
		assertExists(Condition.or(Condition.IDENTITY, Condition.ALWAYS_FALSE)(god))
		assertExists(Condition.or(Condition.IDENTITY, Condition.IDENTITY)(god))
		assertExists(Condition.or(Condition.ALWAYS_FALSE, Condition.IDENTITY)(god))
		assertStrictEquals(Condition.or(Condition.ALWAYS_FALSE, Condition.ALWAYS_FALSE)(god), null)
	})

	await t.step('#hasPermission', async t2 => {
		await t2.step('includes permissions that are present', () => {
			assertExists(Condition.hasPermission('perm')(god))
		})
		await t2.step('rejects permissions that are missing', () => {
			assertStrictEquals(Condition.hasPermission('perm')(notGod), null)
		})
	})
})
