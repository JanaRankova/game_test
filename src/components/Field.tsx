import { useState } from 'react'
import { shuffleArray } from '../utils'
import PxsCard from './Cards/PxsCard'
import { PokemonDetails } from '../api'

interface Props {
	allPokemons: PokemonDetails[]
}

const numbers: number[] = []
for (let index = 0; numbers.length < 16; index++) {
	const random = Math.floor(Math.random() * 151)
	if (!numbers.includes(random)) {
		numbers.push(random)
		numbers.push(random)
	}
}
const shuffledCards = shuffleArray(numbers)

export default function PexesoField({ allPokemons }: Props) {
	const [firstFlip, setFirstFlip] = useState<(number | null)[] | null>(null)
	const [secondFlip, setSecondFlip] = useState<(number | null)[] | null>(null)
	for (let index = 0; index < shuffledCards.length; index++) {
		console.log(allPokemons[numbers[index]])
	}

	function handleCardFlip(index: number, id: number) {
		console.log('start')

		if (!firstFlip) {
			console.log('first')

			setFirstFlip([index, id])
		} else if (firstFlip[0] !== index && !secondFlip) {
			console.log('second')

			setSecondFlip(index, id)
		} else {
			console.log('last')

			setFirstFlip(null)
			setSecondFlip(null)
		}
	}
	console.log('first', firstFlip)
	console.log('second', firstFlip)

	const flipped = (id: number): boolean =>
		firstFlip[1] === id ||
		(!!(secondFlip && !secondFlip) && secondFlip[1] === id)

	return (
		<div className="psx-field">
			{allPokemons &&
				shuffledCards &&
				shuffledCards.map((pokId, i) => (
					<div className="psx-square" key={i}>
						<PxsCard
							id={allPokemons[pokId]?.id}
							name={allPokemons[pokId]?.name}
							sprite={allPokemons[pokId]?.spriteFront}
							isFlipped={flipped(allPokemons[pokId]?.id)}
							onCardFlip={(id) => handleCardFlip(i, id)}
						/>
					</div>
				))}
		</div>
	)
}
