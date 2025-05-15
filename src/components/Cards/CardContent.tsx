import errorImage from '../../assets/unknown-pokemon.jfif'

interface Props {
	classname?: string
	image: string | null
	onFlip?: () => void
}

export default function CardContent({ classname, image, onFlip }: Props) {
	return (
		<div className={`pxs_card ${classname}`} onClick={onFlip}>
			<img src={image || errorImage} width={120} height={120} />
		</div>
	)
}
