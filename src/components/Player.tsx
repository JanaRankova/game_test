import CardContent from './Cards/CardContent'
import { Player } from '../types'

interface Props {
	player: Player
}

export default function PlayerPanel({ player }: Props) {
	return (
		<div className="player-panel">
			{player.name}
			<div className="player-cards">
				{player.matchedCards.map((card) => (
					<CardContent image={card.spriteFront} />
				))}
			</div>
		</div>
	)
}
