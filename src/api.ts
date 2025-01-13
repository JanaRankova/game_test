import { useQuery } from 'react-query'
import { MainClient, Pokemon } from 'pokenode-ts'

type PokemonList = { name: string; url: string }[]
interface AllPokResponse {
	results: PokemonList
}

const api = new MainClient()
// TODO Add other generations?
const gen1 = { limit: 150, offset: 0 } // Gen 1 are pokemons from 1 - 151

export function useGetPokemon(name?: string, id?: number) {
	return useQuery<Pokemon>({
		queryKey: ['pokemon', name, id],
		queryFn: async () => {
			const response = await fetch(
				`https://pokeapi.co/api/v2/ability/${name || id}/`,
			)

			if (!response.ok) {
				throw new Error('Error while fetching pokemon data.')
			}

			return response.json()
		},
	})
}

export function useGetAllPokemons() {
	return useQuery<AllPokResponse>({
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
