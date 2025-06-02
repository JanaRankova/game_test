import { useState, useEffect } from 'react'

import { Flip, GameResult, isNonNullFlip } from '../types'
import { shuffleArray } from '../utils'
import { defaultPlayer1, defaultPlayer2, gameEndMessage } from '../constants'

import PxsCard from './Card/Card'
import PlayerPanel from './Player/Player'
import GameEndScreen from './GameEndScreen'

interface Props {
	allPokemons: PokemonDetails[]
}

const emptyCard: Flip = [null, null]

export default function PexesoField({ allPokemons }: Props) {
	const [shuffledCards, setShuffledCards] = useState<number[]>([])
	const [cardOne, setCardOne] = useState<Flip>(emptyCard)
	const [cardTwo, setCardTwo] = useState<Flip>(emptyCard)
	const [playerOne, setPlayerOne] = useState<Player>(defaultPlayer1)
	const [playerTwo, setPlayerTwo] = useState<Player>(defaultPlayer2)
	const [processing, setProcessing] = useState(false)
	const [matched, setMatched] = useState<number[]>([])
	const [turnCount, setTurnCount] = useState(1)

	const getNewDeck = () => {
		const numbers: number[] = []
		for (let index = 0; numbers.length < 16; index++) {
			const random = Math.floor(Math.random() * 151)
			if (!numbers.includes(random)) {
				numbers.push(random)
				numbers.push(random)
			}
		}
		setShuffledCards(shuffleArray(numbers))
	}

	useEffect(() => {
		getNewDeck()
	}, [])

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

	const resetTurn = () => {
		setCardOne(emptyCard)
		setCardTwo(emptyCard)
		setProcessing(false)
		setTurnCount(turnCount + 1)
	}

	const calculate = (firstCard: Flip, secondCard: Flip) => {
		if (
			isNonNullFlip(firstCard) &&
			isNonNullFlip(secondCard) &&
			firstCard[1] === secondCard[1]
		) {
			setMatched([...matched, firstCard[0], secondCard[0]])
			if (playerOne.isActive) {
				setPlayerOne({
					...playerOne,
					matchedCards: [
						...playerOne.matchedCards,
						allPokemons[firstCard[1]],
					],
				})
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
			setPlayerTwo((prev) => ({ ...prev, isActive: !prev.isActive }))
			setPlayerOne((prev) => ({ ...prev, isActive: !prev.isActive }))
		}
	}

	const isGameEnd = (matched: number[], cardsCount = 16) => {
		return cardsCount === matched.length
	}

	const processTurn = (first: Flip, second: Flip) => {
		setProcessing(true)
		setTimeout(() => {
			calculate(first, second)
			resetTurn()
		}, 1500)
	}

	const getWinner = (
		playerFirst: Player,
		playerSecond: Player,
	): GameResult => {
		const firstScore = playerFirst.matchedCards.length
		const secondScore = playerSecond.matchedCards.length

		if (firstScore === secondScore) return 0

		return firstScore > secondScore ? 1 : 2
	}

	const resetGame = () => {
		// Winner is the first on turn unless it's tie, then pick from players
		// randomly.
		const winner = getWinner(playerOne, playerTwo)
		if (winner === 0) {
			const firstStarts = Math.random() < 0.5
			setPlayerOne((prev) => ({
				...prev,
				gamesWon: prev.gamesWon + 1,
				isActive: firstStarts,
			}))
			setPlayerTwo((prev) => ({
				...prev,
				gamesWon: prev.gamesWon + 1,
				isActive: !firstStarts,
			}))
		} else if (winner === 1) {
			setPlayerOne((prev) => ({
				...prev,
				gamesWon: prev.gamesWon + 1,
				isActive: true,
			}))
		} else {
			setPlayerTwo((prev) => ({
				...prev,
				gamesWon: prev.gamesWon + 1,
				isActive: true,
			}))
		}
		setPlayerOne((prev) => ({ ...prev, matchedCards: [] }))
		setPlayerTwo((prev) => ({ ...prev, matchedCards: [] }))
		setMatched([])
		setTurnCount(0)
		getNewDeck()
	}

	const getEndMessage = () => {
		const winner = getWinner(playerOne, playerTwo)

		if (!winner) {
			return gameEndMessage(winner, '')
		}

		return gameEndMessage(
			winner,
			winner === 1 ? playerOne.name : playerTwo.name,
		)
	}

	return (
		<div className="game">
			<PlayerPanel
				player={playerOne}
				onPlayerNameChange={(name: string) =>
					setPlayerOne((prev) => ({ ...prev, name: name }))
				}
			/>
			<div className="field-wrap">
				<div>
					<p>TURN {turnCount}</p>
					<p>{`Player <${playerOne.isActive ? playerOne.name : defaultPlayer2.name}>`}</p>
				</div>
				<div className="pexeso-field">
					<div className="pexeso">
						{allPokemons &&
							shuffledCards &&
							shuffledCards.map((pokeId, i) => (
								<div className="psx-square" key={i}>
									{matched.includes(i) ? (
										<div className="pexeso-card empty" />
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
					{isGameEnd(matched) && (
						<GameEndScreen
							message={getEndMessage()}
							turnCount={turnCount}
							onGameReset={resetGame}
						/>
					)}
				</div>
			</div>
			<PlayerPanel
				player={playerTwo}
				onPlayerNameChange={(name: string) =>
					setPlayerTwo((prev) => ({ ...prev, name: name }))
				}
			/>
		</div>
	)
}
