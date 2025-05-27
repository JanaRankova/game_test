import PsyduckGround from '../../assets/psyduck-ground.png'
import PsyduckConfusion from '../../assets/psyduck-confusion.png'

export default function DefaultFallback() {
	return (
		<div className="default-error">
			<img
				src={PsyduckConfusion}
				alt="Error image 1"
				width={160}
				height={160}
			/>
			<h2>Something went wrong. Try reloading.</h2>
			<img
				src={PsyduckGround}
				alt="Error image 2"
				width={160}
				height={160}
			/>
		</div>
	)
}
