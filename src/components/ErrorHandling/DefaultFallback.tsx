import PsyduckGround from '../../assets/psyduck-ground.png'
import PsyduckConfusion from '../../assets/psyduck-confusion.png'

interface Props {
	error?: string
}

export default function DefaultFallback({ error }: Props) {
	return (
		<div className="default-error">
			<img
				src={PsyduckConfusion}
				width={160}
				height={160}
				alt="Error image 1 - confused psyduck."
			/>
			<h3>Something went wrong. Try reloading.</h3>
			{error && <p>{error}</p>}
			<img
				src={PsyduckGround}
				alt="Error image 2 - psyduck laying on the ground."
				width={160}
				height={160}
			/>
		</div>
	)
}
