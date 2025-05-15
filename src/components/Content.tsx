import { useEffect, useState } from 'react'
import { isDetailedPokemon } from '../types'
import { PokemonList, useGetEveryPokemonData } from '../api'
import PexesoField from './Field'

interface Props {
	allPokemonList: PokemonList
}

export default function Content({ allPokemonList }: Props) {
	const pokemonDetailedQueries = useGetEveryPokemonData(allPokemonList)
	const allLoaded = pokemonDetailedQueries.every((query) => query.data)
	const [detailedList, setDetailedList] = useState<PokemonDetails[]>()

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
