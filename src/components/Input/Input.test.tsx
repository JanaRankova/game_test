import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from './Input'

describe('Input component', () => {
	// Test setup
	let user: ReturnType<typeof userEvent.setup>

	beforeEach(() => {
		user = userEvent.setup()
	})

	it('Basic input render and onChange behaviour', async () => {
		const handleOnChange = vi.fn()

		render(<Input value="blue" onChange={handleOnChange} />)

		expect(screen.getByRole('textbox')).toHaveDisplayValue('blue')
		await user.type(screen.getByRole('textbox'), 'r')
		expect(handleOnChange).toHaveBeenCalledWith('bluer')
	})

	it('Clearable input has cross svg, clicking it clears input value', async () => {
		const handleOnChange = vi.fn()
		render(<Input value="blue" clearable onChange={handleOnChange} />)

		expect(screen.getByRole('textbox')).toHaveDisplayValue('blue')
		expect(screen.getByTitle('Clear input')).toBeInTheDocument()
		await user.click(screen.getByTitle('Clear input'))
		expect(handleOnChange).toHaveBeenCalledWith('')
	})

	it('onAbortChange behaviour', async () => {
		const handleOnChange = vi.fn()
		const handleChangeAbort = vi.fn()

		render(
			<Input
				value="blue"
				onAbortChange={handleChangeAbort}
				onChange={handleOnChange}
			/>,
		)

		expect(screen.getByRole('textbox')).toHaveDisplayValue('blue')
		await user.type(screen.getByRole('textbox'), '[Escape]')
		expect(handleChangeAbort).toHaveBeenCalled()
	})

	it('onConfirm behaviour', async () => {
		const handleOnChange = vi.fn()
		const handleConfirm = vi.fn()

		render(
			<Input
				value="blue"
				onConfirm={handleConfirm}
				onChange={handleOnChange}
			/>,
		)

		expect(screen.getByRole('textbox')).toHaveDisplayValue('blue')
		await user.type(screen.getByRole('textbox'), '[Enter]')
		expect(handleConfirm).toHaveBeenCalled()
	})
})
