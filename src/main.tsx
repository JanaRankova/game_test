import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import './styles/index.sass'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorHandling/ErrorBoundary'
//import Error from './components/ErrorHandling/DefaultFallback'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</QueryClientProvider>
	</StrictMode>,
)
