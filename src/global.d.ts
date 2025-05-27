/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.png'

declare module '*.svg' {
	const content: React.FC<React.SVGProps<SVGElement>>
	export default content
}

interface PokemonDetails {
	id: number
	name: string
	spriteFront: string | null
	spriteBack: string | null
}

interface Player {
	id: number
	name: string
	matchedCards: PokemonDetails[]
	isActive: boolean
	gamesWon: number
}
