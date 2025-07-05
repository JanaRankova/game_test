import { useReducer } from 'react'

import { defaultPlayer1, defaultPlayer2, emptyCard } from '../common/constants'
import { Flip, Player, PokemonDetails } from '../common/types'
import { getNewDeck } from '../common/utils'
import { gameReducer } from '../common/reducer'
import { GameActions } from '../common/actions'

import GameEndScreen from '../components/GameEndScreen/GameEndScreen'
import PlayerPanel from './Player/Player'
import PxsCard from './Card/Card'
import ResetButton from './Buttons/ResetButton'

interface Props {
	allPokemons: PokemonDetails[]
}

export default function PexesoField({ allPokemons }: Props) {
	const [state, dispatch] = useReducer(gameReducer, {
		playerOne: defaultPlayer1,
		playerTwo: defaultPlayer2,
		cardOne: emptyCard,
		cardTwo: emptyCard,
		matched: [],
		turnCount: 1,
		shuffledCards: getNewDeck(),
		processing: false,
	})

	const cardsSum = 16

	const handleCardFlip = (index: number, id: number) => {
		// Forbid card flip while processing the previous turn
		if (state.processing) {
			return
		}

		if (!state.cardOne[0] && !state.cardOne[1]) {
			dispatch({ type: GameActions.SET_CARD, card: 'cardOne', flip: [index, id] })
		} else if (state.cardOne[0] !== index && !state.cardTwo[0]) {
			dispatch({ type: GameActions.SET_CARD, card: 'cardTwo', flip: [index, id] })
			processTurn(state.cardOne, [index, id])
		}
	}

	const processTurn = (first: Flip, second: Flip) => {
		dispatch({ type: GameActions.SET_PROCESSING, isProcessing: true })
		setTimeout(() => {
			dispatch({
				type: GameActions.CALCULATE_TURN,
				firstCard: first,
				secondCard: second,
				pokemonCard: first?.[1] != null ? allPokemons[first[1]] : null,
			})
			dispatch({ type: GameActions.RESET_TURN })
		}, 1500)
	}

	const getWinner = (playerFirst: Player, playerSecond: Player): string | null => {
		const firstScore = playerFirst.matchedCards.length
		const secondScore = playerSecond.matchedCards.length

		// No one won or game is reset before the end, it's a tie
		if (cardsSum !== state.matched.length || firstScore === secondScore) return null

		return firstScore > secondScore ? playerFirst.name : playerSecond.name
	}

	const resetGame = () => {
		dispatch({
			type: GameActions.RESET_GAME,
			winner: getWinner(state.playerOne, state.playerTwo),
		})
	}

	return (
		<div className="game">
			<PlayerPanel
				player={state.playerOne}
				otherPlayerName={state.playerTwo.name}
				onPlayerNameChange={(name: string) =>
					dispatch({ type: GameActions.SET_PLAYER_NAME, player: 'playerOne', name })
				}
			/>
			<div className="field-wrap">
				<div className="game-header">
					<div className="game-info">
						<p>TURN {state.turnCount}</p>
						<p>{`Player <${state.playerOne.isActive ? state.playerOne.name : state.playerTwo.name}>`}</p>
					</div>
					{state.turnCount > 1 && <ResetButton text={''} onReset={resetGame} />}
				</div>
				<div className="pexeso-field">
					<div className="pexeso">
						{allPokemons &&
							state.shuffledCards &&
							state.shuffledCards.map((pokeId, i) => (
								<div className="pexeso-square" key={i}>
									{state.matched.includes(i) ? (
										<div className="pexeso-card empty" />
									) : (
										<PxsCard
											sprite={allPokemons[pokeId]?.spriteFront}
											isFlipped={i === state.cardOne[0] || i === state.cardTwo[0]}
											onCardFlip={() => handleCardFlip(i, pokeId)}
										/>
									)}
								</div>
							))}
					</div>
					{cardsSum === state.matched.length && (
						<GameEndScreen
							winner={getWinner(state.playerOne, state.playerTwo)}
							turnCount={state.turnCount}
							onGameReset={resetGame}
						/>
					)}
				</div>
			</div>
			<PlayerPanel
				player={state.playerTwo}
				otherPlayerName={state.playerOne.name}
				onPlayerNameChange={(name: string) =>
					dispatch({ type: GameActions.SET_PLAYER_NAME, player: 'playerTwo', name })
				}
			/>
		</div>
	)
}
