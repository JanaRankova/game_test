import { useState } from 'react'
import backImage from '../../assets/pokeball-16809.png'

interface Props {
	id: number
	name: string
	sprite: string
	isFlipped: boolean
	onCardFlip: (id: number) => void
}

export default function PxsCard({
	id,
	name,
	sprite,
	isFlipped,
	onCardFlip,
}: Props) {
	const [flipped, setFlipped] = useState(false)
	const handleCardFlip = () => {
		//setFlipped(true)
		onCardFlip(id)
	}

	return (
		<>
			<div
				className={`pxs_card front ${isFlipped && 'flipped'}`}
				onClick={handleCardFlip}
			>
				<div className="img_wrapper">
					<img src={backImage} width={120} height={120} />
				</div>
			</div>
			<div
				className={`pxs_card back ${isFlipped && 'flipped'}`}
				onClick={handleCardFlip}
			>
				<div className="img_wrapper">
					<img src={sprite} width={120} height={120} />
				</div>
			</div>
		</>
	)
}
