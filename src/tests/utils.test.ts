import { describe, it, expect } from 'vitest'
import { shuffleArray, getNewDeck } from '../utils'

describe('shuffleArray', () => {})

describe('getNewDeck', () => {
	it('Basic type check and deck has 16 cards', () => {
		const deck = getNewDeck()

		expect(deck).toBeTypeOf('object')
		expect(deck.every((item) => typeof item === 'number'))
		expect(deck.length).toEqual(16)
	})

	it('Generated numbers are from 1 to 151', () => {
		const deck = getNewDeck()

		expect(deck.every((number) => number >= 1 && number <= 151)).toBeTruthy()
	})

	it('Every number in the deck is present twice', () => {
		const deck = getNewDeck()
		const mapOfOccurrence = new Map<number, number>()

		for (const number of deck) {
			mapOfOccurrence.set(number, (mapOfOccurrence.get(number) || 0) + 1)
		}

		expect(
			[...mapOfOccurrence.values()].every((item) => item === 2),
		).toBeTruthy()
	})
})

describe('shuffleArray', () => {
	const emptyArray: any[] = []
	const testArray = [0, 1, 2, 3, 4]

	it('Type and behaviour with empty array', () => {
		const shuffled = shuffleArray(emptyArray)

		expect(shuffled).toBeTypeOf('object')
		expect(shuffled.length).toEqual(0)
	})

	it('Type and behaviour with empty array', () => {
		const shuffled = shuffleArray(testArray)

		expect(shuffled.length).toEqual(5)
	})
})
