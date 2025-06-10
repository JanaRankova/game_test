import { useGetAllPokemons, useGetEveryPokemonData } from './api'
import { isDetailedPokemon, isPokemonListItem } from './types'
import pkmLogo from './assets/pokemon-logo-png-file-pokemon-logo-png-500.png'
import DefaultFallback from './components/ErrorHandling/DefaultFallback'
import Game from './components/Game'
import Loading from './components/Loading'

function App() {
	const {
		isLoading,
		data: allPokemonList,
		isError,
		error,
	} = useGetAllPokemons()

	const allPokemonListResult = allPokemonList?.results?.every(
		isPokemonListItem,
	)
		? allPokemonList.results
		: []

	const pokemonDetailedQueries = useGetEveryPokemonData(allPokemonListResult)
	const allLoaded =
		!!pokemonDetailedQueries.length &&
		pokemonDetailedQueries.every((query) => query.isSuccess)

	const detailedList = allLoaded
		? pokemonDetailedQueries
				.map((query) => query.data)
				.filter(isDetailedPokemon)
		: []

	return (
		<>
			<div className="top">
				<img src={pkmLogo} height="48" />
				<div className="top-panel">Memory game</div>
			</div>
			<div className="content">
				<div className="left" />
				<div className="main-content">
					{isLoading ? (
						<Loading />
					) : isError ? (
						<DefaultFallback error={error as string} />
					) : (
						allLoaded &&
						detailedList && <Game allPokemons={detailedList} />
					)}
				</div>
				<div className="right" />
			</div>
			<div className="bottom">
				<div>Interactive Pokémon-Themed Game - React + TypeScript</div>
				<i>
					Made by <a href="https://github.com/JanaRankova">Jana Rankova</a>
				</i>
			</div>
		</>
	)
}

export default App
