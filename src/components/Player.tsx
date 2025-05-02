import CheckmarkSvg from '../assets/icons/checkmark.svg?react'
import EditSvg from '../assets/icons/edit.svg?react'
import { useState } from 'react'

import CardContent from './Cards/CardContent'
import Input from './Input'
import { Player } from '../types'

interface Props {
	player: Player
}

export default function PlayerPanel({ player }: Props) {
	const [isEditing, setIsEditing] = useState(false)
	const [name, setName] = useState(player.name)

	return (
		<div className="player-panel">
			{isEditing ? (
				<Input
					className="player-name-input"
					value={name}
					clearable={true}
					name="playerName"
					endIcon={<CheckmarkSvg className="icon small light" />}
					onChange={setName}
				/>
			) : (
				<div
					className="player-name icon-wrapper"
					title="Edit player name"
					onClick={() => setIsEditing(true)}
				>
					{name}
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
