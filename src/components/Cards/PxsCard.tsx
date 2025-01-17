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
	return (
		<div className="pxs_card" onClick={() => onCardFlip(id)}>
			<div className="img_wrapper">
				<img
					src={isFlipped ? sprite : backImage}
					width={120}
					height={120}
				/>
			</div>
		</div>
	)
}
