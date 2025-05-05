export type Flip = (number | null)[]
export type GameResult = 0 | 1 | 2

// Type guards
export function isNonNullFlip(flip: unknown): flip is [number, number] {
	return (
		Array.isArray(flip) &&
		flip.length === 2 &&
		flip.every((item) => typeof item === 'number' && item !== null)
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
		typeof (value as PokemonDetails).spriteBack === 'string' &&
		typeof (value as PokemonDetails).spriteFront === 'string'
	)
}
