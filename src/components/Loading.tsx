import { useEffect, useState } from 'react'

export default function Loading() {
	const [frame, setFrame] = useState(0)
	const imagesGlob = import.meta.glob('../assets/vulpix-sheet-*.png', {
		eager: true,
		import: 'default',
	})

	const images: string[] = Object.entries(imagesGlob)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([_, src]) => src as string)

	useEffect(() => {
		const interval = setInterval(() => {
			setFrame((prev) => (prev + 1) % 6)
		}, 150)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="loading">
			<img
				src={images[frame]}
				alt="loading animation frame"
				width={100}
				height={100}
			/>
			<h3>Loading Pokedex data...</h3>
		</div>
	)
}
