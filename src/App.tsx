import { useGetAllPokemons } from './api'
import Content from './components/Content'

function App() {
	const { isLoading, data: allPokemonList, isError } = useGetAllPokemons()

	return (
		<>
			<div className="top">
				Pokemon game logo | Memory game | Pokemon list
			</div>
			<div className="content">
				{/* <div className="side">
					Here lays dragons of non-existent side bar!
				</div> */}
				<>
					{isLoading && <div className="loading">LOADING</div>}
					{isError && <div className="error">Error</div>}
					{allPokemonList?.results && (
						<Content allPokemonList={allPokemonList?.results} />
					)}
				</>
			</div>
			<div className="bottom">
				<div>Showcase pokemon themed game app</div>
				<i>Made by Jana Rankova</i>
			</div>
		</>
	)
}

export default App
