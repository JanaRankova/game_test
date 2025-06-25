export type Flip = (number | null)[]
export type PokemonListItem = { name: string; url: string }

export interface PokemonDetails {
	id: number
	name: string
	spriteFront: string | null
	spriteBack: string | null
}

export interface Player {
	id: number
	name: string
	matchedCards: PokemonDetails[]
	isActive: boolean
	gamesWon: number
}

// Type guards
export function isNonNullFlip(flip: unknown): flip is [number, number] {
	return (
		Array.isArray(flip) &&
		flip.length === 2 &&
		flip.every((item) => typeof item === 'number' && item !== null)
	)
}

export function isPokemonListItem(value: unknown): value is PokemonListItem {
	return (
		typeof value === 'object' &&
		value !== null &&
		'name' in value &&
		'url' in value &&
		typeof (value as PokemonListItem).name === 'string' &&
		typeof (value as PokemonListItem).url === 'string'
	)
}

export function isDetailedPokemon(value: unknown): value is PokemonDetails {
	return (
		typeof value === 'object' &&
		value !== null &&
		'name' in value &&
		'id' in value &&
		'spriteBack' in value &&
		'spriteFront' in value &&
		typeof (value as PokemonDetails).name === 'string' &&
		typeof (value as PokemonDetails).id === 'number' &&
		(typeof (value as PokemonDetails).spriteBack === 'string' ||
			(value as PokemonDetails).spriteBack === null) &&
		(typeof (value as PokemonDetails).spriteFront === 'string' ||
			(value as PokemonDetails).spriteFront === null)
	)
}
