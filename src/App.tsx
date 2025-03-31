import { useGetAllPokemons } from './api'
import Content from './components/Content'

function App() {
	const { isLoading, data: allPokemonList, isError } = useGetAllPokemons()

	return (
		<>
			<div className="top">TOP</div>
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
			<div className="bottom"> BOTTOM</div>
		</>
	)
}

export default App
