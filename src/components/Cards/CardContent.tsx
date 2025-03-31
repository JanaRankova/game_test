interface Props {
	classname?: string
	image: string
	onFlip?: () => void
}

export default function CardContent({ classname, image, onFlip }: Props) {
	return (
		<div className={`pxs_card ${classname}`} onClick={onFlip}>
			<div className="img_wrapper">
				<img src={image} width={120} height={120} />
			</div>
		</div>
	)
}
