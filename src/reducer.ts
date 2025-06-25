import { Action, GameActions } from './actions'
import { emptyCard } from './constants'
import { GameState, Player, isNonNullFlip } from './types'
import { getNewDeck } from './utils'

export const gameReducer = (state: GameState, action: Action): GameState => {
	switch (action.type) {
		case GameActions.CALCULATE_TURN: {
			const { firstCard, secondCard, pokemonCard } = action
			const isMatch =
				isNonNullFlip(firstCard) &&
				isNonNullFlip(secondCard) &&
				firstCard[1] === secondCard[1] &&
				pokemonCard

			// After there is no match, change to another player
			if (!isMatch) {
				return {
					...state,
					playerOne: { ...state.playerOne, isActive: !state.playerOne.isActive },
					playerTwo: { ...state.playerTwo, isActive: !state.playerTwo.isActive },
				}
			}

			// When matched add cards that are matched and switch players
			const matched = [...state.matched, firstCard[0], secondCard[0]]
			if (state.playerOne.isActive) {
				return {
					...state,
					matched,
					playerOne: {
						...state.playerOne,
						matchedCards: [...state.playerOne.matchedCards, pokemonCard],
					},
				}
			} else {
				return {
					...state,
					matched,
					playerTwo: {
						...state.playerTwo,
						matchedCards: [...state.playerTwo.matchedCards, pokemonCard],
					},
				}
			}
		}

		case GameActions.SET_CARD: {
			return { ...state, [action.card]: action.flip }
		}

		case GameActions.SET_PLAYER_NAME: {
			const player = action.player === 'playerOne' ? state.playerOne : state.playerTwo

			return { ...state, [action.player]: { ...player, name: action.name } }
		}

		case GameActions.SET_PROCESSING: {
			return { ...state, processing: action.isProcessing }
		}

		case GameActions.RESET_TURN: {
			return {
				...state,
				cardOne: emptyCard,
				cardTwo: emptyCard,
				processing: false,
				turnCount: state.turnCount + 1,
			}
		}

		case GameActions.RESET_GAME: {
			const { winner } = action

			let playerOneUpdate: Player = { ...state.playerOne, matchedCards: [] }
			let playerTwoUpdate: Player = { ...state.playerTwo, matchedCards: [] }

			if (!winner) {
				const firstStarts = Math.random() < 0.5
				playerOneUpdate = { ...state.playerOne, isActive: firstStarts, matchedCards: [] }
				playerTwoUpdate = { ...state.playerTwo, isActive: !firstStarts, matchedCards: [] }
			} else if (winner === state.playerOne.name) {
				playerOneUpdate = {
					...playerOneUpdate,
					gamesWon: state.playerOne.gamesWon + 1,
					isActive: true,
				}
				playerTwoUpdate.isActive = false
			} else {
				playerTwoUpdate = {
					...playerTwoUpdate,
					gamesWon: state.playerTwo.gamesWon + 1,
					isActive: true,
				}
				playerOneUpdate.isActive = false
			}

			return {
				playerOne: playerOneUpdate,
				playerTwo: playerTwoUpdate,
				cardOne: emptyCard,
				cardTwo: emptyCard,
				matched: [],
				turnCount: 1,
				shuffledCards: getNewDeck(),
				processing: false,
			}
		}

		default:
			return state
	}
}
