import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.sass'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorHandling/ErrorBoundary'
//import Error from './components/ErrorHandling/DefaultFallback'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</StrictMode>,
)
