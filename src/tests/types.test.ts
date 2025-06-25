import { describe, it, expect } from 'vitest'
import { isDetailedPokemon, isNonNullFlip, isPokemonListItem } from '../types'

describe('isDetailedPokemon', () => {
	it('Valid detailed pokemon is passing', () => {
		expect(
			isDetailedPokemon({
				id: 1,
				name: 'bulbasaur',
				spriteFront: 'sprite_front',
				spriteBack: null,
			}),
		).toBeTruthy()
	})

	it('Invalid detailed pokemon is not passing', () => {
		expect(
			isDetailedPokemon({
				id: '1',
				name: 'bulbasaur',
				spriteFront: ['sprite_front'],
				spriteBack: 'sprite_back',
			}),
		).toBeFalsy()

		expect(
			isDetailedPokemon({
				id: 1,
				name: 'bulbasaur',
			}),
		).toBeFalsy()

		expect(isDetailedPokemon(new Set(['bulbasaur']))).toBeFalsy()
	})
})

describe('isNonNullFlip', () => {
	const nonNullFlip = [11, 2]
	const mixedFlip = [11, null]
	const nullFlip = [null, null]

	it('Valid flip is passing', () => {
		const isValidFlip = isNonNullFlip(nonNullFlip)

		expect(isValidFlip).toBeTruthy()
	})

	it('Not valid objects are not passing', () => {
		expect(isNonNullFlip(mixedFlip)).toBeFalsy()
		expect(isNonNullFlip(nullFlip)).toBeFalsy()
		expect(isNonNullFlip([])).toBeFalsy()
		expect(isNonNullFlip(['string'])).toBeFalsy()
	})
})

describe('isPokemonListItem', () => {
	it('Valid PokemonListItem is passing', () => {
		expect(
			isPokemonListItem({
				name: 'ditto',
				url: 'url/ditto',
			}),
		).toBeTruthy()
	})

	it('Invalid PokemonListItem is not passing', () => {
		expect(
			isPokemonListItem({
				name: 'ditto',
				url: ['url/ditto'],
			}),
		).toBeFalsy()
		expect(
			isPokemonListItem({
				name: 'ditto',
				type: 'normal',
			}),
		).toBeFalsy()
		expect(isPokemonListItem('ditto')).toBeFalsy()
	})
})
