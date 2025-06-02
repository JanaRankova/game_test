import { useGetAllPokemons } from './api'
import Content from './components/Content'
import Loading from './components/Loading'
import DefaultFallback from './components/ErrorHandling/DefaultFallback'
import pkmLogo from './assets/pokemon-logo-png-file-pokemon-logo-png-500.png'

function App() {
	const {
		isLoading,
		data: allPokemonList,
		isError,
		error,
	} = useGetAllPokemons()

	return (
		<>
			<div className="top">
				<img src={pkmLogo} height="48" />
				<div className="top-panel">Memory game</div>
			</div>
			<div className="content">
				<div className="left" />
				<div className="main-content">
					{isLoading && <Loading />}
					{isError && <DefaultFallback error={error as string} />}
					{allPokemonList?.results && (
						<Content allPokemonList={allPokemonList?.results} />
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
