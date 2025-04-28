declare module '*.png'
declare module '*.jfif'

declare module '*.svg' {
	const content: React.FC<React.SVGProps<SVGElement>>
	export default content
}
