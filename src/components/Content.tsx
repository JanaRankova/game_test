import { useEffect, useState } from 'react'
import { PokemonList, useGetEveryPokemonData, PokemonDetails } from '../api'
import PxsCard from './Cards/PxsCard'

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

	const ditto = (detailedList || []).find((p) => p.id === 132)

	return (
		<div>
			{allLoaded && ditto && (
				<PxsCard
					id={ditto.id}
					name={ditto.name}
					sprite={ditto.spriteFront}
				/>
			)}
			{/* {allPokemonList.map((p) => (
				<p key={p.name}>
					{p.name}
					<br />
					{p.url}
					<br />
				</p>
			))} */}
		</div>
	)
}
