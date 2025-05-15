import { useGetAllPokemons } from './api'
import Content from './components/Content'
import Loading from './components/Loading'
import pkmLogo from './assets/pokemon-logo-png-file-pokemon-logo-png-500.png'

function App() {
	const { isLoading, data: allPokemonList, isError } = useGetAllPokemons()

	return (
		<>
			<div className="top">
				<img src={pkmLogo} height="48" />
				<div className="btn top-panel">Memory game</div>
				<div className="btn top-panel">Pokemon list</div>
			</div>
			<div className="content">
				<div className="left" />
				<div className="main-content">
					{isLoading && <Loading />}
					{isError && <div className="error">Error</div>}
					{allPokemonList?.results && (
						<Content allPokemonList={allPokemonList?.results} />
					)}
				</div>
				<div className="right" />
			</div>
			<div className="bottom">
				<div>Showcase pokemon themed game app</div>
				<i>Made by Jana Rankova</i>
			</div>
		</>
	)
}

export default App
