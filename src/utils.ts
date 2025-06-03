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

export const getNewDeck = (): number[] => {
	const numbers: number[] = []
	for (let index = 0; numbers.length < 16; index++) {
		const random = Math.floor(Math.random() * 151)
		if (!numbers.includes(random)) {
			numbers.push(random)
			numbers.push(random)
		}
	}
	return shuffleArray(numbers)
}
