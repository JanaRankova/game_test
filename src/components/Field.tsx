import { useState } from 'react'
import { shuffleArray } from '../utils'
import PxsCard from './Cards/PxsCard'
import PlayerPanel from './Player'
import { PokemonDetails } from '../types'
import { Player, Flip } from '../types'

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

const defaultPlayer1: Player = {
	id: 0,
	name: 'Player 1',
	matchedCards: [],
	isActive: true,
}
const defaultPlayer2: Player = {
	id: 1,
	name: 'Player 2',
	matchedCards: [],
	isActive: false,
}

export default function PexesoField({ allPokemons }: Props) {
	const emptyCard: Flip = [null, null]
	const [cardOne, setCardOne] = useState<Flip>(emptyCard)
	const [cardTwo, setCardTwo] = useState<Flip>(emptyCard)
	const [isPlayerOneActive, setIsPlayerOneActive] = useState(true)
	const [playerOne, setPlayerOne] = useState<Player>(defaultPlayer1)
	const [playerTwo, setPlayerTwo] = useState<Player>(defaultPlayer2)
	const [processing, setProcessing] = useState(false)
	const [matched, setMatched] = useState<number[]>([])
	const [turnCount, setTurnCount] = useState(1)

	const handleCardFlip = (index: number, id: number) => {
		if (processing) {
			return
		}

		if (!cardOne[0] && !cardOne[1]) {
			setCardOne([index, id])
		} else if (cardOne[0] !== index && !cardTwo[0]) {
			setCardTwo([index, id])
			processTurn(cardOne, [index, id])
		}
	}

	console.log('first', cardOne)
	console.log('second', cardTwo)
	console.log('matched', matched)

	const resetTurn = () => {
		setCardOne(emptyCard)
		setCardTwo(emptyCard)
		setProcessing(false)
		setTurnCount(turnCount + 1)
	}

	const calculate = (firstCard: Flip, secondCard: Flip) => {
		console.log('card check', firstCard[1], secondCard[1])

		if (firstCard[1] === secondCard[1]) {
			// FIXME: Type check for indexes
			console.log('i am matched')

			setMatched([...matched, firstCard[0], secondCard[0]])
			if (isPlayerOneActive) {
				setPlayerOne({
					...playerOne,
					matchedCards: [
						...playerOne.matchedCards,
						allPokemons[firstCard[1]],
					],
				}) // FIXME: Type check for indexes
			} else {
				setPlayerTwo({
					...playerTwo,
					matchedCards: [
						...playerTwo.matchedCards,
						allPokemons[firstCard[1]],
					],
				})
			}
		} else {
			console.log('reset player')
			setIsPlayerOneActive(!isPlayerOneActive)
		}
	}

	const isGameEnd = (matched: number[], cardsCount = 16) => {
		console.log('cardsCount', cardsCount, matched.length)
		// FIXME: return back to max
		return 4 === matched.length
	}

	const processTurn = (first: Flip, second: Flip) => {
		console.log('process start')
		setProcessing(true)
		setTimeout(() => {
			calculate(first, second)
			resetTurn()
		}, 1500)
	}

	const getWinner = (playerFirst: Player, playerSecond: Player): string => {
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

	const resetGame = () => {}

	return (
		<div className="game">
			<PlayerPanel player={playerOne} />
			<div className="field-wrap">
				<div>
					<p>TURN {turnCount}</p>
					<p>{`Player <${isPlayerOneActive ? playerOne.name : defaultPlayer2.name}>`}</p>
				</div>
				<div className="psx-field">
					<div className="pexeso">
						{allPokemons &&
							shuffledCards &&
							shuffledCards.map((pokeId, i) => (
								<div className={`psx-square`} key={i}>
									{matched.includes(i) ? (
										<div className="pxs_card empty" />
									) : (
										<PxsCard
											sprite={allPokemons[pokeId]?.spriteFront}
											isFlipped={
												i === cardOne[0] || i === cardTwo[0]
											}
											onCardFlip={() => handleCardFlip(i, pokeId)}
										/>
									)}
								</div>
							))}
					</div>
					{true /* isGameEnd(matched, 4) */ && (
						<div className="game-end-screen">
							<div>
								<h4 className="bold">Game over</h4>
								<h3 className="winner">
									{getWinner(playerOne, playerTwo)}
								</h3>
								<div>Game ended after # {turnCount}.</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<PlayerPanel player={playerTwo} />
		</div>
	)
}
