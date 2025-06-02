/** Fisher-Yates Shuffle Algorithm */
export function shuffleArray<T>(array: T[]): T[] {
	let oldItem
	const copy = [...array]

	for (let i = copy.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1))

		oldItem = copy[i]
		copy[i] = copy[randomIndex]
		copy[randomIndex] = oldItem
	}

	return copy
}
