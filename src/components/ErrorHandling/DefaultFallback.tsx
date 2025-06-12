import PsyduckGround from '../../assets/psyduck-ground.png'
import PsyduckConfusion from '../../assets/psyduck-confusion.png'

interface Props {
	error?: string
}

export default function DefaultFallback({ error }: Props) {
	return (
		<div className="default-error">
			<img src={PsyduckConfusion} alt="Error image 1" width={160} height={160} />
			<h3>Something went wrong. Try reloading.</h3>
			{error && <p>{error}</p>}
			<img src={PsyduckGround} alt="Error image 2" width={160} height={160} />
		</div>
	)
}
