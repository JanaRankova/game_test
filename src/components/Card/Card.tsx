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
				title="Pexeso card front"
				onClick={onCardFlip}
			>
				<img src={sprite || errorImage} alt="Pexeso card flipped with image of a pokemon." />
			</div>
			<div
				className={classNames('pexeso-card', 'back', {
					flipped: isFlipped,
				})}
				title="Pexeso card back"
				onClick={onCardFlip}
			>
				<img src={backImage} alt="Pexeso card back image - pokeball." />
			</div>
		</>
	)
}
