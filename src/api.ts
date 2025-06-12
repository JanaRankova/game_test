import { Pokemon } from 'pokenode-ts'
import { UseQueryResult, useQueries, useQuery } from 'react-query'
import { PokemonDetails, PokemonListItem } from './types'

interface AllPokemonResponse {
	results: PokemonListItem[]
}

const gen1 = { limit: 150, offset: 0 } // Gen 1 is from 1 - 151

export function useGetAllPokemons() {
	return useQuery<AllPokemonResponse>({
		queryKey: ['pokemon'],
		queryFn: async () => {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon?limit=${gen1.limit}&offset=${gen1.offset}/`,
			)

			if (!response.ok) {
				throw new Error('Error while fetching pokemon data.')
			}

			return response.json()
		},
	})
}

export function useGetEveryPokemonData(allPokemonListResponse: PokemonListItem[]) {
	return useQueries(
		allPokemonListResponse
			? allPokemonListResponse.map((listedPokemon) => {
					return {
						queryKey: ['pokemon', listedPokemon.name],
						queryFn: async () => {
							const response = await fetch(listedPokemon.url)

							if (!response.ok) {
								throw new Error('Error while fetching detailed pokemon data.')
							}

							return response.json()
						},
						select: (pokemon: Pokemon): PokemonDetails => ({
							id: pokemon.id,
							name: pokemon.name,
							spriteFront: pokemon.sprites.front_default,
							spriteBack: pokemon.sprites.back_default,
						}),
					}
				})
			: [],
	) as UseQueryResult<PokemonDetails>[]
}
