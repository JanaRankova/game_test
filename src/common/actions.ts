import { Flip, PokemonDetails } from './types'

export enum GameActions {
	CALCULATE_TURN = 'CALCULATE_TURN',
	SET_CARD = 'SET_CARD',
	SET_PLAYER_NAME = 'SET_PLAYER_NAME',
	SET_PROCESSING = 'SET_PROCESSING',
	RESET_TURN = 'RESET_TURN',
	RESET_GAME = 'RESET_GAME',
}

type CalculateTurnAction = {
	type: GameActions.CALCULATE_TURN
	firstCard: Flip
	secondCard: Flip
	pokemonCard: PokemonDetails | null
}

type SetCardAction = {
	type: GameActions.SET_CARD
	card: 'cardOne' | 'cardTwo'
	flip: [number, number]
}

type SetPlayerNameAction = {
	type: GameActions.SET_PLAYER_NAME
	player: 'playerOne' | 'playerTwo'
	name: string
}

type SetProcessingAction = {
	type: GameActions.SET_PROCESSING
	isProcessing: boolean
}

type ResetTurnAction = {
	type: GameActions.RESET_TURN
}

type ResetGame = {
	type: GameActions.RESET_GAME
	winner: null | string
}

export type Action =
	| CalculateTurnAction
	| SetCardAction
	| SetPlayerNameAction
	| SetProcessingAction
	| ResetTurnAction
	| ResetGame
