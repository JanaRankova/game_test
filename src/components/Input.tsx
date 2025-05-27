import ClearSvg from '../assets/icons/cross.svg?react'
import SearchSvg from '../assets/icons/search.svg?react'

import classNames from 'classnames'
import { useRef } from 'react'

interface Props {
	value: string
	name?: string
	className?: string
	isSearch?: boolean
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
	isSearch,
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
			onBlur={onAbortChange}
		/>
	)

	return clearable || isSearch ? (
		<div
			className={classNames('clearable-icon-wrapper', {
				search: isSearch,
			})}
		>
			{/* TODO: Remove search for now. It will be needed in later version. */}
			{isSearch && (
				<SearchSvg
					className={classNames('icon', 'small', 'light', 'search-input')}
				/>
			)}
			{textInput}
			<div className="text-input-icon-wrapper">
				{!!value && clearable && (
					<ClearSvg
						className={classNames(
							'icon',
							'small',
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
