import EditSvg from '../assets/icons/edit.svg?react'

import CardContent from './Cards/CardContent'
import Icon from './Icon'
import { Player } from '../types'

interface Props {
	player: Player
}

export default function PlayerPanel({ player }: Props) {
	return (
		<div className="player-panel">
			<div className="player-name">
				{player.name}
				<Icon icon={EditSvg} title="Edit player name" />
			</div>
			<div className="player-cards">
				{player.matchedCards.map((card) => (
					<CardContent key={card.id} image={card.spriteFront} />
				))}
			</div>
		</div>
	)
}
