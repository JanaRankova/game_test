import { useState, useRef } from 'react'

interface Props {
	translationKey: string
	onChange: (value: string) => void
}

export default function EditableTitle({ translationKey, onChange }: Props) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value)
	}

	return (
		<input
			type="text"
			className="editable-title"
			onChange={handleChange}
			value={translationKey}
		/>
	)
}
