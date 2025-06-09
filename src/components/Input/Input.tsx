import './input.sass'
import ClearSvg from '../../assets/icons/cross.svg?react'

import classNames from 'classnames'
import { useRef } from 'react'

interface Props {
	value: string
	name?: string
	className?: string
	clearable?: boolean
	placeholder?: string
	maxLength?: number
	onChange: (value: string) => void
	onAbortChange?: () => void
	onConfirm?: () => void
}

export default function Input({
	value,
	name,
	className,
	clearable,
	placeholder,
	maxLength,
	onChange,
	onAbortChange,
	onConfirm,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
		onChange('')
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Escape') {
			if (onAbortChange) {
				onAbortChange()
			}
		}

		if (event.key === 'Enter') {
			if (onConfirm) {
				onConfirm()
			}
		}
	}

	const textInput = (
		<input
			ref={inputRef}
			type="text"
			name={name}
			className={className}
			value={value}
			autoFocus
			placeholder={placeholder}
			maxLength={maxLength}
			onChange={(event) => onChange(event.target.value)}
			onKeyDown={handleKeyDown}
		/>
	)

	return clearable ? (
		<div className="clearable-input-wrapper">
			{textInput}
			<div className="clearable-icon">
				{!!value && clearable && (
					<ClearSvg
						className={classNames(
							'icon',
							'normal',
							'light',
							'clear-input',
						)}
						title="Clear input"
						tabIndex={1}
						onClick={handleClear}
					/>
				)}
			</div>
		</div>
	) : (
		textInput
	)
}
