import { useEffect, useState } from 'react'
import { PokemonList, useGetEveryPokemonData } from '../api'
import { PokemonDetails } from '../types'
import PexesoField from './Field'

interface Props {
	allPokemonList: PokemonList
}

export default function Content({ allPokemonList }: Props) {
	const pokemonDetailedQueries = useGetEveryPokemonData(allPokemonList)
	const allLoaded = pokemonDetailedQueries.every((query) => query.data)
	const [detailedList, setDetailedList] = useState<PokemonDetails[]>()

	const isDetailedPokemon = (value: unknown): value is PokemonDetails => {
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

	useEffect(() => {
		setDetailedList(
			pokemonDetailedQueries
				.map((query) => query.data)
				.filter(isDetailedPokemon),
		)
	}, [allLoaded])

	return (
		<div>
			{allLoaded && detailedList && (
				<PexesoField allPokemons={detailedList} />
			)}
		</div>
	)
}
