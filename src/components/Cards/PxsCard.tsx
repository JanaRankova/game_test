import backImage from '../../assets/pokeball-16809.png'

import classNames from 'classnames'
import CardContent from './CardContent'

interface Props {
	sprite: string | null
	isFlipped: boolean
	onCardFlip: () => void
}

export default function PxsCard({ sprite, isFlipped, onCardFlip }: Props) {
	return (
		<>
			<CardContent
				classname={classNames('front', {
					flipped: isFlipped,
				})}
				image={backImage}
				onFlip={onCardFlip}
			/>
			<CardContent
				classname={classNames('back', {
					flipped: isFlipped,
				})}
				image={sprite}
				onFlip={onCardFlip}
			/>
		</>
	)
}
