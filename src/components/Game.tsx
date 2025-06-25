import { useState } from 'react'

import { defaultPlayer1, defaultPlayer2 } from '../constants'
import { Flip, Player, PokemonDetails, isNonNullFlip } from '../types'
import { getNewDeck } from '../utils'

import GameEndScreen from '../components/GameEndScreen/GameEndScreen'
import PlayerPanel from './Player/Player'
import PxsCard from './Card/Card'
import ResetButton from './Buttons/ResetButton'

interface Props {
	allPokemons: PokemonDetails[]
}

const emptyCard: Flip = [null, null]

export default function PexesoField({ allPokemons }: Props) {
	const [shuffledCards, setShuffledCards] = useState(getNewDeck())
	const [cardOne, setCardOne] = useState<Flip>(emptyCard)
	const [cardTwo, setCardTwo] = useState<Flip>(emptyCard)
	const [playerOne, setPlayerOne] = useState<Player>(defaultPlayer1)
	const [playerTwo, setPlayerTwo] = useState<Player>(defaultPlayer2)
	const [processing, setProcessing] = useState(false)
	const [matched, setMatched] = useState<number[]>([])
	const [turnCount, setTurnCount] = useState(1)
	const cardsSum = 16

	const handleCardFlip = (index: number, id: number) => {
		// Forbid card flip while processing the previous turn
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

	const calculateTurn = (firstCard: Flip, secondCard: Flip) => {
		if (isNonNullFlip(firstCard) && isNonNullFlip(secondCard) && firstCard[1] === secondCard[1]) {
			setMatched([...matched, firstCard[0], secondCard[0]])
			if (playerOne.isActive) {
				setPlayerOne({
					...playerOne,
					matchedCards: [...playerOne.matchedCards, allPokemons[firstCard[1]]],
				})
			} else {
				setPlayerTwo({
					...playerTwo,
					matchedCards: [...playerTwo.matchedCards, allPokemons[firstCard[1]]],
				})
			}
		} else {
			// Switch players after a turn with no match
			setPlayerTwo((prev) => ({ ...prev, isActive: !prev.isActive }))
			setPlayerOne((prev) => ({ ...prev, isActive: !prev.isActive }))
		}
	}

	const processTurn = (first: Flip, second: Flip) => {
		setProcessing(true)
		setTimeout(() => {
			calculateTurn(first, second)
			resetTurn()
		}, 1500)
	}

	const getWinner = (playerFirst: Player, playerSecond: Player): string | null => {
		const firstScore = playerFirst.matchedCards.length
		const secondScore = playerSecond.matchedCards.length

		// No one won or game is reset before the end, it's a tie
		if (cardsSum !== matched.length || firstScore === secondScore) return null

		return firstScore > secondScore ? playerFirst.name : playerTwo.name
	}

	const resetGame = () => {
		// Winner is the first on turn unless it's a tie - then pick player randomly.
		const winner = getWinner(playerOne, playerTwo)

		let playerOneUpdate = { ...playerOne, matchedCards: [] }
		let playerTwoUpdate = { ...playerTwo, matchedCards: [] }

		if (!winner) {
			const firstStarts = Math.random() < 0.5
			playerOneUpdate.isActive = firstStarts
			playerTwoUpdate.isActive = !firstStarts
		} else if (winner === playerOne.name) {
			playerOneUpdate = {
				...playerOneUpdate,
				gamesWon: playerOne.gamesWon + 1,
				isActive: true,
			}
			playerTwoUpdate.isActive = false
		} else {
			playerTwoUpdate = {
				...playerTwoUpdate,
				gamesWon: playerTwo.gamesWon + 1,
				isActive: true,
			}
			playerOneUpdate.isActive = false
		}

		setPlayerOne(playerOneUpdate)
		setPlayerTwo(playerTwoUpdate)

		setCardOne(emptyCard)
		setCardTwo(emptyCard)
		setMatched([])
		setTurnCount(1)
		setShuffledCards(getNewDeck())
	}

	return (
		<div className="game">
			<PlayerPanel
				player={playerOne}
				otherPlayerName={playerTwo.name}
				onPlayerNameChange={(name: string) => setPlayerOne((prev) => ({ ...prev, name: name }))}
			/>
			<div className="field-wrap">
				<div className="game-header">
					<div className="game-info">
						<p>TURN {turnCount}</p>
						<p>{`Player <${playerOne.isActive ? playerOne.name : defaultPlayer2.name}>`}</p>
					</div>
					{turnCount > 1 && <ResetButton text={''} onReset={resetGame} />}
				</div>
				<div className="pexeso-field">
					<div className="pexeso">
						{allPokemons &&
							shuffledCards &&
							shuffledCards.map((pokeId, i) => (
								<div className="pexeso-square" key={i}>
									{matched.includes(i) ? (
										<div className="pexeso-card empty" />
									) : (
										<PxsCard
											sprite={allPokemons[pokeId]?.spriteFront}
											isFlipped={i === cardOne[0] || i === cardTwo[0]}
											onCardFlip={() => handleCardFlip(i, pokeId)}
										/>
									)}
								</div>
							))}
					</div>
					{cardsSum === matched.length && (
						<GameEndScreen
							winner={getWinner(playerOne, playerTwo)}
							turnCount={turnCount}
							onGameReset={resetGame}
						/>
					)}
				</div>
			</div>
			<PlayerPanel
				player={playerTwo}
				otherPlayerName={playerOne.name}
				onPlayerNameChange={(name: string) => setPlayerTwo((prev) => ({ ...prev, name: name }))}
			/>
		</div>
	)
}
