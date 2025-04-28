/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

export interface PokemonDetails {
	id: number
	name: string
	spriteFront: string
	spriteBack: string
}

export interface Player {
	id: number
	name: string
	matchedCards: PokemonDetails[]
	isActive: boolean
}

export type Flip = (number | null)[]

export interface Icon {
	size?: 'small' | 'normal' | 'big'
	mode?: 'light' | 'dark'
	title?: string
}
