import errorImage from '../assets/unknown-pokemon.png'
import CheckmarkSvg from '../assets/icons/checkmark.svg?react'
import EditSvg from '../assets/icons/edit.svg?react'
import { useState } from 'react'
import classNames from 'classnames'

import Input from './Input'

interface Props {
	player: Player
	onPlayerNameChange: (name: string) => void
}

export default function PlayerPanel({ player, onPlayerNameChange }: Props) {
	const [isEditing, setIsEditing] = useState(false)
	const [name, setName] = useState(player.name)
	const [nameError, setNameError] = useState<string | null>(null)

	const validateName = (name: string) => {
		if (!name.length) {
			setNameError('Enter a name.')
		} else if (!/^[a-zA-Z0-9_-]+(?: [a-zA-Z0-9_-]+)*$/.test(name)) {
			setNameError(
				'Input can only contain letters, digits, dashes, underscores, and spaces between words.',
			)
		} else {
			setNameError(null)

			return true
		}
	}

	const handleNameChange = () => {
		if (validateName(name)) {
			onPlayerNameChange(name)
			setIsEditing(false)
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
						maxLength={40}
						onChange={setName}
					/>
					<CheckmarkSvg
						className="icon small light"
						onClick={handleNameChange}
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
					<img src={card.spriteFront || errorImage} key={card.id} />
				))}
			</div>
		</div>
	)
}
