/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.png'
declare module '*.jfif'

declare module '*.svg' {
	const content: React.FC<React.SVGProps<SVGElement>>
	export default content
}

interface PokemonDetails {
	id: number
	name: string
	spriteFront: string
	spriteBack: string
}

// TODO: how to apply this on SVG components
interface Icon {
	size?: 'small' | 'normal' | 'big'
	mode?: 'light' | 'dark'
	title?: string
}
