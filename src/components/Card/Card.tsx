import './card.sass'
import backImage from '../../assets/pokeball-16809.png'
import errorImage from '../../assets/unknown-pokemon.png'

import classNames from 'classnames'

interface Props {
	sprite: string | null
	isFlipped: boolean
	onCardFlip: () => void
}

export default function Card({ sprite, isFlipped, onCardFlip }: Props) {
	return (
		<>
			<div
				className={classNames('pexeso-card', 'front', {
					flipped: isFlipped,
				})}
				onClick={onCardFlip}
			>
				<img src={sprite || errorImage} />
			</div>
			<div
				className={classNames('pexeso-card', 'back', {
					flipped: isFlipped,
				})}
				onClick={onCardFlip}
			>
				<img src={backImage} />
			</div>
		</>
	)
}
