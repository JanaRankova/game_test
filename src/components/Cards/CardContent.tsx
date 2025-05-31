import errorImage from '../../assets/unknown-pokemon.png'
import classNames from 'classnames'

interface Props {
	classname?: string
	image: string | null
	onFlip?: () => void
}

export default function CardContent({ classname = '', image, onFlip }: Props) {
	return (
		<div
			className={classNames('pexeso-card', {
				[classname]: !!classname,
			})}
			onClick={onFlip}
		>
			<img src={image || errorImage} />
		</div>
	)
}
