import { useState } from 'react'
import backImage from '../../assets/pokeball-16809.png'

interface Props {
	id: number
	name: string
	sprite: string
}

export default function PxsCard({ id, name, sprite }: Props) {
	const [isFlipped, setIsFlipped] = useState(false)
	console.log(isFlipped)

	return (
		<div className="pxs_card" onClick={() => setIsFlipped(!isFlipped)}>
			<div className="img_wrapper">
				<img
					src={isFlipped ? sprite : backImage}
					width={150}
					height={150}
				/>
			</div>
		</div>
	)
}
