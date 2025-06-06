import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PlayerPanel from './Player'
import { Player, PokemonDetails } from '../../types'

describe('PlayerPanel Component', () => {
	const testPokemon = {
		id: 65,
		name: 'Alakazam',
		spriteFront: 'front',
		spriteBack: 'back',
	}

	const testPlayer: Player = {
		id: 0,
		name: 'Player',
		matchedCards: [testPokemon],
		isActive: true,
		gamesWon: 2,
	}

	it('Click on player name wrapper causes input to render', async () => {
		const handleChange = vi.fn()

		render(
			<PlayerPanel player={testPlayer} onPlayerNameChange={handleChange} />,
		)

		expect(screen.getByTitle('Edit player name')).toBeInTheDocument()

		// Click on name to toggle name edit
		await userEvent.click(screen.getByTitle('Edit player name'))
		expect(screen.getByDisplayValue('Player')).toBeInTheDocument()
	})

	it('On change gets called when Enter is pressed', async () => {
		const handleChange = vi.fn()

		render(
			<PlayerPanel player={testPlayer} onPlayerNameChange={handleChange} />,
		)

		expect(screen.getByTitle('Edit player name')).toBeInTheDocument()

		await userEvent.click(screen.getByTitle('Edit player name'))
		expect(screen.getByDisplayValue('Player')).toBeInTheDocument()

		await userEvent.clear(screen.getByDisplayValue('Player'))
		await userEvent.type(screen.getByRole('textbox'), 'new name')

		expect(screen.getByDisplayValue('new name')).toBeInTheDocument()

		await userEvent.keyboard('[Enter]')
		expect(handleChange).toHaveBeenCalled()
	})
})
