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
	const emptyCard: Flip = [null, null]
	const [cardOne, setCardOne] = useState<Flip>(emptyCard)
	const [cardTwo, setCardTwo] = useState<Flip>(emptyCard)
	const [isPlayerOneActive, setIsPlayerOneActive] = useState(true)
	const [playerOne, setPlayerOne] = useState<Player>(basePlayer)
	const [playerTwo, setPlayerTwo] = useState<Player>(player2)
	const [processing, setProcessing] = useState(false)
	const [matched, setMatched] = useState<number[]>([])
	/* 	for (let index = 0; index < shuffledCards.length; index++) {
		console.log(allPokemons[numbers[index]])
	} */

	let turnCount = 1

	// let step = 0

	// while (step >= 2) {}

	function handleCardFlip(index: number, id: number) {
		console.log('start')

		if (!cardOne[0] && !cardOne[1]) {
			setCardOne([index, id])
		} else if (cardOne[0] !== index && !cardTwo[0]) {
			setCardTwo([index, id])
			process(cardOne, [index, id]) // Because state isn't updated yet
		}
	}

	/* 	function cardsTurning(turn: Flip[], cardIndex: number, cardId: number) {
		if (!turn.length) {
			setFirstFlip([cardIndex, cardId])
			setTurn([[cardIndex, cardId]])
		} else if (turn.length === 1) {
			setSecondFlip([cardIndex, cardId])
			setTurn([...turn, [cardIndex, cardId]])
		}
		console.log('Turn', turn)
	} */

	console.log('first', cardOne)
	console.log('second', cardTwo)

	// TODO: make a sense of a turns and flips
	/* 	useEffect(() => {
		console.log('here', turn)
		if (
			turn.length === 2 &&
			cardOne[0] &&
			cardTwo[0] &&
			cardOne[1] === cardTwo[1]
		) {
			setMatched([...matched, cardOne[0], cardTwo[0]])
			setCardOne(emptyCard)
			setCardTwo(emptyCard)
			setTurn([])
		}
		console.log(matched)
	}, [turn.length]) */

	console.log('matched', matched)

	/* if (turn.length === 2 && firstFlip[0] && secondFlip[0]) {
		console.log('did we got here?')
		if (firstFlip[1] === secondFlip[1]) {
			setMatched([...matched, firstFlip[0], secondFlip[0]])
		}
		setFirstFlip(emptyFlip)
		setSecondFlip(emptyFlip)
		setTurn([])
	} */

	const process = (first: Flip, second: Flip) => {
		console.log('process start')
		setProcessing(true)
		setTimeout(() => {
			calculate(first, second)
			setCardOne(emptyCard)
			setCardTwo(emptyCard)
			setProcessing(false)
			turnCount = turnCount + 1
		}, 1500)
	}
	function calculate(firstCard: Flip, secondCard: Flip) {
		console.log('card check', firstCard[1], secondCard[1])

		if (firstCard[1] === secondCard[1]) {
			// FIXME: Type check for indexes
			console.log('i am matched')

			setMatched([...matched, firstCard[0], secondCard[0]])
			if (isPlayerOneActive) {
				setPlayerOne({
					...playerOne,
					matchedCards: [...playerOne.matchedCards, firstCard[1]],
				}) // FIXME: Type check for indexes
			} else {
				setPlayerTwo({
					...playerTwo,
					matchedCards: [...playerTwo.matchedCards, firstCard[1]],
				})
			}
		} else {
			console.log('reset player')
			setIsPlayerOneActive(!isPlayerOneActive)
		}
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
				<p>{`Player <${isPlayerOneActive ? playerOne.name : player2.name}>`}</p>
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
									isFlipped={i === cardOne[0] || i === cardTwo[0]}
									onCardFlip={(id) => {
										/* handleCardFlip(i, id) */
										handleCardFlip(i, id)
									}}
								/>
							)}
						</div>
					))}
			</div>
		</>
	)
}
