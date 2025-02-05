import { useState, useEffect } from 'react'
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
	const emptyFlip = [null, null]
	const [matched, setMatched] = useState<number[]>([])
	const [firstFlip, setFirstFlip] = useState<(number | null)[]>(emptyFlip)
	const [secondFlip, setSecondFlip] = useState<(number | null)[]>(emptyFlip)
	/* 	for (let index = 0; index < shuffledCards.length; index++) {
		console.log(allPokemons[numbers[index]])
	} */

	function handleCardFlip(index: number, id: number) {
		console.log('start')

		if (!firstFlip[0] && !firstFlip[1]) {
			setFirstFlip([index, id])
		} else if (firstFlip[0] !== index && !secondFlip[0]) {
			setSecondFlip([index, id])
		} else {
			setFirstFlip(emptyFlip)
			setSecondFlip(emptyFlip)
		}
	}

	console.log('second', secondFlip)

	useEffect(() => {
		console.log('here')
		if (firstFlip[0] && secondFlip[0] && firstFlip[1] === secondFlip[1]) {
			setMatched([...matched, firstFlip[0], secondFlip[0]])
			setFirstFlip(emptyFlip)
			setSecondFlip(emptyFlip)
		}
		console.log(matched)
	}, [secondFlip[0]])

	/* 	const flipped = (id: number): boolean =>
		if (firstFlip[1] === id)
		firstFlip[1] === id ||
		(firstFlip.every((i) => !!i) && !!secondFlip[0] && secondFlip[1] === id)
 */

	return (
		<div className="psx-field">
			{allPokemons &&
				shuffledCards &&
				shuffledCards.map((pokId, i) => (
					<div className="psx-square" key={i}>
						{matched.includes(i) ? (
							<span>matched</span>
						) : (
							<PxsCard
								id={allPokemons[pokId]?.id}
								name={allPokemons[pokId]?.name}
								sprite={allPokemons[pokId]?.spriteFront}
								isFlipped={i === firstFlip[0] || i === secondFlip[0]}
								onCardFlip={(id) => handleCardFlip(i, id)}
							/>
						)}
					</div>
				))}
		</div>
	)
}
