import CheckmarkSvg from '../assets/icons/checkmark.svg?react'
import EditSvg from '../assets/icons/edit.svg?react'
import { useState } from 'react'
import classNames from 'classnames'

import CardContent from './Cards/CardContent'
import Input from './Input'

interface Props {
	player: Player
	onPlayerNameChange: (name: string) => void
}

export default function PlayerPanel({ player, onPlayerNameChange }: Props) {
	const [isEditing, setIsEditing] = useState(false)
	const [name, setName] = useState(player.name)
	const [nameError, setNameError] = useState<string | null>(null)
	console.log(player.name, player.isActive)

	const validateName = (name: string) => {
		const trimmedName = name.trim()
		if (!trimmedName.length) {
			setNameError('Enter a name.')
		} else if (trimmedName.length > 40) {
			setNameError('Name must be shorter than 40 characters.')
		} else if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
			setNameError(
				'Input can only contain letters, digits, dashes, and underscores.',
			)
		} else {
			// Clean all previous errors
			setNameError(null)

			return true
		}
	}
	const handleNameChange = (newName: string) => {
		if (validateName(newName)) {
			onPlayerNameChange(newName)
		}
	}

	return (
		<div
			className={classNames('player-panel', {
				active: player.isActive,
			})}
		>
			{isEditing ? (
				<>
					<Input
						className="player-name-input"
						value={name}
						clearable={true}
						name="playerName"
						endIcon={<CheckmarkSvg className="icon small light" />}
						onChange={handleNameChange}
					/>
					<p className="error">{nameError}</p>
				</>
			) : (
				<div
					className="player-name icon-wrapper"
					title="Edit player name"
					onClick={() => setIsEditing(true)}
				>
					{player.name}
					<EditSvg className="icon small light" />
				</div>
			)}
			<div>Games won: {player.gamesWon}</div>
			<div className="player-cards">
				{player.matchedCards.map((card) => (
					<CardContent key={card.id} image={card.spriteFront} />
				))}
			</div>
		</div>
	)
}
