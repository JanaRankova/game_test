import { useState, useEffect } from 'react'
import { shuffleArray } from '../utils'
import PxsCard from './Cards/PxsCard'
import { PokemonDetails } from '../api'

interface Props {
	allPokemons: PokemonDetails[]
}

interface Player {
	id: number
	name: string
	matchedCards: number[]
	isActive: boolean
}

type Flip = (number | null)[]

const numbers: number[] = []
for (let index = 0; numbers.length < 16; index++) {
	const random = Math.floor(Math.random() * 151)
	if (!numbers.includes(random)) {
		numbers.push(random)
		numbers.push(random)
	}
}
const shuffledCards = shuffleArray(numbers)

const basePlayer: Player = {
	id: 0,
	name: '1',
	matchedCards: [],
	isActive: true,
}
const player2: Player = {
	id: 1,
	name: '2',
	matchedCards: [],
	isActive: false,
}

export default function PexesoField({ allPokemons }: Props) {
	const emptyFlip: Flip = [null, null]
	const [firstFlip, setFirstFlip] = useState<Flip>(emptyFlip)
	const [secondFlip, setSecondFlip] = useState<Flip>(emptyFlip)
	const [player, setPlayer] = useState<Player>(basePlayer)
	const [turn, setTurn] = useState<Flip[]>([])
	const [matched, setMatched] = useState<number[]>([])
	/* 	for (let index = 0; index < shuffledCards.length; index++) {
		console.log(allPokemons[numbers[index]])
	} */

	let turnCount = 1

	// let step = 0

	// while (step >= 2) {}

	function handleCardFlip(index: number, id: number) {
		console.log('start')

		if (!firstFlip[0] && !firstFlip[1]) {
			setFirstFlip([index, id])
		} else if (firstFlip[0] !== index && !secondFlip[0]) {
			setSecondFlip([index, id])
		} /*  else {
			setFirstFlip(emptyFlip)
			setSecondFlip(emptyFlip)
		} */
	}

	function cardsTurning(turn: Flip[], cardIndex: number, cardId: number) {
		if (!turn.length) {
			setFirstFlip([cardIndex, cardId])
			setTurn([[cardIndex, cardId]])
		} else if (turn.length === 1) {
			setSecondFlip([cardIndex, cardId])
			setTurn([...turn, [cardIndex, cardId]])
		}
		console.log('Turn', turn)
	}

	console.log('first', firstFlip)
	console.log('second', secondFlip)

	// TODO: make a sense of a turns and flips
	/* 	useEffect(() => {
		console.log('here', turn)
		if (
			turn.length === 2 &&
			firstFlip[0] &&
			secondFlip[0] &&
			firstFlip[1] === secondFlip[1]
		) {
			setMatched([...matched, firstFlip[0], secondFlip[0]])
			setFirstFlip(emptyFlip)
			setSecondFlip(emptyFlip)
			setTurn([])
		}
		console.log(matched)
	}, [turn.length]) */

	console.log(turn)

	if (turn.length === 2 && firstFlip[0] && secondFlip[0]) {
		console.log('did we got here?')
		if (firstFlip[1] === secondFlip[1]) {
			setMatched([...matched, firstFlip[0], secondFlip[0]])
		}
		setFirstFlip(emptyFlip)
		setSecondFlip(emptyFlip)
		setTurn([])
	}

	function isMatch(flipFirst: Flip, flipSecond: Flip) {
		return flipFirst[1] === flipSecond[1]
	}

	function isGameEnd(cardsCount = 16, matched: number[]) {
		return cardsCount === matched.length
	}

	function getWinner(playerFirst: Player, playerSecond: Player): string {
		if (
			playerFirst.matchedCards.length === playerSecond.matchedCards.length
		) {
			return `It's a tie!`
		} else if (
			playerFirst.matchedCards.length > playerSecond.matchedCards.length
		) {
			return `Winner is ${playerFirst.name}!`
		} else {
			return `Winner is ${playerSecond.name}!`
		}
	}

	/*
		TURN logic
		- flip cards 2x
		- check if matched
		- find out if game finished
		- get winner
		- change player
		- add to a turn count


	*/

	return (
		<>
			<div>
				<p>TURN {turnCount}</p>
				<p>{`Player <${player.name}>`}</p>
			</div>
			<div className="psx-field">
				{allPokemons &&
					shuffledCards &&
					shuffledCards.map((pokId, i) => (
						<div className={`psx-square`} key={i}>
							{matched.includes(i) ? (
								<div className="pxs_card empty">Matched</div>
							) : (
								<PxsCard
									id={allPokemons[pokId]?.id}
									name={allPokemons[pokId]?.name}
									sprite={allPokemons[pokId]?.spriteFront}
									isFlipped={i === firstFlip[0] || i === secondFlip[0]}
									onCardFlip={(id) => {
										/* handleCardFlip(i, id) */
										cardsTurning(turn, i, id)
									}}
								/>
							)}
						</div>
					))}
			</div>
		</>
	)
}
