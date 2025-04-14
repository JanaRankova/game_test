import { useState, useEffect } from 'react'
import vulpixSheet1 from '../assets/vulpix-sheet-1.png'
import vulpixSheet2 from '../assets/vulpix-sheet-2.png'
import vulpixSheet3 from '../assets/vulpix-sheet-3.png'
import vulpixSheet4 from '../assets/vulpix-sheet-4.png'
import vulpixSheet5 from '../assets/vulpix-sheet-5.png'
import vulpixSheet6 from '../assets/vulpix-sheet-6.png'

export default function Loading() {
	const sprites = [
		vulpixSheet1,
		vulpixSheet2,
		vulpixSheet3,
		vulpixSheet4,
		vulpixSheet5,
		vulpixSheet6,
	]
	const [frame, setFrame] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setFrame((prev) => (prev + 1) % sprites.length)
		}, 120)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="loading">
			<img
				src={sprites[frame]}
				alt="loading animation frame"
				width={100}
				height={100}
			/>
			<div>Loading data...</div>
		</div>
	)
}
