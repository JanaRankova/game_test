import backImage from '../../assets/pokeball-16809.png'
import errorImage from '../../assets/uknown-sprite.jfif'
import CardContent from './CardContent'

interface Props {
	sprite: string
	isFlipped: boolean
	onCardFlip: () => void
}

export default function PxsCard({ sprite, isFlipped, onCardFlip }: Props) {
	return (
		<>
			<CardContent
				classname={`front ${isFlipped && 'flipped'}`}
				image={backImage}
				onFlip={onCardFlip}
			/>
			<CardContent
				classname={`back ${isFlipped && 'flipped'}`}
				image={sprite || errorImage}
				onFlip={onCardFlip}
			/>
		</>
	)
}
