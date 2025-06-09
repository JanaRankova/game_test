import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PlayerPanel from './Player'
import { Player } from '../../types'

describe('PlayerPanel Component', () => {
	const testPlayer: Player = {
		id: 0,
		name: 'Player',
		matchedCards: [
			{
				id: 65,
				name: 'Alakazam',
				spriteFront: 'front',
				spriteBack: 'back',
			},
		],
		isActive: true,
		gamesWon: 2,
	}

	// Test setup
	let user: ReturnType<typeof userEvent.setup>
	let handleChange: ReturnType<typeof vi.fn>

	beforeEach(() => {
		user = userEvent.setup()
		handleChange = vi.fn()

		render(
			<PlayerPanel player={testPlayer} onPlayerNameChange={handleChange} />,
		)
	})

	it('Click on player name wrapper causes input to render', async () => {
		await user.click(screen.getByTitle('Edit player name'))
		expect(screen.getByDisplayValue('Player')).toBeInTheDocument()
	})

	it('On change gets called when Enter is pressed', async () => {
		await user.click(screen.getByTitle('Edit player name'))

		const input = screen.getByRole('textbox')
		user.clear(input)
		await user.type(input, 'new name')
		await user.keyboard('[Enter]')
		expect(handleChange).toHaveBeenCalled()
	})

	it('Pressing Escape aborts name change', async () => {
		await user.click(screen.getByTitle('Edit player name'))

		const input = screen.getByRole('textbox')
		await user.type(input, ' smt')
		await user.keyboard('[Escape]')
		expect(handleChange).toHaveBeenCalled()
		// Change is aborted and input is switched to player name with the old value.
		expect(screen.getByText('Player')).toBeInTheDocument
	})
})
