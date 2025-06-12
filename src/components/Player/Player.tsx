import './player.sass'
import errorImage from '../../assets/unknown-pokemon.png'
import EditSvg from '../../assets/icons/edit.svg?react'
import { useState } from 'react'
import classNames from 'classnames'

import Input from '../Input/Input'
import { Player } from '../../types'

interface Props {
	player: Player
	otherPlayerName: string
	onPlayerNameChange: (name: string) => void
}

export default function PlayerPanel({ player, otherPlayerName, onPlayerNameChange }: Props) {
	const [isEditing, setIsEditing] = useState(false)
	const [name, setName] = useState(player.name)
	const [nameError, setNameError] = useState<string | null>(null)
	let previousName = player.name

	const validateName = (name: string) => {
		if (!name.length) {
			setNameError('Enter a name.')
		} else if (!/^[a-zA-Z0-9_-]+(?: [a-zA-Z0-9_-]+)*$/.test(name)) {
			setNameError(
				'Input can only contain letters, digits, dashes, underscores, and spaces between words.',
			)
		} else if (name === otherPlayerName) {
			setNameError('Name is already used. Choose different one.')
		} else {
			setNameError(null)
			return true
		}
	}

	const handleNameChange = () => {
		if (validateName(name)) {
			onPlayerNameChange(name)
			setIsEditing(false)
			previousName = name
		}
	}

	const handleAbortChange = () => {
		setIsEditing(false)
		onPlayerNameChange(previousName)
		setName(previousName)
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
						value={name}
						clearable={true}
						name="playerNameInput"
						maxLength={12}
						onConfirm={handleNameChange}
						onAbortChange={handleAbortChange}
						onChange={setName}
					/>
					{nameError && <p className="error">{nameError}</p>}
				</>
			) : (
				<div
					className="player-name"
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
