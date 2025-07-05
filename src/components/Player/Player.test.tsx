import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PlayerPanel from './Player'
import { Player } from '../../common/types'

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
		// Create window object as we use window.matchMedia
		window.matchMedia = vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}))

		user = userEvent.setup()
		handleChange = vi.fn()

		render(
			<PlayerPanel
				player={testPlayer}
				otherPlayerName="second"
				onPlayerNameChange={handleChange}
			/>,
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
		expect(screen.getByText('Player')).toBeInTheDocument()
	})

	it('Choosing invalid name ends in error - name stays unchanged', async () => {
		await user.click(screen.getByTitle('Edit player name'))

		const input = screen.getByRole('textbox')
		await user.clear(input)

		// Test no name
		await user.paste('')
		await user.keyboard('[Enter]')

		expect(screen.getByText('Enter a name.')).toBeInTheDocument()

		// Test disallowed characters
		await user.paste('***')
		await user.keyboard('[Enter]')

		expect(
			screen.getByText(
				'Input can only contain letters, digits, dashes, underscores, and spaces between words.',
			),
		).toBeInTheDocument()

		// Test equal names
		await user.clear(input)
		await user.paste('second')
		await user.keyboard('[Enter]')

		expect(screen.getByText('Name is already used. Choose different one.')).toBeInTheDocument()
	})
})
