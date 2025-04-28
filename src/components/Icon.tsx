import Edit from '../assets/icons/edit.svg?react'

export interface Props {
	icon: React.ReactNode
	size?: 'small' | 'normal' | 'big'
	mode?: 'light' | 'dark'
	title?: string
}

export default function Icon({ icon, size = 'normal', title = '' }: Props) {
	return <div className="wrapper">{icon}</div>
	{
		/* <Edit className={`icon ${size}`} title={title} /> */
	}
}
