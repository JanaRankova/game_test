import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Card from './Card'

describe('Card component', () => {
	it('onCardFlip gets called on click at card', async () => {
		const user = userEvent.setup()

		const handleCardFlip = vi.fn()

		render(
			<Card sprite="sprite_front" isFlipped onCardFlip={handleCardFlip} />,
		)

		await user.click(screen.getByTitle('Pexeso card front'))
		expect(screen.getByTitle('Pexeso card front')).toHaveClass('flipped')
		expect(handleCardFlip).toHaveBeenCalled()
	})
})
