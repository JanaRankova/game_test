import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GameEndScreen from './GameEndScreen'

describe('GameEndScreen component', () => {
	it('onGameReset gets called on click at the button', async () => {
		const user = userEvent.setup()

		const handleGameReset = vi.fn()

		render(<GameEndScreen winner="Goofy player" turnCount={10} onGameReset={handleGameReset} />)

		expect(screen.getByText('Goofy player won the game!')).toBeInTheDocument()
		await user.click(screen.getByRole('button'))
		expect(handleGameReset).toHaveBeenCalled()
	})
})
