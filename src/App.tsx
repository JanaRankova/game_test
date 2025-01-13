import { useState, useEffect } from 'react'
import { useGetPokemon, useGetAllPokemons } from './api'

type PokemonList = { name: string; url: string }[]

function App() {
	const pokemonName = 'ditto'
	//const { isLoading, data } = useGetPokemon(pokemonName)
	const { isLoading, data } = useGetAllPokemons()
	// const facK = (data: PokemonList | undefined) => {
	// 	const list = data && Object.keys(data).map((k) => data[k])

	// }

	return (
		<>
			<div className="top">TOP</div>
			<div className="content">
				<div className="side">
					Here lays dragons of non-existent side bar!
				</div>
				<div className="main-content">
					{/* {isLoading ? (
						<p>load</p>
					) : (
						data && (
							<>
								<h1>{data.name}</h1>
								<h3>{data.id}</h3>
								<img
									src={data.sprites.front_default || undefined}
									height={150}
									width={150}
								/>
							</>
						)
					)} */}
					{isLoading ? (
						<p>load</p>
					) : (
						data &&
						data.results.map((item, index) => (
							<div key={index}>{item.name}</div>
						))
					)}
				</div>
			</div>
			<div className="bottom"> BOTTOM</div>
		</>
	)
}

export default App
