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
	endIcon?: React.ReactNode
	onChange: (value: string) => void
}

export default function Input({
	value,
	name,
	className,
	isSearch,
	clearable,
	placeholder,
	maxLength,
	endIcon,
	onChange,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
		onChange('')
	}

	const textInput = (
		<input
			ref={inputRef}
			type="text"
			name={name}
			className={className}
			value={value}
			placeholder={placeholder}
			maxLength={maxLength}
			onChange={(event) => onChange(event.target.value)}
		/>
	)

	return clearable || isSearch ? (
		<div
			className={classNames('clearable-icon-wrapper', {
				search: isSearch,
			})}
		>
			{isSearch && (
				<SearchSvg
					className={classNames('icon', 'small', 'light', 'search-input')}
				/>
			)}
			{textInput}
			<div className="text-input-icon-wrapper">
				{endIcon}
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
		<>
			{textInput}
			{endIcon}
		</>
	)
}
