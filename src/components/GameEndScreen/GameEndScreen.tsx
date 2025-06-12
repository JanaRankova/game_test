import './game_end_screen.sass'
import ResetButton from '../Buttons/ResetButton'

interface Props {
	winner: string | undefined
	turnCount: number
	onGameReset: () => void
}

export default function GameEndMessage({ winner, turnCount, onGameReset }: Props) {
	const endMessage = !winner ? "It's a tie!" : `${winner} won the game!`

	return (
		<div className="game-end-screen">
			<div>
				<h4 className="bold">Game over</h4>
				<h3 className="winner">{endMessage}</h3>
				<div>Game ended after {turnCount} turns.</div>
				<ResetButton text="Restart game" onReset={onGameReset} />
			</div>
		</div>
	)
}
