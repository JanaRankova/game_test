import RestartSvg from '../assets/icons/reload.svg?react'
import classNames from 'classnames'

interface Props {
	winner: string | undefined
	turnCount: number
	onGameReset: () => void
}

export default function GameEndMessage({
	winner,
	turnCount,
	onGameReset,
}: Props) {
	const endMessage = !winner ? "It's a tie!" : `${winner} won the game!`

	return (
		<div className="game-end-screen">
			<div>
				<h4 className="bold">Game over</h4>
				<h3 className="winner">{endMessage}</h3>
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
