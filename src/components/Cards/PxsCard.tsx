import { useState } from 'react'

interface Props {
	id: number
	name: string
	sprite: string
}

export default function DetailedCard({ id, name, sprite }: Props) {
	const [isFlipped, setIsFlipped] = useState(false)

	return (
		<div className="pxs_card">
			<div className="img_wrapper">
				<img
					src={isFlipped ? sprite : '../../assets/pokeball-16809.png'}
					width={150}
					height={150}
				/>
			</div>
		</div>
	)
}
