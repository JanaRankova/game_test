import RestartSvg from '../assets/icons/reload.svg?react'
import classNames from 'classnames'

interface Props {
	message: string
	turnCount: number
	onGameReset: () => void
}

export default function GameEndMessage({
	message,
	turnCount,
	onGameReset,
}: Props) {
	return (
		<div className="game-end-screen">
			<div>
				<h4 className="bold">Game over</h4>
				<h3 className="winner">{message}</h3>
				<div>Game ended after {turnCount} turns.</div>
				<button
					className="button normal"
					onClick={onGameReset}
					title="Restart game"
				>
					<span>
						Restart game
						<RestartSvg
							className={classNames('icon', 'normal', 'light')}
						/>
					</span>
				</button>
			</div>
		</div>
	)
}
