import RestartSvg from '../../assets/icons/reload.svg?react'
import classNames from 'classnames'

interface Props {
	text?: string
	onReset: () => void
}

export default function ResetButton({ text, onReset }: Props) {
	return (
		<button className={classNames('button', 'normal', 'reset', {
			'icon-only': !text,
		})} onClick={onReset} title="Reset">
			<span>
				{text && text}
				<RestartSvg className={classNames('icon', 'normal', 'light')} />
			</span>
		</button>
	)
}
