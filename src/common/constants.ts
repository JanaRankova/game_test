import { Flip, Player } from './types'

export const defaultPlayer1: Player = {
	id: 0,
	name: 'Player 1',
	matchedCards: [],
	isActive: true,
	gamesWon: 0,
}

export const defaultPlayer2: Player = {
	id: 1,
	name: 'Player 2',
	matchedCards: [],
	isActive: false,
	gamesWon: 0,
}

export const emptyCard: Flip = [null, null]
