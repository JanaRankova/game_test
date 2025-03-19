import { useEffect, useState } from 'react'
import { PokemonList, useGetEveryPokemonData, PokemonDetails } from '../api'
import PexesoField from './Field'

const cards: {
	position: number[]
	name: string
}[] = []

for (let index = 0; index < 4; index++) {
	for (let i = 0; i < 4; i++) {
		cards.push({ name: '', position: [index, i] })
	}
}

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
		<div className="main-content">
			{allLoaded && detailedList && (
				<PexesoField allPokemons={detailedList} />
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
