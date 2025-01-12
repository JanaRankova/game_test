import { Component, ErrorInfo, ReactNode } from 'react'
import DefaultFallback from './DefaultFallback'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(_: Error): State {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo)
	}

	defaultFallback: React.ReactElement = (<DefaultFallback />)

	render() {
		if (this.state.hasError) {
			return this.props.fallback || this.defaultFallback
		}

		return this.props.children
	}
}

export default ErrorBoundary
